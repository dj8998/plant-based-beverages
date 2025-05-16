
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const InquiryPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    productDetails: '',
    quantity: '',
    additionalInfo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to Supabase or your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Inquiry Submitted",
      description: "We've received your inquiry and will contact you soon.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      productDetails: '',
      quantity: '',
      additionalInfo: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Post a Product Inquiry</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block mb-2 text-sm font-medium">Company Name</label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block mb-2 text-sm font-medium">Quantity Required</label>
                  <Input
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="productDetails" className="block mb-2 text-sm font-medium">Product Details</label>
                <Textarea
                  id="productDetails"
                  name="productDetails"
                  value={formData.productDetails}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the product you're looking for, including specifications, materials, etc."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="additionalInfo" className="block mb-2 text-sm font-medium">Additional Information</label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any other requirements or information you'd like to share"
                />
              </div>
              
              <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                Submit Inquiry
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InquiryPage;
