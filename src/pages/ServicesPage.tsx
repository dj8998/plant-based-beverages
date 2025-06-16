import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, FlaskConical, Boxes, FileText, Truck, Waypoints, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ServicesPage = () => {
  const services = [
    {
      icon: <FlaskConical className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Product R&D and Formulation",
      description: "Collaborate with our expert food technologists to develop innovative plant-based beverage formulations tailored precisely to your brand's vision and market demands. We ensure your product stands out in the global wellness landscape."
    },
    {
      icon: <Package className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Label & Packaging Support",
      description: "From conceptual design to final execution, we provide end-to-end support for packaging solutions, including material selection, design aesthetics, and strict adherence to global labeling standards such as FSSAI, ISO22000, and USFDA-ready compliance."
    },
    {
      icon: <FileText className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Compliance & Documentation",
      description: "Navigate the complexities of international trade with our comprehensive compliance and documentation services. We manage all necessary certifications, permits, and paperwork to ensure your exports are seamless and fully compliant with regulations worldwide."
    },
    {
      icon: <Boxes className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Private Label Services",
      description: "Launch your own distinguished line of plant-based beverages with our complete private label support. We guide you from initial concept development through to production, ensuring your brand's unique identity is perfectly encapsulated in every product."
    },
    {
      icon: <Waypoints className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Flexible MOQs & Sampling Support",
      description: "Whether you're testing the market with small batches or scaling up for mass distribution, we offer highly flexible Minimum Order Quantities (MOQs) and robust sampling support to meet your evolving business needs with confidence."
    },
    {
      icon: <Truck className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Export Logistics (FOB, CIF, EXW)",
      description: "Our comprehensive export logistics solutions cover all trade terms (FOB, CIF, EXW), managing freight forwarding, customs clearance, and timely delivery to your chosen global destination, ensuring efficiency and reliability."
    },
    {
      icon: <Clock className="h-10 w-10 text-emerald-600 mb-4" />,
      title: "Ongoing Partnership Model",
      description: "We believe in fostering long-term relationships beyond just transactions. Our commitment extends to continuous support, market insights, and adaptability to your evolving needs, ensuring sustained success and growth for your brand."
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-sage-50 py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Our Services: End-to-End Export Solutions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              QualFirst simplifies global sourcing and export of plant-based beverages with a comprehensive suite of services designed for your success.
            </p>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-emerald-50 rounded-lg p-6 shadow-md border border-emerald-100 transition-transform transform hover:scale-105 hover:shadow-lg h-full flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage; 