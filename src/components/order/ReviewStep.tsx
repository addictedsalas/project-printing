
import { OrderFormValues } from "@/types/order";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2, Shirt, Box, Palette, MapPin } from "lucide-react";
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
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-brand-navy dark:text-white">
          Order Review
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Please review your order details below
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-400px)] pr-4">
        <div className="space-y-6">
          {savedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-brand-navy/5 dark:bg-brand-navy/20 p-3 rounded-lg">
                      <Shirt className="w-6 h-6 text-brand-navy dark:text-brand-yellow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-brand-navy dark:text-white">
                        {item.garmentType.charAt(0).toUpperCase() + item.garmentType.slice(1)}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        {item.brand.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-brand-yellow/10 px-4 py-2 rounded-full">
                    <Package2 className="w-4 h-4 text-brand-yellow" />
                    <span className="text-brand-yellow font-medium">{getTotalQuantity(item.sizes)} items</span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Material Info */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Box className="w-5 h-5 text-brand-navy/70 dark:text-brand-yellow/70" />
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Material</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 ml-8">
                      {formatCottonType(item.cottonType)}
                    </p>
                  </div>

                  {/* Sizes & Colors */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Palette className="w-5 h-5 text-brand-navy/70 dark:text-brand-yellow/70" />
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Sizes & Colors</h4>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {Object.entries(item.sizes).map(([size, sizeColors]) => (
                        sizeColors.map((sc, idx) => (
                          Number(sc.quantity) > 0 && (
                            <li key={`${size}-${idx}`} className="text-gray-600 dark:text-gray-300">
                              {size.replace('_', ' ').toUpperCase()}: {sc.quantity} {sc.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                            </li>
                          )
                        ))
                      ))}
                    </ul>
                  </div>

                  {/* Print Locations */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 md:col-span-2">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-brand-navy/70 dark:text-brand-yellow/70" />
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">Print Locations</h4>
                    </div>
                    <ul className="space-y-2 ml-8">
                      {Array.isArray(item.printLocations) && item.printLocations.length > 0 ? (
                        item.printLocations.map((location, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-gray-300">
                            {formatPrintLocation(location)}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 dark:text-gray-400 italic">
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
      </ScrollArea>
    </div>
  );
};
