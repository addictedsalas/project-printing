
export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-brand-blue/10 transform -skew-y-6"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/5 via-brand-blue/5 to-brand-navy/5 transform skew-y-3"></div>
      </div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-6 py-2 bg-brand-yellow text-sm font-medium mb-4 animate-fade-up shadow-[4px_4px_0px_0px_#1B2B65]">
            Custom Screen Printing
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Exceptional Print
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-navy to-brand-blue-dark">
              Remarkable Results
            </span>
          </h1>
          <p className="text-xl mb-8 text-brand-navy/80 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Premium custom screen printing for your modern apparel and branding needs.
          </p>
          <div className="space-x-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <a href="/order" className="brand-button">
              Start Your Order
            </a>
            <a href="/shop" className="brand-button bg-transparent border-2 border-brand-navy hover:bg-brand-navy hover:text-white">
              Browse Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
