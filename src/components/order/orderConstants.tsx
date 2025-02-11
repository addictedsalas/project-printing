
import { Shirt, Package2 } from "lucide-react";

export const materialTypeOptions = {
  cotton: [
    { value: "combed", label: "Combed Cotton" },
    { value: "ring-spun", label: "Ring-Spun Cotton" },
    { value: "organic", label: "Organic Cotton" },
  ],
  "5050": [
    { value: "cotton-poly", label: "Cotton/Polyester Blend" },
    { value: "tri-blend", label: "Tri-Blend" },
    { value: "recycled", label: "Recycled Blend" },
  ],
  polyester: [
    { value: "moisture-wicking", label: "Moisture Wicking" },
    { value: "performance", label: "Performance Polyester" },
    { value: "micro", label: "Micro Polyester" },
  ],
};

export const garmentIcons = {
  tshirt: <Shirt className="w-6 h-6" />,
  hoodie: <Package2 className="w-6 h-6" />,
  sweatshirt: <Shirt className="w-6 h-6" />,
  tank: <Shirt className="w-6 h-6" />,
};

export const colorStyles = {
  "white": "bg-white",
  "black": "bg-black",
  "navy": "bg-blue-900",
  "royal-blue": "bg-blue-600",
  "heather-gray": "bg-gray-400",
  "charcoal": "bg-gray-700",
  "red": "bg-red-600",
  "maroon": "bg-red-900",
  "kelly-green": "bg-green-600",
  "forest-green": "bg-green-900",
  "purple": "bg-purple-600",
  "yellow": "bg-yellow-400",
  "orange": "bg-orange-500",
  "pink": "bg-pink-500",
};
