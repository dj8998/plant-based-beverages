import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ProductHeroProps {
  name: string;
  description: string;
  nutritionalBenefits: string[];
  cleanLabelPromise: string[];
  idealUseCases: string[];
}

const ProductHero: React.FC<ProductHeroProps> = ({
  name,
  description,
  nutritionalBenefits,
  cleanLabelPromise,
  idealUseCases,
}) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 items-center flex-col lg:flex-row">
          {/* Left side - Product content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-black font-semibold text-lg">Product</span>
              </div>
              <h1 className="text-3xl md:text-5xl tracking-tighter font-regular text-gray-900">
                {name}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl">
                {description}
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {nutritionalBenefits.map((benefit, index) => {
                // Dynamic headline mapping based on benefit content
                const getHeadline = (benefitText: string) => {
                  const lowerBenefit = benefitText.toLowerCase();
                  
                  if (lowerBenefit.includes('protein')) return "Complete Plant Protein";
                  if (lowerBenefit.includes('vitamin e')) return "Rich in Vitamin E";
                  if (lowerBenefit.includes('vitamin')) return "Essential Vitamins";
                  if (lowerBenefit.includes('lactose')) return "Lactose-Free";
                  if (lowerBenefit.includes('saturated')) return "Low Saturated Fat";
                  if (lowerBenefit.includes('skin') || lowerBenefit.includes('eyes')) return "Skin & Eye Health";
                  if (lowerBenefit.includes('muscle')) return "Muscle Health";
                  if (lowerBenefit.includes('amino')) return "Essential Amino Acids";
                  if (lowerBenefit.includes('antioxidant')) return "Antioxidant Properties";
                  if (lowerBenefit.includes('mineral')) return "Natural Minerals";
                  if (lowerBenefit.includes('fiber')) return "High Fiber Content";
                  if (lowerBenefit.includes('calcium')) return "Calcium Rich";
                  if (lowerBenefit.includes('iron')) return "Iron Fortified";
                  if (lowerBenefit.includes('omega')) return "Omega Fatty Acids";
                  if (lowerBenefit.includes('digestive')) return "Digestive Wellness";
                  if (lowerBenefit.includes('heart')) return "Heart Health";
                  if (lowerBenefit.includes('immune')) return "Immune Support";
                  
                  // Default fallback based on position
                  const defaultHeadlines = [
                    "Premium Nutrition",
                    "Health Benefits", 
                    "Natural Goodness",
                    "Wellness Support"
                  ];
                  return defaultHeadlines[index] || "Nutritional Benefit";
                };
                
                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-black border-2 border-gray-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {getHeadline(benefit)}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 pt-6">
              <Link to="/contact">
                <Button size="lg" className="bg-black hover:bg-gray-800">
                  Request Samples
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-50">
                  View Variants
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="flex-1 flex flex-col gap-6 lg:pl-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                    Clean Label Promise
                  </h4>
                  <p className="text-gray-600">
                    Premium quality with clean ingredients
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {idealUseCases.map((useCase, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">{useCase}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero; 