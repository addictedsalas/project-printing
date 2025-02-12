
import { useForm } from "react-hook-form";
import { OrderFormValues } from "@/types/order";

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
    <div className="space-y-6 text-brand-navy dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      {allItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 last:border-b-0">
          <h3 className="text-xl font-medium mb-4">Item {index + 1}</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Product Details</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Garment Type: {item.garmentType.charAt(0).toUpperCase() + item.garmentType.slice(1)}</li>
                <li>Material: {item.materialType === "5050" ? "50/50 Blend" : `100% ${item.materialType.charAt(0).toUpperCase() + item.materialType.slice(1)}`}</li>
                <li>Brand: {item.brand}</li>
                <li>Size Type: {item.sizeType.charAt(0).toUpperCase() + item.sizeType.slice(1)}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Size & Color Breakdown</h4>
              {Object.entries(item.sizes)
                .filter(([key]) => 
                  (item.sizeType === "adult" && !key.startsWith("youth")) || 
                  (item.sizeType === "youth" && key.startsWith("youth"))
                )
                .map(([size, sizeColors]) => (
                  sizeColors.length > 0 && (
                    <div key={size} className="mb-3">
                      <p className="font-medium">{size.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</p>
                      <ul className="list-disc pl-5">
                        {sizeColors.map((sizeItem, sizeIndex) => (
                          <li key={`${size}-${sizeIndex}`}>
                            {sizeItem.quantity} × {sizeItem.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                ))}
            </div>

            <div>
              <h4 className="font-medium mb-2">Print Locations</h4>
              <ul className="list-disc pl-5">
                {item.printLocations.map((location) => (
                  <li key={location}>
                    {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xl font-semibold">
          Total Items: {getTotalQuantity(allItems)}
        </p>
      </div>
    </div>
  );
};
