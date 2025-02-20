
import { OrderFormValues } from "@/types/order";

export const defaultFormValues: OrderFormValues = {
  garmentType: "",
  cottonType: "",
  brand: "",
  sizeType: "adult",
  sizes: {
    xsmall: [],
    small: [],
    medium: [],
    large: [],
    xlarge: [],
    xxlarge: [],
    youth_s: [],
    youth_m: [],
    youth_l: [],
  },
  printLocations: [],
  designs: {},
  fabricQuality: "",
  itemIndex: 0,
  contactInfo: {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  },
};

export const getTotalQuantity = (sizes: OrderFormValues['sizes']) => {
  return Object.values(sizes).reduce((total, sizeColors) => {
    return total + sizeColors.reduce((sizeTotal, sc) => sizeTotal + Number(sc.quantity), 0);
  }, 0);
};
