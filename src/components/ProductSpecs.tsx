import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Leaf, Award, Package, Box, Clock, Shield, Settings } from 'lucide-react';

interface ProductSpecsProps {
  productDetails: {
    overview: {
      description: string;
      features: string[];
    };
    nutritionalBenefits: string[];
    cleanLabelPromise: string[];
    idealUseCases: string[];
    moq?: {
      details: Array<{ type: string; quantity: string }>;
    };
    packaging?: {
      formats: Array<{ type: string; sizes: string[] }>;
    };
    shelfLife?: {
      details: string[];
    };
    certifications?: {
      details: string[];
    };
    customOptions?: {
      details: string[];
    };
  };
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ productDetails }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="grid gap-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Product Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {productDetails.overview?.description || ''}
              </p>
            </div>

            {/* Nutritional Benefits */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Nutritional Benefits</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Array.isArray(productDetails.nutritionalBenefits) ? productDetails.nutritionalBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{benefit}</p>
                  </div>
                )) : null}
              </div>
            </div>

            {/* Clean Label Promise */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Clean Label Promise</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Array.isArray(productDetails.cleanLabelPromise) ? productDetails.cleanLabelPromise.map((promise, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{promise}</p>
                  </div>
                )) : null}
              </div>
            </div>

            {/* Packaging Formats */}
            {productDetails.packaging && productDetails.packaging.formats && Array.isArray(productDetails.packaging.formats) ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Packaging Formats</h2>
              <div className="space-y-3">
                {productDetails.packaging.formats.map((format, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Box className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{format.type}: {format.sizes.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}

            {/* Shelf Life */}
            {productDetails.shelfLife && productDetails.shelfLife.details && Array.isArray(productDetails.shelfLife.details) ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Shelf Life</h2>
              <div className="space-y-3">
                {productDetails.shelfLife.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}

            {/* Certifications */}
            {productDetails.certifications && productDetails.certifications.details && Array.isArray(productDetails.certifications.details) ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
              <div className="space-y-3">
                {productDetails.certifications.details.map((certification, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{certification}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}

            {/* Minimum Order Quantity */}
            {productDetails.moq && productDetails.moq.details && Array.isArray(productDetails.moq.details) ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Minimum Order Quantity</h2>
              <div className="space-y-3">
                {productDetails.moq.details.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{item.type}: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}

            {/* Custom Options */}
            {productDetails.customOptions && productDetails.customOptions.details && Array.isArray(productDetails.customOptions.details) ? (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Custom Options</h2>
              <div className="space-y-3">
                {productDetails.customOptions.details.map((option, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{option}</p>
                  </div>
                ))}
              </div>
            </div>
            ) : null}

            {/* Ideal Use Cases */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Ideal Use Cases</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Array.isArray(productDetails.idealUseCases) ? productDetails.idealUseCases.map((useCase, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{useCase}</p>
                  </div>
                )) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSpecs; 