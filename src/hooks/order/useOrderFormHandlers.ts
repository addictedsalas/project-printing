
import { UseOrderFormHandlersProps } from "./types/orderHandlerTypes";
import { createNavigationHandlers } from "./handlers/navigationHandlers";
import { createItemHandlers } from "./handlers/itemHandlers";
import { createSubmitHandler } from "./handlers/submitHandler";

export const useOrderFormHandlers = ({
  form,
  step,
  setStep,
  setShowContinueModal,
  setSavedItems,
  setIsSubmitted,
  toast,
  savedItems,
}: UseOrderFormHandlersProps) => {
  const { handleNext } = createNavigationHandlers({
    form,
    step,
    setStep,
    setShowContinueModal,
    toast,
    savedItems,
    setSavedItems,
  });

  const { handleContinue, handleAddMore } = createItemHandlers({
    form,
    setShowContinueModal,
    setSavedItems,
    setStep,
    toast,
  });

  const { handleSubmit } = createSubmitHandler({
    form,
    step,
    setStep,
    setIsSubmitted,
    toast,
    savedItems,
  });

  return {
    handleNext,
    handleContinue,
    handleAddMore,
    handleSubmit,
  };
};
