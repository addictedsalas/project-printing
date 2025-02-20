
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "@/types/order";
import { useToast } from "@/components/ui/use-toast";

export const useOrderForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedItems, setSavedItems] = useState<OrderFormValues[]>([]);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      garmentType: "",
      cottonType: "",
      brand: "",
      sizeType: "adult",
      sizes: {
        xsmall: [],
        small: [],
        medium: [],
        large: [],
        xlarge: [],
        xxlarge: [],
        youth_s: [],
        youth_m: [],
        youth_l: [],
      },
      printLocations: [],
      designs: {},
      fabricQuality: "",
      itemIndex: savedItems.length,
      contactInfo: {
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      },
    },
  });

  const getTotalQuantity = (sizes: OrderFormValues['sizes']) => {
    return Object.values(sizes).reduce((total, sizeColors) => {
      return total + sizeColors.reduce((sizeTotal, sc) => sizeTotal + Number(sc.quantity), 0);
    }, 0);
  };

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

    // Asegurarnos de que printLocations sea un array antes de guardar
    const printLocations = Array.isArray(currentFormData.printLocations) 
      ? currentFormData.printLocations 
      : [];

    // Crear una copia del objeto con las ubicaciones de impresión
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

    // Reset form but keep contact info
    const contactInfo = form.getValues("contactInfo");
    form.reset({
      garmentType: "",
      cottonType: "",
      brand: "",
      sizeType: "adult",
      sizes: {
        xsmall: [],
        small: [],
        medium: [],
        large: [],
        xlarge: [],
        xxlarge: [],
        youth_s: [],
        youth_m: [],
        youth_l: [],
      },
      printLocations: [],
      designs: {},
      fabricQuality: "",
      itemIndex: savedItems.length + 1,
      contactInfo,
    });

    setShowContinueModal(false);
    setStep(1);
    setSizeType("adult");

    toast({
      title: "Success",
      description: "Items saved! You can now add more garments.",
    });
  };

  const handleSubmit = async (data: OrderFormValues) => {
    if (step < totalSteps) {
      setStep(step + 1);
      return;
    }

    const allItems = [...savedItems];
    // Add the current form data if it has items
    const currentFormData = form.getValues();
    const currentTotalQuantity = getTotalQuantity(currentFormData.sizes);
    
    if (currentTotalQuantity > 0) {
      allItems.push(currentFormData);
    }

    if (allItems.length === 0) {
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
      // Create a more readable format for the email
      const formattedOrder = allItems.map((item, index) => ({
        itemNumber: index + 1,
        garmentType: item.garmentType,
        brand: item.brand,
        sizes: Object.entries(item.sizes)
          .filter(([_, sizeColors]) => sizeColors.some(sc => Number(sc.quantity) > 0))
          .map(([size, sizeColors]) => ({
            size,
            colors: sizeColors.filter(sc => Number(sc.quantity) > 0).map(sc => ({
              color: sc.color,
              quantity: sc.quantity
            }))
          })),
        printLocations: item.printLocations,
        designs: item.designs
      }));

      const orderData = {
        order: formattedOrder,
        contactInfo: data.contactInfo,
        to: "orders@projectprinting.org"
      };

      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
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
    form,
    step,
    setStep,
    totalSteps,
    isSubmitted,
    showContinueModal,
    setShowContinueModal,
    savedItems,
    sizeType,
    setSizeType,
    handleNext,
    handleSubmit,
    handleContinue,
    handleAddMore,
  };
};
