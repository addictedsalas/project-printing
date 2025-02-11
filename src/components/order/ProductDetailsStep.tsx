import { Shirt, Package2, Palette, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OrderFormValues, SizesKey, SizeColor } from "@/types/order";
import { materialTypeOptions, garmentIcons, colorStyles } from "./orderConstants";

interface ProductDetailsStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  isDark: boolean;
  sizeType: "adult" | "youth";
  setSizeType: (type: "adult" | "youth") => void;
}

export const ProductDetailsStep = ({ form, isDark, sizeType, setSizeType }: ProductDetailsStepProps) => {
  const watchMaterialType = form.watch("materialType");

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

  const renderSizeInputs = (type: "adult" | "youth") => {
    const sizes = type === "adult" 
      ? [
          { id: "xsmall" as SizesKey, label: "Extra Small" },
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentId: SizesKey, currentIndex: number) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        const allSizes = sizes.map(s => s.id);
        const currentSizeIndex = allSizes.indexOf(currentId);
        let nextSize: SizesKey | undefined;
        
        if (form.watch(`sizes.${currentId}`)?.length > currentIndex + 1) {
          const nextInput = document.querySelector(`input[name="sizes.${currentId}.${currentIndex + 1}.quantity"]`);
          (nextInput as HTMLElement)?.focus();
          return;
        }
        
        for (let i = currentSizeIndex + 1; i < allSizes.length; i++) {
          if (form.watch(`sizes.${allSizes[i]}`)?.length > 0) {
            nextSize = allSizes[i];
            break;
          }
        }
        
        if (!nextSize) {
          for (let i = 0; i < currentSizeIndex; i++) {
            if (form.watch(`sizes.${allSizes[i]}`)?.length > 0) {
              nextSize = allSizes[i];
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
    
    return (
      <div className="grid grid-cols-3 gap-4">
        {sizes.map(({ id, label }) => (
          <div 
            key={id} 
            className={`relative bg-white dark:bg-brand-navy-dark/80 border rounded-lg transition-all duration-300
              ${form.watch(`sizes.${id}`)?.length > 0
                ? "border-gray-200 dark:border-brand-blue/20"
                : "border-gray-200 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:border-brand-yellow"
              }
            `}
          >
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">{label}</span>
              {form.watch(`sizes.${id}`)?.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addColorToSize(id)}
                  className="h-7 px-3 text-xs border-gray-200 hover:bg-brand-yellow/5 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:bg-brand-yellow/5 dark:hover:border-brand-yellow"
                >
                  Add Color
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  {form.watch(`sizes.${id}`)?.map((sizeColor: SizeColor, index: number) => (
                    <div 
                      key={`${id}-${index}`} 
                      className="flex items-end gap-2 p-2 rounded bg-gray-50 border border-gray-100 dark:bg-brand-navy-dark/50 dark:border-brand-blue/10"
                    >
                      <FormField
                        control={form.control}
                        name={`sizes.${id}.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Qty</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  if (field.value === "0" && e.target.value !== "") {
                                    field.onChange("");
                                  } else {
                                    field.onChange(e.target.value);
                                  }
                                }}
                                onFocus={(e) => {
                                  e.target.select();
                                  if (field.value === "0") {
                                    field.onChange("");
                                  }
                                }}
                                onKeyDown={(e) => handleKeyDown(e, id, index)}
                                value={field.value?.toString()}
                                min="0"
                                className="h-7 text-xs bg-white border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`sizes.${id}.${index}.color`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Color</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-7 text-xs bg-white border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow">
                                  <SelectValue>
                                    {field.value && (
                                      <div className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${colorStyles[field.value]} border border-gray-200 dark:border-gray-700`} />
                                        <span className="truncate">{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                      </div>
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-gray-200 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                                {Object.entries(colorStyles).map(([color, bgClass]) => (
                                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${bgClass} border border-gray-200 dark:border-gray-700`} />
                                    <span>{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColorFromSize(id, index)}
                        className="h-7 w-7 px-0 mb-[2px] text-gray-400 hover:text-red-500 hover:bg-red-50 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
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
        {/* Garment Type */}
        <FormField
          control={form.control}
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

        {/* Material Type */}
        <FormField
          control={form.control}
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

        {/* Cotton Type */}
        <FormField
          control={form.control}
          name="cottonType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-medium flex items-center gap-2 text-gray-700 dark:text-white">
                <Package2 className="w-4 h-4" />
                {watchMaterialType === "cotton" ? "Cotton Type" : 
                 watchMaterialType === "5050" ? "Blend Type" : 
                 "Polyester Type"}
              </FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value || undefined}
              >
                <FormControl>
                  <SelectTrigger className="h-10 bg-white dark:bg-brand-navy-dark/80 border-gray-200 hover:border-brand-yellow focus:border-brand-yellow focus:ring-brand-yellow/20 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:focus:border-brand-yellow">
                    <SelectValue placeholder={`Select ${watchMaterialType === "cotton" ? "cotton" : watchMaterialType === "5050" ? "blend" : "polyester"} type`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white border-gray-200 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                  {materialTypeOptions[watchMaterialType as keyof typeof materialTypeOptions]?.map(({ value, label }) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="hover:bg-brand-yellow/5"
                    >
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Brand */}
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
                  <SelectItem value="gildan">Gildan Classic</SelectItem>
                  <SelectItem value="gildan-premium">Gildan Premium</SelectItem>
                  <SelectItem value="american-apparel">American Apparel</SelectItem>
                  <SelectItem value="bella-canvas">Bella + Canvas</SelectItem>
                  <SelectItem value="next-level">Next Level</SelectItem>
                  <SelectItem value="port-company">Port & Company</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Size Category */}
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

        {/* Size Inputs */}
        <div className="space-y-3">
          <FormLabel className="text-sm font-medium text-gray-700 dark:text-white">
            {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
          </FormLabel>
          <div className="bg-white dark:bg-brand-navy-dark/80 p-6 rounded-lg border border-gray-200 dark:border-brand-blue/20">
            {renderSizeInputs(sizeType)}
          </div>
        </div>
      </div>
    </div>
  );
};
