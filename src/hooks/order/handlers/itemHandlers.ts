
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";
import { getTotalQuantity, defaultFormValues } from "../useOrderFormTypes";

interface ItemHandlersProps {
  form: UseFormReturn<OrderFormValues>;
  setShowContinueModal: (show: boolean) => void;
  setSavedItems: (items: OrderFormValues[] | ((prev: OrderFormValues[]) => OrderFormValues[])) => void;
  setStep: (step: number) => void;
  toast: any;
}

export const createItemHandlers = ({
  form,
  setShowContinueModal,
  setSavedItems,
  setStep,
  toast,
}: ItemHandlersProps) => {
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

    const printLocations = form.getValues("printLocations");
    console.log("Current print locations:", printLocations);

    if (!printLocations || printLocations.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one print location before continuing",
      });
      return;
    }

    // Create a clean copy of the print locations array
    const cleanPrintLocations = printLocations.map(location => {
      if (location.startsWith("custom:") && location.endsWith(":")) {
        return null; // Filter out empty custom locations
      }
      return location;
    }).filter(Boolean) as string[];

    if (cleanPrintLocations.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please specify at least one valid print location",
      });
      return;
    }

    const itemToSave = {
      ...currentFormData,
      printLocations: cleanPrintLocations,
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

    const printLocations = form.getValues("printLocations") || [];
    
    if (!printLocations.length) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one print location before adding more items",
      });
      return;
    }

    // Create a clean copy of the print locations array
    const cleanPrintLocations = printLocations.map(location => {
      if (location.startsWith("custom:") && location.endsWith(":")) {
        return null;
      }
      return location;
    }).filter(Boolean) as string[];

    setSavedItems(prev => [...prev, {
      ...currentFormData,
      printLocations: cleanPrintLocations,
      designs: { ...currentFormData.designs }
    }]);

    const contactInfo = form.getValues("contactInfo");
    form.reset({
      ...defaultFormValues,
      itemIndex: form.getValues("itemIndex") + 1,
      contactInfo,
    });

    setShowContinueModal(false);
    setStep(1);
  };

  return {
    handleContinue,
    handleAddMore,
  };
};
