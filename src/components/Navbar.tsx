
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-brand-blue">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/1274e149-0985-497d-9e89-bcbadab93069.png" alt="Project Printing" className="h-8" />
            <span className="text-xl font-bold">Project Printing</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/order" className="hover:text-brand-yellow transition-colors">Order Custom</a>
            <a href="/shop" className="hover:text-brand-yellow transition-colors">Shop</a>
            <a href="/blog" className="hover:text-brand-yellow transition-colors">Blog</a>
            <a href="/contact" className="hover:text-brand-yellow transition-colors">Contact</a>
            <a href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-navy text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
            <a href="/order" className="block py-2 hover:text-brand-yellow transition-colors">Order Custom</a>
            <a href="/shop" className="block py-2 hover:text-brand-yellow transition-colors">Shop</a>
            <a href="/blog" className="block py-2 hover:text-brand-yellow transition-colors">Blog</a>
            <a href="/contact" className="block py-2 hover:text-brand-yellow transition-colors">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}
