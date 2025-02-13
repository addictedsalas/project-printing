
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colorStyles } from "../orderConstants";
import { useState } from "react";
import { SizeColor } from "@/types/order";
import { X } from "lucide-react";

interface SizeInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sizeColors: SizeColor[]) => void;
}

export const SizeInputDialog = ({ isOpen, onClose, onSubmit }: SizeInputDialogProps) => {
  const [colorEntries, setColorEntries] = useState<SizeColor[]>([{ quantity: "", color: "white" }]);

  const handleAddColor = () => {
    setColorEntries([...colorEntries, { quantity: "", color: "white" }]);
  };

  const handleRemoveColor = (index: number) => {
    setColorEntries(colorEntries.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (colorEntries.some(entry => !entry.quantity)) return;
    onSubmit(colorEntries);
    setColorEntries([{ quantity: "", color: "white" }]);
    onClose();
  };

  const updateColorEntry = (index: number, field: keyof SizeColor, value: string) => {
    const newEntries = [...colorEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setColorEntries(newEntries);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setColorEntries([{ quantity: "", color: "white" }]);
      }
      onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-brand-navy dark:text-white">
            Add Size Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {colorEntries.map((entry, index) => (
            <div key={index} className="space-y-4 bg-gray-50 dark:bg-brand-navy-dark/50 p-4 rounded-lg relative">
              {colorEntries.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveColor(index)}
                  className="absolute right-2 top-2 h-6 w-6 p-0 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </Button>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={entry.quantity}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    if (value === "0") {
                      updateColorEntry(index, "quantity", "");
                    } else {
                      updateColorEntry(index, "quantity", value);
                    }
                  }}
                  placeholder="Enter quantity"
                  className="bg-white dark:bg-brand-navy-dark"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Color
                </label>
                <Select
                  value={entry.color}
                  onValueChange={(value) => updateColorEntry(index, "color", value)}
                >
                  <SelectTrigger className="bg-white dark:bg-brand-navy-dark">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${colorStyles[entry.color]}`} />
                        <span>{entry.color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-brand-navy-dark">
                    {Object.entries(colorStyles).map(([colorName, bgClass]) => (
                      <SelectItem key={colorName} value={colorName}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${bgClass}`} />
                          <span>{colorName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={handleAddColor}
            className="w-full bg-white dark:bg-brand-navy-dark hover:bg-gray-50 dark:hover:bg-brand-navy-dark/70"
          >
            Add Color
          </Button>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setColorEntries([{ quantity: "", color: "white" }]);
                onClose();
              }}
              className="bg-white dark:bg-brand-navy-dark"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={colorEntries.some(entry => !entry.quantity)}
              className="bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-yellow dark:text-brand-navy"
            >
              Add Size
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
