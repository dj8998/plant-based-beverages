
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  
  // Find the selected category and subcategory
  const category = categoriesData.categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(subcat => subcat.id === subcategoryId);

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

  // This would typically fetch products from Supabase based on the subcategoryId
  const products = []; // Placeholder for products that would be fetched from Supabase

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
        
        {products.length === 0 ? (
          <div className="border rounded-lg p-8 bg-gray-50 text-center">
            <h2 className="text-xl font-medium mb-2">No products available yet</h2>
            <p className="text-gray-600">
              Product listings for this category will be available soon. Please check back later or contact us to inquire about specific products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Products would be displayed here */}
            <p>Products will be loaded from Supabase database</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
