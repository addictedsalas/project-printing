
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, User, Building2, MessageSquare } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { OrderFormValues } from "@/types/order";

export const ContactForm = () => {
  const form = useFormContext<OrderFormValues>();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2 text-brand-navy dark:text-white">Contact Information</h3>
        <p className="text-gray-600 dark:text-gray-300">Please provide your contact details for the quote</p>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="contactInfo.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                  className="bg-white/80 dark:bg-brand-navy-dark/80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="john@example.com" 
                  {...field}
                  className="bg-white/80 dark:bg-brand-navy-dark/80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  {...field}
                  className="bg-white/80 dark:bg-brand-navy-dark/80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo.company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Name (Optional)
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your Company" 
                  {...field}
                  className="bg-white/80 dark:bg-brand-navy-dark/80"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInfo.message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Additional Message (Optional)
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional details or special requirements..."
                  className="min-h-[100px] bg-white/80 dark:bg-brand-navy-dark/80"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
