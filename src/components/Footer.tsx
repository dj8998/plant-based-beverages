
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">qualFirst.</h2>
            <p className="text-sm font-medium mb-2">Building Great Business Stories</p>
            <p className="text-sm text-gray-400">
              Historically, Indians associate desi word 'jugaad' with good business practices. 
              Tell us what you need and we'll help you find the right supplier to help your business grow.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">For buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-request" className="hover:text-gray-300">Post a Request</Link></li>
              <li><Link to="/catalog" className="hover:text-gray-300">Explore Catalogues</Link></li>
              <li><Link to="/talk-to-expert" className="hover:text-gray-300">Talk to an expert</Link></li>
              <li><Link to="/request-callback" className="hover:text-gray-300">Request a call back</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">For suppliers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login-portal" className="hover:text-gray-300">Login to Portal</Link></li>
              <li><Link to="/raise-query" className="hover:text-gray-300">Raise a query</Link></li>
              <li><Link to="/request-callback" className="hover:text-gray-300">Request a call back</Link></li>
              <li><Link to="/request-callback" className="hover:text-gray-300">Get Listed</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about-us" className="hover:text-gray-300">Our Mission</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-sm text-gray-400 text-center">
          <p>&copy; {new Date().getFullYear()} qualFirst. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
