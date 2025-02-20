import { OrderFormValues } from "@/types/order";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Shirt, CircleDollarSign, Info, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewStepProps {
  savedItems: OrderFormValues[];
}

export const ReviewStep = ({ savedItems }: ReviewStepProps) => {
  const formatCottonType = (type: string) => {
    switch (type) {
      case 'standard':
        return '100% Cotton';
      case 'polyester':
        return '100% Polyester';
      case 'blend':
        return '50/50 Blend';
      default:
        return type;
    }
  };

  const formatPrintLocation = (location: string) => {
    if (location.startsWith("custom:")) {
      return `Custom: ${location.replace("custom:", "")}`;
    }
    return location.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getTotalQuantity = (sizes: OrderFormValues['sizes']) => {
    return Object.values(sizes).reduce((total, sizeColors) => {
      return total + sizeColors.reduce((sizeTotal, sc) => sizeTotal + Number(sc.quantity), 0);
    }, 0);
  };

  if (!savedItems || savedItems.length === 0) {
    return (
      <Alert className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-900/50">
        <Info className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
        <AlertDescription className="text-yellow-800 dark:text-yellow-400">
          No items have been added to your order yet. Please go back and add some items.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow/10 rounded-full mb-4"
        >
          <CircleDollarSign className="w-4 h-4 text-brand-yellow" />
          <span className="text-sm font-medium text-brand-yellow">Order Summary</span>
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white"
        >
          Review Your Order
        </motion.h2>
        <p className="text-gray-500 dark:text-gray-400">Please review your order details below</p>
      </div>

      <ScrollArea className="h-[400px] w-full rounded-md border border-gray-200 dark:border-brand-blue/20 p-4">
        {savedItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-brand-navy-dark/80 rounded-lg p-6 mb-6 last:mb-0 border border-gray-100 dark:border-brand-blue/20 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Shirt className="w-5 h-5" />
                    Item {index + 1}: {item.garmentType.charAt(0).toUpperCase() + item.garmentType.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Brand: {item.brand.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-yellow/10 text-brand-yellow text-sm font-medium">
                    <Package2 className="w-4 h-4" />
                    {getTotalQuantity(item.sizes)} items
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-brand-blue/20">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Material: {formatCottonType(item.cottonType)}
                </p>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sizes & Colors:</p>
                  <ul className="space-y-1">
                    {Object.entries(item.sizes).map(([size, sizeColors]) => (
                      sizeColors.map((sc, idx) => (
                        Number(sc.quantity) > 0 && (
                          <li key={`${size}-${idx}`} className="text-sm text-gray-600 dark:text-gray-400 ml-4">
                            • {size.replace('_', ' ').toUpperCase()}: {sc.quantity} {sc.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </li>
                        )
                      ))
                    ))}
                  </ul>
                </div>

                {item.printLocations && item.printLocations.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4" />
                      Print Locations:
                    </div>
                    <ul className="mt-2 space-y-1">
                      {item.printLocations.map((location, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 ml-4 flex items-center gap-2">
                          • {formatPrintLocation(location)}
                          {item.designs[location] && (
                            <span className="text-brand-yellow text-xs">(Design uploaded)</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </ScrollArea>
    </div>
  );
};
