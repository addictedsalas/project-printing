
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
    <div className="flex items-end gap-2 p-2 rounded bg-white/80 shadow-sm ring-1 ring-gray-950/10 dark:bg-brand-navy-dark/50 dark:border-brand-blue/10">
      <FormField
        control={control}
        name={`sizes.${id}.${index}.quantity`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-[10px] font-semibold text-slate-800 dark:text-gray-400">Qty</FormLabel>
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
                className="h-7 text-xs bg-white border border-gray-950/20 text-slate-900 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow"
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
            <FormLabel className="text-[10px] font-semibold text-slate-800 dark:text-gray-400">Color</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-7 text-xs bg-white border border-gray-950/20 text-slate-900 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow">
                  <SelectValue>
                    {field.value && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-3 h-3 rounded-full shadow-sm ${colorStyles[field.value]} border`} />
                        <span className="truncate font-medium">{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border border-gray-950/20 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                {Object.entries(colorStyles).map(([color, bgClass]) => (
                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full shadow-sm ${bgClass} border`} />
                    <span className="font-medium">{color.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
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
        className="h-7 w-7 px-0 mb-[2px] text-slate-700 hover:text-red-600 hover:bg-red-50 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
      >
        ✕
      </Button>
    </div>
  );
};
