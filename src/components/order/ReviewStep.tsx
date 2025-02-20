
import { OrderFormValues } from "@/types/order";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Shirt } from "lucide-react";
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
      <Alert>
        <AlertDescription>
          No items have been added to your order yet. Please go back and add some items.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text 2xl font-semibold text-gray-800 dark:text-gray-100">
          Please review your order details below
        </h2>
      </div>

      <div className="space-y-4 min-h-[200px] max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {savedItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Shirt className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                      Item {index + 1}: {item.garmentType.charAt(0).toUpperCase() + item.garmentType.slice(1)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Brand: {item.brand.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-brand-yellow/10 px-4 py-2 rounded-full">
                  <Package2 className="w-4 h-4 text-brand-yellow" />
                  <span className="text-brand-yellow font-medium">{getTotalQuantity(item.sizes)} items</span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200">
                    Material: {formatCottonType(item.cottonType)}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                    Sizes & Colors:
                  </p>
                  <ul className="space-y-2 pl-4">
                    {Object.entries(item.sizes).map(([size, sizeColors]) => (
                      sizeColors.map((sc, idx) => (
                        Number(sc.quantity) > 0 && (
                          <li key={`${size}-${idx}`} className="text-gray-600 dark:text-gray-400">
                            {size.replace('_', ' ').toUpperCase()}: {sc.quantity} {sc.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </li>
                        )
                      ))
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <p className="text-gray-800 dark:text-gray-200 font-medium mb-3">
                    Print Locations:
                  </p>
                  <ul className="space-y-2 pl-4">
                    {item.printLocations?.map((location, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-400">
                        {formatPrintLocation(location)}
                      </li>
                    )) || (
                      <li className="text-gray-600 dark:text-gray-400">
                        No print locations selected
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
