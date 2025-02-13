
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SizeColor, SizesKey } from "@/types/order";
import { colorStyles } from "../orderConstants";
import { X } from "lucide-react";

interface SizeColorInputProps {
  id: SizesKey;
  index: number;
  control: any;
  onRemove: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: SizesKey, index: number) => void;
}

export const SizeColorInput = ({ id, index, control, onRemove, onKeyDown }: SizeColorInputProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <FormField
        control={control}
        name={`sizes.${id}.${index}.quantity`}
        render={({ field }) => (
          <FormItem className="w-14">
            <FormControl>
              <Input
                type="number"
                {...field}
                onChange={(e) => {
                  if (field.value === "0" && e.target.value !== "") {
                    field.onChange("");
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                onFocus={(e) => {
                  e.target.select();
                  if (field.value === "0") {
                    field.onChange("");
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.currentTarget.blur();
                  } else {
                    onKeyDown(e, id, index);
                  }
                }}
                value={field.value?.toString()}
                min="0"
                placeholder="Qty"
                className="h-7 text-xs font-medium bg-transparent border border-brand-blue/20 dark:border-brand-blue/30 text-brand-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-brand-yellow focus:ring-brand-yellow/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`sizes.${id}.${index}.color`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-7 text-xs bg-transparent border border-brand-blue/20 dark:border-brand-blue/30 text-brand-navy dark:text-white focus:border-brand-yellow focus:ring-brand-yellow/20">
                  <SelectValue placeholder="Color">
                    {field.value && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${colorStyles[field.value]}`} />
                        <span className="hidden sm:inline truncate">
                          {field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-brand-navy-dark border border-brand-blue/20 dark:border-brand-blue/30">
                {Object.entries(colorStyles).map(([color, bgClass]) => (
                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${bgClass}`} />
                    <span className="text-xs">{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onRemove(index)}
        className="h-7 w-7 px-0 rounded-full transition-all duration-200 hover:scale-110 hover:bg-red-500/10 dark:hover:bg-red-500/20 group"
      >
        <X className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-500 dark:text-gray-500 dark:group-hover:text-red-400 transition-colors duration-200" />
      </Button>
    </div>
  );
};
