
import { z } from "zod";

export const sizeColorSchema = z.object({
  quantity: z.string(),
  color: z.string()
});

export type SizeColor = z.infer<typeof sizeColorSchema>;

export const contactInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
  message: z.string().optional(),
});

export type ContactInfo = z.infer<typeof contactInfoSchema>;

export const orderFormSchema = z.object({
  garmentType: z.string(),
  cottonType: z.string(),
  brand: z.string(),
  sizeType: z.enum(["adult", "youth"]),
  sizes: z.record(z.array(sizeColorSchema)),
  printLocations: z.array(z.string()),
  designs: z.record(z.string()),
  fabricQuality: z.string(),
  itemIndex: z.number().optional(),
  contactInfo: contactInfoSchema.optional(),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
export type SizesKey = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "youth_s" | "youth_m" | "youth_l";
