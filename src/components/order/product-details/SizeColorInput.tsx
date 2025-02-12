
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SizeColor, SizesKey } from "@/types/order";
import { colorStyles } from "../orderConstants";

interface SizeColorInputProps {
  id: SizesKey;
  index: number;
  control: any;
  onRemove: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: SizesKey, index: number) => void;
}

export const SizeColorInput = ({ id, index, control, onRemove, onKeyDown }: SizeColorInputProps) => {
  return (
    <div className="flex items-end gap-2 p-2 rounded bg-white dark:bg-brand-navy-light/20 border-2 border-brand-blue/10 dark:border-brand-blue/20">
      <FormField
        control={control}
        name={`sizes.${id}.${index}.quantity`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-[11px] font-semibold text-brand-navy dark:text-white/90">Qty</FormLabel>
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
                onKeyDown={(e) => onKeyDown(e, id, index)}
                value={field.value?.toString()}
                min="0"
                className="h-8 text-sm bg-white dark:bg-brand-navy-dark border-2 border-brand-blue/20 dark:border-brand-blue/30 text-brand-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-brand-yellow focus:ring-brand-yellow/20"
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
            <FormLabel className="text-[11px] font-semibold text-brand-navy dark:text-white/90">Color</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-8 text-sm bg-white dark:bg-brand-navy-dark border-2 border-brand-blue/20 dark:border-brand-blue/30 text-brand-navy dark:text-white focus:border-brand-yellow focus:ring-brand-yellow/20">
                  <SelectValue>
                    {field.value && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${colorStyles[field.value]}`} />
                        <span className="truncate">{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white dark:bg-brand-navy-dark border-2 border-brand-blue/20 dark:border-brand-blue/30">
                {Object.entries(colorStyles).map(([color, bgClass]) => (
                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ring-1 ring-black/5 dark:ring-white/10 ${bgClass}`} />
                    <span>{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
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
        className="h-8 w-8 px-0 mb-[2px] text-brand-navy/70 hover:text-red-600 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
      >
        ✕
      </Button>
    </div>
  );
};
