
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { Checkbox } from '@/components/ui/checkbox';

// Mock products data - in a real app this would come from backend
const mockProducts = {
  "furniture": [
    { id: "f1", name: "Wooden Chair", product: "chair", manufacturer: "WoodWorks Inc" },
    { id: "f2", name: "Coffee Table", product: "table", manufacturer: "Modern Furnishings" },
    { id: "f3", name: "Dining Set", product: "dining", manufacturer: "HomeStyle" },
    { id: "f4", name: "Bookshelf", product: "shelf", manufacturer: "BookNook Designs" },
    { id: "f5", name: "Sofa Set", product: "sofa", manufacturer: "Comfort Living" }
  ],
  "decor": [
    { id: "d1", name: "Wall Art", product: "art", manufacturer: "ArtHouse" },
    { id: "d2", name: "Cushion Covers", product: "cushion", manufacturer: "Soft Furnishings Co" },
    { id: "d3", name: "Vases", product: "vase", manufacturer: "Ceramic Creations" }
  ],
  // Add more as needed
};

// Get unique product types from the mock data
const getUniqueProductTypes = (subcategoryId: string) => {
  const products = mockProducts[subcategoryId as keyof typeof mockProducts] || [];
  const uniqueProducts = [...new Set(products.map(item => item.product))];
  return uniqueProducts.map(product => ({
    id: product,
    label: product.charAt(0).toUpperCase() + product.slice(1)
  }));
};

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Find the selected category and subcategory
  const category = categoriesData.categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(subcat => subcat.id === subcategoryId);

  const handleProductFilterChange = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // This would typically fetch products from Supabase based on the subcategoryId
  const allProducts = mockProducts[subcategoryId as keyof typeof mockProducts] || [];
  
  // Filter products based on selected filters
  const filteredProducts = selectedProducts.length > 0 
    ? allProducts.filter(product => selectedProducts.includes(product.product))
    : allProducts;

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

  const productTypes = getUniqueProductTypes(subcategoryId || "");

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
            {filteredProducts.length === 0 ? (
              <div className="border rounded-lg p-8 bg-gray-50 text-center">
                <h2 className="text-xl font-medium mb-2">No manufacturers available yet</h2>
                <p className="text-gray-600">
                  Manufacturer listings for this category will be available soon. Please check back later or contact us to inquire about specific products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium">{product.manufacturer}</h3>
                    <p className="text-sm text-gray-500 mt-1">Product: {product.name}</p>
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
