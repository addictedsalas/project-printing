
import { useForm } from "react-hook-form";
import { OrderFormValues } from "@/types/order";

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

  return (
    <div className="space-y-6 text-brand-navy dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Product Details</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Garment Type: {formValues.garmentType.charAt(0).toUpperCase() + formValues.garmentType.slice(1)}</li>
            <li>Material: {formValues.materialType === "5050" ? "50/50 Blend" : `100% ${formValues.materialType.charAt(0).toUpperCase() + formValues.materialType.slice(1)}`}</li>
            <li>Brand: {formValues.brand}</li>
            <li>Size Type: {formValues.sizeType.charAt(0).toUpperCase() + formValues.sizeType.slice(1)}</li>
            <li>Total Quantity: {getTotalQuantity()} units</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Size & Color Breakdown</h3>
          {Object.entries(formValues.sizes)
            .filter(([key]) => 
              (formValues.sizeType === "adult" && !key.startsWith("youth")) || 
              (formValues.sizeType === "youth" && key.startsWith("youth"))
            )
            .map(([size, sizeColors]) => (
              sizeColors.length > 0 && (
                <div key={size} className="mb-3">
                  <p className="font-medium">{size.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}:</p>
                  <ul className="list-disc pl-5">
                    {sizeColors.map((item, index) => (
                      <li key={`${size}-${index}`}>
                        {item.quantity} × {item.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            ))}
        </div>

        <div>
          <h3 className="font-medium mb-2">Print Locations</h3>
          <ul className="list-disc pl-5">
            {formValues.printLocations.map((location) => (
              <li key={location}>
                {location.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
