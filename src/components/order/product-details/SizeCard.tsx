
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
  return (
    <div className="relative bg-slate-100 dark:bg-brand-navy-dark/80 ring-1 ring-brand-blue rounded-lg transition-all duration-300 dark:border-brand-blue">
      <div className="flex flex-col items-center justify-between text-center p-2.5 min-h-[85px]">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <div className="w-full space-y-1.5">
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
            className="w-full h-7 px-2 text-xs border border-gray-950/20 hover:bg-brand-yellow/5 hover:border-brand-yellow dark:border-brand-blue/20 dark:hover:bg-brand-yellow/5 dark:hover:border-brand-yellow"
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
