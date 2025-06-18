import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Feature() {
  return (
    <div className="w-full py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 py-4 lg:py-8 flex-col items-start">
          <div>
            <Badge>Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
             Why QualFirst?
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              Sourcing plant-based products from India shouldn't be complicated. We've simplified every step to help your brand scale globally.
            </p>
          </div>
          <div className="flex gap-10 pt-8 flex-col w-full">
            <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Trend Spotting</p>
                  <p className="text-muted-foreground text-sm">
                    We identify emerging plant milk opportunities before they hit mainstream markets.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Quality Assured</p>
                  <p className="text-muted-foreground text-sm">
                    Rigorous testing and certification ensure every batch meets global standards.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Premium Sources</p>
                  <p className="text-muted-foreground text-sm">
                    Curated network of India's finest plant-based manufacturers.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Partnership Focus</p>
                  <p className="text-muted-foreground text-sm">
                    We're your dedicated trading partner, not just another supplier directory.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Global Reach</p>
                  <p className="text-muted-foreground text-sm">
                    Seamless export logistics to 50+ countries with full compliance
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col gap-1">
                  <p>Lightning Fast</p>
                  <p className="text-muted-foreground text-sm">
                    Streamlined processes from sample to shipment in record time.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6">
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="default" className="bg-black hover:bg-gray-800 w-full sm:w-auto text-sm py-2">
                  Get Started
                </Button>
              </Link>
              <Link to="/about-us" className="w-full sm:w-auto">
                <Button size="default" variant="outline" className="border-black text-black hover:bg-gray-50 w-full sm:w-auto text-sm py-2">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Feature }; 