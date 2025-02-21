
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

    // En lugar de guardar el item aquí, solo avanzamos a la pantalla de customización
    setShowContinueModal(false);
    setStep(2); // Ir a la pantalla de customización
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

    // Guardar el item actual con sus ubicaciones de impresión y diseños
    setSavedItems(prev => [...prev, {
      ...currentFormData,
      printLocations: cleanPrintLocations,
      designs: { ...currentFormData.designs }
    }]);

    // Resetear el formulario para un nuevo item
    const contactInfo = form.getValues("contactInfo");
    form.reset({
      ...defaultFormValues,
      itemIndex: form.getValues("itemIndex") + 1,
      contactInfo,
    });

    setShowContinueModal(false);
    setStep(1); // Volver a la selección de productos para el nuevo item
  };

  return {
    handleContinue,
    handleAddMore,
  };
};
