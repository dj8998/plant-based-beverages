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
        // Match subcategories - now also treated as products for direct linking
        if (subcategory.name.toLowerCase().includes(lowerCaseQuery)) {
          results.push({
            type: 'product', // Treat as product for direct linking
            name: subcategory.name,
            categoryId: category.id,
            subcategoryId: subcategory.id
          });
        }
        
        // Match products (if they exist separately under subcategories)
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
    if (searchResults.length > 0) {
        const firstResultSlug = createSlug(searchResults[0].name);
        window.location.href = `/product/${firstResultSlug}`;
    }
  };

  // Helper function to create URL-safe slug
  const createSlug = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="bg-green-100 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6 text-emerald-800">FIND YOUR PERFECT PLANT-BASED MATCH</h2>
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Input
                ref={inputRef}
                className="w-full pr-10 border-emerald-300 focus:border-emerald-500"
                type="search"
                placeholder="Search for soy milk, almond milk, oat milk, or millet milk..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.length >= 2 && setShowDropdown(true)}
              />
              <Button 
                type="submit" 
                className="absolute inset-y-0 right-0 px-3 flex items-center bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
          
          {/* Search results dropdown */}
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute mt-1 w-full max-w-lg bg-white border border-emerald-200 rounded-md shadow-lg z-20 max-h-80 overflow-y-auto left-1/2 transform -translate-x-1/2"
            >
              {searchResults.length > 0 ? (
                <div>
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      to={`/product/${createSlug(result.name)}`} // Always link to product page
                      className="block px-4 py-2 text-sm hover:bg-emerald-50 border-b border-emerald-100 last:border-b-0 text-gray-800"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-start">
                        <div>
                          <div className="font-medium text-emerald-700">{result.name}</div>
                          <div className="text-xs text-gray-500">
                            {result.type === 'subcategory' ? 'Product Category' : 'Product'} in {
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
