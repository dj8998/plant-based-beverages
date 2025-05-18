
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';  // Added this import
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { Checkbox } from '@/components/ui/checkbox';

// Mock products data - in a real app this would come from backend
const mockProducts = {
  "furniture": [
    { id: "f1", name: "Wooden Chair", product: "chair" },
    { id: "f2", name: "Coffee Table", product: "table" },
    { id: "f3", name: "Dining Set", product: "dining" },
    { id: "f4", name: "Bookshelf", product: "shelf" },
    { id: "f5", name: "Sofa Set", product: "sofa" }
  ],
  "decor": [
    { id: "d1", name: "Wall Art", product: "art" },
    { id: "d2", name: "Cushion Covers", product: "cushion" },
    { id: "d3", name: "Vases", product: "vase" }
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

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  
  // Find the selected category
  const category = categoriesData.categories.find(cat => cat.id === categoryId);

  const handleProductFilterChange = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (!category) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CategoryNav />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Category not found</h1>
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
        <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="border rounded-lg p-4 sticky top-4">
              <h2 className="font-medium text-lg mb-4">Filter by Products</h2>
              {category.subcategories.map((subcategory) => {
                const productTypes = getUniqueProductTypes(subcategory.id);
                
                return productTypes.length > 0 ? (
                  <div key={subcategory.id} className="mb-4">
                    <h3 className="font-medium mb-2">{subcategory.name}</h3>
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
                  </div>
                ) : null;
              })}
            </div>
          </div>
          
          {/* Subcategories grid */}
          <div className="flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {category.subcategories.map((subcategory) => (
                <div key={subcategory.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h2 className="text-lg font-medium">{subcategory.name}</h2>
                  <Link to={`/category/${categoryId}/${subcategory.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                    Browse Products →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
