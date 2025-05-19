import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { supabase } from '@/integrations/supabase/client';

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

const ProductPage = () => {
  const { productSlug } = useParams();
  const [productInfo, setProductInfo] = useState<{
    name: string;
    categoryId: string;
    categoryName: string;
    subcategoryId: string;
    subcategoryName: string;
  } | null>(null);
  
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
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

    // Fetch manufacturers from Supabase that match this product
    const fetchManufacturers = async () => {
      setLoading(true);
      
      try {
        // Search for manufacturers with products containing the product name
        const productName = normalizedSlug;
        
        const { data, error } = await supabase
          .from('manufacturer_list')
          .select('*')
          .ilike('product', `%${productName}%`);
        
        if (error) {
          console.error('Error fetching manufacturers:', error);
          setManufacturers([]);
        } else {
          setManufacturers(data as Manufacturer[]);
        }
      } catch (err) {
        console.error('Error:', err);
        setManufacturers([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManufacturers();
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
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Suppliers for {productInfo.name}</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading suppliers...</p>
                </div>
              ) : manufacturers.length === 0 ? (
                <div className="border rounded-lg p-8 bg-gray-50 text-center">
                  <h2 className="text-xl font-medium mb-2">No suppliers found</h2>
                  <p className="text-gray-600">
                    We couldn't find any suppliers for this product yet. Please check back later or contact us for assistance.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {manufacturers.map((manufacturer, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-lg">{manufacturer.company_name}</h3>
                      {manufacturer.address && (
                        <p className="text-gray-600 text-sm mb-2">{manufacturer.address}</p>
                      )}
                      {manufacturer["Qualfirst Rating"] && (
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {(() => {
                              const rating10 = manufacturer["Qualfirst Rating"] || 0;
                              const rating5 = Math.round((rating10 / 2) * 10) / 10;
                              const fullStars = Math.floor(rating5);
                              const partialStar = rating5 - fullStars;
                              
                              return Array.from({ length: 5 }).map((_, i) => {
                                if (i < fullStars) {
                                  return <span key={i} className="text-yellow-400">★</span>;
                                } else if (i === fullStars && partialStar > 0) {
                                  return (
                                    <span key={i} className="relative">
                                      <span className="text-gray-300">★</span>
                                      <span 
                                        className="absolute top-0 left-0 text-yellow-400 overflow-hidden" 
                                        style={{ width: `${partialStar * 100}%` }}
                                      >
                                        ★
                                      </span>
                                    </span>
                                  );
                                } else {
                                  return <span key={i} className="text-gray-300">★</span>;
                                }
                              });
                            })()}
                          </div>
                          <span className="ml-1 text-sm text-gray-600">{manufacturer["Qualfirst Rating"]}</span>
                        </div>
                      )}
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Product: {manufacturer.product}</p>
                        {manufacturer["Top Category"] && (
                          <p className="text-sm text-gray-500">Category: {manufacturer["Top Category"]}</p>
                        )}
                      </div>
                      <div className="mt-4">
                        <button className="text-blue-600 hover:underline text-sm">
                          Contact Supplier →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
