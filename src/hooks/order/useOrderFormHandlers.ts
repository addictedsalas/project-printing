
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";
import { getTotalQuantity, defaultFormValues } from "./useOrderFormTypes";

interface UseOrderFormHandlersProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  setStep: (step: number) => void;
  setShowContinueModal: (show: boolean) => void;
  setSavedItems: (items: OrderFormValues[] | ((prev: OrderFormValues[]) => OrderFormValues[])) => void;
  setIsSubmitted: (submitted: boolean) => void;
  toast: any;
}

export const useOrderFormHandlers = ({
  form,
  step,
  setStep,
  setShowContinueModal,
  setSavedItems,
  setIsSubmitted,
  toast,
}: UseOrderFormHandlersProps) => {
  const handleNext = () => {
    if (step === 1) {
      const currentFormData = form.getValues();
      const totalQuantity = getTotalQuantity(currentFormData.sizes);

      if (totalQuantity === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please add at least one item before continuing",
        });
        return;
      }
      setShowContinueModal(true);
    } else {
      const formData = form.getValues();
      
      if (step === 2 && formData.printLocations.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select at least one print location",
        });
        return;
      }
      
      if (step === 2 && !formData.printLocations.every(location => formData.designs[location])) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload designs for all selected print locations",
        });
        return;
      }
      
      setStep(step + 1);
    }
  };

  const handleContinue = () => {
    const currentFormData = form.getValues();
    const totalQuantity = getTotalQuantity(currentFormData.sizes);

    if (totalQuantity === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item before continuing",
      });
      return;
    }

    const printLocations = Array.isArray(currentFormData.printLocations) 
      ? currentFormData.printLocations 
      : [];

    const itemToSave = {
      ...currentFormData,
      printLocations
    };

    console.log("Saving item with print locations:", itemToSave.printLocations);

    setSavedItems(prev => [...prev, itemToSave]);
    setShowContinueModal(false);
    setStep(2);

    toast({
      title: "Success",
      description: "Items saved successfully!",
    });
  };

  const handleAddMore = () => {
    const currentFormData = form.getValues();
    const totalQuantity = getTotalQuantity(currentFormData.sizes);

    if (totalQuantity === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item before adding more",
      });
      return;
    }

    setSavedItems(prev => [...prev, currentFormData]);

    const contactInfo = form.getValues("contactInfo");
    form.reset({
      ...defaultFormValues,
      itemIndex: form.getValues("itemIndex") + 1,
      contactInfo,
    });

    setShowContinueModal(false);
    setStep(1);
  };

  const handleSubmit = async (data: OrderFormValues) => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const allItems = form.getValues();
    const currentTotalQuantity = getTotalQuantity(allItems.sizes);
    
    if (currentTotalQuantity === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item to your order",
      });
      return;
    }

    if (!data.contactInfo?.fullName || !data.contactInfo?.email || !data.contactInfo?.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required contact information",
      });
      return;
    }

    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: allItems,
          contactInfo: data.contactInfo,
          to: "orders@projectprinting.org"
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Your order has been submitted successfully.",
      });
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit your order. Please try again.",
      });
    }
  };

  return {
    handleNext,
    handleContinue,
    handleAddMore,
    handleSubmit,
  };
};
