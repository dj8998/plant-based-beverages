
import { Button } from "@/components/ui/button";

const ConnectSteps = () => {
  const steps = [
    {
      title: "Post a Product Inquiry",
      description: "Tell us what you're looking for - style, quantity, or custom design. We'll match your request with relevant manufacturers from our verified network.",
      buttonText: "Post an Inquiry"
    },
    {
      title: "Explore Our Catalog",
      description: "Search across 2,000+ product lines and connect with India's most reliable manufacturing partners. Compare profiles, browse portfolios, and access Qualfirst ratings to make an informed decision.",
      buttonText: "Explore Catalogue"
    },
    {
      title: "Get Personalized Sourcing Manager",
      description: "Our sourcing experts will guide you with tailored recommendations whether you're looking for sustainable materials, specific compliance standards, or scalable production.",
      buttonText: "Post an Inquiry"
    }
  ];

  return (
    <div className="bg-blue-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold mb-12">3 WAYS TO CONNECT WITH A MANUFACTURING PARTNER IN 48 HOURS. FREE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6 h-40">{step.description}</p>
              <Button className="bg-black text-white hover:bg-gray-800 w-full">{step.buttonText}</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectSteps;
