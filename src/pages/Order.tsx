import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Package2, Shirt, Palette, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const orderFormSchema = z.object({
  quantity: z.string(),
  garmentType: z.string(),
  color: z.string(),
  cottonType: z.string(),
  brand: z.string(),
  sizeType: z.enum(["adult", "youth"]),
  sizes: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string(),
    xlarge: z.string(),
    youth_s: z.string(),
    youth_m: z.string(),
    youth_l: z.string(),
  }),
  printLocation: z.string(),
  fabricQuality: z.string(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function Order() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [mounted, setMounted] = useState(false);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      quantity: "",
      garmentType: "",
      color: "",
      cottonType: "",
      brand: "",
      sizeType: "adult",
      sizes: {
        small: "0",
        medium: "0",
        large: "0",
        xlarge: "0",
        youth_s: "0",
        youth_m: "0",
        youth_l: "0",
      },
      printLocation: "",
      fabricQuality: "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
  };

  if (!mounted) return null;

  const renderSizeInputs = (type: "adult" | "youth") => {
    const sizes = type === "adult" 
      ? [
          { id: "small", label: "Small" },
          { id: "medium", label: "Medium" },
          { id: "large", label: "Large" },
          { id: "xlarge", label: "X-Large" }
        ]
      : [
          { id: "youth_s", label: "Youth Small" },
          { id: "youth_m", label: "Youth Medium" },
          { id: "youth_l", label: "Youth Large" }
        ];
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sizes.map(({ id, label }) => (
          <FormField
            key={id}
            control={form.control}
            name={`sizes.${id}` as const}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium">{label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    min="0"
                    className="h-10 border-2 border-brand-blue focus:border-brand-navy"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-blue-light via-white to-brand-yellow-light">
      <div className="geometric-pattern opacity-5"></div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-between mb-4">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index < totalSteps - 1 ? "flex-1" : ""
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-all duration-300 group
                      ${
                        step > index + 1
                          ? "bg-brand-navy border-brand-navy text-white"
                          : step === index + 1
                          ? "bg-brand-yellow border-brand-navy text-brand-navy"
                          : "bg-white border-gray-200 text-gray-400"
                      } hover:shadow-lg hover:-translate-y-1`}
                  >
                    {index === 0 && <Package2 className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 1 && <Palette className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
                    {index === 2 && <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />}
                  </motion.div>
                  {index < totalSteps - 1 && (
                    <div className="flex-1 h-1 mx-4 bg-gray-200 relative rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step > index + 1 ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-brand-navy to-brand-yellow absolute top-0 left-0"
                      ></motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className={`${step >= 1 ? "text-brand-navy" : "text-gray-400"} transition-colors duration-300`}>
                Product Details
              </span>
              <span className={`${step >= 2 ? "text-brand-navy" : "text-gray-400"} transition-colors duration-300`}>
                Customization
              </span>
              <span className={`${step >= 3 ? "text-brand-navy" : "text-gray-400"} transition-colors duration-300`}>
                Review & Submit
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-br from-white/90 to-brand-yellow-light/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 border-brand-blue hover:border-brand-navy transition-all duration-300"
                >
                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="text-center mb-8">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-light rounded-full mb-4"
                        >
                          <Sparkles className="w-4 h-4 text-brand-navy" />
                          <span className="text-sm font-medium text-brand-navy">Design Your Custom Apparel</span>
                        </motion.div>
                        <motion.h2 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold mb-2 text-brand-navy"
                        >
                          Product Details
                        </motion.h2>
                        <p className="text-gray-600">Customize your perfect design</p>
                      </div>

                      <div className="grid gap-8">
                        <FormField
                          control={form.control}
                          name="garmentType"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy">
                                <Shirt className="w-5 h-5" />
                                Garment Type
                              </FormLabel>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
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
                                      className="flex flex-col items-center justify-center p-4 border-2 border-brand-blue rounded-lg cursor-pointer hover:bg-brand-blue-light/20 peer-checked:border-brand-navy peer-checked:bg-brand-blue-light/40 transition-all duration-300"
                                    >
                                      <Shirt className="w-6 h-6 mb-2" />
                                      <span className="text-sm font-medium">{label}</span>
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
                              <FormLabel className="text-lg font-medium text-brand-navy">Size Category</FormLabel>
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
                                      className="flex items-center justify-center px-6 py-3 border-2 border-brand-blue rounded-lg cursor-pointer hover:bg-brand-blue-light/20 peer-checked:border-brand-navy peer-checked:bg-brand-blue-light/40 transition-all duration-300"
                                    >
                                      <span className="text-sm font-medium">{label}</span>
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4 bg-white/50 p-6 rounded-lg border border-brand-blue">
                          <h3 className="text-lg font-medium text-brand-navy">
                            {sizeType === "adult" ? "Adult Sizes" : "Youth Sizes"}
                          </h3>
                          {renderSizeInputs(sizeType)}
                        </div>

                        <FormField
                          control={form.control}
                          name="cottonType"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy">
                                <Package2 className="w-5 h-5" />
                                Cotton Type
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300">
                                    <SelectValue placeholder="Select cotton type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue">
                                  <SelectItem value="basic">Basic Cotton</SelectItem>
                                  <SelectItem value="premium">Premium Cotton</SelectItem>
                                  <SelectItem value="organic">Organic Cotton</SelectItem>
                                  <SelectItem value="ringspun">Ring-Spun Cotton</SelectItem>
                                  <SelectItem value="combed">Combed Cotton</SelectItem>
                                  <SelectItem value="pima">Pima Cotton</SelectItem>
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
                              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy">
                                <Shirt className="w-5 h-5" />
                                Brand
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300">
                                    <SelectValue placeholder="Select brand" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue">
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
                              <FormLabel className="text-lg font-medium flex items-center gap-2 text-brand-navy">
                                <Palette className="w-5 h-5" />
                                Color
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-brand-blue hover:border-brand-navy hover:shadow-lg transition-all duration-300">
                                    <SelectValue placeholder="Select color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white/95 backdrop-blur-sm border-brand-blue">
                                  <SelectItem value="white">White</SelectItem>
                                  <SelectItem value="black">Black</SelectItem>
                                  <SelectItem value="navy">Navy</SelectItem>
                                  <SelectItem value="heather-gray">Heather Gray</SelectItem>
                                  <SelectItem value="sport-gray">Sport Gray</SelectItem>
                                  <SelectItem value="royal-blue">Royal Blue</SelectItem>
                                  <SelectItem value="dark-heather">Dark Heather</SelectItem>
                                  <SelectItem value="military-green">Military Green</SelectItem>
                                  <SelectItem value="maroon">Maroon</SelectItem>
                                  <SelectItem value="red">Red</SelectItem>
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
                          className="text-3xl font-bold text-brand-navy mb-2"
                        >
                          Customization
                        </motion.h2>
                        <p className="text-gray-600">Design your perfect print</p>
                      </div>

                      <FormField
                        control={form.control}
                        name="printLocation"
                        render={({ field }) => (
                          <FormItem className="space-y-4 hover:-translate-y-1 transition-all duration-300">
                            <FormLabel className="text-lg font-medium flex items-center gap-2">
                              <MapPin className="w-5 h-5" />
                              Print Location
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white/90 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                                  <SelectValue placeholder="Select print location" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="front">Front</SelectItem>
                                <SelectItem value="back">Back</SelectItem>
                                <SelectItem value="both">Front & Back</SelectItem>
                                <SelectItem value="sleeve">Sleeve</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <motion.h2 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-3xl font-bold text-brand-navy mb-2"
                        >
                          Review & Submit
                        </motion.h2>
                        <p className="text-gray-600">Almost there! Review your order details</p>
                      </div>
                      {/* Add order summary here */}
                    </div>
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
                    className="px-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    className="ml-auto px-8 bg-brand-navy hover:bg-brand-navy/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
