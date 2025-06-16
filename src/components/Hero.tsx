import { useState } from "react";
import { Button } from "@/components/ui/button";
import MultiStepInquiry from "./MultiStepInquiry";
import { images } from "@/config/images";
import { Link } from "react-router-dom";

const Hero = () => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  return (
    <div className="bg-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="/images/hero/homepage-banner.jpg"
          alt="Assortment of plant-based ingredients and products"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" /> {/* Overlay for text readability */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 md:py-32 lg:py-40 text-white flex flex-col items-center justify-center text-center min-h-[calc(100vh-100px)]">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up">
          Plant-Based Products from India, <br /> Exported with Precision.
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mb-10 animate-fade-in-up animation-delay-200">
          Clean-label Soy, Almond & Millet Milks – Ready to Ship. Ready to Scale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
          <Link to="/products">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-md transition-transform transform hover:scale-105">
              View Products
            </Button>
          </Link>
          <Link to="/post-requirement">
            <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 px-8 py-3 rounded-md transition-transform transform hover:scale-105">
              Post Requirement
            </Button>
          </Link>
        </div>
      </div>
      
      <MultiStepInquiry 
        open={showInquiryForm}
        onClose={() => setShowInquiryForm(false)}
      />
    </div>
  );
};

export default Hero;
