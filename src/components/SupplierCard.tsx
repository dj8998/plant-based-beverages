import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaFacebook, FaLeaf, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface Supplier {
  name: string;
  rating: number;
  YOE: string;
  Countries: string;
  Size: string;
  Location: string;
  SpecialRemark?: string;
  Instagram?: string;
  Linkedin?: string;
  Facebook?: string;
  sustainable?: 'Y' | 'N';
  product?: string;
}

interface SupplierCardProps {
  supplier: Supplier;
  onContactClick?: (name: string) => void;
  websiteUrl?: string;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier, onContactClick, websiteUrl }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 border border-gray-200 ${
        expanded ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
      }`}
    >
      {/* Header - Always visible */}
      <div 
        className="p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{supplier.name}</h2>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Premier</span>
              {supplier.sustainable === 'Y' && (
                <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-full flex items-center">
                  <FaLeaf className="mr-1" size={10} /> Sustainable
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex mr-4">
              <div className="text-yellow-400 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg">{i < Math.floor(supplier.rating) ? '★' : '☆'}</span>
                ))}
              </div>
              <span className="text-gray-700 font-medium ml-1">{supplier.rating.toFixed(1)}</span>
            </div>
            <span className="text-gray-400">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
        </div>
        
        {/* Preview Info - Always visible */}
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="w-5 text-gray-400">⏱️</span> {supplier.YOE}
          </div>
          <div className="flex items-center">
            <span className="w-5 text-gray-400">🌐</span> {supplier.Countries}
          </div>
          <div className="flex items-center">
            <span className="w-5 text-gray-400">👥</span> {supplier.Size}
          </div>
          <div className="flex items-center">
            <span className="w-5 text-gray-400">📍</span> {supplier.Location}
          </div>
        </div>
      </div>
      
      {/* Expanded Section */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-gray-100 pt-3">
          {/* Two column layout for expanded view */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1">
              {supplier.SpecialRemark && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">About</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{supplier.SpecialRemark}</p>
                </div>
              )}
              
              {supplier.product && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">Products</h3>
                  <p className="text-sm text-gray-600">{supplier.product}</p>
                </div>
              )}
              
              <div className="flex items-center gap-3 mt-4">
                {supplier.Instagram && (
                  <a href={supplier.Instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                    <FaInstagram size={18} />
                  </a>
                )}
                {supplier.Linkedin && (
                  <a href={supplier.Linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                    <FaLinkedin size={18} />
                  </a>
                )}
                {supplier.Facebook && (
                  <a href={supplier.Facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaFacebook size={18} />
                  </a>
                )}
              </div>
            </div>
            
            {/* Right Column - Actions */}
            <div className="md:w-64 flex flex-col gap-3">
              <h3 className="text-sm font-semibold mb-1 text-gray-700">Contact Options</h3>
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Visit Website
                </a>
              )}
              <button
                onClick={() => onContactClick && onContactClick(supplier.name)}
                className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Contact Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierCard; 