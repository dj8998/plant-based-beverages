import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Hero from '../components/Hero';
import CompanyInfo from '../components/CompanyInfo';
import CategoryOverview from '../components/CategoryOverview';
import ProductSearch from '../components/ProductSearch';
import ConnectSteps from '../components/ConnectSteps';
import Testimonials from '../components/Testimonials';
import AlternateSourcing from '../components/AlternateSourcing';
import Footer from '../components/Footer';
import { Zap, Pencil, MessageSquare, Box, Truck, CheckSquare } from "lucide-react";

const whatWeDo = [
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Sourcing & Supplier Matching",
    desc: "We connect you to verified Indian manufacturers based on your product, volume, quality standards, and pricing goals."
  },
  {
    icon: <Pencil className="h-8 w-8 text-blue-600" />,
    title: "Product Development & Customization",
    desc: "Looking to build something unique? We work with suppliers to develop private label products and custom pieces tailored to your market."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: "Buyer-Supplier Communication Management",
    desc: "No more chasing WhiApp messages. We manage all supplier communication — clear, documented, and trackable."
  },
  {
    icon: <Box className="h-8 w-8 text-blue-600" />,
    title: "Production Oversight & Quality Control",
    desc: "Our field teams conduct in-factory quality checks and maintain production timelines so you don't have to worry about surprises."
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: "Logistics & Compliance Support",
    desc: "From documentation to freight coordination and customs, we help manage the end-to-end supply — especially useful for new importers."
  },
  {
    icon: <CheckSquare className="h-8 w-8 text-blue-600" />,
    title: "Real-Time Updates",
    desc: "Track production, QC status, shipping progress, and approvals — all from a single dashboard."
  }
];

function WhatDoesQualFirstDoSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#EAE4EB' }}>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-4">What Does QualFirst Do?</h2>
        <p className="text-lg text-gray-700 mb-8">
          We're not just a marketplace — we're your export sourcing partner in India.<br />
          Whether you're a Shopify brand, retail buyer, or mid-size importer, QualFirst helps you source better from India — with built-in support, verified suppliers, and real-time visibility.
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ border: '1px solid #222', borderRadius: '12px', padding: '2rem' }}
        >
          {whatWeDo.map((item, idx) => (
            <div
              key={idx}
              className={
                `flex flex-col items-start space-y-3` +
                // Add vertical border for md+ screens except last col, horizontal for mobile except last row
                (idx < whatWeDo.length - 1
                  ? (idx % 3 !== 2
                    ? ' md:border-r md:border-gray-300'
                    : '')
                  : '') +
                (idx < whatWeDo.length - 1
                  ? (idx < whatWeDo.length - 1 && idx % 3 === 2
                    ? ' md:pr-0'
                    : '')
                  : '') +
                (idx < whatWeDo.length - 1
                  ? ' border-b border-gray-300 md:border-b-0 md:pb-0 pb-8'
                  : '')
              }
              style={{ paddingRight: '2rem', paddingBottom: '2rem' }}
            >
              {item.icon}
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow">
        <Hero />
        <CompanyInfo />
        <CategoryOverview />
        <ProductSearch />
        <WhatDoesQualFirstDoSection />
        <ConnectSteps />
        <Testimonials />
        <AlternateSourcing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
