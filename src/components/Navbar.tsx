
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-vintage-offwhite/80 backdrop-blur-md z-50 border-b border-vintage-cream">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-xl font-bold font-playfair">
            Project Printing
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/order" className="hover:text-vintage-terracotta transition-colors">Order Custom</a>
            <a href="/shop" className="hover:text-vintage-terracotta transition-colors">Shop</a>
            <a href="/blog" className="hover:text-vintage-terracotta transition-colors">Blog</a>
            <a href="/contact" className="hover:text-vintage-terracotta transition-colors">Contact</a>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-vintage-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <a href="/order" className="block py-2 hover:text-vintage-terracotta transition-colors">Order Custom</a>
            <a href="/shop" className="block py-2 hover:text-vintage-terracotta transition-colors">Shop</a>
            <a href="/blog" className="block py-2 hover:text-vintage-terracotta transition-colors">Blog</a>
            <a href="/contact" className="block py-2 hover:text-vintage-terracotta transition-colors">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}
