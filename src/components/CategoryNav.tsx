
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const CategoryNav: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 md:flex md:justify-between overflow-x-auto hide-scrollbar">
          {categoriesData.categories.map((category) => (
            <div 
              key={category.id}
              className="relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link 
                to={`/category/${category.id}`}
                className="whitespace-nowrap py-4 px-2 md:px-4 text-sm font-medium text-gray-900 hover:text-gray-600 hover:border-b-2 hover:border-gray-900 block"
              >
                {category.name}
              </Link>
              
              {/* Dropdown menu for subcategories */}
              {hoveredCategory === category.id && (
                <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-b shadow-lg z-10">
                  {category.subcategories.map(subcategory => (
                    <Link
                      key={subcategory.id}
                      to={`/category/${category.id}/${subcategory.id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
