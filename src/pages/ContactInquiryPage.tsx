import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ContactInquiryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formType, setFormType] = useState<'contact' | 'inquiry'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    productDetails: '',
    quantity: '',
    additionalInfo: '',
    message: '',
    created_at: new Date().toISOString()
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let dataToInsert: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        created_at: formData.created_at,
      };

      let tableName: string;

      if (formType === 'contact') {
        dataToInsert.message = formData.message;
        tableName = 'contact_submissions';
      } else {
        dataToInsert.product_details = formData.productDetails;
        dataToInsert.quantity = formData.quantity;
        dataToInsert.additional_info = formData.additionalInfo;
        tableName = 'inquiry_submissions';
      }

      const { error } = await supabase
        .from(tableName)
        .insert([dataToInsert]);

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: `Your ${formType === 'contact' ? 'message' : 'inquiry'} has been sent. We'll get back to you soon.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        productDetails: '',
        quantity: '',
        additionalInfo: '',
        message: '',
        created_at: new Date().toISOString()
      });

      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your message. Please try again.",
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {formType === 'contact' ? 'Contact Us' : 'Product Inquiry'}
              </h1>
              <p className="text-lg text-gray-600">
                {formType === 'contact'
                  ? 'Have questions or want to request samples? Fill out the form below.'
                  : 'Interested in our products? Let us know your requirements.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information Column */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">business@qualfirst.co.in</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+919660810447</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Navneet building, Santacruz west<br />
                      Mumbai, MH 400054<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
                <div className="flex space-x-4 mb-8">
                  <Button
                    variant={formType === 'contact' ? 'default' : 'outline'}
                    onClick={() => setFormType('contact')}
                    className={formType === 'contact' ? 'bg-black text-white hover:bg-gray-800' : 'border-black text-black hover:bg-gray-50'}
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant={formType === 'inquiry' ? 'default' : 'outline'}
                    onClick={() => setFormType('inquiry')}
                    className={formType === 'inquiry' ? 'bg-black text-white hover:bg-gray-800' : 'border-black text-black hover:bg-gray-50'}
                  >
                    Product Inquiry
                  </Button>
                </div>

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
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
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
                  </div>

                  {formType === 'inquiry' && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="productDetails" className="block text-sm font-medium text-gray-700">
                          Product Details *
                        </label>
                        <Input
                          id="productDetails"
                          name="productDetails"
                          required
                          value={formData.productDetails}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="Specify the product(s) you're interested in"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Required Quantity
                        </label>
                        <Input
                          id="quantity"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="w-full"
                          placeholder="Enter required quantity"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                          Additional Information
                        </label>
                        <Textarea
                          id="additionalInfo"
                          name="additionalInfo"
                          value={formData.additionalInfo}
                          onChange={handleChange}
                          className="w-full min-h-[100px]"
                          placeholder="Any specific requirements or questions?"
                        />
                      </div>
                    </>
                  )}

                  {formType === 'contact' && (
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-[150px]"
                        placeholder="How can we help you?"
                      />
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      {isSubmitting ? 'Sending...' : (formType === 'contact' ? 'Send Message' : 'Submit Inquiry')}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactInquiryPage;
