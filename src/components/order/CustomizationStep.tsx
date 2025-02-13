
import { Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OrderFormValues } from "@/types/order";
import { useState, useEffect } from "react";
import { DesignHelpModal } from "./DesignHelpModal";
import { PrintLocationSelector } from "./customization/PrintLocationSelector";
import { DesignUploader } from "./customization/DesignUploader";

interface CustomizationStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  isDark: boolean;
}

export const CustomizationStep = ({ form, isDark }: CustomizationStepProps) => {
  const [showDesignHelp, setShowDesignHelp] = useState(false);
  const printLocations = form.watch("printLocations");

  // Effect to clean up designs when locations are removed
  useEffect(() => {
    const currentDesigns = form.getValues("designs");
    const newDesigns = { ...currentDesigns };
    
    // Remove designs for locations that are no longer selected
    Object.keys(newDesigns).forEach(location => {
      if (!printLocations.includes(location)) {
        delete newDesigns[location];
      }
    });

    form.setValue("designs", newDesigns);
  }, [printLocations, form]);

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-brand-navy dark:text-white mb-2"
        >
          Customization
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Design your perfect print</p>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowDesignHelp(true)}
          className="flex items-center gap-2 py-2 px-4 bg-white/50 dark:bg-brand-navy-dark/50 border-2 border-brand-blue/20 dark:border-brand-yellow/20 hover:border-brand-navy dark:hover:border-brand-yellow transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Wand2 className="w-5 h-5 text-brand-navy dark:text-brand-yellow" />
          <span className="text-brand-navy dark:text-white">I need help with my design</span>
        </Button>
      </div>

      <PrintLocationSelector form={form} isDark={isDark} />

      {printLocations.length > 0 && (
        <div className="space-y-4 mt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-brand-navy dark:text-white">
              Upload Your Designs
            </h3>
          </div>

          <div className="grid gap-6">
            {printLocations.map((location) => (
              <DesignUploader 
                key={location}
                form={form}
                location={location}
              />
            ))}
          </div>
        </div>
      )}

      <DesignHelpModal 
        isOpen={showDesignHelp}
        onClose={() => setShowDesignHelp(false)}
      />
    </div>
  );
};
