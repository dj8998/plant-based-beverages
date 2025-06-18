import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductHero from '@/components/ProductHero';
import ProductSpecs from '@/components/ProductSpecs';
import ProductVariants from '@/components/ProductVariants';
import productDetails from '@/data/productDetails.json';

const ProductPage: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [productName, setProductName] = useState<string>('');

  useEffect(() => {
    if (!productSlug) {
      navigate('/');
      return;
    }

    // Convert slug to product name (e.g., "soy-milk" -> "Soy Milk")
    const formattedName = productSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setProductName(formattedName);
  }, [productSlug, navigate]);

  if (!productName || !productDetails.productDetails[productName]) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const product = productDetails.productDetails[productName];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Product Hero */}
        <ProductHero
          name={product.name}
          description={product.overview.description}
          nutritionalBenefits={product.nutritionalBenefits}
          cleanLabelPromise={product.cleanLabelPromise}
          idealUseCases={product.idealUseCases}
        />
        
        {/* Product Variants */}
        <div className="mt-8 lg:mt-12">
          <ProductVariants variants={product.variants} />
        </div>
        
        {/* Product Specifications */}
        <div className="mt-8 lg:mt-12">
          <ProductSpecs productDetails={product} />
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 lg:mt-16 bg-gray-50 rounded-2xl p-6 lg:p-8 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Ready to Source {product.name}?
          </h3>
          <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 max-w-2xl mx-auto">
            Get in touch with our team to discuss your requirements and receive samples.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="bg-black hover:bg-gray-800 w-full sm:w-auto">
                Request Samples
              </Button>
            </Link>
            <Link to="/inquiry" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-50 w-full sm:w-auto">
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
