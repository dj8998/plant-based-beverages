
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { updateManufacturerCategories, assignManufacturersToGifting, getCategoryMappingStats } from '@/utils/categoryMapping';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Type for manufacturer data
type Manufacturer = {
  company_name: string;
  product: string;
  "Top Category": string | null;
  Subcategories: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  "Qualfirst Rating": number | null;
};

type MappingStats = {
  totalManufacturers: number;
  uncategorizedCount: number;
  subcategoryCounts: Array<{ Subcategories: string; count: number }>;
}

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [productTypes, setProductTypes] = useState<{id: string; label: string}[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mappingStats, setMappingStats] = useState<MappingStats | null>(null);
  const [isMappingLoading, setIsMappingLoading] = useState(false);
  
  // Find the selected category and subcategory
  const category = categoriesData.categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(subcat => subcat.id === subcategoryId);

  // Check for admin mode
  useEffect(() => {
    const checkAdmin = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isAdminMode = searchParams.get('admin') === 'true';
      setIsAdmin(isAdminMode);
      
      if (isAdminMode) {
        loadMappingStats();
      }
    };
    
    checkAdmin();
  }, []);
  
  const loadMappingStats = async () => {
    const stats = await getCategoryMappingStats();
    if (stats) {
      setMappingStats(stats);
    }
  };

  // Fetch manufacturers from Supabase
  useEffect(() => {
    const fetchManufacturers = async () => {
      if (!categoryId || !subcategoryId) return;
      
      setLoading(true);
      
      try {
        // Then fetch manufacturers for this subcategory
        const { data, error } = await supabase
          .from('manufacturer_list')
          .select('*')
          .eq('Subcategories', subcategory?.name);
        
        if (error) {
          console.error('Error fetching manufacturers:', error);
          toast.error('Error loading manufacturers');
          setManufacturers([]);
        } else {
          setManufacturers(data as Manufacturer[]);
          
          // Get unique product types from the results
          const uniqueProducts = [...new Set(data.map((item: Manufacturer) => item.product || ''))];
          const formattedProductTypes = uniqueProducts
            .filter(product => product) // Filter out empty products
            .map(product => ({
              id: product,
              label: product.charAt(0).toUpperCase() + product.slice(1).toLowerCase()
            }));
          
          setProductTypes(formattedProductTypes);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManufacturers();
  }, [categoryId, subcategoryId, subcategory?.name]);

  const handleProductFilterChange = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Filter manufacturers based on selected product types
  const filteredManufacturers = selectedProducts.length > 0 
    ? manufacturers.filter(manufacturer => 
        selectedProducts.includes(manufacturer.product || ''))
    : manufacturers;
    
  const handleUpdateCategories = async () => {
    setIsMappingLoading(true);
    await updateManufacturerCategories();
    
    // Reload manufacturers
    if (subcategory?.name) {
      const { data } = await supabase
        .from('manufacturer_list')
        .select('*')
        .eq('Subcategories', subcategory.name);
        
      if (data) {
        setManufacturers(data as Manufacturer[]);
      }
    }
    
    await loadMappingStats();
    setIsMappingLoading(false);
  };
  
  const handleAssignGiftManufacturers = async () => {
    setIsMappingLoading(true);
    await assignManufacturersToGifting();
    
    // Reload manufacturers for this subcategory if we're on the gifting page
    if (categoryId === 'festive-gifting' && subcategoryId === 'corporate-gifts') {
      const { data } = await supabase
        .from('manufacturer_list')
        .select('*')
        .eq('Subcategories', 'Corporate Gifts');
        
      if (data) {
        setManufacturers(data as Manufacturer[]);
      }
    }
    
    await loadMappingStats();
    setIsMappingLoading(false);
  };

  if (!category || !subcategory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CategoryNav />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Category or subcategory not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{subcategory.name}</h1>
          <p className="text-gray-500">
            {category.name} &gt; {subcategory.name}
          </p>
        </div>
        
        {isAdmin && (
          <div className="mb-8 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Admin Controls</h2>
            <div className="flex gap-4 mb-4">
              <Button 
                onClick={handleUpdateCategories} 
                disabled={isMappingLoading}
              >
                Update All Categories
              </Button>
              <Button 
                onClick={handleAssignGiftManufacturers}
                disabled={isMappingLoading}
                variant="secondary"
              >
                Assign Gift Manufacturers
              </Button>
            </div>
            
            {mappingStats && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Mapping Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Total Manufacturers</p>
                    <p className="text-2xl font-bold">{mappingStats.totalManufacturers}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Categorized</p>
                    <p className="text-2xl font-bold">
                      {mappingStats.totalManufacturers - mappingStats.uncategorizedCount}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Uncategorized</p>
                    <p className="text-2xl font-bold">{mappingStats.uncategorizedCount}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subcategory</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mappingStats.subcategoryCounts.map((item) => (
                        <TableRow key={item.Subcategories}>
                          <TableCell>{item.Subcategories}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="border rounded-lg p-4 sticky top-4">
              <h2 className="font-medium text-lg mb-4">Filter by Products</h2>
              {productTypes.length > 0 ? (
                <div className="space-y-2">
                  {productTypes.map((product) => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`product-${product.id}`} 
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => handleProductFilterChange(product.id)}
                      />
                      <label 
                        htmlFor={`product-${product.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {product.label}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No product filters available</p>
              )}
            </div>
          </div>
          
          {/* Products listing */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredManufacturers.length === 0 ? (
              <div className="border rounded-lg p-8 bg-gray-50 text-center">
                <h2 className="text-xl font-medium mb-2">No manufacturers available yet</h2>
                <p className="text-gray-600 mb-4">
                  Manufacturer listings for this category will be available soon. Please check back later or contact us to inquire about specific products.
                </p>
                {isAdmin && categoryId === 'festive-gifting' && subcategoryId === 'corporate-gifts' && (
                  <Button onClick={handleAssignGiftManufacturers} className="mt-2">
                    Assign Gift Manufacturers Now
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredManufacturers.map((manufacturer, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium">{manufacturer.company_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Product: {manufacturer.product}</p>
                    {manufacturer.address && (
                      <p className="text-sm text-gray-500 mt-1">Location: {manufacturer.address}</p>
                    )}
                    {manufacturer["Qualfirst Rating"] && (
                      <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < Math.floor(manufacturer["Qualfirst Rating"] || 0) ? "text-yellow-400" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-600">{manufacturer["Qualfirst Rating"]}</span>
                      </div>
                    )}
                    <button className="mt-3 text-blue-500 hover:underline text-sm">
                      Contact Manufacturer
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
