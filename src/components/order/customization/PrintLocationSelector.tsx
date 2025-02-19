
import { MapPin } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";

interface PrintLocationSelectorProps {
  form: UseFormReturn<OrderFormValues>;
  isDark: boolean;
}

export const PrintLocationSelector = ({ form, isDark }: PrintLocationSelectorProps) => {
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
  );
};
