
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Shirt } from "lucide-react";
import { garmentIcons } from "../orderConstants";
import { useState } from "react";

interface GarmentTypeFieldProps {
  control: any;
}

export const GarmentTypeField = ({ control }: GarmentTypeFieldProps) => {
  const [customItem, setCustomItem] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  
  return (
    <FormField
      control={control}
      name="garmentType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-white">
            <Shirt className="w-4 h-4" />
            Garment Type
          </FormLabel>
          <RadioGroup
            onValueChange={(value) => {
              if (value === "custom") {
                setShowCustomInput(true);
                if (customItem) {
                  field.onChange(customItem);
                } else {
                  field.onChange(value);
                }
              } else {
                setShowCustomInput(false);
                field.onChange(value);
                setCustomItem("");
              }
            }}
            value={field.value}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {[
              { value: "tshirt", label: "T-Shirt" },
              { value: "hoodie", label: "Hoodie" },
              { value: "custom", label: "Custom Item" },
            ].map(({ value, label }) => (
              <div key={value} className="relative">
                <RadioGroupItem
                  value={value}
                  id={value}
                  className="peer sr-only"
                />
                <label
                  htmlFor={value}
                  className={`flex flex-col items-center justify-center p-4 bg-white dark:bg-brand-navy-dark/80 border rounded-lg cursor-pointer transition-all duration-300
                    ${
                      (value === "custom" ? field.value === customItem : field.value === value)
                        ? "border-brand-yellow shadow-sm"
                        : "border-gray-200 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:border-brand-yellow"
                    }
                  `}
                >
                  {value !== "custom" ? garmentIcons[value as keyof typeof garmentIcons] : (
                    <Shirt className="w-6 h-6" />
                  )}
                  <span className="text-sm font-medium mt-2 text-gray-700 dark:text-gray-300">{label}</span>
                  {value === "custom" && showCustomInput && (
                    <Input
                      type="text"
                      placeholder="Type your item..."
                      value={customItem}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setCustomItem(e.target.value);
                        if (e.target.value) {
                          field.onChange(e.target.value);
                        }
                      }}
                      className="mt-2 w-full text-sm"
                    />
                  )}
                </label>
              </div>
            ))}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
};
