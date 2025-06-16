import { Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';

const OurProducts = () => {
  const mainProducts = [
    {
      id: "soy-milk",
      name: "Soy Milk",
      description: "Rich in protein, our Soy Milk is a versatile and nutritious plant-based staple for any lifestyle.",
      image: "/images/products/soymilk.png"
    },
    {
      id: "almond-milk",
      name: "Almond Milk",
      description: "Naturally light and creamy, our Almond Milk offers a delicate flavor perfect for beverages and recipes.",
      image: "/images/products/almondmilk.png"
    },
    {
      id: "millet-milk",
      name: "Millet Milk",
      description: "Discover the ancient grain goodness with our Millet Milk, offering unique nutrients and a smooth texture.",
      image: "/images/products/millet milk.png"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          QualFirst specializes in premium, clean-label plant-based beverages, crafted for global wellness brands. Explore our core offerings:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="bg-white rounded-lg p-6 shadow-md border border-emerald-100 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col items-center justify-between text-center">
                <div className="w-48 h-64 mb-4">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <button className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 transition-colors mt-auto">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/products">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-md hover:bg-emerald-700 text-lg font-medium transition-colors">
              View All Product Offerings
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProducts;
