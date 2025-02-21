
import { OrderFormValues } from "@/types/order";
import { UseFormReturn } from "react-hook-form";

export interface UseOrderFormHandlersProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  setStep: (step: number) => void;
  setShowContinueModal: (show: boolean) => void;
  setSavedItems: (items: OrderFormValues[] | ((prev: OrderFormValues[]) => OrderFormValues[])) => void;
  setIsSubmitted: (submitted: boolean) => void;
  toast: any;
  savedItems: OrderFormValues[];
}
