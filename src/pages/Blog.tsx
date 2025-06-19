import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Blog: React.FC = () => {
  return (
    <section className="bg-white min-h-screen py-16 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">The Millet Milk Revolution Is Coming</h1>
        <p className="text-xl text-gray-700 mb-8">Why the world's next great plant-based drink might come from India's oldest grain.</p>
        <hr className="my-8 border-gray-200" />
        <p className="text-lg text-gray-700 mb-8">At QualFirst, we're not just exporting products — we're <span className="text-emerald-700 font-semibold">exporting ancient wisdom in modern packaging</span>. And it all begins with <span className="text-emerald-700 font-semibold">millet milk</span>.</p>
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 min-w-[280px]">
            <img src="/images/products/millet milk.png" alt="Millet Milk Pour" className="rounded-xl shadow-lg w-full object-cover aspect-[4/5]" />
          </div>
          <div className="flex-1 flex flex-col gap-6 justify-center">
            <div>
              <h2 className="text-2xl font-semibold text-emerald-900 mb-2 flex items-center gap-2">
                <span>From Forgotten Grain to Global Superfood</span>
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Millets have sustained civilizations in India for over 5,000 years, thought resistant, nutrient-rich, and increasingly creative and versatile. Those humble grains were once staples in Indian households long before wheat or rice took over. But somewhere along the road to industrialized agriculture, they were forgotten. Now, they're making a comeback — as global milk. It's a story of resilience — of a grain making a comeback with purpose.
              </p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span role="img" aria-label="Special">🦾</span> What Makes Millet Milk So Special?
            </h3>
            <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
              <li>Nut-free & Gov-free</li>
              <li>Low glycemic & gut–friendly</li>
              <li>Sustainable</li>
              <li>Naturally nutritious</li>
            </ul>
            <p className="text-gray-700 text-base">It's not just milk. <span className="font-semibold text-emerald-800">It's a story of resilience</span> — of a grain making a comeback with purpose.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span role="img" aria-label="Offer">📝</span> What We Offer
            </h3>
            <ul className="list-disc pl-5 text-gray-700 mb-3 space-y-1">
              <li>At QualFirst, we don't just source. We partner, to nourish milk.</li>
              <li>R&D • Recipe Development — geared for retail chains, flavored SKUs, sugarfree options</li>
              <li>Private Label & Branding Support — ready for USA, EU, CCC markets</li>
              <li>Custom Packaging — bottles, cans, pouches, Tetra</li>
              <li>Certifications • Compliance — USFDA, FESAL ISO22000</li>
              <li>Full Export Logistics — from sample to scale</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <Link to="/contact" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto border-emerald-700 text-emerald-700 hover:bg-emerald-50">Request Millet Samples</Button>
          </Link>
          <Link to="/contact" className="w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto border-emerald-700 text-emerald-700 hover:bg-emerald-50">Talk to Our Team</Button>
          </Link>
          <Link to="/products" className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-emerald-700 text-white hover:bg-emerald-800">Explore Full Portfolio</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
