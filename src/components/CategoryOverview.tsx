
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const CategoryOverview = () => {
  return (
    <div className="bg-pink-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-lg text-gray-800">
            Qualfirst brings professionalism to India's export industry. Browse our most in-demand product categories
            to find verified manufacturers across 2,000+ specialised lines
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gray-300 rounded-md mr-3"></div>
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
              </div>
              <div className="space-y-2">
                {category.subcategories.map((subcategory) => (
                  <Link 
                    key={subcategory.id} 
                    to={`/category/${category.id}/${subcategory.id}`}
                    className="block text-blue-500 hover:underline"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/categories">
            <button className="bg-black text-white px-6 py-3 rounded-sm hover:bg-gray-800">
              Browse All Categories
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryOverview;
