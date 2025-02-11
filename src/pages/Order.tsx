
import { useState, useEffect } from "react";
import { MapPin, Package2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { ReviewStep } from "@/components/order/ReviewStep";
import { ThankYouScreen } from "@/components/order/ThankYouScreen";
import { ProductDetailsStep } from "@/components/order/ProductDetailsStep";
import { orderFormSchema } from "@/types/order";
import type { OrderFormValues } from "@/types/order";

export default function Order() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [mounted, setMounted] = useState(false);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        xsmall: [],
        small: [],
        medium: [],
        large: [],
        xlarge: [],
        xxlarge: [],
        youth_s: [],
        youth_m: [],
        youth_l: [],
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
    setIsSubmitted(true);
  };

  if (!mounted) return null;
  if (isSubmitted) return <ThankYouScreen />;

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
                  className="glass-card"
                >
                  {step === 1 && (
                    <ProductDetailsStep 
                      form={form}
                      isDark={theme === "dark"}
                      sizeType={sizeType}
                      setSizeType={setSizeType}
                    />
                  )}

                  {step === 2 && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <motion.h2 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-4xl font-bold text-brand-navy dark:text-white mb-3"
                        >
                          Customization
                        </motion.h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                          Design your perfect print
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="printLocations"
                        render={({ field }) => (
                          <FormItem className="space-y-6">
                            <FormLabel className="text-xl font-semibold flex items-center gap-3 text-brand-navy dark:text-white">
                              <MapPin className="w-6 h-6" />
                              Print Locations
                            </FormLabel>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
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
                                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
                                      ${
                                        field.value?.includes(value)
                                          ? theme === "dark"
                                            ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow shadow-xl"
                                            : "border-brand-navy bg-brand-blue-light/20 text-brand-navy shadow-xl"
                                          : theme === "dark"
                                            ? "border-brand-blue/20 text-gray-300 hover:bg-brand-navy-light/10"
                                            : "border-brand-blue/40 hover:bg-brand-blue-light/10"
                                      }
                                    `}
                                  >
                                    <span className="text-3xl mb-3 transition-transform duration-300 transform hover:scale-110">{icon}</span>
                                    <span className="text-sm font-medium text-center">{label}</span>
                                  </label>
                                </div>
                              ))}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center italic">
                              Select multiple locations for your design
                            </p>
                          </FormItem>
                        )}
                      />

                      {form.watch("printLocations").length > 0 && (
                        <div className="space-y-6 mt-12">
                          <h3 className="text-2xl font-semibold text-brand-navy dark:text-white text-center mb-6">
                            Upload Your Designs
                          </h3>
                          <div className="grid gap-8">
                            {form.watch("printLocations").map((location) => (
                              <FormField
                                key={location}
                                control={form.control}
                                name={`designs.${location}`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-2 text-lg font-medium text-brand-navy dark:text-white mb-3">
                                      Design for {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                    </FormLabel>
                                    <FormControl>
                                      <div className="flex flex-col items-center p-8 border-2 border-dashed rounded-xl border-brand-blue/40 dark:border-brand-blue/20 hover:border-brand-navy dark:hover:border-brand-yellow transition-all duration-300 bg-white/50 dark:bg-brand-navy-dark/50">
                                        {field.value ? (
                                          <div className="relative w-full">
                                            <img 
                                              src={field.value} 
                                              alt={`Design for ${location}`}
                                              className="max-h-56 object-contain mx-auto rounded-lg shadow-md"
                                            />
                                            <Button
                                              type="button"
                                              variant="destructive"
                                              size="sm"
                                              className="absolute -top-2 -right-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
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
                                          <div className="text-center w-full">
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
                                              className="cursor-pointer block w-full"
                                            >
                                              <div className="p-8 rounded-xl bg-gradient-to-br from-brand-blue-light/10 to-brand-yellow-light/10 dark:from-brand-navy-light/10 dark:to-brand-yellow/10 hover:shadow-xl transition-all duration-300">
                                                <div className="flex flex-col items-center gap-3">
                                                  <Package2 className="w-12 h-12 text-brand-navy dark:text-brand-yellow mb-2" />
                                                  <span className="text-lg font-medium text-brand-navy dark:text-white">
                                                    Click to upload design
                                                  </span>
                                                  <span className="text-sm text-gray-500 dark:text-gray-400">
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

                  {step === 3 && <ReviewStep form={form} />}
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between pt-8"
              >
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-6 text-lg bg-white/80 dark:bg-brand-navy-dark/80 hover:bg-brand-blue-light/20 dark:hover:bg-brand-navy-light/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 dark:text-white dark:border-brand-blue/20"
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    className="ml-auto px-8 py-6 text-lg bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="ml-auto px-8 py-6 text-lg bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
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
