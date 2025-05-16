
import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const CategoryNav: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between overflow-x-auto hide-scrollbar">
          {categoriesData.categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 hover:text-gray-600 hover:border-b-2 hover:border-gray-900"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
