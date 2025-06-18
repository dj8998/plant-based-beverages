import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "soy-milk",
    name: "Soy Milk",
    description: "Rich in protein, our Soy Milk is a versatile and nutritious plant-based staple.",
    image: "/images/products/soymilk.png"
  },
  {
    id: "almond-milk",
    name: "Almond Milk",
    description: "Naturally light and creamy, our Almond Milk offers a delicate flavor.",
    image: "/images/products/almondmilk.png"
  },
  {
    id: "millet-milk",
    name: "Millet Milk",
    description: "Discover the ancient grain goodness with our Millet Milk, offering unique nutrients.",
    image: "/images/products/millet milk.png"
  },
  {
    id: "oat-milk",
    name: "Oat Milk",
    description: "Creamy and naturally sweet, our Oat Milk is high in fiber and environmentally sustainable.",
    image: "/images/products/oat milk.png"
  },
  {
    id: "coconut-milk",
    name: "Coconut Milk",
    description: "Exotic and creamy, our Coconut Milk is perfect for culinary and beverage applications.",
    image: "/images/products/coconut.png"
  },
  {
    id: "tofu",
    name: "Tofu",
    description: "High-quality tofu, a versatile plant-based protein for various dishes and cuisines.",
    image: "/images/products/tofu.png"
  },
];

const ProductsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Our Plant-Based Product Range
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Explore our diverse selection of clean-label, alt-dairy beverages and plant-based products, ready for your global brand.
            </p>
          </div>
        </div>

        <section className="py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col items-center justify-between text-center">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-48 h-64 object-contain mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    <Button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors mt-auto">
                      View Details
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage; 