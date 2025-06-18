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

const Inquiry = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    quantity: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('inquiry_submissions')
        .insert([formData]);

      if (error) {
        console.error('Error submitting inquiry:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          productInterest: '',
          quantity: '',
          timeline: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
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
            Request a Quote
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Get a customized quote for your plant-based beverage requirements. Our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Inquiry Form</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">Thank you! Your inquiry has been submitted successfully. We'll get back to you within 24 hours.</p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Sorry, there was an error submitting your inquiry. Please try again.</p>
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
                <Label htmlFor="productInterest" className="text-sm font-medium text-gray-700">
                  Product Interest *
                </Label>
                <Select value={formData.productInterest} onValueChange={(value) => handleSelectChange('productInterest', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soy-milk">Soy Milk</SelectItem>
                    <SelectItem value="almond-milk">Almond Milk</SelectItem>
                    <SelectItem value="millet-milk">Millet Milk</SelectItem>
                    <SelectItem value="oat-milk">Oat Milk</SelectItem>
                    <SelectItem value="multiple">Multiple Products</SelectItem>
                    <SelectItem value="custom">Custom Formulation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                  Estimated Quantity
                </Label>
                <Select value={formData.quantity} onValueChange={(value) => handleSelectChange('quantity', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-5 tons/month)</SelectItem>
                    <SelectItem value="medium">Medium (5-20 tons/month)</SelectItem>
                    <SelectItem value="large">Large (20+ tons/month)</SelectItem>
                    <SelectItem value="custom">Custom Quantity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Additional Requirements
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 min-h-[120px]"
                placeholder="Tell us about your specific requirements, certifications needed, packaging preferences, etc."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button type="submit" className="bg-black hover:bg-gray-800 w-full sm:w-auto">
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
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

export default Inquiry; 