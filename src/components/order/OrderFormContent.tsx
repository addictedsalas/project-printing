
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductDetailsStep } from "./ProductDetailsStep";
import { CustomizationStep } from "./CustomizationStep";
import { ReviewStep } from "./ReviewStep";
import { ContinueModal } from "./ContinueModal";
import type { OrderFormValues } from "@/types/order";
import type { UseFormReturn } from "react-hook-form";

interface OrderFormContentProps {
  form: UseFormReturn<OrderFormValues>;
  step: number;
  totalSteps: number;
  sizeType: "adult" | "youth";
  setSizeType: (type: "adult" | "youth") => void;
  savedItems: OrderFormValues[];
  showContinueModal: boolean;
  setShowContinueModal: (show: boolean) => void;
  handleNext: () => void;
  handleSubmit: (data: OrderFormValues) => void;
  handleContinue: () => void;
  handleAddMore: () => void;
  setStep: (step: number) => void;
}

export const OrderFormContent = ({
  form,
  step,
  totalSteps,
  sizeType,
  setSizeType,
  savedItems,
  showContinueModal,
  setShowContinueModal,
  handleNext,
  handleSubmit,
  handleContinue,
  handleAddMore,
  setStep,
}: OrderFormContentProps) => {
  const { theme } = useTheme();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass-card"
          >
            {step === 1 && (
              <ProductDetailsStep 
                form={form}
                isDark={theme === "dark"}
                sizeType={sizeType}
                setSizeType={setSizeType}
              />
            )}

            {step === 2 && (
              <CustomizationStep 
                form={form}
                isDark={theme === "dark"}
              />
            )}

            {step === 3 && (
              <ReviewStep savedItems={savedItems} />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between pt-8"
        >
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="px-8 py-6 text-lg bg-white/80 dark:bg-brand-navy-dark/80 hover:bg-brand-blue-light/20 dark:hover:bg-brand-navy-light/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:text-white dark:border-brand-blue/20"
            >
              Previous
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              type="button"
              className="ml-auto px-8 py-6 text-lg bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit"
              className="ml-auto px-8 py-6 text-lg bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              Submit Order
            </Button>
          )}
        </motion.div>
      </form>

      <ContinueModal
        isOpen={showContinueModal}
        onClose={() => setShowContinueModal(false)}
        onContinue={handleContinue}
        onAddMore={handleAddMore}
      />
    </Form>
  );
};
