
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
      materialType: "cotton",
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

    const allItems = [...savedItems, data];
    console.log("All items submitted:", allItems);
    setIsSubmitted(true);
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
      materialType: "cotton",
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
