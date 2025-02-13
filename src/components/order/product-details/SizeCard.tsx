
import { Button } from "@/components/ui/button";
import { SizeColor, SizesKey } from "@/types/order";
import { SizeColorInput } from "./SizeColorInput";

interface SizeCardProps {
  id: SizesKey;
  label: string;
  control: any;
  sizeColors: SizeColor[];
  onAddColor: (id: SizesKey) => void;
  onRemoveColor: (id: SizesKey, index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: SizesKey, index: number) => void;
}

export const SizeCard = ({ 
  id, 
  label, 
  control, 
  sizeColors, 
  onAddColor, 
  onRemoveColor,
  onKeyDown 
}: SizeCardProps) => {
  // Calculate total quantity for this size
  const totalQuantity = sizeColors.reduce((sum, color) => sum + (parseInt(color.quantity) || 0), 0);

  return (
    <div className="relative bg-white/95 dark:bg-brand-navy-dark border-2 border-brand-blue/20 dark:border-brand-blue/30 rounded-lg transition-all duration-300 hover:border-brand-yellow/50 dark:hover:border-brand-yellow/50">
      <div className="flex flex-col items-center justify-between p-3">
        <div className="w-full flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-brand-navy dark:text-white">{label}</span>
          {totalQuantity > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-brand-yellow/20 text-brand-yellow rounded-full">
              Qty: {totalQuantity}
            </span>
          )}
        </div>
        <div className="w-full space-y-2">
          {sizeColors.map((_, index) => (
            <SizeColorInput
              key={`${id}-${index}`}
              id={id}
              index={index}
              control={control}
              onRemove={(index) => onRemoveColor(id, index)}
              onKeyDown={onKeyDown}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onAddColor(id)}
            className="w-full h-8 px-2 text-xs font-medium text-brand-navy dark:text-white border-2 border-brand-blue/20 dark:border-brand-blue/30 hover:bg-brand-yellow/10 hover:border-brand-yellow/50 dark:hover:bg-brand-yellow/10 dark:hover:border-brand-yellow/50 transition-all duration-300"
          >
            Add Size
          </Button>
        </div>
      </div>
    </div>
  );
};
