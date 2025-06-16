import { Package, Truck, CheckSquare, MessageCircle, RefreshCw, Handshake } from "lucide-react";

const WhyQualFirst = () => {
  const features = [
    {
      icon: <Handshake className="h-8 w-8 text-emerald-600" />,
      title: "Your Independent Trading Partner",
      description: "We are your single point of contact, managing the entire export process from India to your doorstep, eliminating the complexities of direct manufacturer dealings."
    },
    {
      icon: <Package className="h-8 w-8 text-emerald-600" />,
      title: "Expert Product Development",
      description: "From concept to shelf, we assist with formulation, ingredient sourcing, and clean-label compliance for plant-based beverages, ensuring your product meets global standards."
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-emerald-600" />,
      title: "Rigorous Quality Control",
      description: "Our stringent quality checks at every stage, from raw materials to finished goods, guarantee that your plant-based beverages are consistently premium and safe."
    },
    {
      icon: <Truck className="h-8 w-8 text-emerald-600" />,
      title: "Seamless Global Logistics",
      description: "We handle all export logistics, including documentation, freight forwarding, and customs clearance, ensuring timely and compliant delivery worldwide."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-emerald-600" />,
      title: "Transparent Communication",
      description: "Receive real-time updates and clear communication at every step, keeping you informed and in control without the hassle of managing multiple vendors."
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-emerald-600" />,
      title: "Flexible & Scalable Solutions",
      description: "Whether you need small trial batches or large-scale production, our agile approach supports your growth with flexible MOQs and scalable manufacturing."
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why QualFirst?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          We are not just a supplier directory or marketplace. QualFirst is your dedicated partner, providing end-to-end solutions for sourcing premium plant-based beverages from India.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-emerald-100 transition-transform transform hover:scale-105 hover:shadow-lg">
              <div className="mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyQualFirst;
