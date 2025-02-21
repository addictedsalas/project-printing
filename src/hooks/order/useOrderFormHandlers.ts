
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
  savedItems: OrderFormValues[];
}

export const useOrderFormHandlers = ({
  form,
  step,
  setStep,
  setShowContinueModal,
  setSavedItems,
  setIsSubmitted,
  toast,
  savedItems,
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
      
      if (step === 2 && (!formData.printLocations || formData.printLocations.length === 0)) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select at least one print location",
        });
        return;
      }
      
      if (step === 2 && !formData.printLocations.every(location => location.startsWith('custom:') || formData.designs[location])) {
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

    // Ensure printLocations is initialized as an array
    const printLocations = Array.isArray(currentFormData.printLocations) 
      ? currentFormData.printLocations 
      : [];

    // Create a new item with all the current form data including print locations
    const itemToSave = {
      ...currentFormData,
      printLocations: printLocations,
      designs: { ...currentFormData.designs }
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

    // Save the current item with its print locations
    setSavedItems(prev => [...prev, {
      ...currentFormData,
      printLocations: Array.isArray(currentFormData.printLocations) 
        ? [...currentFormData.printLocations]
        : [],
      designs: { ...currentFormData.designs }
    }]);

    // Reset the form but maintain contact info
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
    console.log("Submit handler called with data:", data);

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    // Get current form data and saved items
    const currentFormData = form.getValues();
    const currentTotalQuantity = getTotalQuantity(currentFormData.sizes);
    
    // Prepare final order items
    let orderItems = [...savedItems];
    
    // Add current form data if it has items
    if (currentTotalQuantity > 0) {
      orderItems.push({
        ...currentFormData,
        printLocations: Array.isArray(currentFormData.printLocations) 
          ? [...currentFormData.printLocations]
          : [],
        designs: { ...currentFormData.designs }
      });
    }
    
    // Check if we have any items at all
    if (orderItems.length === 0) {
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
      console.log("Submitting order with items:", orderItems);
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: orderItems,
          contactInfo: data.contactInfo,
          to: "orders@projectprinting.org"
        }),
      });

      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);

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
