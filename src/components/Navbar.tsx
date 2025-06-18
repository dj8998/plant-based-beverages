import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Add search functionality if needed
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold">qualFirst.</h1>
            </Link>
          </div>
          
          {/* <div className="hidden md:block flex-1 mx-10">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <Input
                  ref={inputRef}
                  className="w-full"
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div> */}
          
          <div className="hidden md:block">
            <div className="flex items-center ml-4 space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Browse Products
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] p-2">
                  <div className="grid gap-1">
                    <DropdownMenuItem asChild>
                      <Link to="/product/soy-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Soy Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/product/almond-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Almond Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/product/millet-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Millet Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/product/oat-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Oat Milk
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/product/tofu-products" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Tofu Products
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Resources
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[400px] p-2">
                  <div className="grid gap-1">
                    <DropdownMenuItem asChild>
                      <Link to="/about-us" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        About Us
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/contact" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Contact Us
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/services" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                        Services
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Browse
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] p-2">
                <div className="grid gap-1">
                  <DropdownMenuItem asChild>
                    <Link to="/product/soy-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Soy Milk
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/product/almond-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Almond Milk
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/product/millet-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Millet Milk
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/product/oat-milk" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Oat Milk
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/product/tofu-products" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Tofu Products
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-sm">
                  Resources
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] p-2">
                <div className="grid gap-1">
                  <DropdownMenuItem asChild>
                    <Link to="/about-us" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      About Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/contact" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Contact Us
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/services" className="flex items-center p-2 hover:bg-gray-100 rounded-md">
                      Services
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
