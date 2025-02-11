
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { OrderFormValues } from "@/types/order";

interface ReviewStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
}

export const ReviewStep = ({ form }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-brand-navy dark:text-white"
        >
          Review & Submit
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300">Almost there! Review your order details</p>
      </div>
      {/* Add order summary here */}
    </div>
  );
};
