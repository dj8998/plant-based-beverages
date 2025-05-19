import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import { useIsMobile } from '@/hooks/use-mobile';
import { createPortal } from 'react-dom';

const CategoryNav: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Don't render at all on mobile
  if (isMobile) {
    return null;
  }
  
  // Limit categories for mobile view (won't be used due to the early return above, but kept for consistency)
  const visibleCategories = categoriesData.categories.slice(0, 5);

  // Helper to get the position of the hovered category
  const getDropdownPosition = (categoryId: string) => {
    const el = document.getElementById(`catnav-${categoryId}`);
    if (!el) return { left: 0, top: 0, width: 256 };
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.bottom,
      width: rect.width,
    };
  };

  return (
    <div className="bg-white border-b border-gray-200 hidden md:block relative z-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {visibleCategories.map((category) => (
            <div 
              key={category.id}
              id={`catnav-${category.id}`}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 hover:text-gray-600 hover:border-b-2 hover:border-gray-900 cursor-pointer">
                {category.name}
              </div>
              {/* Dropdown menu rendered in a portal */}
              {hoveredCategory === category.id && typeof window !== 'undefined' && createPortal(
                (() => {
                  const { left, top, width } = getDropdownPosition(category.id);
                  return (
                    <div
                      className="fixed bg-white border border-gray-200 rounded-b shadow-lg z-[9999]"
                      style={{
                        left,
                        top,
                        width: width || 256,
                        maxHeight: 'calc(100vh - 200px)',
                        overflowY: 'auto',
                      }}
                      onMouseEnter={() => setHoveredCategory(category.id)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      <div className="py-2">
                        {category.subcategories.map(subcategory => (
                          <Link
                            key={subcategory.id}
                            to={`/category/${category.id}/${subcategory.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setHoveredCategory(null)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })(),
                document.body
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
