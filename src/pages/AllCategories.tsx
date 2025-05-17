
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import ProductSearch from '../components/ProductSearch';
import categoriesData from '../data/categories.json';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AllCategories = () => {
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleCategory = (categoryId: string) => {
    if (openCategories.includes(categoryId)) {
      setOpenCategories(openCategories.filter(id => id !== categoryId));
    } else {
      setOpenCategories([...openCategories, categoryId]);
    }
  };

  // Filter categories and subcategories based on search query
  const filteredCategories = categoriesData.categories.filter(category => {
    if (searchQuery === '') return true;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    
    // Check if category name matches
    if (category.name.toLowerCase().includes(lowerCaseQuery)) return true;
    
    // Check if any subcategory name matches
    const hasMatchingSubcategory = category.subcategories.some(subcategory => 
      subcategory.name.toLowerCase().includes(lowerCaseQuery) ||
      (subcategory.products && subcategory.products.some(product => 
        product.toLowerCase().includes(lowerCaseQuery)
      ))
    );
    
    return hasMatchingSubcategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">All Categories</h1>
          <p className="text-gray-600 mb-6">
            Browse our complete product catalog organized by categories and subcategories.
            We offer over 2,000 specialized product lines from verified Indian manufacturers.
          </p>
          
          {/* Added search functionality */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <Input
                className="w-full pr-10"
                type="search"
                placeholder="Search categories, subcategories, or products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div key={category.id} className="border rounded-lg">
                  <div 
                    className="bg-gray-50 p-4 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <Badge variant="outline">
                      {category.subcategories.reduce((total, sub) => 
                        total + (sub.products ? sub.products.length : 0), 0)} products
                    </Badge>
                  </div>
                  
                  {openCategories.includes(category.id) && (
                    <div className="p-4">
                      <Accordion type="multiple" className="w-full">
                        {category.subcategories.map((subcategory) => (
                          <AccordionItem value={subcategory.id} key={subcategory.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex justify-between w-full pr-4">
                                <span className="font-medium">{subcategory.name}</span>
                                <Badge variant="secondary" className="ml-2">
                                  {subcategory.products ? subcategory.products.length : 0}
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              {subcategory.products && subcategory.products.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-4">
                                  {subcategory.products.map((product, index) => (
                                    <Link 
                                      key={index}
                                      to={`/product/${product.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-blue-600 hover:underline text-sm py-1"
                                    >
                                      {product}
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic pl-4">No products available</p>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 border rounded-lg bg-gray-50">
                <p className="text-gray-600">No categories match your search.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllCategories;
