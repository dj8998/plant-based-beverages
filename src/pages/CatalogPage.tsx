import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

const catalogs = [
  {
    id: 1,
    title: "Home & Living Products",
    description: "Complete catalog of furniture, home decor, and living essentials",
    thumbnail: "/catalog-images/Furniture.png",
    pages: 42
  },
  {
    id: 2,
    title: "Handicrafts Collection",
    description: "Traditional and modern handcrafted items from across India",
    thumbnail: "/catalog-images/handicrafts.png",
    pages: 36
  },
  {
    id: 3,
    title: "Textiles & Fabrics",
    description: "Premium quality textiles, clothing materials and finished products",
    thumbnail: "/catalog-images/cloth.png",
    pages: 28
  },
  {
    id: 4,
    title: "Kitchenware & Dining",
    description: "Utensils, cutlery, and dining accessories for every need",
    thumbnail: "/catalog-images/kitchen.png",
    pages: 24
  }
];

const CatalogPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'download' | 'custom' | null>(null);
  const [selectedCatalog, setSelectedCatalog] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openModal = (type: 'download' | 'custom', catalog?: any) => {
    setModalType(type);
    setSelectedCatalog(catalog || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEmail('');
    setSelectedCatalog(null);
    setModalType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      email,
      action: modalType,
      catalog: selectedCatalog ? selectedCatalog.title : null,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('catalog_requests').insert([payload]);
    setSubmitting(false);
    if (error) {
      toast.error('Failed to submit request. Please try again.');
    } else {
      toast.success('Request submitted! We will contact you soon.');
      closeModal();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Product Catalogs</h1>
          <p className="text-gray-600 mb-8">
            Browse our comprehensive product catalogs featuring our latest collections and exclusive items.
            Download PDF catalogs for offline reference.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catalogs.map((catalog) => (
              <Card key={catalog.id} className="overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={catalog.thumbnail} 
                    alt={catalog.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{catalog.title}</CardTitle>
                  <CardDescription>{catalog.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{catalog.pages} pages • PDF format</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full flex items-center justify-center gap-2" onClick={() => openModal('download', catalog)}>
                    <Download size={16} /> Download Catalog
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Need a Custom Catalog?</h2>
            <p className="mb-4 text-gray-600">
              Looking for specific products or custom requirements? 
              We can create a personalized catalog tailored to your needs.
            </p>
            <Button className="bg-black text-white hover:bg-gray-800" onClick={() => openModal('custom')}>Request Custom Catalog</Button>
          </div>
        </div>
        {/* Modal for email collection */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button onClick={closeModal} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">✕</button>
              <h2 className="text-xl font-bold mb-2">
                {modalType === 'download' ? `Download ${selectedCatalog?.title}` : 'Request Custom Catalog'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Your Email</label>
                  <input type="email" required className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50">
                  {submitting ? (modalType === 'download' ? 'Requesting...' : 'Submitting...') : (modalType === 'download' ? 'Request Download Link' : 'Submit Request')}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
