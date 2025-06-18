import { Lightbulb, MapPin, Sprout, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function FounderStory() {
  const storyPoints = [
    {
      icon: <MapPin className="w-8 h-8" />, 
      title: "Deep Roots in India",
      description: "Growing up surrounded by India's rich agricultural heritage, I witnessed farmers cultivating millets for generations - grains that sustained civilizations for over 5,000 years."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />, 
      title: "The Global Gap",
      description: "While working in international trade, I noticed Western markets obsessing over oat and almond milk, yet completely overlooking India's nutritionally superior millet varieties."
    },
    {
      icon: <Sprout className="w-8 h-8" />, 
      title: "The Aha Moment",
      description: "When I compared millet's protein content, sustainability footprint, and allergen-free nature against popular alternatives, I realized we were sitting on liquid gold."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />, 
      title: "First-Mover Advantage",
      description: "Instead of following the crowd with commoditized products, I decided to help forward-thinking brands capture the millet milk opportunity before it goes mainstream."
    }
  ];

  return (
    <div className="w-full py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 items-center flex-col lg:flex-row">
          {/* Left side - Story content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <span className="text-black font-semibold text-lg">Our Story</span>
              </div>
              <h2 className="text-3xl md:text-5xl tracking-tighter font-regular text-gray-900 founder-story-heading">
                The Millet Milk Discovery
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-2xl founder-story-description">
                How ancient Indian wisdom is reshaping the global plant milk industry, one premium export at a time.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {storyPoints.map((point, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-black border-2 border-gray-200">
                    {point.icon}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Link to="/contact">
                <Button size="lg" className="bg-black hover:bg-gray-800">
                  Partner With Us
                </Button>
              </Link>
              <Link to="/about-us">
                <Button size="lg" variant="outline" className="border-black text-black hover:bg-gray-50">
                  Learn Our Process
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="flex-1 flex flex-col gap-6 lg:pl-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2">
                    Why Millet Milk?
                  </h4>
                  <p className="text-gray-600">
                    The numbers speak for themselves
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-black">6x</div>
                    <div className="text-sm text-gray-600">More protein than almond milk</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-black">90%</div>
                    <div className="text-sm text-gray-600">Less water than almonds</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-black">0</div>
                    <div className="text-sm text-gray-600">Common allergens</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-black">5000+</div>
                    <div className="text-sm text-gray-600">Years of cultivation</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-6 text-white">
              <blockquote className="text-lg italic mb-4">
                "While everyone was chasing the next trendy superfood, the answer was growing in India's fields all along."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold">QF</span>
                </div>
                <div>
                  <div className="font-semibold">QualFirst Founder</div>
                  <div className="text-gray-300 text-sm">Plant Milk Innovation Pioneer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { FounderStory }; 