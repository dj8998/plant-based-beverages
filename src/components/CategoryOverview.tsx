
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const CategoryOverview = () => {
  return (
    <div className="bg-pink-light py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-800">
            Qualfirst brings professionalism to India's export industry. Browse our most in-demand product categories
            to find verified manufacturers across 2,000+ specialised lines
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md mr-3 overflow-hidden">
                  {/* Image placeholder that will be replaced later with actual images */}
                  <img 
                    src={`https://via.placeholder.com/40?text=${category.name.charAt(0)}`}
                    alt={category.name}
                    className="h-full w-full object-cover"
                  />
                </div>
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
        
        <div className="mt-8 text-center">
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
