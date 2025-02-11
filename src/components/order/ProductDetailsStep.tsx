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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentId: string, currentIndex: number) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        
        // Find the next available size input
        const allSizes = sizes.map(s => s.id);
        const currentSizeIndex = allSizes.indexOf(currentId);
        let nextSize: string | undefined;
        
        // Check if there's another color in the current size
        if (form.watch(`sizes.${currentId}`)?.length > currentIndex + 1) {
          // Focus next color input in the same size
          const nextInput = document.querySelector(`input[name="sizes.${currentId}.${currentIndex + 1}.quantity"]`);
          (nextInput as HTMLElement)?.focus();
          return;
        }
        
        // Find the next size that has color inputs
        for (let i = currentSizeIndex + 1; i < allSizes.length; i++) {
          if (form.watch(`sizes.${allSizes[i]}`)?.length > 0) {
            nextSize = allSizes[i];
            break;
          }
        }
        
        // If no next size found, loop back to the first size
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
      <div className="grid grid-cols-3 gap-3">
        {sizes.map(({ id, label }) => (
          <div 
            key={id} 
            className={`relative group border rounded-lg transition-all duration-300
              ${form.watch(`sizes.${id}`)?.length > 0
                ? "border-brand-yellow bg-brand-yellow/5"
                : "border-brand-blue/10 hover:border-brand-yellow/30"
              }
            `}
          >
            <div className="flex flex-col items-center text-center p-3">
              <span className={`text-sm font-medium mb-1 ${
                form.watch(`sizes.${id}`)?.length > 0
                  ? "text-brand-yellow"
                  : "text-gray-400"
              }`}>{label}</span>
              {form.watch(`sizes.${id}`)?.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addColorToSize(id)}
                  className="h-6 px-2 text-xs border-brand-blue/20 hover:bg-brand-yellow/5 hover:border-brand-yellow/30"
                >
                  Add Color
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  {form.watch(`sizes.${id}`)?.map((sizeColor: SizeColor, index: number) => (
                    <div 
                      key={`${id}-${index}`} 
                      className="flex items-end gap-2 p-2 rounded bg-brand-navy-dark/50 border border-brand-blue/10"
                    >
                      <FormField
                        control={form.control}
                        name={`sizes.${id}.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-[10px] font-medium text-gray-400">Qty</FormLabel>
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
                                className="h-7 text-xs bg-brand-navy-dark border-brand-blue/20 focus:border-brand-yellow/50"
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
                            <FormLabel className="text-[10px] font-medium text-gray-400">Color</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-7 text-xs bg-brand-navy-dark border-brand-blue/20 focus:border-brand-yellow/50">
                                  <SelectValue>
                                    {field.value && (
                                      <div className="flex items-center gap-1.5">
                                        <div className={`w-2.5 h-2.5 rounded-full ${colorStyles[field.value]} border border-gray-700`} />
                                        <span className="truncate">{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                      </div>
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-brand-navy-dark border-brand-blue/20">
                                {Object.entries(colorStyles).map(([color, bgClass]) => (
                                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-full ${bgClass} border border-gray-700`} />
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
                        className="h-7 w-7 px-0 mb-[2px] hover:bg-red-900/20 hover:text-red-400"
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/20 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-brand-yellow" />
          <span className="text-sm font-medium text-brand-yellow">Design Your Custom Apparel</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 text-white"
        >
          Product Details
        </motion.h2>
        <p className="text-gray-400">Customize your perfect design</p>
      </div>

      <div className="grid gap-8">
        {/* Garment Type */}
        <FormField
          control={form.control}
          name="garmentType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium flex items-center gap-2 text-white">
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
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                            : "border-brand-blue/10 text-gray-400 hover:border-brand-yellow/30 hover:bg-brand-yellow/5"
                        }
                      `}
                    >
                      {garmentIcons[value as keyof typeof garmentIcons]}
                      <span className="text-sm font-medium mt-2">{label}</span>
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
              <FormLabel className="text-base font-medium flex items-center gap-2 text-white">
                <Package2 className="w-4 h-4" />
                Material Type
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-3 gap-3"
              >
                {[
                  { value: "cotton", label: "100% Cotton", bgColor: "bg-[#F2FCE2]" },
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
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                            : "border-brand-blue/10 text-gray-400 hover:border-brand-yellow/30 hover:bg-brand-yellow/5"
                        }
                      `}
                    >
                      <div className={`w-6 h-6 rounded-full mb-2 ${bgColor} border-2 ${
                        field.value === value 
                          ? "border-brand-yellow" 
                          : "border-gray-600"
                      }`} />
                      <span className="text-sm font-medium text-center">{label}</span>
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
              <FormLabel className="text-base font-medium flex items-center gap-2 text-white">
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
                  <SelectTrigger className="h-10 bg-brand-navy-dark border-brand-blue/20 hover:border-brand-yellow/30 focus:border-brand-yellow/50">
                    <SelectValue placeholder={`Select ${watchMaterialType === "cotton" ? "cotton" : watchMaterialType === "5050" ? "blend" : "polyester"} type`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-brand-navy-dark border-brand-blue/20">
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
              <FormLabel className="text-base font-medium flex items-center gap-2 text-white">
                <Shirt className="w-4 h-4" />
                Brand
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-10 bg-brand-navy-dark border-brand-blue/20 hover:border-brand-yellow/30 focus:border-brand-yellow/50">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-brand-navy-dark border-brand-blue/20">
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
              <FormLabel className="text-base font-medium text-white">Size Category</FormLabel>
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
                      className={`flex items-center justify-center px-4 py-2 border rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? "border-brand-yellow bg-brand-yellow/5 text-brand-yellow"
                            : "border-brand-blue/10 text-gray-400 hover:border-brand-yellow/30 hover:bg-brand-yellow/5"
                        }
                      `}
                    >
                      <span className="text-sm font-medium">{label}</span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </FormItem>
          )}
        />

        {/* Size Inputs */}
        <div className="space-y-3">
          <FormLabel className="text-base font-medium text-white">
            {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
          </FormLabel>
          <div className="bg-brand-navy-dark p-4 rounded-lg border border-brand-blue/10">
            {renderSizeInputs(sizeType)}
          </div>
        </div>
      </div>
    </div>
  );
};
