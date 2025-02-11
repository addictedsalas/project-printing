
import { z } from "zod";

export const sizeColorSchema = z.object({
  quantity: z.string(),
  color: z.string()
});

export type SizeColor = z.infer<typeof sizeColorSchema>;

export const orderFormSchema = z.object({
  garmentType: z.string(),
  cottonType: z.string(),
  materialType: z.enum(["cotton", "5050", "polyester"]),
  brand: z.string(),
  sizeType: z.enum(["adult", "youth"]),
  sizes: z.record(z.array(sizeColorSchema)),
  printLocations: z.array(z.string()),
  designs: z.record(z.string()),
  fabricQuality: z.string(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type SizesKey = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "youth_s" | "youth_m" | "youth_l";
