
import { MapPin, Sparkles } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";
import { useState, useEffect } from "react";

interface PrintLocationSelectorProps {
  form: UseFormReturn<OrderFormValues>;
  isDark: boolean;
}

export const PrintLocationSelector = ({ form, isDark }: PrintLocationSelectorProps) => {
  const [customLocation, setCustomLocation] = useState("");

  // Effect to initialize custom location from form data
  useEffect(() => {
    const printLocations = form.getValues("printLocations") || [];
    const customLoc = printLocations.find(loc => loc.startsWith("custom:"));
    if (customLoc) {
      setCustomLocation(customLoc.replace("custom:", ""));
    }
  }, [form]);

  const handleLocationChange = (value: string, checked: boolean) => {
    const currentLocations = form.getValues("printLocations") || [];
    
    if (value === "custom") {
      if (checked) {
        // Show input field immediately even if empty
        const newLocations = [...currentLocations];
        if (!newLocations.some(loc => loc.startsWith("custom:"))) {
          newLocations.push(`custom:`);
        }
        form.setValue("printLocations", newLocations);
      } else {
        // Remove custom location
        form.setValue(
          "printLocations", 
          currentLocations.filter(loc => !loc.startsWith("custom:"))
        );
        setCustomLocation("");
      }
    } else {
      // Handle regular locations
      const newLocations = checked
        ? [...currentLocations, value]
        : currentLocations.filter(v => v !== value);
      form.setValue("printLocations", newLocations);
    }
  };

  const handleCustomLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomLocation(value);
    
    const currentLocations = form.getValues("printLocations") || [];
    const newLocations = currentLocations.map(loc => 
      loc.startsWith("custom:") ? `custom:${value}` : loc
    );
    form.setValue("printLocations", newLocations);
  };

  const printLocations = form.watch("printLocations") || [];
  const hasCustomLocation = printLocations.some(loc => loc.startsWith("custom:"));

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
                  checked={value === "custom" ? hasCustomLocation : printLocations.includes(value)}
                  onChange={(e) => handleLocationChange(value, e.target.checked)}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`location-${value}`}
                  className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                    ${
                      (value === "custom" && hasCustomLocation) ||
                      printLocations.includes(value)
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

          {hasCustomLocation && (
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
