
import { motion } from "framer-motion";
import { ArrowRight, Mail, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

export default function Shop() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate subscription
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Thanks for your interest!",
      description: "We'll notify you when our shop launches.",
    });

    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue-light/20 dark:bg-brand-yellow/20 rounded-full">
              <ShoppingBag className="w-4 h-4 text-brand-navy dark:text-brand-yellow" />
              <span className="text-sm font-medium text-brand-navy dark:text-brand-yellow">
                Coming Soon
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-brand-navy dark:text-white">
              Our Online Shop is
              <br />
              Opening Soon
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We're putting the finishing touches on our online store. Soon you'll be able to browse 
              and purchase our premium printing products directly online.
            </p>

            {/* Email Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <div className="glass-card p-8 mt-8">
                <h2 className="text-xl font-semibold text-brand-navy dark:text-white mb-4">
                  Be the First to Know
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/50 dark:bg-brand-navy-dark/50 border-2 border-brand-blue/20 focus:border-brand-navy dark:border-brand-blue/20 dark:focus:border-brand-yellow"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90 group"
                  >
                    {isSubmitting ? (
                      "Subscribing..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Notify Me
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Product Categories Preview */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "Custom T-Shirts",
                  description: "High-quality custom printed t-shirts for any occasion"
                },
                {
                  title: "Business Materials",
                  description: "Professional business cards, brochures, and more"
                },
                {
                  title: "Promotional Items",
                  description: "Custom branded merchandise and promotional products"
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-left hover:-translate-y-1 transition-transform"
                >
                  <h3 className="text-lg font-semibold text-brand-navy dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
