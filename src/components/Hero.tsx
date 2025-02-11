
import { Sparkles, Crown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background layers - reduced intensity */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 via-brand-blue/5 to-brand-navy/10"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1274e149-0985-497d-9e89-bcbadab93069.png')] bg-center bg-no-repeat opacity-5"></div>
        <div className="absolute inset-0 bg-brand-blue/5 transform -skew-y-3 transition-transform duration-1000"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge - reduced bounce */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-yellow text-brand-navy text-sm font-medium mb-6 shadow-[2px_2px_0px_0px_#1B2B65] hover:shadow-[3px_3px_0px_0px_#1B2B65] transition-all duration-300">
            <Crown className="w-4 h-4" />
            <span>Custom Screen Printing</span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main heading - softer animations */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 opacity-0 animate-fade-up" style={{ animationDelay: "0.2s", animationDuration: "0.8s" }}>
            Exceptional Print
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy via-[#8B5CF6] to-[#D946EF] transition-all duration-700 dark:from-brand-yellow dark:via-brand-blue dark:to-white">
                Remarkable Results
              </span>
            </span>
          </h1>

          {/* Description - gentle fade */}
          <p className="text-xl mb-8 text-brand-navy/80 opacity-0 animate-fade-up dark:text-white/80" style={{ animationDelay: "0.4s", animationDuration: "0.8s" }}>
            Premium custom screen printing for your modern apparel and branding needs.
            <span className="block mt-2 text-brand-navy/60 dark:text-white/60">
              Bring your designs to life with expert craftsmanship
            </span>
          </p>

          {/* Buttons - subtle hover effects */}
          <div className="space-x-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s", animationDuration: "0.8s" }}>
            <a href="/order" className="brand-button inline-block transition-all duration-300 group">
              Start Your Order
              <span className="inline-block ml-2 group-hover:translate-y-0.5 transition-transform duration-300">✨</span>
            </a>
            <a href="/shop" className="brand-button bg-transparent border-2 border-brand-navy hover:bg-brand-navy hover:text-white inline-block transition-all duration-300 dark:border-white dark:hover:bg-white dark:hover:text-brand-navy group">
              Browse Shop
              <span className="inline-block ml-2 group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </a>
          </div>

          {/* Floating elements - reduced quantity and subtler animation */}
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-brand-yellow rounded-full opacity-20"></div>
          <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-brand-blue rounded-full opacity-10"></div>
        </div>
      </div>
    </div>
  );
}
