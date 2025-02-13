
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";

interface MaterialTypeFieldProps {
  control: any;
}

export const MaterialTypeField = ({ control }: MaterialTypeFieldProps) => {
  const { watch } = useFormContext<OrderFormValues>();
  const garmentType = watch("garmentType");

  // Only show for tshirt or hoodie
  if (garmentType !== "tshirt" && garmentType !== "hoodie") {
    return null;
  }

  return (
    <FormField
      control={control}
      name="materialType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-white">
            <Package2 className="w-4 h-4" />
            Material Type
          </FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { value: "cotton", label: "100% Cotton", bgColor: "bg-[#FEF7CD]" },
              { value: "5050", label: "50/50 Blend", bgColor: "bg-[#FEC6A1]" },
              { value: "polyester", label: "100% Polyester", bgColor: "bg-[#D3E4FD]" },
            ].map(({ value, label, bgColor }) => (
              <div key={value} className="relative">
                <RadioGroupItem
                  value={value}
                  id={`material-${value}`}
                  className="peer sr-only"
                />
                <label
                  htmlFor={`material-${value}`}
                  className={`flex flex-col items-center justify-center p-4 bg-white dark:bg-brand-navy-dark/80 border rounded-lg cursor-pointer transition-all duration-300
                    ${
                      field.value === value
                        ? "border-brand-yellow shadow-sm"
                        : "border-gray-200 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:border-brand-yellow"
                    }
                  `}
                >
                  <div className={`w-6 h-6 rounded-full mb-2 ${bgColor} border ${
                    field.value === value 
                      ? "border-brand-yellow" 
                      : "border-gray-300 dark:border-gray-600"
                  }`} />
                  <span className="text-sm font-medium text-center text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </FormItem>
      )}
    />
  );
};
