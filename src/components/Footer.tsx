
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Info */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-base font-bold mb-2">Contact Us</h3>
            <div className="space-y-2">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-brand-yellow transition-colors justify-center md:justify-start text-sm">
                <Phone className="w-3.5 h-3.5" />
                (123) 456-7890
              </a>
              <a href="mailto:info@projectprinting.org" className="flex items-center gap-2 hover:text-brand-yellow transition-colors justify-center md:justify-start text-sm">
                <Mail className="w-3.5 h-3.5" />
                info@projectprinting.org
              </a>
              <div className="flex items-center gap-2 justify-center md:justify-start text-sm">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Miami, FL</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-base font-bold mb-2">Quick Links</h3>
            <div className="space-y-2">
              <a href="/order" className="block hover:text-brand-yellow transition-colors text-sm">Custom Orders</a>
              <a href="/shop" className="block hover:text-brand-yellow transition-colors text-sm">Shop</a>
              <a href="/blog" className="block hover:text-brand-yellow transition-colors text-sm">Blog</a>
              <a href="/contact" className="block hover:text-brand-yellow transition-colors text-sm">Contact</a>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-base font-bold mb-2">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="hover:text-brand-yellow transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-4">
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-none focus:outline-none focus:border-brand-yellow flex-grow text-white placeholder:text-white/50 text-sm"
                />
                <button 
                  type="submit"
                  className="px-3 py-1.5 bg-brand-yellow text-brand-navy font-semibold hover:bg-white transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="mt-2 flex justify-center md:justify-start">
              <a 
                href="https://g.co/kgs/BTDgGjs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand-navy"
                >
                  Rate us
                </Button>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} Project Printing by 2FR Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
