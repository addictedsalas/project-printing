
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
    <div className="flex items-end gap-2 p-2 rounded bg-gray-50 border border-gray-100 dark:bg-brand-navy-dark/50 dark:border-brand-blue/10">
      <FormField
        control={control}
        name={`sizes.${id}.${index}.quantity`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Qty</FormLabel>
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
                className="h-7 text-xs bg-white border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow"
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
            <FormLabel className="text-[10px] font-medium text-gray-500 dark:text-gray-400">Color</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-7 text-xs bg-white border-gray-200 focus:border-brand-yellow focus:ring-brand-yellow/20 dark:bg-brand-navy-dark dark:border-brand-blue/20 dark:focus:border-brand-yellow">
                  <SelectValue>
                    {field.value && (
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${colorStyles[field.value]} border border-gray-200 dark:border-gray-700`} />
                        <span className="truncate">{field.value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                      </div>
                    )}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white border-gray-200 dark:bg-brand-navy-dark dark:border-brand-blue/20">
                {Object.entries(colorStyles).map(([color, bgClass]) => (
                  <SelectItem key={color} value={color} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${bgClass} border border-gray-200 dark:border-gray-700`} />
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
        className="h-7 w-7 px-0 mb-[2px] text-gray-400 hover:text-red-500 hover:bg-red-50 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
      >
        ✕
      </Button>
    </div>
  );
};
