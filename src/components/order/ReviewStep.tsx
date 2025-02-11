
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { OrderFormValues, SizesKey } from "@/types/order";
import { MapPin, Package2, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { colorStyles } from "./orderConstants";

interface ReviewStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
}

export const ReviewStep = ({ form }: ReviewStepProps) => {
  const formValues = form.getValues();

  const getTotalQuantity = () => {
    return Object.values(formValues.sizes).reduce((acc, sizeColors) => 
      acc + sizeColors.reduce((sum, item) => sum + Number(item.quantity), 0), 
    0);
  };

  const getLocationTotal = (location: string) => {
    return Object.entries(formValues.sizes)
      .filter(([key]) => 
        (formValues.sizeType === "adult" && !key.startsWith("youth")) || 
        (formValues.sizeType === "youth" && key.startsWith("youth"))
      )
      .reduce((acc, [_, sizeColors]) => 
        acc + sizeColors.reduce((sum, item) => sum + Number(item.quantity), 0), 
      0);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-brand-navy dark:text-white"
        >
          Review & Submit
        </motion.h2>
        <p className="text-gray-600 dark:text-gray-300">Almost there! Review your order details</p>
      </div>

      <div className="grid gap-8">
        {/* Product Details */}
        <div className="space-y-4 bg-white/80 dark:bg-brand-navy-dark/50 p-6 rounded-lg border-2 border-brand-blue dark:border-brand-blue/20">
          <div className="flex items-center gap-2 text-lg font-medium text-brand-navy dark:text-white">
            <Package2 className="w-5 h-5" />
            Product Details
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Garment Type</span>
              <p className="font-medium text-brand-navy dark:text-white">
                {formValues.garmentType.charAt(0).toUpperCase() + formValues.garmentType.slice(1)}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Material</span>
              <p className="font-medium text-brand-navy dark:text-white">
                {formValues.materialType === "5050" ? "50/50 Blend" : `100% ${formValues.materialType.charAt(0).toUpperCase() + formValues.materialType.slice(1)}`}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Brand</span>
              <p className="font-medium text-brand-navy dark:text-white">{formValues.brand}</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Size Type</span>
              <p className="font-medium text-brand-navy dark:text-white">
                {formValues.sizeType.charAt(0).toUpperCase() + formValues.sizeType.slice(1)}
              </p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Total Quantity</span>
              <p className="font-medium text-brand-navy dark:text-white">{getTotalQuantity()} units</p>
            </div>
          </div>
        </div>

        {/* Size & Color Breakdown */}
        <div className="space-y-4 bg-white/80 dark:bg-brand-navy-dark/50 p-6 rounded-lg border-2 border-brand-blue dark:border-brand-blue/20">
          <div className="flex items-center gap-2 text-lg font-medium text-brand-navy dark:text-white">
            <Palette className="w-5 h-5" />
            Size & Color Breakdown
          </div>
          <Separator className="my-4" />
          <div className="grid gap-6">
            {Object.entries(formValues.sizes)
              .filter(([key]) => 
                (formValues.sizeType === "adult" && !key.startsWith("youth")) || 
                (formValues.sizeType === "youth" && key.startsWith("youth"))
              )
              .map(([size, sizeColors]) => (
                sizeColors.length > 0 && (
                  <div key={size} className="space-y-3">
                    <h4 className="font-medium text-brand-navy dark:text-white">
                      {size.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {sizeColors.map((item, index) => (
                        <div key={`${size}-${index}`} className="flex items-center gap-2 bg-white/50 dark:bg-brand-navy-light/20 p-3 rounded-lg">
                          <div className={`w-6 h-6 rounded-full ${colorStyles[item.color]} border border-gray-200`} />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {item.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </p>
                            <p className="text-lg font-medium text-brand-navy dark:text-white">{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
          </div>
        </div>

        {/* Print Locations and Designs */}
        <div className="space-y-4 bg-white/80 dark:bg-brand-navy-dark/50 p-6 rounded-lg border-2 border-brand-blue dark:border-brand-blue/20">
          <div className="flex items-center gap-2 text-lg font-medium text-brand-navy dark:text-white">
            <MapPin className="w-5 h-5" />
            Print Locations & Designs
          </div>
          <Separator className="my-4" />
          <div className="grid gap-6">
            {formValues.printLocations.map((location) => (
              <div key={location} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-brand-navy dark:text-white">
                    {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getLocationTotal(location)} prints
                  </span>
                </div>
                {formValues.designs[location] && (
                  <div className="relative bg-white/50 dark:bg-brand-navy-light/20 p-4 rounded-lg">
                    <img 
                      src={formValues.designs[location]} 
                      alt={`Design for ${location}`}
                      className="max-h-48 object-contain mx-auto"
                    />
                  </div>
                )}
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
