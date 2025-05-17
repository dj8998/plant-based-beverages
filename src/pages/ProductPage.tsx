
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';

// Type for future supplier data
type Supplier = {
  id: string;
  name: string;
  location: string;
  rating: number;
  productCategories: string[];
};

const ProductPage = () => {
  const { productSlug } = useParams();
  const [productInfo, setProductInfo] = useState<{
    name: string;
    categoryId: string;
    categoryName: string;
    subcategoryId: string;
    subcategoryName: string;
  } | null>(null);
  
  // Placeholder for suppliers - in real app would come from Supabase
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productSlug) return;

    // Find product in our data
    const normalizedSlug = productSlug.toUpperCase().replace(/-/g, ' ');
    let found = false;

    for (const category of categoriesData.categories) {
      for (const subcategory of category.subcategories) {
        const product = subcategory.products?.find(
          p => p.toUpperCase() === normalizedSlug
        );

        if (product) {
          setProductInfo({
            name: product,
            categoryId: category.id,
            categoryName: category.name,
            subcategoryId: subcategory.id,
            subcategoryName: subcategory.name
          });
          found = true;
          break;
        }
      }
      if (found) break;
    }

    // Simulate loading supplier data from Supabase
    setTimeout(() => {
      // This would be replaced by actual Supabase query 
      setSuppliers([
        {
          id: 's1',
          name: 'Quality Craft Exports',
          location: 'Delhi, India',
          rating: 4.8,
          productCategories: ['HOME & LIVING', 'FURNITURE']
        },
        {
          id: 's2',
          name: 'Global Artisan Connect',
          location: 'Jaipur, India',
          rating: 4.5,
          productCategories: ['HOME & LIVING', 'HANDICRAFTS']
        },
        {
          id: 's3',
          name: 'Eastern Crafts Supply',
          location: 'Mumbai, India',
          rating: 4.7,
          productCategories: ['HOME & LIVING', 'DECOR']
        }
      ]);
      setLoading(false);
    }, 1000);
  }, [productSlug]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        {productInfo ? (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{productInfo.name}</h1>
              <p className="text-gray-500">
                {productInfo.categoryName} &gt; {productInfo.subcategoryName} &gt; {productInfo.name}
              </p>
            </div>

            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About This Product</h2>
              <p className="text-gray-700">
                This page displays information about {productInfo.name} and suppliers who offer this product.
                In a complete implementation, detailed product information and specifications would be shown here.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Suppliers for {productInfo.name}</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading suppliers...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suppliers.map(supplier => (
                    <div key={supplier.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-lg">{supplier.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{supplier.location}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < Math.floor(supplier.rating) ? "text-yellow-400" : "text-gray-300"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">{supplier.rating}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Categories:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {supplier.productCategories.map((cat, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <a href={`/supplier/${supplier.id}`} className="text-blue-600 hover:underline text-sm">
                          View supplier profile →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-6 text-sm text-gray-500">
                Note: In the production version, supplier data would be fetched from Supabase based on products they offer.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-600">The product you are looking for does not exist in our database.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
