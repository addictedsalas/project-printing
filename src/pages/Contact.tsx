import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-brand-navy dark:text-white mb-4"
            >
              Get in Touch
            </motion.h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Have a question or ready to start your custom printing project?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="glass-card hover:translate-x-2">
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <a 
                    href="tel:+1234567890" 
                    className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-blue-light/20 dark:bg-brand-yellow/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand-navy dark:text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-navy dark:text-white">Phone</p>
                      <p>(123) 456-7890</p>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:info@projectprinting.com"
                    className="flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-brand-yellow transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-blue-light/20 dark:bg-brand-yellow/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-navy dark:text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-navy dark:text-white">Email</p>
                      <p>info@projectprinting.com</p>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <div className="w-12 h-12 rounded-full bg-brand-blue-light/20 dark:bg-brand-yellow/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand-navy dark:text-brand-yellow" />
                    </div>
                    <div>
                      <p className="font-medium text-brand-navy dark:text-white">Address</p>
                      <p>123 Design Avenue</p>
                      <p>Miami, FL 33101</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card hover:translate-x-2">
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">
                  Business Hours
                </h2>
                <div className="space-y-3 text-gray-600 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="glass-card space-y-6">
                <h2 className="text-2xl font-bold text-brand-navy dark:text-white mb-6">
                  Send us a Message
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </label>
                    <Input 
                      required
                      type="text"
                      placeholder="John"
                      className="bg-white/50 dark:bg-brand-navy-dark/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </label>
                    <Input 
                      required
                      type="text"
                      placeholder="Doe"
                      className="bg-white/50 dark:bg-brand-navy-dark/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <Input 
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="bg-white/50 dark:bg-brand-navy-dark/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <Input 
                    required
                    type="text"
                    placeholder="How can we help?"
                    className="bg-white/50 dark:bg-brand-navy-dark/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <Textarea 
                    required
                    placeholder="Type your message here..."
                    className="min-h-[150px] bg-white/50 dark:bg-brand-navy-dark/50"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg bg-brand-yellow text-brand-navy hover:bg-brand-yellow/90 dark:bg-brand-yellow dark:text-brand-navy dark:hover:bg-brand-yellow/90"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
