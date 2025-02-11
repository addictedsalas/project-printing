
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

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
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      step > index + 1
                        ? "bg-brand-navy border-brand-navy text-white"
                        : step === index + 1
                        ? "bg-brand-yellow border-brand-navy text-brand-navy"
                        : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </motion.div>
                  {index < totalSteps - 1 && (
                    <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: step > index + 1 ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-brand-navy absolute top-0 left-0"
                      ></motion.div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className={step >= 1 ? "text-brand-navy" : "text-gray-400"}>Product Details</span>
              <span className={step >= 2 ? "text-brand-navy" : "text-gray-400"}>Customization</span>
              <span className={step >= 3 ? "text-brand-navy" : "text-gray-400"}>Review & Submit</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-brand-navy mb-2">
                        Product Details
                      </h2>
                      <p className="text-gray-600">Let's start with the basics of your order</p>
                    </div>

                    <div className="grid gap-8">
                      <FormField
                        control={form.control}
                        name="garmentType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Garment Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select garment type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tshirt">T-Shirt</SelectItem>
                                <SelectItem value="hoodie">Hoodie</SelectItem>
                                <SelectItem value="sweatshirt">Sweatshirt</SelectItem>
                                <SelectItem value="tank">Tank Top</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="fabricQuality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Fabric Quality</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select fabric quality" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="basic">Basic (130g/m²)</SelectItem>
                                <SelectItem value="premium">Premium (180g/m²)</SelectItem>
                                <SelectItem value="heavyweight">Heavyweight (220g/m²)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-medium">Color</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="black">Black</SelectItem>
                                <SelectItem value="navy">Navy</SelectItem>
                                <SelectItem value="gray">Gray</SelectItem>
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
                      <h2 className="text-3xl font-bold text-brand-navy mb-2">
                        Customization
                      </h2>
                      <p className="text-gray-600">Design your perfect print</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="printLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-medium">Print Location</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
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
                      <h2 className="text-3xl font-bold text-brand-navy mb-2">
                        Review & Submit
                      </h2>
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
                    className="px-8"
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    className="ml-auto px-8 bg-brand-navy hover:bg-brand-navy/90"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="ml-auto px-8 bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90"
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
