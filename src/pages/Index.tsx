import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { Feature } from "@/components/ui/feature-with-advantages";
import { FeatureSectionWithGrid } from "@/components/ui/feature-section-with-grid";
import HowItWorks from '../components/ConnectSteps';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FounderStory } from "@/components/FounderStory";

const FinalCta = () => {
  return (
    <section className="py-12 lg:py-16 bg-black text-white text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
          Ready to Grow Your Plant-Based Brand Globally?
        </h2>
        <p className="text-base lg:text-lg mb-8 lg:mb-10">
          Partner with QualFirst for seamless sourcing, precise quality control, and efficient export of your clean-label, alt-dairy beverages from India.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 lg:gap-4">
          <Link to="/inquiry" className="w-full sm:w-auto">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 rounded-md transition-transform transform hover:scale-105 w-full sm:w-auto">
              Request Samples
            </Button>
          </Link>
          <Link to="/post-requirement" className="w-full sm:w-auto">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 rounded-md transition-transform transform hover:scale-105 w-full sm:w-auto">
              Post Your Requirement
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full h-px bg-white mt-12 lg:mt-16"></div>
    </section>
  );
};

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FounderStory />
        <FeatureSectionWithGrid />
        <Feature />
        <HowItWorks />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
