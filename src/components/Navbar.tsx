import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import categoriesData from '../data/categories.json';

type SearchResult = {
  type: 'subcategory' | 'product';
  name: string;
  categoryId: string;
  subcategoryId: string;
  productName?: string;
};

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
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

  // Search function
  const performSearch = (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    
    const results: SearchResult[] = [];
    const lowerCaseQuery = query.toLowerCase();
    
    categoriesData.categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        // Match subcategories
        if (subcategory.name.toLowerCase().includes(lowerCaseQuery)) {
          results.push({
            type: 'subcategory',
            name: subcategory.name,
            categoryId: category.id,
            subcategoryId: subcategory.id
          });
        }
        
        // Match products
        if (subcategory.products) {
          subcategory.products.forEach(product => {
            if (product.toLowerCase().includes(lowerCaseQuery)) {
              results.push({
                type: 'product',
                name: product,
                categoryId: category.id,
                subcategoryId: subcategory.id,
                productName: product
              });
            }
          });
        }
      });
    });
    
    setSearchResults(results.slice(0, 10)); // Limit to 10 results
    setShowDropdown(results.length > 0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Helper function to create URL-safe slug
  const createSlug = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '-');
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
          
          <div className="hidden md:block flex-1 mx-10">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-xl">
                <Input
                  ref={inputRef}
                  className="w-full"
                  type="search"
                  placeholder="Search for products or suppliers..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                
                {/* Search results dropdown with fixed positioning and higher z-index */}
                {showDropdown && (
                  <div 
                    ref={dropdownRef}
                    className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto z-50"
                    style={{ 
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                    }}
                  >
                    {searchResults.length > 0 ? (
                      <div>
                        {searchResults.map((result, index) => (
                          <Link
                            key={index}
                            to={result.type === 'subcategory' 
                              ? `/category/${result.categoryId}/${result.subcategoryId}` 
                              : `/product/${createSlug(result.name)}`}
                            className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                            onClick={() => setShowDropdown(false)}
                          >
                            <div className="flex items-start">
                              <div>
                                <div className="font-medium">{result.name}</div>
                                <div className="text-xs text-gray-500">
                                  {result.type === 'subcategory' ? 'Category' : 'Product'} in {
                                    categoriesData.categories.find(cat => cat.id === result.categoryId)?.name
                                  }
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-sm text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center ml-4 space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Explore Suppliers</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white z-[200]">
                      <div className="p-4 w-[250px]">
                        {categoriesData.categories.map((category) => (
                          <Link 
                            key={category.id}
                            to={`/category/${category.id}`} 
                            className="block py-2 hover:text-blue-600"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white z-[200]">
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

          {/* Mobile buttons - REMOVED SEARCH BAR */}
          <div className="flex md:hidden space-x-2">
            {/* Remove search input for mobile */}
            
            {/* Direct dropdown buttons for mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs px-2">
                  Explore
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white w-[250px]">
                {categoriesData.categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link to={`/category/${category.id}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs px-2">
                  Resources
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
