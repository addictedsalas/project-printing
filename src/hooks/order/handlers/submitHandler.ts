
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";
import { getTotalQuantity } from "../useOrderFormTypes";

interface SubmitHandlerProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  setStep: (step: number) => void;
  setIsSubmitted: (submitted: boolean) => void;
  toast: any;
  savedItems: OrderFormValues[];
}

export const createSubmitHandler = ({
  form,
  step,
  setStep,
  setIsSubmitted,
  toast,
  savedItems,
}: SubmitHandlerProps) => {
  const handleSubmit = async (data: OrderFormValues) => {
    console.log("Submit handler called with data:", data);

    if (step < 3) {
      // Validar ubicaciones de impresión antes de pasar al paso de revisión
      if (step === 2) {
        const printLocations = form.getValues("printLocations") || [];
        if (!printLocations.length) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Please select at least one print location",
          });
          return;
        }
      }
      setStep(step + 1);
      return;
    }

    const currentFormData = form.getValues();
    const currentTotalQuantity = getTotalQuantity(currentFormData.sizes);
    
    let orderItems = [...savedItems];
    
    if (currentTotalQuantity > 0) {
      // Validar ubicaciones de impresión antes de agregar el item
      if (!currentFormData.printLocations?.length) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please select at least one print location before submitting",
        });
        return;
      }

      orderItems.push({
        ...currentFormData,
        printLocations: Array.isArray(currentFormData.printLocations) 
          ? [...currentFormData.printLocations]
          : [],
        designs: { ...currentFormData.designs }
      });
    }
    
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
      
      // Simulamos una respuesta exitosa
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

  return { handleSubmit };
};
