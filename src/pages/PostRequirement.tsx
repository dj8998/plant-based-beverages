import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PostRequirement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productType: '',
    quantity: '',
    specifications: '',
    timeline: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('product_requirements')
        .insert([formData]);

      if (error) {
        console.error('Error posting requirement:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          productType: '',
          quantity: '',
          specifications: '',
          timeline: '',
          additionalInfo: ''
        });
      }
    } catch (error) {
      console.error('Error posting requirement:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Post Your Requirement
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your specific product requirements and we'll connect you with the right suppliers and solutions.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Requirement Details</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">Thank you! Your requirement has been posted successfully. We'll get back to you within 24 hours.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Sorry, there was an error posting your requirement. Please try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company Name
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productType" className="text-sm font-medium text-gray-700">
                  Product Type *
                </Label>
                <Select value={formData.productType} onValueChange={(value) => handleSelectChange('productType', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soy-milk">Soy Milk</SelectItem>
                    <SelectItem value="almond-milk">Almond Milk</SelectItem>
                    <SelectItem value="millet-milk">Millet Milk</SelectItem>
                    <SelectItem value="oat-milk">Oat Milk</SelectItem>
                    <SelectItem value="other-beverages">Other Plant Beverages</SelectItem>
                    <SelectItem value="custom">Custom Formulation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Required Quantity
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="text"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="e.g., 10 tons/month"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specifications" className="text-sm font-medium text-gray-700">
                Product Specifications
              </Label>
              <Textarea
                id="specifications"
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                className="mt-1 min-h-[100px]"
                placeholder="Describe your specific requirements: ingredients, nutritional profile, packaging, certifications needed, etc."
              />
            </div>

            <div>
              <Label htmlFor="timeline" className="text-sm font-medium text-gray-700">
                Timeline
              </Label>
              <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-3-months">1-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6+months">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
                Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="mt-1 min-h-[100px]"
                placeholder="Any other details about your requirement, target market, distribution channels, etc."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button type="submit" className="bg-black hover:bg-gray-800 w-full sm:w-auto">
                {isSubmitting ? "Posting..." : "Post Requirement"}
              </Button>
              <Link to="/" className="w-full sm:w-auto">
                <Button type="button" variant="outline" className="border-black text-black hover:bg-gray-50 w-full sm:w-auto">
                  Back to Home
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostRequirement; 