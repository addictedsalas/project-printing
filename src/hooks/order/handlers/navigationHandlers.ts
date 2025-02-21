
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

  return { handleNext };
};
