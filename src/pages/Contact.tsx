import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
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
        .from('contact_submissions')
        .insert([formData]);

      if (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to source premium plant-based beverages? Contact our team to discuss your requirements and receive samples.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">Sorry, there was an error sending your message. Please try again.</p>
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

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 min-h-[120px]"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <Button type="submit" className="bg-black hover:bg-gray-800 w-full sm:w-auto">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Link to="/" className="w-full sm:w-auto">
                  <Button type="button" variant="outline" className="border-black text-black hover:bg-gray-50 w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+919876543210" className="hover:text-gray-900 transition-colors">
                      +91 98765 43210
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@qualfirst.com" className="hover:text-gray-900 transition-colors">
                      info@qualfirst.com
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    Mumbai, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Business Hours</h2>
              <div className="space-y-2">
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM IST</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Why Choose QualFirst?</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Premium quality plant-based beverages</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Clean label and natural ingredients</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Reliable export and logistics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600">Custom formulations available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact; 