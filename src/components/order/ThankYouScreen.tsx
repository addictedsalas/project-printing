
import { motion } from "framer-motion";
import { CheckCircle, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ThankYouScreen = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-brand-yellow/20 flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-brand-yellow" />
        </motion.div>
        <h1 className="text-3xl font-bold text-brand-navy dark:text-white mb-4">
          Thank You for Your Order!
        </h1>
        <div className="space-y-4 mb-8">
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            We've received your custom apparel request and will review it shortly.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 rounded-full"
          >
            <CircleDollarSign className="w-4 h-4 text-brand-yellow" />
            <span className="text-sm font-medium text-brand-yellow">
              We will send all order details, including pricing, as soon as possible
            </span>
          </motion.div>
        </div>
        <Button
          onClick={handleReturnHome}
          variant="default"
          className="bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 transition-all duration-300"
        >
          Return to Home
        </Button>
      </motion.div>
    </div>
  );
};
