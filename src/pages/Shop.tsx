
import { motion } from "framer-motion";
import { Clock, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      
      <div className="container mx-auto px-4 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-light/20 dark:bg-brand-yellow/20 rounded-full">
            <Clock className="w-4 h-4 text-brand-navy dark:text-brand-yellow" />
            <span className="text-sm font-medium text-brand-navy dark:text-brand-yellow">
              Coming Soon
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-brand-navy dark:text-white">
            Our Shop is Under Construction
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            We're working hard to bring you an amazing shopping experience. 
            Stay tuned for our collection of custom apparel and promotional items.
          </p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-brand-yellow opacity-80" />
          </motion.div>

          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/order")}
              size="lg"
              className="bg-brand-navy hover:bg-brand-navy/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90"
            >
              Start Your Custom Order
            </Button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Can't wait? You can still place a custom order with us!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
