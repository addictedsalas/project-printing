
import { z } from "zod";

export const orderFormSchema = z.object({
  quantity: z.string(),
  garmentType: z.string(),
  color: z.string(),
  cottonType: z.string(),
  materialType: z.enum(["cotton", "5050", "polyester"]),
  brand: z.string(),
  sizeType: z.enum(["adult", "youth"]),
  sizes: z.object({
    xsmall: z.string(),
    small: z.string(),
    medium: z.string(),
    large: z.string(),
    xlarge: z.string(),
    xxlarge: z.string(),
    youth_s: z.string(),
    youth_m: z.string(),
    youth_l: z.string(),
  }),
  printLocations: z.array(z.string()),
  designs: z.record(z.string(), z.string()),
  fabricQuality: z.string(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type SizesKey = keyof OrderFormValues['sizes'];
