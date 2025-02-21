
import { MapPin } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";
import { useState } from "react";

interface PrintLocationSelectorProps {
  form: UseFormReturn<OrderFormValues>;
  isDark: boolean;
}

export const PrintLocationSelector = ({ form, isDark }: PrintLocationSelectorProps) => {
  const [customLocation, setCustomLocation] = useState("");

  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomLocation(e.target.value);
    
    if (e.target.value.trim()) {
      // Get current print locations
      const currentLocations = form.getValues("printLocations") || [];
      const customLocationExists = currentLocations.find(loc => loc.startsWith("custom:"));
      
      // Update print locations, replacing any existing custom location
      const newLocations = customLocationExists
        ? currentLocations.map(loc => loc.startsWith("custom:") ? `custom:${e.target.value}` : loc)
        : [...currentLocations, `custom:${e.target.value}`];
      
      // Update the form
      form.setValue("printLocations", newLocations);
    }
  };

  return (
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
              { value: "custom", label: "Custom Location", icon: "✨" },
            ].map(({ value, label, icon }) => (
              <div key={value} className="relative">
                <input
                  type="checkbox"
                  id={`location-${value}`}
                  checked={value === "custom" 
                    ? field.value?.some(loc => loc.startsWith("custom:"))
                    : field.value?.includes(value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const currentValue = field.value || [];
                    
                    if (value === "custom") {
                      if (checked) {
                        // If custom is checked and there's a value, add it
                        if (customLocation.trim()) {
                          const newValue = [...currentValue, `custom:${customLocation}`];
                          field.onChange(newValue);
                        }
                      } else {
                        // If custom is unchecked, remove any custom locations
                        const newValue = currentValue.filter(loc => !loc.startsWith("custom:"));
                        field.onChange(newValue);
                        setCustomLocation("");
                      }
                    } else {
                      // Handle regular locations
                      const newValue = checked
                        ? [...currentValue, value]
                        : currentValue.filter(v => v !== value);
                      field.onChange(newValue);
                    }
                  }}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`location-${value}`}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      (value === "custom" && field.value?.some(loc => loc.startsWith("custom:"))) ||
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

          {field.value?.some(loc => loc.startsWith("custom:")) && (
            <div className="mt-4">
              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Specify Custom Location
              </FormLabel>
              <Input
                type="text"
                placeholder="Enter custom print location..."
                value={customLocation}
                onChange={handleCustomLocationChange}
                className="mt-1"
              />
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            You can select multiple locations for your design
          </p>
        </FormItem>
      )}
    />
  );
};
