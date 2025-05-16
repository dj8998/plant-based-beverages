
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // This would typically navigate to search results page with the query
  };

  return (
    <div className="bg-pink-light py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-6">HAVE A SPECIFIC PRODUCT IN MIND?</h2>
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <Input
              className="w-full pr-10"
              type="search"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>
    </div>
  );
};

export default ProductSearch;
