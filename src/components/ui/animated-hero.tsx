import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["revolutionary", "ancient", "sustainable", "nutritious", "tastier"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-8 lg:py-12 items-center justify-center flex-col">
          <div className="mt-4">
            <Link to="/launch-article">
              <Button variant="secondary" size="sm" className="gap-4">
                Read our launch article <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              While the world drinks almond and oat, we're sourcing India's ancient grains for the next plant milk revolution. QualFirst exports premium millet milk and plant-based beverages with precision quality control and seamless global logistics. 
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto items-center">
            <Link to="/contact">
              <Button size="default" className="gap-2 text-sm py-2 px-6" variant="outline">
                Request Millet Samples <PhoneCall className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="default" className="gap-2 text-sm py-2 px-6">
                Explore Full Portfolio <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero }; 