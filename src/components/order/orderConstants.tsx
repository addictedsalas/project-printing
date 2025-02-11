
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
  "white": "bg-white border-gray-400",
  "black": "bg-black border-gray-900",
  "navy": "bg-blue-900 border-blue-950",
  "royal-blue": "bg-blue-600 border-blue-700",
  "heather-gray": "bg-gray-400 border-gray-500",
  "charcoal": "bg-gray-700 border-gray-800",
  "red": "bg-red-600 border-red-700",
  "maroon": "bg-red-900 border-red-950",
  "kelly-green": "bg-green-600 border-green-700",
  "forest-green": "bg-green-900 border-green-950",
  "purple": "bg-purple-600 border-purple-700",
  "yellow": "bg-yellow-400 border-yellow-500",
  "orange": "bg-orange-500 border-orange-600",
  "pink": "bg-pink-500 border-pink-600"
} as const;
