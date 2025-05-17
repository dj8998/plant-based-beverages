
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import categoriesData from '../data/categories.json';
import { Link } from 'react-router-dom';

type SearchResult = {
  type: 'subcategory' | 'product';
  name: string;
  categoryId: string;
  subcategoryId: string;
  productName?: string;
};

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // This would typically navigate to search results page with the query
  };

  // Helper function to create URL-safe slug
  const createSlug = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="bg-pink-light py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-6">HAVE A SPECIFIC PRODUCT IN MIND?</h2>
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Input
                ref={inputRef}
                className="w-full pr-10"
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
              />
              <Button 
                type="submit" 
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                variant="ghost"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </form>
          
          {/* Search results dropdown */}
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute mt-1 w-full max-w-lg bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-80 overflow-y-auto left-1/2 transform -translate-x-1/2"
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
  );
};

export default ProductSearch;
