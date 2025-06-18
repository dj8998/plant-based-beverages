import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, Award, Rocket, CheckCircle, Lightbulb, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              About QualFirst: Your Plant-Based Export Partner
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              QualFirst is a new-generation export brand powered by cutting-edge food tech, meticulous clean sourcing, and unwavering global quality standards.
            </p>
          </div>
        </div>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-xl p-8 mb-12 border border-gray-200 animate-fade-in animation-delay-300">
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">More Than Just a Supplier: Your Single Point Partner</h2>
              <p className="mb-6 text-lg text-gray-700 text-center">
                We are not just a directory or a passive supplier list. At QualFirst, we act as your independent trading partner, managing every aspect of sourcing clean-label, plant-based beverages from India. From initial product conceptualization and formulation to rigorous quality control, regulatory compliance, and seamless global logistics, we are your single point of contact, ensuring a smooth and successful export journey.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-center">
                <div className="flex flex-col items-center">
                  <Leaf className="h-12 w-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Clean Sourcing</h3>
                  <p className="text-gray-600 text-sm">Dedicated to finding the purest plant-based ingredients.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Award className="h-12 w-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Quality</h3>
                  <p className="text-gray-600 text-sm">Adhering to the highest international food safety and quality benchmarks.</p>
                </div>
                <div className="flex flex-col items-center">
                  <Rocket className="h-12 w-12 text-black mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Food Tech Driven</h3>
                  <p className="text-gray-600 text-sm">Leveraging innovation for superior product development and efficiency.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission & Values</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our mission is to empower global wellness brands by simplifying the complex process of sourcing high-quality, clean-label plant-based beverages from India. We are committed to building long-term partnerships based on trust, transparency, and shared success.
                </p>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-black mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Transparency:</span> Clear communication and honest practices in every interaction.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="h-6 w-6 text-black mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Innovation:</span> Continuously exploring new food technologies and sustainable practices.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Globe className="h-6 w-6 text-black mr-3 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Global Standards:</span> Ensuring all products meet stringent international quality and safety benchmarks.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mt-10 lg:mt-0">
                <img 
                  src="/images/about/mission.jpg" 
                  alt="QualFirst Team working on plant-based products" 
                  className="rounded-lg shadow-xl border border-gray-200 object-cover w-full h-80"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
