import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductVariant {
  name: string;
  description: string;
  features: string[];
}

interface ProductVariantsProps {
  variants: ProductVariant[];
}

const ProductVariants = ({ variants }: ProductVariantsProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-sage-600 bg-clip-text text-transparent">
            Available Variants
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our range of carefully crafted variants, each designed to meet specific nutritional needs and preferences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants.map((variant, index) => (
            <motion.div
              key={variant.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              <Card className="p-6 bg-white border border-emerald-100 hover:border-emerald-200 transition-colors duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-emerald-800">{variant.name}</h3>
                  <div className="flex gap-2">
                    {/* Removed isOrganic and isFortified as they are not in productDetails.json */}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{variant.description}</p>
                <ul className="space-y-2">
                  {variant.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 + featureIndex * 0.1 }}
                      className="flex items-center text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductVariants; 