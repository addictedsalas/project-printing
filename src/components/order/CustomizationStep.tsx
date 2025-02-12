
import { MapPin, Package2, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { OrderFormValues } from "@/types/order";
import { useState } from "react";
import { DesignHelpModal } from "./DesignHelpModal";

interface CustomizationStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  isDark: boolean;
}

export const CustomizationStep = ({ form, isDark }: CustomizationStepProps) => {
  const [showDesignHelp, setShowDesignHelp] = useState(false);

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

      <FormField
        control={form.control}
        name="printLocations"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
              <MapPin className="w-5 h-5" />
              Print Locations
            </FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { value: "left-chest", label: "Left Chest", icon: "👕" },
                { value: "right-chest", label: "Right Chest", icon: "👕" },
                { value: "full-front", label: "Full Front", icon: "👕" },
                { value: "full-back", label: "Full Back", icon: "👕" },
                { value: "left-sleeve", label: "Left Sleeve", icon: "👔" },
                { value: "right-sleeve", label: "Right Sleeve", icon: "👔" },
                { value: "neck-label", label: "Neck Label", icon: "🏷️" },
                { value: "bottom-hem", label: "Bottom Hem", icon: "👕" },
                { value: "hood", label: "Hood", icon: "🧥" },
              ].map(({ value, label, icon }) => (
                <div key={value} className="relative">
                  <input
                    type="checkbox"
                    id={`location-${value}`}
                    checked={field.value?.includes(value)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const newValue = checked
                        ? [...(field.value || []), value]
                        : (field.value || []).filter((v) => v !== value);
                      field.onChange(newValue);
                    }}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`location-${value}`}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                      ${
                        field.value?.includes(value)
                          ? isDark
                            ? "border-brand-yellow bg-brand-yellow/20 text-brand-yellow shadow-lg scale-105"
                            : "border-brand-navy bg-brand-blue-light text-brand-navy shadow-lg scale-105"
                          : isDark
                            ? "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/20"
                            : "border-brand-blue hover:bg-brand-blue-light/20"
                      }
                    `}
                  >
                    <span className="text-2xl mb-2">{icon}</span>
                    <span className="text-sm font-medium text-center">{label}</span>
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              You can select multiple locations for your design
            </p>
          </FormItem>
        )}
      />

      {form.watch("printLocations").length > 0 && (
        <div className="space-y-4 mt-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-brand-navy dark:text-white">
              Upload Your Designs
            </h3>
          </div>

          <div className="grid gap-6">
            {form.watch("printLocations").map((location) => (
              <FormField
                key={location}
                control={form.control}
                name={`designs.${location}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-brand-navy dark:text-white">
                      Design for {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center p-6 border-2 border-dashed rounded-lg border-brand-blue dark:border-brand-blue/20 hover:border-brand-navy dark:hover:border-brand-yellow transition-colors">
                        {field.value ? (
                          <div className="relative w-full">
                            <img 
                              src={field.value} 
                              alt={`Design for ${location}`}
                              className="max-h-48 object-contain mx-auto"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => {
                                const newDesigns = { ...form.getValues("designs") };
                                delete newDesigns[location];
                                form.setValue("designs", newDesigns);
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center">
                            <input
                              type="file"
                              id={`design-${location}`}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    field.onChange(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <label
                              htmlFor={`design-${location}`}
                              className="cursor-pointer"
                            >
                              <div className="p-4 rounded-lg bg-brand-blue-light/20 dark:bg-brand-navy-light/20">
                                <div className="flex flex-col items-center gap-2">
                                  <Package2 className="w-8 h-8 text-brand-navy dark:text-brand-yellow" />
                                  <span className="text-sm font-medium text-brand-navy dark:text-white">
                                    Click to upload design
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (max. 2MB)
                                  </span>
                                </div>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
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
