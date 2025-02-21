
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
      setStep(step + 1);
      return;
    }

    // Si no hay items guardados y el formulario actual tiene cantidades, agregarlo a los items
    const currentFormData = form.getValues();
    const currentTotalQuantity = getTotalQuantity(currentFormData.sizes);
    
    let orderItems = [...savedItems];
    
    if (currentTotalQuantity > 0) {
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

    // Verificar la información de contacto
    if (!data.contactInfo?.fullName || !data.contactInfo?.email || !data.contactInfo?.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required contact information",
      });
      return;
    }

    try {
      // Preparar los datos para el email
      const emailData = {
        order: orderItems.map((item, index) => ({
          itemNumber: index + 1,
          garmentType: item.garmentType,
          materialType: item.cottonType,
          brand: item.brand,
          sizes: Object.entries(item.sizes).map(([size, colors]) => ({
            size,
            colors: colors.map(color => ({
              color: color.color,
              quantity: color.quantity
            }))
          })),
          printLocations: item.printLocations,
          designs: item.designs
        })),
        contactInfo: data.contactInfo,
        to: data.contactInfo.email
      };

      console.log("Sending email with data:", emailData);

      // Enviar el email
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log("Order submitted successfully");
      
      // Mostrar la pantalla de agradecimiento
      setIsSubmitted(true);
      
      toast({
        title: "Success!",
        description: "Your order has been submitted successfully. Check your email for confirmation.",
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
