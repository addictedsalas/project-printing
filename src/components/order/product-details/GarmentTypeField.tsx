
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shirt } from "lucide-react";
import { garmentIcons } from "../orderConstants";

interface GarmentTypeFieldProps {
  control: any;
}

export const GarmentTypeField = ({ control }: GarmentTypeFieldProps) => {
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
            onValueChange={field.onChange}
            value={field.value}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[
              { value: "tshirt", label: "T-Shirt" },
              { value: "hoodie", label: "Hoodie" },
              { value: "sweatshirt", label: "Sweatshirt" },
              { value: "tank", label: "Tank Top" },
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
                      field.value === value
                        ? "border-brand-yellow shadow-sm"
                        : "border-gray-200 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:border-brand-yellow"
                    }
                  `}
                >
                  {garmentIcons[value as keyof typeof garmentIcons]}
                  <span className="text-sm font-medium mt-2 text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
};
