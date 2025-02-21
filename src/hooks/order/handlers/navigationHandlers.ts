
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";
import { getTotalQuantity } from "../useOrderFormTypes";

interface NavigationHandlersProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  setStep: (step: number) => void;
  setShowContinueModal: (show: boolean) => void;
  toast: any;
}

export const createNavigationHandlers = ({
  form,
  step,
  setStep,
  setShowContinueModal,
  toast,
}: NavigationHandlersProps) => {
  const handleNext = () => {
    const formData = form.getValues();

    if (step === 1) {
      const totalQuantity = getTotalQuantity(formData.sizes);

      if (totalQuantity === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please add at least one item before continuing",
        });
        return;
      }
      setStep(2); // Ir a la pantalla de customización
    } 
    else if (step === 2) {
      const printLocations = formData.printLocations || [];
      
      if (!printLocations.length) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select at least one print location",
        });
        return;
      }

      // Verificar que cada ubicación de impresión tenga un diseño asociado
      const hasAllDesigns = printLocations.every(location => {
        if (location.startsWith('custom:')) {
          return true; // Las ubicaciones personalizadas no necesitan diseño subido
        }
        return formData.designs[location];
      });

      if (!hasAllDesigns) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload designs for all selected print locations",
        });
        return;
      }

      setStep(3); // Ir a la pantalla de resumen
    }
  };

  return { handleNext };
};
