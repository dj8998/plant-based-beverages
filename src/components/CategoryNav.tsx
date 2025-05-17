
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import { useIsMobile } from '@/hooks/use-mobile';

const CategoryNav: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Don't render at all on mobile
  if (isMobile) {
    return null;
  }
  
  // Limit categories for mobile view (won't be used due to the early return above, but kept for consistency)
  const visibleCategories = categoriesData.categories.slice(0, 5);

  return (
    <div className="bg-white border-b border-gray-200 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between overflow-x-auto hide-scrollbar">
          {visibleCategories.map((category) => (
            <div 
              key={category.id}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 hover:text-gray-600 hover:border-b-2 hover:border-gray-900 cursor-pointer">
                {category.name}
              </div>
              
              {/* Fixed position dropdown menu with improved z-index */}
              {hoveredCategory === category.id && (
                <div 
                  className="absolute left-0 mt-0 w-64 bg-white border border-gray-200 rounded-b shadow-lg z-50"
                >
                  <div className="max-h-96 overflow-y-auto">
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
