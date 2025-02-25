
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";
import { getTotalQuantity } from "../useOrderFormTypes";

interface NavigationHandlersProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  setStep: (step: number) => void;
  setShowContinueModal: (show: boolean) => void;
  toast: any;
  savedItems: OrderFormValues[];
  setSavedItems: (items: OrderFormValues[] | ((prev: OrderFormValues[]) => OrderFormValues[])) => void;
}

export const createNavigationHandlers = ({
  form,
  step,
  setStep,
  setShowContinueModal,
  toast,
  savedItems,
  setSavedItems,
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

      // Crear una copia limpia de las ubicaciones de impresión
      const cleanPrintLocations = printLocations.map(location => {
        if (location.startsWith("custom:") && location.endsWith(":")) {
          return null;
        }
        return location;
      }).filter(Boolean) as string[];

      // Guardar el item actual antes de ir al resumen
      const currentTotalQuantity = getTotalQuantity(formData.sizes);
      if (currentTotalQuantity > 0) {
        setSavedItems(prev => [...prev, {
          ...formData,
          printLocations: cleanPrintLocations,
          designs: { ...formData.designs }
        }]);
      }

      setStep(3); // Ir a la pantalla de resumen
    }
    else if (step === 3) {
      // Después del resumen, ir al formulario de contacto
      setStep(4);
    }
    else if (step === 4) {
      // Validar la información de contacto antes de permitir enviar
      const contactInfo = formData.contactInfo;
      if (!contactInfo?.fullName || !contactInfo?.email || !contactInfo?.phone || !contactInfo?.address) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required contact information",
        });
        return;
      }
      
      // Si toda la información está completa, permitir enviar
      setStep(5);
    }
  };

  return { handleNext };
};
