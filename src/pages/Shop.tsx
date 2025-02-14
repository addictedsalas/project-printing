
import { motion } from "framer-motion";
import { Search, ShoppingBag, Filter } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

// Datos de ejemplo - Luego los moveremos a un archivo separado
const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 24.99,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=60",
    featured: true
  },
  {
    id: 2,
    name: "Premium Hoodie",
    price: 49.99,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60",
    featured: true
  },
  {
    id: 3,
    name: "Business Cards",
    price: 19.99,
    category: "business",
    image: "https://images.unsplash.com/photo-1606293459339-c8f6493a0e0b?w=800&auto=format&fit=crop&q=60",
    featured: false
  },
  {
    id: 4,
    name: "Custom Mug",
    price: 14.99,
    category: "promotional",
    image: "https://images.unsplash.com/photo-1581512798638-8ef5c4c16e54?w=800&auto=format&fit=crop&q=60",
    featured: false
  }
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "t-shirts", name: "T-Shirts" },
  { id: "hoodies", name: "Hoodies" },
  { id: "business", name: "Business Materials" },
  { id: "promotional", name: "Promotional Items" }
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-light/20 dark:bg-brand-yellow/20 rounded-full">
              <ShoppingBag className="w-4 h-4 text-brand-navy dark:text-brand-yellow" />
              <span className="text-sm font-medium text-brand-navy dark:text-brand-yellow">
                Our Products
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-brand-navy dark:text-white">
              Print Shop
            </h1>
          </motion.div>
        </div>

        {/* Search and Filter Bar */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-brand-navy-dark/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        {selectedCategory === "all" && searchQuery === "" && (
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.filter(p => p.featured).map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative overflow-hidden rounded-xl bg-white dark:bg-brand-navy-dark/80 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-brand-navy dark:text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-brand-yellow">
                      ${product.price}
                    </p>
                    <Button className="w-full mt-4 bg-brand-navy dark:bg-brand-yellow dark:text-brand-navy">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* All Products Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-lg bg-white dark:bg-brand-navy-dark/80 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-brand-navy dark:text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-brand-yellow mb-4">
                    ${product.price}
                  </p>
                  <Button className="w-full bg-brand-navy dark:bg-brand-yellow dark:text-brand-navy">
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
