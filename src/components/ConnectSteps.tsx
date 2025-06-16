import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Send, Package, CheckCircle, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Send className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "1. Post Your Requirement",
      description: "Submit your specific needs for plant-based beverages, including product type, volume, and any custom specifications. Our team will review and match you with suitable options.",
      buttonText: "Post Requirement",
      link: "/post-requirement"
    },
    {
      icon: <Package className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "2. Request Samples & Quotes",
      description: "Receive product samples to verify quality and taste. We'll also provide detailed quotes based on your volume and customization needs for your approval.",
      buttonText: "Request Samples",
      link: "/inquiry"
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "3. Approve & Finalize",
      description: "Once you are satisfied with the samples and terms, approve the production. We handle all documentation and compliance to ensure a smooth transition to manufacturing.",
      buttonText: "Start My Order",
      link: "/inquiry"
    },
    {
      icon: <Truck className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "4. Global Export & Delivery",
      description: "We manage the entire export process, including quality control, packaging, freight logistics, and customs clearance, delivering your products efficiently worldwide.",
      buttonText: "Learn About Logistics",
      link: "/services"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          Our streamlined process ensures a seamless journey from concept to global delivery.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-emerald-100 flex flex-col items-center text-center h-full transition-transform transform hover:scale-105 hover:shadow-lg">
              {step.icon}
              <h3 className="font-semibold text-xl mb-4 text-emerald-800">{step.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow text-sm">{step.description}</p>
              <Link to={step.link} className="mt-auto">
                <Button className="bg-emerald-600 text-white hover:bg-emerald-700 w-full">{step.buttonText}</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
