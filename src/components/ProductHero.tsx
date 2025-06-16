import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

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
    <section className="relative py-20 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {name}
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            {description}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Nutritional Benefits */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Nutritional Benefits</h2>
              <ul className="space-y-3">
                {nutritionalBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clean Label Promise */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Clean Label Promise</h2>
              <ul className="space-y-3">
                {cleanLabelPromise.map((promise, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{promise}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ideal Use Cases */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Ideal Use Cases</h2>
              <ul className="space-y-3">
                {idealUseCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductHero; 