
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  // Find the selected category
  const category = categoriesData.categories.find(cat => cat.id === categoryId);

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h2 className="text-lg font-medium">{subcategory.name}</h2>
              <a href={`/category/${categoryId}/${subcategory.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                Browse Products →
              </a>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
