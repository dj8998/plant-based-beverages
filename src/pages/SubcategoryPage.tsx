import { useParams, Link } from 'react-router-dom';
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
  const { categoryId, subcategoryId } = useParams();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [productTypes, setProductTypes] = useState<{id: string; label: string}[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mappingStats, setMappingStats] = useState<MappingStats | null>(null);
  const [isMappingLoading, setIsMappingLoading] = useState(false);
  const isMobile = useIsMobile();
  const [isProductFilterOpen, setIsProductFilterOpen] = useState(() => !isMobile);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactSupplier, setContactSupplier] = useState<string | null>(null);
  
  // Find the selected category and subcategory
  const category = categoriesData.categories.find(cat => cat.id === categoryId);
  const subcategory = category?.subcategories.find(subcat => subcat.id === subcategoryId);

  // Check for admin mode
  useEffect(() => {
    const checkAdmin = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const isAdminMode = searchParams.get('admin') === 'true';
      setIsAdmin(isAdminMode);
      
      if (isAdminMode) {
        loadMappingStats();
      }
    };
    
    checkAdmin();
  }, []);
  
  const loadMappingStats = async () => {
    const stats = await getCategoryMappingStats();
    if (stats) {
      setMappingStats(stats);
    }
  };

  // Fetch manufacturers from Supabase
  useEffect(() => {
    const fetchManufacturers = async () => {
      if (!categoryId || !subcategoryId) return;
      
      setLoading(true);
      
      try {
        // Then fetch manufacturers for this subcategory
        const { data, error } = await supabase
          .from('manufacturer_list')
          .select('*')
          .eq('Subcategories', subcategory?.name);
        
        if (error) {
          console.error('Error fetching manufacturers:', error);
          toast.error('Error loading manufacturers');
          setManufacturers([]);
        } else {
          setManufacturers(data as Manufacturer[]);
          
          // Get unique product types from the results and split comma-separated values
          const allProducts = data
            .map((item: Manufacturer) => item.product || '')
            .filter(product => product) // Filter out empty products
            .flatMap(product => product.split(',').map(p => p.trim())) // Split by comma and trim
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

          const formattedProductTypes = allProducts.map(product => ({
            id: product,
            label: product.charAt(0).toUpperCase() + product.slice(1).toLowerCase()
          }));
          
          setProductTypes(formattedProductTypes);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchManufacturers();
  }, [categoryId, subcategoryId, subcategory?.name]);

  useEffect(() => {
    setIsProductFilterOpen(!isMobile);
  }, [isMobile]);

  const handleProductFilterChange = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  
  // Filter manufacturers based on selected product types
  const filteredManufacturers = selectedProducts.length > 0 
    ? manufacturers.filter(manufacturer => {
        if (!manufacturer.product) return false;
        const manufacturerProducts = manufacturer.product.split(',').map(p => p.trim());
        return selectedProducts.some(selected => 
          manufacturerProducts.some(product => product === selected)
        );
      })
    : manufacturers;
    
  const handleUpdateCategories = async () => {
    setIsMappingLoading(true);
    await updateManufacturerCategories();
    
    // Reload manufacturers
    if (subcategory?.name) {
      const { data } = await supabase
        .from('manufacturer_list')
        .select('*')
        .eq('Subcategories', subcategory.name);
        
      if (data) {
        setManufacturers(data as Manufacturer[]);
      }
    }
    
    await loadMappingStats();
    setIsMappingLoading(false);
  };
  
  const handleAssignGiftManufacturers = async () => {
    setIsMappingLoading(true);
    await assignManufacturersToGifting();
    
    // Reload manufacturers for this subcategory if we're on the gifting page
    if (categoryId === 'festive-gifting' && subcategoryId === 'corporate-gifts') {
      const { data } = await supabase
        .from('manufacturer_list')
        .select('*')
        .eq('Subcategories', 'Corporate Gifts');
        
      if (data) {
        setManufacturers(data as Manufacturer[]);
      }
    }
    
    await loadMappingStats();
    setIsMappingLoading(false);
  };

  const handleContactSupplier = (supplierName: string) => {
    setContactSupplier(supplierName);
    setContactModalOpen(true);
  };

  const handleContactSubmit = async (email: string, message: string) => {
    if (!contactSupplier) return;
    try {
      const { error } = await supabase.from('supplier_contacts').insert([
        {
          supplier_name: contactSupplier,
          user_email: email,
          message,
          created_at: new Date().toISOString(),
        }
      ]);
      if (error) throw error;
      toast.success('Your message has been sent!');
    } catch (err) {
      toast.error('Failed to send your message. Please try again.');
    }
  };

  if (!category || !subcategory) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <CategoryNav />
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Category or subcategory not found</h1>
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{subcategory.name}</h1>
          <p className="text-gray-500">
            {category.name} &gt; {subcategory.name}
          </p>
        </div>
        
        {isAdmin && (
          <div className="mb-8 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-lg font-bold mb-4">Admin Controls</h2>
            <div className="flex gap-4 mb-4">
              <Button 
                onClick={handleUpdateCategories} 
                disabled={isMappingLoading}
              >
                Update All Categories
              </Button>
              <Button 
                onClick={handleAssignGiftManufacturers}
                disabled={isMappingLoading}
                variant="secondary"
              >
                Assign Gift Manufacturers
              </Button>
            </div>
            
            {mappingStats && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Mapping Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Total Manufacturers</p>
                    <p className="text-2xl font-bold">{mappingStats.totalManufacturers}</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Categorized</p>
                    <p className="text-2xl font-bold">
                      {mappingStats.totalManufacturers - mappingStats.uncategorizedCount}
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm text-gray-600">Uncategorized</p>
                    <p className="text-2xl font-bold">{mappingStats.uncategorizedCount}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subcategory</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mappingStats.subcategoryCounts.map((item) => (
                        <TableRow key={item.Subcategories}>
                          <TableCell>{item.Subcategories}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="border rounded-lg p-4 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-lg">Filter by Products</h2>
                {isMobile && (
                  <button
                    className="text-sm text-blue-600 underline focus:outline-none"
                    onClick={() => setIsProductFilterOpen((open) => !open)}
                    aria-expanded={isProductFilterOpen}
                    aria-controls="product-filter-list"
                  >
                    {isProductFilterOpen ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
              {isProductFilterOpen && (
                productTypes.length > 0 ? (
                  <div id="product-filter-list" className="space-y-2">
                    {productTypes.map((product) => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`product-${product.id}`} 
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={() => handleProductFilterChange(product.id)}
                        />
                        <label 
                          htmlFor={`product-${product.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {product.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No product filters available</p>
                )
              )}
            </div>
          </div>
          
          {/* Products listing */}
          <div className="flex-grow">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : filteredManufacturers.length === 0 ? (
              <div className="border rounded-lg p-8 bg-gray-50 text-center">
                <h2 className="text-xl font-medium mb-2">No manufacturers available yet</h2>
                <p className="text-gray-600 mb-4">
                  Manufacturer listings for this category will be available soon. Please check back later or contact us to inquire about specific products.
                </p>
                {isAdmin && categoryId === 'festive-gifting' && subcategoryId === 'corporate-gifts' && (
                  <Button onClick={handleAssignGiftManufacturers} className="mt-2">
                    Assign Gift Manufacturers Now
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredManufacturers.map((manufacturer, index) => {
                  let websiteUrl = (manufacturer as any).web;
                  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) {
                    websiteUrl = 'https://' + websiteUrl;
                  }
                  const rating10 = manufacturer["Qualfirst Rating"] || 0;
                  const rating5 = Math.round((rating10 / 2) * 10) / 10;
                  
                  // Map manufacturer fields to SupplierCard props
                  const supplier = {
                    name: manufacturer.company_name,
                    rating: rating5,
                    YOE: manufacturer.YOE || '',
                    Countries: manufacturer.Countries || '',
                    Size: manufacturer.Size || '',
                    Location: manufacturer.Location || '',
                    SpecialRemark: (manufacturer as any).SpecialRemark || undefined,
                    Instagram: (manufacturer as any).Instagram || undefined,
                    Linkedin: (manufacturer as any).Linkedin || undefined,
                    Facebook: (manufacturer as any).Facebook || undefined,
                    sustainable: (manufacturer as any).sustainable as 'Y' | 'N',
                    product: manufacturer.product || ''
                  };
                  
                  return (
                    <div key={index}>
                      <SupplierCard 
                        supplier={supplier} 
                        onContactClick={handleContactSupplier}
                        websiteUrl={websiteUrl}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <ContactSupplierModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        supplierName={contactSupplier || ''}
        onSubmit={handleContactSubmit}
      />
    </div>
  );
};

export default SubcategoryPage;
