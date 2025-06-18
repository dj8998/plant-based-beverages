import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      <ProductHero
        name={productName}
        description={product.overview.description}
        nutritionalBenefits={product.nutritionalBenefits}
        cleanLabelPromise={product.cleanLabelPromise}
        idealUseCases={product.idealUseCases}
      />
      <ProductSpecs productDetails={product} />
      <ProductVariants variants={product.variants} />
      <Footer />
    </div>
  );
};

export default ProductPage;
