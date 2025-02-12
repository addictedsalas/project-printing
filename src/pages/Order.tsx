
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
import { ContinueModal } from "@/components/order/ContinueModal";
import { CustomizationStep } from "@/components/order/CustomizationStep";
import { orderFormSchema } from "@/types/order";
import type { OrderFormValues } from "@/types/order";
import { useToast } from "@/components/ui/use-toast";

export default function Order() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [mounted, setMounted] = useState(false);
  const [sizeType, setSizeType] = useState<"adult" | "youth">("adult");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const { theme } = useTheme();
  const { toast } = useToast();

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

  const onSubmit = async (data: OrderFormValues) => {
    const anyQuantityGreaterThanZero = Object.values(data.sizes).some(sizeColors =>
      sizeColors.some(item => Number(item.quantity) > 0)
    );

    if (!anyQuantityGreaterThanZero) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please add at least one item to your order",
      });
      return;
    }

    if (data.printLocations.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one print location",
      });
      return;
    }

    const allLocationsHaveDesigns = data.printLocations.every(
      location => data.designs[location]
    );

    if (!allLocationsHaveDesigns) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload designs for all selected print locations",
      });
      return;
    }

    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (step === 1) {
      const anyQuantityGreaterThanZero = Object.values(form.getValues().sizes).some(sizeColors =>
        sizeColors.some(item => Number(item.quantity) > 0)
      );

      if (!anyQuantityGreaterThanZero) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please add at least one item before continuing",
        });
        return;
      }
      setShowContinueModal(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleContinue = () => {
    setShowContinueModal(false);
    setStep(2);
  };

  const handleAddMore = () => {
    setShowContinueModal(false);
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
                    <CustomizationStep 
                      form={form}
                      isDark={theme === "dark"}
                    />
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
                    onClick={handleNext}
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

          <ContinueModal
            isOpen={showContinueModal}
            onClose={() => setShowContinueModal(false)}
            onContinue={handleContinue}
            onAddMore={handleAddMore}
          />
        </div>
      </div>
    </div>
  );
}
