
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ConnectSteps = () => {
  const steps = [
    {
      title: "Post a Product Inquiry",
      description: "Tell us what you're looking for - style, quantity, or custom design. We'll match your request with relevant manufacturers from our verified network.",
      buttonText: "Post an Inquiry",
      link: "/post-request"
    },
    {
      title: "Explore Our Catalog",
      description: "Search across 2,000+ product lines and connect with India's most reliable manufacturing partners. Compare profiles, browse portfolios, and access Qualfirst ratings to make an informed decision.",
      buttonText: "Explore Catalogue",
      link: "/catalog"
    },
    {
      title: "Get Personalized Sourcing Manager",
      description: "Our sourcing experts will guide you with tailored recommendations whether you're looking for sustainable materials, specific compliance standards, or scalable production.",
      buttonText: "Book a 30 mins call",
      link: "/talk-to-expert"
    }
  ];

  return (
    <div className="bg-blue-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold mb-8">3 WAYS TO CONNECT WITH A MANUFACTURING PARTNER IN 48 HOURS. FREE</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm flex flex-col h-full">
              <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{step.description}</p>
              <Link to={step.link} className="mt-auto">
                <Button className="bg-black text-white hover:bg-gray-800 w-full">{step.buttonText}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectSteps;
