
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold">qualFirst.</h1>
            </Link>
          </div>
          
          <div className="hidden md:block flex-1 mx-10">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <Input
                  className="w-full"
                  type="search"
                  placeholder="Search for products or suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center ml-4 space-x-4">
              <div className="relative group">
                <Button variant="ghost">Explore Suppliers</Button>
              </div>
              
              <div className="relative group">
                <Button variant="ghost">Resources</Button>
              </div>
              
              <Button className="bg-black text-white hover:bg-gray-800">
                Raise a Requirement
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
