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
    
    return (
      <div className="flex flex-col divide-y divide-brand-blue/10 dark:divide-brand-blue/20">
        {sizes.map(({ id, label }) => (
          <div key={id} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-brand-navy dark:text-white">{label}</span>
              {form.watch(`sizes.${id}`)?.length === 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addColorToSize(id)}
                  className="h-7 px-3 text-xs bg-brand-blue/10 hover:bg-brand-blue/20 dark:bg-brand-yellow/10 dark:hover:bg-brand-yellow/20"
                >
                  Add Color
                </Button>
              )}
            </div>
            <div className="space-y-2 mt-2">
              {form.watch(`sizes.${id}`)?.map((sizeColor: SizeColor, index: number) => (
                <div 
                  key={`${id}-${index}`} 
                  className="flex items-end gap-2 p-2 rounded-lg bg-white/50 dark:bg-brand-navy/50 border border-brand-blue/20 dark:border-brand-blue/10"
                >
                  <FormField
                    control={form.control}
                    name={`sizes.${id}.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-xs font-medium text-gray-600 dark:text-gray-300">Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value?.toString() || "0"}
                            min="0"
                            className="h-8 text-sm border border-brand-blue/30 focus:border-brand-navy dark:bg-brand-navy/20 dark:border-brand-blue/30 dark:focus:border-brand-yellow"
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
                        <FormLabel className="text-xs font-medium text-gray-600 dark:text-gray-300">Color</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-8 text-sm border border-brand-blue/30 focus:border-brand-navy dark:bg-brand-navy/20 dark:border-brand-blue/30 dark:focus:border-brand-yellow">
                              <SelectValue>
                                {field.value && (
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${colorStyles[field.value]} border border-gray-200`} />
                                    <span>{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                  </div>
                                )}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(colorStyles).map(([color, bgClass]) => (
                              <SelectItem key={color} value={color} className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${bgClass} border border-gray-200`} />
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
                    className="h-8 w-8 px-0 mb-[2px] hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                  >
                    ✕
                  </Button>
                </div>
              ))}
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
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-light dark:bg-brand-yellow/20 rounded-full mb-4"
        >
          <Sparkles className="w-4 h-4 text-brand-navy dark:text-brand-yellow" />
          <span className="text-sm font-medium text-brand-navy dark:text-brand-yellow">Design Your Custom Apparel</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 text-brand-navy dark:text-white"
        >
          Product Details
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300">Customize your perfect design</p>
      </div>

      <div className="grid gap-8">
        {/* Garment Type */}
        <FormField
          control={form.control}
          name="garmentType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
                <Shirt className="w-5 h-5" />
                Garment Type
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
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
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? isDark
                              ? "border-brand-yellow bg-brand-yellow/20 text-brand-yellow shadow-lg scale-105"
                              : "border-brand-navy bg-brand-blue-light text-brand-navy shadow-lg scale-105"
                            : isDark
                              ? "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/20"
                              : "border-brand-blue hover:bg-brand-blue-light/20"
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
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
                <Package2 className="w-5 h-5" />
                Material Type
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-3 gap-4"
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
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? isDark
                              ? "border-brand-yellow bg-brand-yellow/20 text-brand-yellow shadow-lg scale-105"
                              : "border-brand-navy bg-brand-blue-light text-brand-navy shadow-lg scale-105"
                            : isDark
                              ? "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/20"
                              : "border-brand-blue hover:bg-brand-blue-light/20"
                        }
                      `}
                    >
                      <div className={`w-8 h-8 rounded-full mb-2 ${bgColor} border-2 ${
                        field.value === value 
                          ? isDark 
                            ? "border-brand-yellow" 
                            : "border-brand-navy"
                          : "border-gray-200 dark:border-gray-600"
                      }`} />
                      <span className={`text-sm font-medium ${
                        field.value === value
                          ? "scale-105 font-semibold"
                          : ""
                      }`}>{label}</span>
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
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
                <Package2 className="w-5 h-5" />
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
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300 dark:bg-brand-navy-dark/50 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:text-white">
                    <SelectValue placeholder={`Select ${watchMaterialType === "cotton" ? "cotton" : watchMaterialType === "5050" ? "blend" : "polyester"} type`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue dark:bg-brand-navy-dark/80 dark:border-brand-blue/20 dark:text-white">
                  {materialTypeOptions[watchMaterialType as keyof typeof materialTypeOptions]?.map(({ value, label }) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="dark:text-white hover:bg-brand-blue-light/20 dark:hover:bg-brand-yellow/20"
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
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
                <Shirt className="w-5 h-5" />
                Brand
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300 dark:bg-brand-navy-dark/50 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:text-white">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue dark:bg-brand-navy-dark/80 dark:border-brand-blue/20 dark:text-white">
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
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-medium text-brand-navy dark:text-white">Size Category</FormLabel>
              <RadioGroup
                onValueChange={(value: "adult" | "youth") => {
                  field.onChange(value);
                  setSizeType(value);
                }}
                defaultValue={field.value}
                className="flex gap-4"
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
                      className={`flex items-center justify-center px-6 py-3 border-2 rounded-lg cursor-pointer transition-all duration-300
                        ${
                          field.value === value
                            ? isDark
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow shadow-lg scale-105"
                              : "border-brand-navy bg-brand-blue-light text-brand-navy shadow-lg scale-105"
                            : isDark
                              ? "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/20"
                              : "border-brand-blue hover:bg-brand-blue-light/20"
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
        <div className="space-y-4 bg-brand-navy dark:bg-brand-navy-dark p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
            </h3>
            <FormField
              control={form.control}
              name="sizeType"
              render={({ field }) => (
                <FormItem>
                  <RadioGroup
                    onValueChange={(value: "adult" | "youth") => {
                      field.onChange(value);
                      setSizeType(value);
                    }}
                    defaultValue={field.value}
                    className="flex gap-2"
                  >
                    {[
                      { value: "adult", label: "Adult" },
                      { value: "youth", label: "Youth" },
                    ].map(({ value, label }) => (
                      <div key={value} className="relative">
                        <RadioGroupItem
                          value={value}
                          id={`size-${value}`}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={`size-${value}`}
                          className={`flex items-center justify-center px-3 py-1.5 text-xs border rounded-lg cursor-pointer transition-all duration-300
                            ${
                              field.value === value
                                ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                                : "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/20"
                            }
                          `}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>
          {renderSizeInputs(sizeType)}
        </div>
      </div>
    </div>
  );
};
