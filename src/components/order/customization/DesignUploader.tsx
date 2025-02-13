
import { Package2 } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { UseFormReturn } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";

interface DesignUploaderProps {
  form: UseFormReturn<OrderFormValues>;
  location: string;
}

export const DesignUploader = ({ form, location }: DesignUploaderProps) => {
  return (
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
  );
};
