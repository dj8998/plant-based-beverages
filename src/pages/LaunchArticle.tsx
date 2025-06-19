import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LaunchArticle: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Headline and Image */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: Headline and Intro */}
              <div className="flex flex-col justify-center h-full">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 mb-4 leading-tight">
                  The Millet Milk Revolution Is Coming
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-xl">
                  Why the world's next great plant-based drink might come from India's oldest grain.
                </p>
                <div className="w-20 h-1 bg-emerald-100 rounded mb-6" />
                <p className="text-lg text-gray-700 mb-0 max-w-xl">
                  At QualFirst, we're not just exporting products — we're{' '}
                  <span className="text-emerald-700 font-semibold">exporting ancient wisdom in modern packaging</span>. And it all begins with <span className="text-emerald-700 font-semibold">millet milk</span>.
                </p>
              </div>
              {/* Right: Article Image */}
              <div className="flex justify-center items-center h-full">
                <img 
                  src="/images/products/article.png"
                  alt="Millet milk article hero"
                  className="w-full max-w-md rounded-2xl shadow-2xl object-cover aspect-[4/5] border border-gray-100"
                  style={{ background: '#f8fafc' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Forgotten Grain Section */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-amber-50 rounded-2xl shadow-md p-8 md:p-12 flex flex-col items-center text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3">🌱</span>
                <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-gray-900">
                  From Forgotten Grain to Global Superfood
                </h2>
              </div>
              <div className="w-16 h-1 bg-emerald-100 rounded mb-6" />
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Millets have sustained civilizations in India for over 5,000 years. Drought-resistant, 
                  nutrient-rich, and incredibly versatile, these humble grains were once staples in 
                  Indian households long before wheat or rice took over.
                </p>
                <p>
                  But somewhere along the road to industrialized agriculture, they were forgotten. Now, 
                  as global consumers seek sustainable, allergen-free, and nutrient-dense alternatives, 
                  millets are stepping back into the spotlight — not as grains, but as the next generation 
                  of plant-based milk.
                </p>
                <p className="font-semibold text-gray-900">
                  It's not just milk. It's a story of resilience — of a grain making a comeback with purpose.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Special Features & What We Offer Side by Side */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-12 gap-12">
              {/* Special Features */}
              <div className="md:col-span-7 w-full">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🧪</span>
                  <h2 className="text-2xl md:text-3xl tracking-tighter font-regular font-bold text-gray-900">
                    What Makes Millet Milk So Special?
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Nut-free & Soy-free</div>
                    <div className="text-gray-600 text-base">Safe for allergy-prone consumers</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Low Glycemic & Gut-friendly</div>
                    <div className="text-gray-600 text-base">Great for diabetics and wellness seekers</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Sustainable</div>
                    <div className="text-gray-600 text-base">Millets grow with minimal water, no fancy fertilizers</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Naturally Nutritious</div>
                    <div className="text-gray-600 text-base">High in fiber, protein, iron, and calcium</div>
                  </div>
                </div>
              </div>
              {/* What We Offer */}
              <div className="md:col-span-5 w-full">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">💡</span>
                  <h2 className="text-2xl md:text-3xl tracking-tighter font-regular font-bold text-gray-900">
                    What We Offer
                  </h2>
                </div>
                <div className="space-y-5">
                  <div className="flex items-start gap-3 bg-white rounded-xl shadow p-5">
                    <span className="text-2xl">🧪</span>
                    <div>
                      <div className="font-semibold text-gray-900">R&D + Recipe Development</div>
                      <div className="text-gray-600 text-sm">Barista blends, flavored SKUs, sugar-free options</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl shadow p-5">
                    <span className="text-2xl">🏷️</span>
                    <div>
                      <div className="font-semibold text-gray-900">Private Label & Branding Support</div>
                      <div className="text-gray-600 text-sm">Ready for USA, EU, GCC markets</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl shadow p-5">
                    <span className="text-2xl">📦</span>
                    <div>
                      <div className="font-semibold text-gray-900">Custom Packaging</div>
                      <div className="text-gray-600 text-sm">Bottles, cans, pouches, Tetra</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white rounded-xl shadow p-5">
                    <span className="text-2xl">📜</span>
                    <div>
                      <div className="font-semibold text-gray-900">Certifications + Compliance</div>
                      <div className="text-gray-600 text-sm">USFDA, FSSAI, ISO22000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="py-16 px-4" style={{ background: '#C2A887' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-4xl mb-4 block">🚀</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900">
              Be Early. Be Brave. Be Better.
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-lg leading-relaxed mb-12 text-gray-900">
              <p>
                Millet milk is not yet mainstream. And that's exactly why this is your moment.
              </p>
              <p>
                If you're building a health-conscious brand, running a retail chain, or looking for 
                white-label options — get in early. Because the plant milk shelf is evolving, and 
                the most powerful stories don't come from crowded markets. They come from untold origins.
              </p>
              <p className="font-medium">
                Let's write the next chapter of plant-based innovation — together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Request Millet Samples
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 w-full sm:w-auto"
                >
                  Talk to Our Team
                </Button>
              </Link>
              <Link to="/products" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 w-full sm:w-auto"
                >
                  Explore Full Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LaunchArticle; 