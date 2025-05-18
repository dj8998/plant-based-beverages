
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MultiStepInquiry from "./MultiStepInquiry";

const Hero = () => {
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              FIND THE PERFECT <br /> MANUFACTURING <br /> PARTNER
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              We connect you to curated suppliers, handle communication, and manage everything from production to delivery.
            </p>
            <div className="mt-8">
              <Button 
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 rounded-sm"
                onClick={() => setShowInquiryForm(true)}
              >
                Get Started - <span className="ml-1">It's free</span>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="/placeholder.svg" 
              alt="Factory production floor" 
              className="w-full h-[400px] object-cover rounded-md shadow-md"
            />
          </div>
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
