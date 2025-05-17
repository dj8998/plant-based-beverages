
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const catalogs = [
  {
    id: 1,
    title: "Home & Living Products",
    description: "Complete catalog of furniture, home decor, and living essentials",
    thumbnail: "/placeholder.svg",
    pages: 42
  },
  {
    id: 2,
    title: "Handicrafts Collection",
    description: "Traditional and modern handcrafted items from across India",
    thumbnail: "/placeholder.svg",
    pages: 36
  },
  {
    id: 3,
    title: "Textiles & Fabrics",
    description: "Premium quality textiles, clothing materials and finished products",
    thumbnail: "/placeholder.svg",
    pages: 28
  },
  {
    id: 4,
    title: "Kitchenware & Dining",
    description: "Utensils, cutlery, and dining accessories for every need",
    thumbnail: "/placeholder.svg",
    pages: 24
  }
];

const CatalogPage = () => {
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
                  <Button className="w-full flex items-center justify-center gap-2">
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
            <Button className="bg-black text-white hover:bg-gray-800">Request Custom Catalog</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
