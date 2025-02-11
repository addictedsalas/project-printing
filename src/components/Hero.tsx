
import { Sparkles, Crown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 via-brand-blue/10 to-brand-navy/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1274e149-0985-497d-9e89-bcbadab93069.png')] bg-center bg-no-repeat opacity-5 animate-float"></div>
        <div className="absolute inset-0 bg-brand-blue/10 transform -skew-y-6 hover:skew-y-0 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 via-brand-blue/5 to-brand-navy/10 transform skew-y-3 hover:scale-105 transition-transform duration-700"></div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-brand-yellow text-brand-navy text-sm font-medium mb-6 animate-bounce shadow-[4px_4px_0px_0px_#1B2B65] hover:shadow-[6px_6px_0px_0px_#1B2B65] hover:-translate-y-0.5 transition-all duration-300">
            <Crown className="w-4 h-4" />
            <span>Custom Screen Printing</span>
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Exceptional Print
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy via-[#8B5CF6] to-[#D946EF] hover:from-[#D946EF] hover:via-[#8B5CF6] hover:to-brand-navy transition-all duration-500 dark:from-brand-yellow dark:via-brand-blue dark:to-white dark:hover:from-white dark:hover:via-brand-blue dark:hover:to-brand-yellow animate-pulse">
                Remarkable Results
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl mb-8 text-brand-navy/80 animate-fade-up hover:text-brand-navy transition-colors duration-300 dark:text-white/80 dark:hover:text-white" style={{ animationDelay: "0.4s" }}>
            Premium custom screen printing for your modern apparel and branding needs.
            <span className="block mt-2 text-brand-navy/60 dark:text-white/60">
              Bring your designs to life with expert craftsmanship
            </span>
          </p>

          {/* Buttons */}
          <div className="space-x-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <a href="/order" className="brand-button inline-block hover:scale-105 transition-transform duration-300 group">
              Start Your Order
              <span className="inline-block ml-2 group-hover:rotate-12 transition-transform duration-300">✨</span>
            </a>
            <a href="/shop" className="brand-button bg-transparent border-2 border-brand-navy hover:bg-brand-navy hover:text-white inline-block hover:scale-105 transition-transform duration-300 dark:border-white dark:hover:bg-white dark:hover:text-brand-navy group">
              Browse Shop
              <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-brand-yellow rounded-full animate-float opacity-50"></div>
          <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-brand-blue rounded-full animate-float opacity-30" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-brand-navy rounded-full animate-float opacity-40" style={{ animationDelay: "1.5s" }}></div>
        </div>
      </div>
    </div>
  );
}
