import { Link } from 'react-router-dom';
import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">qualFirst.</h2>
            <p className="text-sm font-medium mb-2">Building Great Business Stories</p>
            <p className="text-sm text-gray-400">
              QualFirst is your dedicated partner for sourcing and exporting premium plant-based beverages and products globally.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-gray-300">Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
              <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
              <li><Link to="/post-requirement" className="hover:text-gray-300">Post Requirement</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/qualfirst/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/qualfirstint" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} QualFirst. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
