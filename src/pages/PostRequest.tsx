import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PostRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    category: '',
    productDetails: '',
    quantity: '',
    targetPrice: '',
    packagingRequirements: '',
    shippingPreferences: '',
    additionalInfo: '',
    created_at: new Date().toISOString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('product_requirements')
        .insert([{
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          category: formData.category,
          product_details: formData.productDetails,
          quantity: formData.quantity,
          target_price: formData.targetPrice,
          packaging_requirements: formData.packagingRequirements,
          shipping_preferences: formData.shippingPreferences,
          additional_info: formData.additionalInfo,
          created_at: formData.created_at,
        }]);

      if (error) throw error;

      toast({
        title: "Request Submitted",
        description: "Your product requirement has been submitted successfully! We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        category: '',
        productDetails: '',
        quantity: '',
        targetPrice: '',
        packagingRequirements: '',
        shippingPreferences: '',
        additionalInfo: '',
        created_at: new Date().toISOString()
      });

      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-sage-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
              Post Your Product Requirement
            </h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Tell us about your product needs, and we'll help you source the perfect plant-based solution.
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-emerald-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company Name *
                    </label>
                    <Input
                      id="company"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter your company name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Product Category *
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.category}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soy-milk">Soy Milk</SelectItem>
                        <SelectItem value="almond-milk">Almond Milk</SelectItem>
                        <SelectItem value="millet-milk">Millet Milk</SelectItem>
                        <SelectItem value="oat-milk">Oat Milk</SelectItem>
                        <SelectItem value="coconut-milk">Coconut Milk</SelectItem>
                        <SelectItem value="tofu">Tofu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                      Required Quantity *
                    </label>
                    <Input
                      id="quantity"
                      name="quantity"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Enter required quantity"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700">
                    Product Requirements *
                  </label>
                  <Textarea
                    id="productDetails"
                    name="productDetails"
                    required
                    value={formData.productDetails}
                    onChange={handleChange}
                    className="w-full min-h-[150px]"
                    placeholder="Please provide detailed specifications, requirements, and any other relevant information about the product you're looking for."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="targetPrice" className="block text-sm font-medium text-gray-700">
                    Target Price (Optional)
                  </label>
                  <Input
                    id="targetPrice"
                    name="targetPrice"
                    value={formData.targetPrice}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="e.g., $X.XX per liter, or specify currency and unit"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="packagingRequirements" className="block text-sm font-medium text-gray-700">
                    Packaging Requirements (Optional)
                  </label>
                  <Textarea
                    id="packagingRequirements"
                    name="packagingRequirements"
                    value={formData.packagingRequirements}
                    onChange={handleChange}
                    className="w-full min-h-[100px]"
                    placeholder="e.g., Aseptic tetra pack, PET bottles, specific sizes, branding needs."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="shippingPreferences" className="block text-sm font-medium text-gray-700">
                    Shipping Preferences (Optional)
                  </label>
                  <Textarea
                    id="shippingPreferences"
                    name="shippingPreferences"
                    value={formData.shippingPreferences}
                    onChange={handleChange}
                    className="w-full min-h-[100px]"
                    placeholder="e.g., FOB, CIF, preferred port, delivery timeline."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                    Additional Information (Optional)
                  </label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full min-h-[100px]"
                    placeholder="Any other details, certifications, or specific questions."
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-md hover:bg-emerald-700 transition-colors"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Requirement'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostRequest;
