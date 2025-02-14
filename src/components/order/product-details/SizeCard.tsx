
import { Button } from "@/components/ui/button";
import { SizeColor, SizesKey } from "@/types/order";
import { useState } from "react";
import { SizeInputDialog } from "./SizeInputDialog";
import { colorStyles } from "../orderConstants";
import { useFormContext } from "react-hook-form";

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
  sizeColors,
  onAddColor,
  onRemoveColor
}: SizeCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setValue } = useFormContext();

  const totalQuantity = sizeColors.reduce((sum, color) => sum + Number(color.quantity), 0);

  const handleSizeColorSubmit = (newSizeColors: SizeColor[]) => {
    // Primero removemos los colores existentes
    sizeColors.forEach((_, index) => {
      onRemoveColor(id, 0);
    });
    
    // Luego agregamos los nuevos colores y actualizamos sus valores
    newSizeColors.forEach((color, index) => {
      onAddColor(id);
      // Actualizamos los valores en el formulario
      setValue(`sizes.${id}.${index}.quantity`, color.quantity);
      setValue(`sizes.${id}.${index}.color`, color.color);
    });

    setIsDialogOpen(false);
  };

  return (
    <div className="relative bg-brand-navy dark:bg-brand-navy-dark border border-brand-blue/10 dark:border-brand-blue/20 rounded-lg transition-all duration-300 h-full flex flex-col">
      <div className="flex flex-col p-3 gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-white">{label}</span>
          {totalQuantity > 0 && (
            <span className="text-[10px] sm:text-xs font-medium px-1.5 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow">
              Total: {totalQuantity}
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="w-full h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm font-medium text-white bg-transparent border border-brand-blue/30 hover:bg-brand-yellow/5 hover:border-brand-yellow/30 transition-all duration-300"
        >
          Add Size
        </Button>

        {sizeColors.length > 0 && (
          <div className="w-full space-y-1.5 bg-brand-navy-light/30 rounded-md p-1.5 sm:p-2">
            <div className="text-[10px] sm:text-xs text-brand-yellow/80 font-medium mb-0.5 sm:mb-1">Quantities Added:</div>
            {sizeColors.map((sizeColor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-brand-navy-light/50 p-1.5 sm:p-2 rounded-md"
              >
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ring-1 ring-white/10 ${colorStyles[sizeColor.color]}`} />
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {sizeColor.quantity} {sizeColor.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveColor(id, index)}
                  className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-red-500/10"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <SizeInputDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSizeColorSubmit}
      />
    </div>
  );
};
