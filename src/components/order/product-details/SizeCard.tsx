
import { Button } from "@/components/ui/button";
import { SizeColor, SizesKey } from "@/types/order";
import { useState } from "react";
import { SizeInputDialog } from "./SizeInputDialog";
import { colorStyles } from "../orderConstants";

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

  const totalQuantity = sizeColors.reduce((sum, color) => sum + Number(color.quantity), 0);

  return (
    <div className="relative bg-brand-navy dark:bg-brand-navy-dark border border-brand-blue/10 dark:border-brand-blue/20 rounded-lg transition-all duration-300">
      <div className="flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{label}</span>
          {totalQuantity > 0 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-yellow/10 text-brand-yellow">
              {totalQuantity}
            </span>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsDialogOpen(true)}
          className="w-full h-9 px-4 text-sm font-medium text-white bg-transparent border border-brand-blue/30 hover:bg-brand-yellow/5 hover:border-brand-yellow/30 transition-all duration-300"
        >
          Add Size
        </Button>

        {sizeColors.length > 0 && (
          <div className="w-full space-y-2">
            {sizeColors.map((sizeColor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-brand-navy-light/50 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ring-1 ring-white/10 ${colorStyles[sizeColor.color]}`} />
                  <span className="text-sm font-medium text-white">{sizeColor.quantity}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveColor(id, index)}
                  className="h-6 w-6 p-0 hover:bg-red-500/10"
                >
                  <span className="sr-only">Remove</span>
                  <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        onSubmit={(newSizeColors) => {
          // Add each new color entry
          newSizeColors.forEach(() => onAddColor(id));
          
          // Remove the default values that were added
          const startIndex = sizeColors.length;
          for (let i = 0; i < newSizeColors.length; i++) {
            onRemoveColor(id, startIndex + i);
          }
          
          // Add the new entries to sizeColors
          newSizeColors.forEach(sizeColor => {
            sizeColors.push(sizeColor);
          });
        }}
      />
    </div>
  );
};
