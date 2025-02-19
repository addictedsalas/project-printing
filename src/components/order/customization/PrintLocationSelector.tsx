
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
    // Update the designs record to include the custom location description
    const currentDesigns = form.getValues("designs");
    form.setValue("designs", {
      ...currentDesigns,
      custom: `Custom Location: ${e.target.value}`,
    });
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
                  checked={field.value?.includes(value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const currentValue = field.value || [];
                    const newValue = checked
                      ? [...currentValue, value]
                      : currentValue.filter((v) => v !== value);
                    field.onChange(newValue);
                    
                    // Reset custom location when unchecking
                    if (value === "custom" && !checked) {
                      setCustomLocation("");
                      const currentDesigns = form.getValues("designs");
                      delete currentDesigns.custom;
                      form.setValue("designs", currentDesigns);
                    }
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

          {field.value?.includes("custom") && (
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
