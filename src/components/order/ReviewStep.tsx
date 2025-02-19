
import { OrderFormValues } from "@/types/order";

interface ReviewStepProps {
  savedItems: OrderFormValues[];
}

export const ReviewStep = ({ savedItems }: ReviewStepProps) => {
  const formatCottonType = (type: string) => {
    switch (type) {
      case 'standard':
      case 'ringspun':
      case 'organic':
      case 'combed':
        return '100% Cotton';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      {savedItems.map((item, index) => (
        <div key={index} className="space-y-2">
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">
            Item {index + 1}: {item.garmentType} - {item.brand}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Material: {formatCottonType(item.cottonType)}</p>
          <p className="text-gray-500 dark:text-gray-400">Sizes:</p>
          <ul className="list-disc list-inside">
            {Object.entries(item.sizes).map(([size, sizeColors]) => (
              sizeColors.map((sc, idx) => (
                <li key={idx}>
                  {size}: {sc.quantity} {sc.color}
                </li>
              ))
            ))}
          </ul>
          <p className="text-gray-500 dark:text-gray-400">Print Locations: {item.printLocations.join(", ")}</p>
          <p className="text-gray-500 dark:text-gray-400">Designs: {JSON.stringify(item.designs)}</p>
        </div>
      ))}
    </div>
  );
};
