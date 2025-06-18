import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: "millet-milk",
    name: "Millet Milk",
    description: "Discover the ancient grain goodness with our Millet Milk, offering unique nutrients and a smooth texture.",
    image: "/images/products/millet milk.png",
    link: "/product/millet-milk"
  },
  {
    id: "soy-milk",
    name: "Soy Milk",
    description: "Rich in protein, our Soy Milk is a versatile and nutritious plant-based staple for any lifestyle.",
    image: "/images/products/soymilk.png",
    link: "/product/soy-milk"
  },
  {
    id: "almond-milk",
    name: "Almond Milk",
    description: "Naturally light and creamy, our Almond Milk offers a delicate flavor perfect for beverages and recipes.",
    image: "/images/products/almondmilk.png",
    link: "/product/almond-milk"
  },
  {
    id: "oat-milk",
    name: "Oat Milk",
    description: "Creamy and naturally sweet, our Oat Milk is high in fiber and environmentally sustainable.",
    image: "/images/products/oat milk.png",
    link: "/product/oat-milk"
  },
  {
    id: "coconut-milk",
    name: "Coconut Milk",
    description: "Exotic and creamy, our Coconut Milk is perfect for culinary and beverage applications.",
    image: "/images/products/coconut.png",
    link: "/product/coconut-milk"
  },
  {
    id: "tofu",
    name: "Tofu",
    description: "High-quality tofu, a versatile plant-based protein for various dishes and cuisines.",
    image: "/images/products/tofu.png",
    link: "/product/tofu"
  },
];

function FeatureSectionWithGrid() {
  return (
    <div className="w-full py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col items-start">
            <div>
              <Badge>Our Products</Badge>
            </div>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                Our Products
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                QualFirst specializes in premium, clean-label plant-based beverages, crafted for global wellness brands. Explore our core offerings:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <Link to={product.link} key={product.id} className="flex flex-col gap-2 group rounded-lg">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 lg:mt-12 text-center flex flex-col items-center">
            <Link to="/products">
              <Button size="default" className="bg-black hover:bg-gray-800 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-md transition-transform transform hover:scale-105 text-sm">
                View All Product Offerings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FeatureSectionWithGrid }; 