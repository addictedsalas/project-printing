
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index < totalSteps - 1 ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > index + 1
                        ? "bg-brand-navy text-white"
                        : step === index + 1
                        ? "bg-brand-yellow text-brand-navy"
                        : "bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className="flex-1 h-1 mx-4 bg-gray-200">
                      <div
                        className={`h-full bg-brand-navy transition-all duration-300 ${
                          step > index + 1 ? "w-full" : "w-0"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Product Details</span>
              <span>Customization</span>
              <span>Review & Submit</span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-brand-navy mb-6">
                    Product Details
                  </h2>

                  <FormField
                    control={form.control}
                    name="garmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Garment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                        <FormLabel>Fabric Quality</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                        <FormLabel>Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-brand-navy mb-6">
                    Customization
                  </h2>

                  <FormField
                    control={form.control}
                    name="printLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Print Location</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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

                  {/* Add more customization options here */}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <h2 className="text-3xl font-bold text-brand-navy mb-6">
                    Review & Submit
                  </h2>
                  {/* Add order summary here */}
                </div>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    className="ml-auto"
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Submit Order
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
