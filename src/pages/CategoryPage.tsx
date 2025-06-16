import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [categoryInfo, setCategoryInfo] = useState<{
    name: string;
    mainProducts: {
      name: string;
      variants: string[];
    }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    // Find category in our data
    const category = categoriesData.categories.find(cat => cat.id === categoryId);
    
    if (category) {
      // Group products by their main type
      const mainProducts = category.subcategories.map(subcat => ({
        name: subcat.name,
        variants: subcat.products || []
      }));

      setCategoryInfo({
        name: category.name,
        mainProducts
      });
    }
    setLoading(false);
  }, [categoryId]);

  const handleProductClick = (product: string) => {
    const productSlug = product.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${productSlug}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product information...</p>
          </div>
        ) : categoryInfo ? (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{categoryInfo.name}</h1>
              <p className="text-gray-500">
                Explore our range of premium plant-based milk alternatives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categoryInfo.mainProducts.map((product, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, vIndex) => (
                        <Badge 
                          key={vIndex} 
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-200"
                          onClick={() => handleProductClick(variant)}
                        >
                          {variant}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-600">
                      Premium quality {product.name.toLowerCase()} with various options including organic, fortified, and flavored variants.
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleProductClick(product.name)}
                    >
                      View All Variants
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Category Not Found</h2>
            <p className="text-gray-600">The category you are looking for does not exist.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
