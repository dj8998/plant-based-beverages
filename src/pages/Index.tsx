import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyQualFirst from '../components/CompanyInfo';
import OurProducts from '../components/OurProducts';
import HowItWorks from '../components/ConnectSteps';
import WhatWeOffer from '../components/WhatWeOffer';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCta = () => {
  return (
    <section className="py-16 bg-emerald-700 text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Grow Your Plant-Based Brand Globally?
        </h2>
        <p className="text-lg mb-10">
          Partner with QualFirst for seamless sourcing, precise quality control, and efficient export of your clean-label, alt-dairy beverages from India.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/inquiry">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 px-8 py-4 rounded-md transition-transform transform hover:scale-105">
              Request Samples
            </Button>
          </Link>
          <Link to="/post-requirement">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-100 px-8 py-4 rounded-md transition-transform transform hover:scale-105">
              Post Your Requirement
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhyQualFirst />
        <OurProducts />
        <HowItWorks />
        <WhatWeOffer />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
