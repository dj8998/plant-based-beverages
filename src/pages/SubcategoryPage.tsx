import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import categoriesData from '../data/categories.json';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { updateManufacturerCategories, assignManufacturersToGifting, getCategoryMappingStats } from '@/utils/categoryMapping';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useIsMobile } from '@/hooks/use-mobile';
import SupplierCard from '@/components/SupplierCard';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Type for manufacturer data
type Manufacturer = {
  company_name: string;
  product: string;
  "Top Category": string | null;
  Subcategories: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  "Qualfirst Rating": number | null;
  YOE?: string;
  Countries?: string;
  Size?: string;
  Location?: string;
  SpecialRemark?: string;
  Instagram?: string;
  Linkedin?: string;
  Facebook?: string;
  sustainable: 'Y' | 'N';
};

type MappingStats = {
  totalManufacturers: number;
  uncategorizedCount: number;
  subcategoryCounts: Array<{ Subcategories: string; count: number }>;
}

// Add a simple modal for contacting supplier
function ContactSupplierModal({ open, onClose, supplierName, onSubmit }: { open: boolean, onClose: () => void, supplierName: string, onSubmit: (email: string, message: string) => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(email, message);
    setSubmitting(false);
    setEmail('');
    setMessage('');
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
        <h2 className="text-xl font-bold mb-2">Contact {supplierName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your Email</label>
            <input type="email" required className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea required className="w-full border rounded px-3 py-2" rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Type your message..." />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">{submitting ? 'Sending...' : 'Send Message'}</button>
        </form>
      </div>
    </div>
  );
}

const SubcategoryPage = () => {
  const { subcategoryId } = useParams();
  const navigate = useNavigate();
  const [subcategoryInfo, setSubcategoryInfo] = useState<{
    name: string;
    categoryId: string;
    categoryName: string;
    products: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subcategoryId) return;

    // Find subcategory in our data
    for (const category of categoriesData.categories) {
      const subcategory = category.subcategories.find(
        sub => sub.id === subcategoryId
      );

      if (subcategory) {
        setSubcategoryInfo({
          name: subcategory.name,
          categoryId: category.id,
          categoryName: category.name,
          products: subcategory.products || []
        });
        break;
      }
    }
    setLoading(false);
  }, [subcategoryId]);

  const handleProductClick = (product: string) => {
    const productSlug = product.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${productSlug}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product information...</p>
          </div>
        ) : subcategoryInfo ? (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{subcategoryInfo.name}</h1>
              <p className="text-gray-500">
                {subcategoryInfo.categoryName} &gt; {subcategoryInfo.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subcategoryInfo.products.map((product, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">{product}</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.includes('Organic') && (
                        <Badge variant="secondary">Organic</Badge>
                      )}
                      {product.includes('Fortified') && (
                        <Badge variant="secondary">Fortified</Badge>
                      )}
                      {product.includes('Powder') && (
                        <Badge variant="secondary">Powder</Badge>
                      )}
                      {product.includes('Flavored') && (
                        <Badge variant="secondary">Flavored</Badge>
                      )}
                    </div>
                    <p className="text-gray-600">
                      {product.includes('Powder') 
                        ? 'Premium quality powder form for easy storage and transportation'
                        : product.includes('Flavored')
                        ? 'Delicious flavored variants to suit your taste preferences'
                        : product.includes('Organic')
                        ? 'Certified organic product made from the finest ingredients'
                        : product.includes('Fortified')
                        ? 'Enhanced with essential vitamins and minerals'
                        : 'Premium quality plant-based milk alternative'}
                    </p>
                    <Button 
                      className="w-full"
                      onClick={() => handleProductClick(product)}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
            <p className="text-gray-600">The product category you are looking for does not exist.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SubcategoryPage;
