import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Send, Package, CheckCircle, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Send className="h-8 w-8" />,
      title: "Share Your Vision",
      description: "Tell us about your product requirements, target market, and quality standards."
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "We Source & Develop",
      description: "Our experts find the perfect manufacturers and develop your product to specifications."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control at every stage of production."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Global Delivery",
      description: "Seamless logistics and export documentation to your doorstep worldwide."
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 flex-col items-start mb-12">
          <div>
            <Badge>Process</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
              How It Works
            </h2>
            <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-600 text-left">
              Our streamlined process ensures a seamless journey from concept to global delivery.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-4 group rounded-lg">
              <div className="bg-white rounded-md mb-2 flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl tracking-tight group-hover:text-black transition-colors">{step.title}</h3>
              <p className="text-gray-600 text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
