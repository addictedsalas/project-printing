import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Package2, Shirt, Palette, MapPin, Sparkles } from "lucide-react";

const orderFormSchema = z.object({
  quantity: z.string(),
  garmentType: z.string(),
  color: z.string(),
  sizes: z.object({
    small: z.string(),
    medium: z.string(),
    large: z.string(),
    xlarge: z.string(),
  }),
  printLocation: z.string(),
  fabricQuality: z.string(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function Order() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      quantity: "",
      garmentType: "",
      color: "",
      sizes: {
        small: "0",
        medium: "0",
        large: "0",
        xlarge: "0",
      },
      printLocation: "",
      fabricQuality: "",
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#FEC6A1] via-white to-[#D3E4FD]">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white/90 to-[#FEF7CD]/50 backdrop-blur-sm p-8 rounded-xl shadow-lg border-2 border-[#FEC6A1] hover:border-[#E5DEFF] transition-all duration-300"
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#E5DEFF] rounded-full mb-4"
                      >
                        <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="text-sm font-medium text-[#8B5CF6]">Let's Create Something Amazing!</span>
                      </motion.div>
                      <motion.h2 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-[#8B5CF6] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#D946EF]"
                      >
                        Product Details
                      </motion.h2>
                      <p className="text-gray-600">Let's start with the basics of your order</p>
                    </div>

                    <div className="grid gap-8">
                      <FormField
                        control={form.control}
                        name="garmentType"
                        render={({ field }) => (
                          <FormItem className="space-y-4 transform transition-all duration-300 hover:scale-105">
                            <FormLabel className="text-lg font-medium flex items-center gap-2 text-[#8B5CF6]">
                              <Shirt className="w-5 h-5" />
                              Garment Type
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-[#FEC6A1] hover:border-[#8B5CF6] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300">
                                  <SelectValue placeholder="Select garment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white/95 backdrop-blur-sm border-[#FEC6A1]">
                                <SelectItem value="tshirt" className="hover:bg-[#E5DEFF]">T-Shirt</SelectItem>
                                <SelectItem value="hoodie" className="hover:bg-[#E5DEFF]">Hoodie</SelectItem>
                                <SelectItem value="sweatshirt" className="hover:bg-[#E5DEFF]">Sweatshirt</SelectItem>
                                <SelectItem value="tank" className="hover:bg-[#E5DEFF]">Tank Top</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fabricQuality"
                        render={({ field }) => (
                          <FormItem className="space-y-4 transform transition-all duration-300 hover:scale-105">
                            <FormLabel className="text-lg font-medium flex items-center gap-2 text-[#D946EF]">
                              <Package2 className="w-5 h-5" />
                              Fabric Quality
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-[#FEC6A1] hover:border-[#D946EF] hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all duration-300">
                                  <SelectValue placeholder="Select fabric quality" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white/95 backdrop-blur-sm border-[#FEC6A1]">
                                <SelectItem value="basic" className="hover:bg-[#FDE1D3]">Basic (130g/m²)</SelectItem>
                                <SelectItem value="premium" className="hover:bg-[#FDE1D3]">Premium (180g/m²)</SelectItem>
                                <SelectItem value="heavyweight" className="hover:bg-[#FDE1D3]">Heavyweight (220g/m²)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem className="space-y-4 transform transition-all duration-300 hover:scale-105">
                            <FormLabel className="text-lg font-medium flex items-center gap-2 text-[#F97316]">
                              <Palette className="w-5 h-5" />
                              Color
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 border-[#FEC6A1] hover:border-[#F97316] hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300">
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white/95 backdrop-blur-sm border-[#FEC6A1]">
                                <SelectItem value="white" className="hover:bg-[#FEF7CD]">White</SelectItem>
                                <SelectItem value="black" className="hover:bg-[#FEF7CD]">Black</SelectItem>
                                <SelectItem value="navy" className="hover:bg-[#FEF7CD]">Navy</SelectItem>
                                <SelectItem value="gray" className="hover:bg-[#FEF7CD]">Gray</SelectItem>
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
