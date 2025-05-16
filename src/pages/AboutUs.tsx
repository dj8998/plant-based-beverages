
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Bridging Continents, Empowering Commerce</h2>
            <p className="mb-4">
              At qualFirst, our mission is to demystify and streamline the global sourcing process from India, making it accessible, reliable, and sustainable for businesses worldwide.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">What We Stand For</h3>
            <ul className="list-disc pl-5 mb-6 space-y-2">
              <li>Transparency in every transaction and relationship</li>
              <li>Quality assurance through rigorous verification and monitoring</li>
              <li>Ethical sourcing and support for sustainable manufacturing practices</li>
              <li>Fair partnerships that benefit both buyers and manufacturers</li>
              <li>Innovation in the traditional sourcing model</li>
            </ul>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Our Story</h3>
            <p className="mb-4">
              qualFirst was born from a simple observation: while India offers exceptional manufacturing capabilities, international buyers often struggle with finding reliable partners, navigating cultural differences, and ensuring consistent quality.
            </p>
            <p className="mb-4">
              Our founders, with decades of experience in global trade and manufacturing, set out to create a platform that addresses these challenges head-on. By combining technology with on-the-ground expertise, we've developed a system that brings confidence, efficiency, and reliability to India-sourced products.
            </p>
            
            <h3 className="text-xl font-medium mt-6 mb-3">Our Commitment</h3>
            <p>
              We are committed to facilitating meaningful connections between international businesses and Indian manufacturers that go beyond transactional relationships. Our goal is to foster long-term partnerships built on trust, mutual growth, and shared success.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-4">The qualFirst Advantage</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Vetted Manufacturing Network</h3>
                <p>
                  Every manufacturer on our platform undergoes thorough verification, facility audits, and regular quality assessments. We know our partners personally and understand their capabilities in depth.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Simplified Sourcing</h3>
                <p>
                  Our platform eliminates complexity by standardizing communications, streamlining negotiations, and providing clear, actionable information at every step of the sourcing journey.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Local Expertise, Global Reach</h3>
                <p>
                  With teams on the ground in major manufacturing hubs across India, we provide local insights and support while serving clients worldwide.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">End-to-End Support</h3>
                <p>
                  From initial inquiry to final delivery, we're with you every step of the way, ensuring smooth communication, quality production, and timely fulfillment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
