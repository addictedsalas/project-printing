
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-8 sm:py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-brand-yellow transition-colors justify-center md:justify-start">
                <Phone className="w-4 h-4" />
                (123) 456-7890
              </a>
              <a href="mailto:info@projectprinting.com" className="flex items-center gap-2 hover:text-brand-yellow transition-colors justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                info@projectprinting.com
              </a>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>123 Print Street, Design City, ST 12345</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <a href="/order" className="block hover:text-brand-yellow transition-colors">Custom Orders</a>
              <a href="/shop" className="block hover:text-brand-yellow transition-colors">Shop</a>
              <a href="/blog" className="block hover:text-brand-yellow transition-colors">Blog</a>
              <a href="/contact" className="block hover:text-brand-yellow transition-colors">Contact</a>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="hover:text-brand-yellow transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-yellow transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-brand-yellow transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-none focus:outline-none focus:border-brand-yellow flex-grow text-white placeholder:text-white/50"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-yellow text-brand-navy font-semibold hover:bg-white transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Project Printing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
