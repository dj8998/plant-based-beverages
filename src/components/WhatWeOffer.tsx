import { Package, FlaskConical, Boxes, FileText, Truck, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhatWeOffer = () => {
  const servicesSummary = [
    {
      icon: <FlaskConical className="h-8 w-8 text-emerald-600" />,
      title: "Product R&D",
      description: "Expert formulation for custom plant-based beverages."
    },
    {
      icon: <FileText className="h-8 w-8 text-emerald-600" />,
      title: "Compliance & Docs",
      description: "Seamless navigation of global export regulations."
    },
    {
      icon: <Truck className="h-8 w-8 text-emerald-600" />,
      title: "Global Logistics",
      description: "End-to-end management from India to your destination."
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
          QualFirst provides a full suite of services designed to simplify your plant-based beverage sourcing and export journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesSummary.map((service, index) => (
            <div key={index} className="bg-emerald-50 rounded-lg p-6 shadow-md border border-emerald-100 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col items-center text-center">
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/services">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-md transition-transform transform hover:scale-105">
              Discover All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer; 