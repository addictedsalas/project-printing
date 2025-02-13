
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colorStyles } from "../orderConstants";
import { useState } from "react";

interface SizeInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (quantity: string, color: string) => void;
}

export const SizeInputDialog = ({ isOpen, onClose, onSubmit }: SizeInputDialogProps) => {
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("white");

  const handleSubmit = () => {
    onSubmit(quantity, color);
    setQuantity("");
    setColor("white");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-brand-navy dark:text-white">
            Add Size Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                if (value === "0") {
                  setQuantity("");
                } else {
                  setQuantity(value);
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
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="bg-white dark:bg-brand-navy-dark">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${colorStyles[color]}`} />
                    <span>{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
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
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white dark:bg-brand-navy-dark"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!quantity}
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
