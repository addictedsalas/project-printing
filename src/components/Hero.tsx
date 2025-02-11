
export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-vintage-cream overflow-hidden">
      <div className="absolute inset-0 bg-[url('/vintage-texture.png')] opacity-10"></div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-vintage-terracotta text-sm font-medium rounded-full mb-4 animate-fade-up">
            Custom Screen Printing
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-playfair animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Vintage Style,
            <br />
            Modern Quality
          </h1>
          <p className="text-xl mb-8 text-vintage-charcoal/80 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Premium custom screen printing for your retro-inspired sportswear and apparel dreams.
          </p>
          <div className="space-x-4 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <a href="/order" className="vintage-button">
              Start Your Order
            </a>
            <a href="/shop" className="vintage-button bg-transparent border-2 border-vintage-terracotta hover:bg-vintage-terracotta hover:text-white">
              Browse Shop
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
