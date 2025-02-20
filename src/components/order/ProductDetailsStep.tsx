import { Shirt, Package2, Palette, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderFormValues, SizesKey, SizeColor } from "@/types/order";
import { GarmentTypeField } from "./product-details/GarmentTypeField";
import { SizeCard } from "./product-details/SizeCard";

interface ProductDetailsStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  isDark: boolean;
  sizeType: "adult" | "youth";
  setSizeType: (type: "adult" | "youth") => void;
}

export const ProductDetailsStep = ({ form, isDark, sizeType, setSizeType }: ProductDetailsStepProps) => {
  const garmentType = form.watch("garmentType");
  const isStandardGarment = garmentType === "tshirt" || garmentType === "hoodie";

  const addColorToSize = (size: string) => {
    const currentSizes = form.getValues("sizes");
    const currentSizeColors = currentSizes[size] || [];
    
    form.setValue(`sizes.${size}`, [
      ...currentSizeColors,
      { quantity: "0", color: "white" }
    ]);
  };

  const removeColorFromSize = (size: string, index: number) => {
    const currentSizes = form.getValues("sizes");
    const currentSizeColors = [...(currentSizes[size] || [])];
    currentSizeColors.splice(index, 1);
    form.setValue(`sizes.${size}`, currentSizeColors);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentId: SizesKey, currentIndex: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      const sizes = sizeType === "adult" 
        ? ["xsmall", "small", "medium", "large", "xlarge", "xxlarge"]
        : ["youth_s", "youth_m", "youth_l"];
      
      const currentSizeIndex = sizes.indexOf(currentId);
      let nextSize: SizesKey | undefined;
      
      if (form.watch(`sizes.${currentId}`)?.length > currentIndex + 1) {
        const nextInput = document.querySelector(`input[name="sizes.${currentId}.${currentIndex + 1}.quantity"]`);
        (nextInput as HTMLElement)?.focus();
        return;
      }
      
      for (let i = currentSizeIndex + 1; i < sizes.length; i++) {
        if (form.watch(`sizes.${sizes[i]}`)?.length > 0) {
          nextSize = sizes[i] as SizesKey;
          break;
        }
      }
      
      if (!nextSize) {
        for (let i = 0; i < currentSizeIndex; i++) {
          if (form.watch(`sizes.${sizes[i]}`)?.length > 0) {
            nextSize = sizes[i] as SizesKey;
            break;
          }
        }
      }
      
      if (nextSize) {
        const nextInput = document.querySelector(`input[name="sizes.${nextSize}.0.quantity"]`);
        (nextInput as HTMLElement)?.focus();
      }
    }
  };

  const renderSizeInputs = (type: "adult" | "youth") => {
    const sizes = type === "adult" 
      ? [
          { id: "xsmall" as SizesKey, label: "X-Small" },
          { id: "small" as SizesKey, label: "Small" },
          { id: "medium" as SizesKey, label: "Medium" },
          { id: "large" as SizesKey, label: "Large" },
          { id: "xlarge" as SizesKey, label: "X-Large" },
          { id: "xxlarge" as SizesKey, label: "2X-Large" }
        ]
      : [
          { id: "youth_s" as SizesKey, label: "Youth Small" },
          { id: "youth_m" as SizesKey, label: "Youth Medium" },
          { id: "youth_l" as SizesKey, label: "Youth Large" }
        ];

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
        {sizes.map(({ id, label }) => (
          <SizeCard
            key={id}
            id={id}
            label={label}
            control={form.control}
            sizeColors={form.watch(`sizes.${id}`) || []}
            onAddColor={addColorToSize}
            onRemoveColor={removeColorFromSize}
            onKeyDown={handleKeyDown}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <span className="text-sm font-medium text-brand-yellow">Design Your Custom Apparel</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white"
        >
          Product Details
        </motion.h2>
        <p className="text-gray-500 dark:text-gray-400">Customize your perfect design</p>
      </div>

      <div className="grid gap-8">
        <GarmentTypeField control={form.control} />

        {/* Material Type - Only show for standard garments */}
        {isStandardGarment && (
          <FormField
            control={form.control}
            name="cottonType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-white">
                  <Package2 className="w-4 h-4" />
                  Material
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger className="h-10 bg-white dark:bg-brand-navy-dark/80 border-gray-200 hover:border-brand-yellow focus:border-brand-yellow focus:ring-brand-yellow/20 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:focus:border-brand-yellow">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                    <SelectItem value="standard">100% Cotton</SelectItem>
                    <SelectItem value="moisture-wicking">100% Polyester (Moisture Wicking)</SelectItem>
                    <SelectItem value="performance">100% Polyester (Performance)</SelectItem>
                    <SelectItem value="micro">100% Polyester (Micro)</SelectItem>
                    <SelectItem value="blend">Cotton/Poly Blend</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}

        {/* Brand - Only show for standard garments */}
        {isStandardGarment && (
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-white">
                  <Shirt className="w-4 h-4" />
                  Brand
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-10 bg-white dark:bg-brand-navy-dark/80 border-gray-200 hover:border-brand-yellow focus:border-brand-yellow focus:ring-brand-yellow/20 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:focus:border-brand-yellow">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white border-gray-200 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                    <SelectItem value="port-company">Port & Company</SelectItem>
                    <SelectItem value="gildan">Gildan</SelectItem>
                    <SelectItem value="bella-canvas">BELLA+CANVAS</SelectItem>
                    <SelectItem value="hanes">Hanes</SelectItem>
                    <SelectItem value="next-level">Next Level Apparel</SelectItem>
                    <SelectItem value="champion">Champion</SelectItem>
                    <SelectItem value="comfort-colors">Comfort Colors</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        )}

        {/* Size Category - Only show for standard garments */}
        {isStandardGarment && (
          <FormField
            control={form.control}
            name="sizeType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-medium text-gray-700 dark:text-white">Size Category</FormLabel>
                <RadioGroup
                  onValueChange={(value: "adult" | "youth") => {
                    field.onChange(value);
                    setSizeType(value);
                  }}
                  defaultValue={field.value}
                  className="flex gap-3"
                >
                  {[
                    { value: "adult", label: "Adult Sizes" },
                    { value: "youth", label: "Youth Sizes" },
                  ].map(({ value, label }) => (
                    <div key={value} className="relative">
                      <RadioGroupItem
                        value={value}
                        id={`size-${value}`}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor={`size-${value}`}
                        className={`flex items-center justify-center px-4 py-2 bg-white dark:bg-brand-navy-dark/80 border rounded-lg cursor-pointer transition-all duration-300
                          ${
                            field.value === value
                              ? "border-brand-yellow shadow-sm"
                              : "border-gray-200 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:border-brand-yellow"
                          }
                        `}
                      >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormItem>
            )}
          />
        )}

        {/* Size Inputs - Only show for standard garments */}
        {isStandardGarment && (
          <div className="space-y-3">
            <FormLabel className="text-sm font-medium text-gray-700 dark:text-white">
              {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
            </FormLabel>
            <div className="bg-white dark:bg-brand-navy-dark/80 p-6 rounded-lg border border-gray-200 dark:border-brand-blue/20">
              {renderSizeInputs(sizeType)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
