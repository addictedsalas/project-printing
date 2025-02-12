
import { useForm } from "react-hook-form";
import { OrderFormValues } from "@/types/order";
import { Package2, Shirt, Palette, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ContactForm } from "./ContactForm";

interface ReviewStepProps {
  form: ReturnType<typeof useForm<OrderFormValues>>;
  savedItems: OrderFormValues[];
}

export const ReviewStep = ({ form, savedItems }: ReviewStepProps) => {
  const formValues = form.getValues();
  const allItems = [...savedItems, formValues];

  const getTotalQuantity = (items: OrderFormValues[]) => {
    return items.reduce((total, item) => {
      return total + Object.values(item.sizes).reduce((acc, sizeColors) => 
        acc + sizeColors.reduce((sum, item) => sum + Number(item.quantity), 0), 
      0);
    }, 0);
  };

  return (
    <div className="space-y-8 text-brand-navy dark:text-white">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Order Summary</h2>
        <p className="text-gray-600 dark:text-gray-300">Review your order details before submitting</p>
      </div>

      {allItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-white/80 dark:bg-brand-navy-dark/80 rounded-xl p-6 shadow-sm border-2 border-brand-blue/10 dark:border-brand-blue/20 hover:border-brand-yellow/50 dark:hover:border-brand-yellow/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-brand-yellow/10 text-brand-navy dark:text-brand-yellow border-brand-yellow">
              Item {index + 1}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Shirt className="w-5 h-5 text-brand-blue dark:text-brand-yellow" />
                <h3>Product Details</h3>
              </div>
              <div className="bg-gray-50 dark:bg-brand-navy-light/20 p-4 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="font-medium">{item.garmentType.charAt(0).toUpperCase() + item.garmentType.slice(1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Material:</span>
                  <span className="font-medium">{item.materialType === "5050" ? "50/50 Blend" : `100% ${item.materialType.charAt(0).toUpperCase() + item.materialType.slice(1)}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Brand:</span>
                  <span className="font-medium">{item.brand}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Size Type:</span>
                  <span className="font-medium">{item.sizeType.charAt(0).toUpperCase() + item.sizeType.slice(1)}</span>
                </div>
              </div>
            </div>

            {/* Sizes & Colors */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <Palette className="w-5 h-5 text-brand-blue dark:text-brand-yellow" />
                <h3>Size & Color Details</h3>
              </div>
              <div className="bg-gray-50 dark:bg-brand-navy-light/20 p-4 rounded-lg">
                {Object.entries(item.sizes)
                  .filter(([key]) => 
                    (item.sizeType === "adult" && !key.startsWith("youth")) || 
                    (item.sizeType === "youth" && key.startsWith("youth"))
                  )
                  .map(([size, sizeColors]) => (
                    sizeColors.length > 0 && (
                      <div key={size} className="mb-3 last:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="bg-brand-blue/5 border-brand-blue/20">
                            {size.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </div>
                        {sizeColors.map((sizeItem, sizeIndex) => (
                          <div 
                            key={`${size}-${sizeIndex}`}
                            className="flex items-center justify-between py-1 px-2 text-sm"
                          >
                            <span className="text-gray-600 dark:text-gray-400">
                              {sizeItem.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </span>
                            <span className="font-medium">× {sizeItem.quantity}</span>
                          </div>
                        ))}
                      </div>
                    )
                  ))}
              </div>
            </div>
          </div>

          {/* Print Locations */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Printer className="w-5 h-5 text-brand-blue dark:text-brand-yellow" />
              <h3>Print Locations</h3>
            </div>
            <div className="grid gap-4">
              {item.printLocations.map((location) => (
                <div 
                  key={location}
                  className="bg-gray-50 dark:bg-brand-navy-light/20 p-4 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className="bg-brand-blue/5 border-brand-blue/20"
                    >
                      {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.designs[location] === "design-help-requested" 
                        ? "Design Help Requested" 
                        : "Design Uploaded"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8">
        <Separator className="my-8" />
        <div className="flex items-center justify-between bg-brand-yellow/10 dark:bg-brand-yellow/5 p-6 rounded-xl border-2 border-brand-yellow">
          <div className="flex items-center gap-2">
            <Package2 className="w-6 h-6 text-brand-navy dark:text-brand-yellow" />
            <span className="text-xl font-bold">Total Items</span>
          </div>
          <span className="text-2xl font-bold">{getTotalQuantity(allItems)}</span>
        </div>
      </div>

      <Separator className="my-8" />
      
      <div className="bg-white/80 dark:bg-brand-navy-dark/80 rounded-xl p-6 shadow-sm border-2 border-brand-blue/10 dark:border-brand-blue/20">
        <ContactForm />
      </div>
    </div>
  );
};
