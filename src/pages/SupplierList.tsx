import React, { useState } from 'react';
import SupplierCard from '@/components/SupplierCard';

// TODO: Replace this with your actual supplier data fetching logic
const suppliers = [
  {
    id: 1,
    name: "ADMIRE EXPORTS INTERNATIONAL",
    rating: 4.8,
    YOE: "15+ Years",
    Countries: "10+ Countries",
    Size: "Mid Size",
    Location: "Jodhpur, RJ, IN",
    SpecialRemark: "Specialize in making Antique World Globe, ...",
    Instagram: "https://instagram.com/brand",
    Linkedin: "https://linkedin.com/company/brand",
    Facebook: "https://facebook.com/brand",
    sustainable: "Y" as 'Y',
  },
  // ...add more supplier objects here
];

const SupplierList: React.FC = () => {
  const [showSustainable, setShowSustainable] = useState(false);

  const filteredSuppliers = showSustainable
    ? suppliers.filter(s => s.sustainable === 'Y')
    : suppliers;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowSustainable(v => !v)}
          className={`px-4 py-2 rounded font-semibold border transition ${
            showSustainable
              ? 'bg-green-600 text-white border-green-700'
              : 'bg-white text-green-700 border-green-600'
          }`}
        >
          {showSustainable ? 'Show All Suppliers' : 'Show Only Sustainable'}
        </button>
      </div>
      <div className="space-y-8">
        {filteredSuppliers.map(supplier => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
};

export default SupplierList; 