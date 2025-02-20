
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { ThankYouScreen } from "@/components/order/ThankYouScreen";
import { OrderFormContent } from "@/components/order/OrderFormContent";
import { useOrderForm } from "@/hooks/order/useOrderForm";

export default function Order() {
  const [mounted, setMounted] = useState(false);
  const orderForm = useOrderForm();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  if (orderForm.isSubmitted) return <ThankYouScreen />;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-blue-light/20 via-white to-brand-yellow-light/20 dark:from-brand-navy-dark dark:via-brand-navy dark:to-brand-navy-light">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <OrderFormContent {...orderForm} />
        </div>
      </div>
    </div>
  );
}
