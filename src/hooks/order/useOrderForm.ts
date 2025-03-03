
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema, OrderFormValues } from "@/types/order";
import { useToast } from "@/components/ui/use-toast";
import { defaultFormValues } from "./useOrderFormTypes";
import { useOrderFormHandlers } from "./useOrderFormHandlers";

export const useOrderForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Updated to include contact information step
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedItems, setSavedItems] = useState<OrderFormValues[]>([]);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");
  const { toast } = useToast();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      ...defaultFormValues,
      itemIndex: savedItems.length,
    },
  });

  const handlers = useOrderFormHandlers({
    form,
    step,
    setStep,
    setShowContinueModal,
    setSavedItems,
    setIsSubmitted,
    toast,
    savedItems,
  });

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
    ...handlers,
  };
};
