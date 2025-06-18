import { Link } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">QF</span>
              </div>
              <span className="font-bold text-xl">QualFirst</span>
            </div>
            <p className="text-sm lg:text-base text-gray-300 mb-4">
              Your trusted partner for premium plant-based beverage exports from India.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm lg:text-base text-gray-300">
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="text-sm lg:text-base text-gray-300">
                <a href="mailto:info@qualfirst.com" className="hover:text-white transition-colors">
                  info@qualfirst.com
                </a>
              </li>
              <li className="text-sm lg:text-base text-gray-300">
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center">
          <p className="text-sm lg:text-base text-gray-400">
            © 2024 QualFirst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 