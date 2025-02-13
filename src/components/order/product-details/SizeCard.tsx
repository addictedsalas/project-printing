
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
    <div className="relative bg-white/5 dark:bg-brand-navy-dark/50 border border-brand-blue/10 dark:border-brand-blue/20 rounded-lg transition-all duration-300">
      <div className="flex flex-col p-3 gap-2">
        <span className="text-sm font-medium text-brand-navy dark:text-white">{label}</span>
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
            className="w-full h-7 px-2 text-xs font-medium text-brand-navy dark:text-white bg-transparent border border-brand-blue/20 dark:border-brand-blue/30 hover:bg-brand-yellow/5 hover:border-brand-yellow/30 dark:hover:bg-brand-yellow/5 dark:hover:border-brand-yellow/30 transition-all duration-300"
          >
            Add Size
          </Button>
        </div>
      </div>
    </div>
  );
};
