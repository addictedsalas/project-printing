
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
      setStep(2); // Go to customization screen
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

      // Verify that each print location has an associated design
      const hasAllDesigns = printLocations.every(location => {
        if (location.startsWith('custom:')) {
          return true; // Custom locations don't need uploaded design
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

      // Create a clean copy of print locations
      const cleanPrintLocations = printLocations.map(location => {
        if (location.startsWith("custom:") && location.endsWith(":")) {
          return null;
        }
        return location;
      }).filter(Boolean) as string[];

      // Save the current item before moving to the summary
      const currentTotalQuantity = getTotalQuantity(formData.sizes);
      if (currentTotalQuantity > 0) {
        setSavedItems(prev => [...prev, {
          ...formData,
          printLocations: cleanPrintLocations,
          designs: { ...formData.designs }
        }]);
      }

      setStep(3); // Go to the summary screen
    }
    else if (step === 3) {
      // After summary, go to contact form
      setStep(4);
    }
    else if (step === 4) {
      // Validate contact information before allowing submission
      const contactInfo = formData.contactInfo;
      if (!contactInfo?.fullName || !contactInfo?.email || !contactInfo?.phone || !contactInfo?.address) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please fill in all required contact information",
        });
        return;
      }
      
      // If all information is complete, allow submission
      setStep(5);
    }
  };

  return { handleNext };
};
