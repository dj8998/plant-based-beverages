
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore Suppliers</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <div className="p-4 w-[200px]">
                        <Link to="/category/1" className="block py-2 hover:text-blue-600">Clothing</Link>
                        <Link to="/category/2" className="block py-2 hover:text-blue-600">Home Furnishing</Link>
                        <Link to="/category/3" className="block py-2 hover:text-blue-600">Handicrafts</Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <div className="p-4 w-[200px]">
                        <Link to="/about-us" className="block py-2 hover:text-blue-600">About Us</Link>
                        <Link to="/blog" className="block py-2 hover:text-blue-600">Blog</Link>
                        <Link to="/contact" className="block py-2 hover:text-blue-600">Contact Us</Link>
                        <Link to="/request-callback" className="block py-2 hover:text-blue-600">Schedule a Meeting</Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <Link to="/post-request">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Raise a Requirement
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80%]">
                <div className="p-4">
                  <div className="relative mb-6">
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
                  
                  <div className="space-y-4">
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full flex justify-between items-center">
                            Explore Suppliers
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white w-[200px]">
                          <DropdownMenuItem asChild>
                            <Link to="/category/1">Clothing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/category/2">Home Furnishing</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/category/3">Handicrafts</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full flex justify-between items-center">
                            Resources
                            <ChevronDown className="h-4 w-4 ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white w-[200px]">
                          <DropdownMenuItem asChild>
                            <Link to="/about-us">About Us</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/blog">Blog</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/contact">Contact Us</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to="/request-callback">Schedule a Meeting</Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <Link to="/post-request" className="block">
                      <Button className="w-full bg-black text-white hover:bg-gray-800">
                        Raise a Requirement
                      </Button>
                    </Link>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
