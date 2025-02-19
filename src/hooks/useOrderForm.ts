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
      itemIndex: 0,
      contactInfo: {
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      },
    },
  });

  const handleNext = () => {
    if (step === 1) {
      const anyQuantityGreaterThanZero = Object.values(form.getValues().sizes).some(sizeColors =>
        sizeColors.some(item => Number(item.quantity) > 0)
      );

      if (!anyQuantityGreaterThanZero) {
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

  const handleSubmit = async (data: OrderFormValues) => {
    if (step < totalSteps) {
      setStep(step + 1);
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

    const anyQuantityGreaterThanZero = Object.values(data.sizes).some(sizeColors =>
      sizeColors.some(item => Number(item.quantity) > 0)
    );

    if (!anyQuantityGreaterThanZero) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item to your order",
      });
      return;
    }

    if (data.printLocations.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one print location",
      });
      return;
    }

    const allLocationsHaveDesigns = data.printLocations.every(
      location => data.designs[location]
    );

    if (!allLocationsHaveDesigns) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload designs for all selected print locations",
      });
      return;
    }

    try {
      const allItems = [...savedItems, data];
      
      // Create a more readable format for the email
      const formattedOrder = allItems.map((item, index) => ({
        itemNumber: index + 1,
        garmentType: item.garmentType,
        brand: item.brand,
        sizes: Object.entries(item.sizes)
          .filter(([_, sizeColors]) => sizeColors.length > 0)
          .map(([size, sizeColors]) => ({
            size,
            colors: sizeColors.map(sc => ({
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

  const handleContinue = () => {
    setShowContinueModal(false);
    setStep(2);
  };

  const handleAddMore = () => {
    const currentData = form.getValues();
    const anyQuantityGreaterThanZero = Object.values(currentData.sizes).some(sizeColors =>
      sizeColors.some(item => Number(item.quantity) > 0)
    );

    if (!anyQuantityGreaterThanZero) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item before adding more",
      });
      return;
    }

    setSavedItems([...savedItems, currentData]);

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
      contactInfo: form.getValues().contactInfo, // Preserve contact info when adding more items
    });

    setShowContinueModal(false);
    setStep(1);
    setSizeType("adult");

    toast({
      title: "Success",
      description: "Items saved! You can now add more garments.",
    });
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
