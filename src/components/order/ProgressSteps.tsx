
import { motion } from "framer-motion";
import { Package2, Palette, MapPin } from "lucide-react";

interface ProgressStepsProps {
  step: number;
  totalSteps: number;
}

export const ProgressSteps = ({ step, totalSteps }: ProgressStepsProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index < totalSteps - 1 ? "flex-1" : ""
            }`}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300 group
                ${
                  step > index + 1
                    ? "bg-brand-navy border-brand-navy text-white dark:bg-brand-yellow dark:border-brand-yellow dark:text-brand-navy"
                    : step === index + 1
                    ? "bg-brand-yellow border-brand-navy text-brand-navy dark:bg-brand-yellow dark:border-brand-yellow"
                    : "bg-white/80 border-gray-200 text-gray-400 dark:bg-brand-navy-dark/50 dark:border-brand-blue/20 dark:text-gray-500"
                } hover:shadow-lg hover:-translate-y-1`}
            >
              {index === 0 && <Package2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
              {index === 1 && <Palette className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
              {index === 2 && <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
            </motion.div>
            {index < totalSteps - 1 && (
              <div className="flex-1 h-1 mx-4 bg-gray-200 dark:bg-brand-navy-dark relative rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: step > index + 1 ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-brand-navy to-brand-yellow dark:from-brand-yellow dark:to-brand-yellow/50 absolute top-0 left-0"
                ></motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm font-medium">
        <span className={`${step >= 1 ? "text-brand-navy dark:text-white" : "text-gray-400 dark:text-gray-500"} transition-colors duration-300`}>
          Product Details
        </span>
        <span className={`${step >= 2 ? "text-brand-navy dark