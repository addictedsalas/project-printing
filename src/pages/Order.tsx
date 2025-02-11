import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Package2, Shirt, Palette, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/components/theme-provider";
import { ReviewStep } from "@/components/order/ReviewStep";
import { orderFormSchema } from "@/types/order";
import type { OrderFormValues, SizesKey, SizeColor } from "@/types/order";
import { colorStyles, materialTypeOptions } from "@/components/order/orderConstants";

const garmentIcons = {
  tshirt: <Shirt className="w-6 h-6" />,
  hoodie: <Package2 className="w-6 h-6" />,
  sweatshirt: <Shirt className="w-6 h-6 transform rotate-45" />,
  tank: <Shirt className="w-6 h-6 transform scale-x-75" />,
};

export default function Order() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [mounted, setMounted] = useState(false);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");
  const { theme } = useTheme();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      garmentType: "",
      cottonType: "",
      materialType: "cotton",
      brand: "",
      sizeType: "adult",
      sizes: {
        xsmall: [] as SizeColor[],
        small: [] as SizeColor[],
        medium: [] as SizeColor[],
        large: [] as SizeColor[],
        xlarge: [] as SizeColor[],
        xxlarge: [] as SizeColor[],
        youth_s: [] as SizeColor[],
        youth_m: [] as SizeColor[],
        youth_l: [] as SizeColor[],
      },
      printLocations: [],
      designs: {},
      fabricQuality: "",
    },
  });

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
  };

  if (!mounted) return null;

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sizes.map(({ id, label }) => (
          <FormField
            key={id}
            control={form.control}
            name={`sizes.${id}`}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">{label}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {(field.value || []).map((item: SizeColor, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index] = { ...newValue[index], quantity: e.target.value };
                            field.onChange(newValue);
                          }}
                          min="0"
                          className="h-10 border-2 border-brand-blue focus:border-brand-navy dark:bg-brand-navy/10 dark:border-brand-blue/50 dark:focus:border-brand-yellow"
                        />
                        <div>
                          <Select
                            defaultValue={item.color}
                            onValueChange={(newColor) => {
                              const newValue = [...field.value];
                              newValue[index] = { ...newValue[index], color: newColor };
                              field.onChange(newValue);
                            }}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue>
                                {item.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(colorStyles).map(([color, _]) => (
                                <SelectItem key={color} value={color}>
                                  {color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newValue = [...field.value];
                            newValue.splice(index, 1);
                            field.onChange(newValue);
                          }}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        field.onChange([...(field.value || []), { quantity: "0", color: "white" }]);
                      }}
                      className="w-full"
                    >
                      Add Color
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </div>
    );
  };

  const isDark = theme === "dark";

  const watchMaterialType = form.watch("materialType");

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 dark:bg-brand-navy-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 border-brand-blue dark:border-brand-blue/20 hover:border-brand-navy dark:hover:border-brand-yellow transition-all duration-300"
                >
                  {step === 1 && (
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
                                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                                              : "border-brand-navy bg-brand-blue-light text-brand-navy"
                                            : isDark
                                              ? "border-brand-blue/50 hover:bg-brand-navy/20"
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

                        <div className="space-y-4 bg-white/50 p-6 rounded-lg border border-brand-blue dark:bg-brand-navy-dark/50 dark:border-brand-blue/50">
                          <h3 className="text-lg font-medium text-brand-navy dark:text-white">
                            {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
                          </h3>
                          {renderSizeInputs(sizeType)}
                        </div>

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

                        <FormField
                          control={form.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy dark:text-white">
                                <Palette className="w-5 h-5" />
                                Color
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300 dark:bg-brand-navy-dark/50 dark:border-brand-blue/20 dark:hover:border-brand-yellow dark:text-white">
                                    <SelectValue placeholder="Select color">
                                      {field.value && (
                                        <div className="flex items-center gap-2">
                                          <div className={`w-4 h-4 rounded-full ${colorStyles[field.value as keyof typeof colorStyles]}`} />
                                          <span>{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                        </div>
                                      )}
                                    </SelectValue>
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue dark:bg-brand-navy-dark/80 dark:border-brand-blue/20 dark:text-white">
                                  {Object.entries(colorStyles).map(([color, bgClass]) => (
                                    <SelectItem key={color} value={color} className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded-full ${bgClass} border border-gray-200`} />
                                      <span>{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <motion.h2 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold text-brand-navy dark:text-white"
                        >
                          Customization
                        </motion.h2>
                        <p className="text-gray-600 dark:text-gray-300">Design your perfect print</p>
                      </div>

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
                                { value: "left-sleeve", label: "Left Sleeve", icon: "👔" },
                                { value: "right-sleeve", label: "Right Sleeve", icon: "👔" },
                                { value: "neck-label", label: "Neck Label", icon: "🏷️" },
                                { value: "bottom-hem", label: "Bottom Hem", icon: "👕" },
                                { value: "hood", label: "Hood", icon: "🧥" },
                              ].map(({ value, label, icon }) => (
                                <div key={value} className="relative">
                                  <input
                                    type="checkbox"
                                    id={`location-${value}`}
                                    checked={field.value?.includes(value)}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      const newValue = checked
                                        ? [...(field.value || []), value]
                                        : (field.value || []).filter((v) => v !== value);
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
                              Select multiple locations for your design
                            </p>
                          </FormItem>
                        )}
                      />

                      {form.watch("printLocations").length > 0 && (
                        <div className="space-y-4 mt-8">
                          <h3 className="text-lg font-medium text-brand-navy dark:text-white">
                            Upload Your Designs
                          </h3>
                          <div className="grid gap-6">
                            {form.watch("printLocations").map((location) => (
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
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {step === 3 && (
                    <ReviewStep form={form} />
                  )}
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between pt-6"
              >
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="px-8 bg-white dark:bg-brand-navy-dark/80 hover:bg-brand-blue-light/20 dark:hover:bg-brand-navy-light/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:text-white dark:border-brand-blue/20"
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    className="ml-auto px-8 bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="ml-auto px-8 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    Submit Order
                  </Button>
                )}
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
