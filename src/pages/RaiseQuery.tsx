import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';

export default function RaiseQuery() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    query_type: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("query_submissions")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your query has been submitted. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        query_type: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting query:", error);
      toast({
        title: "Error",
        description: "Failed to submit query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Raise a Query</h1>
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  placeholder="Your Company Ltd."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+1 123 456 7890"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="query_type" className="block text-sm font-medium mb-1">
                Query Type *
              </label>
              <select
                id="query_type"
                name="query_type"
                value={formData.query_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Select a query type</option>
                <option value="product">Product Information</option>
                <option value="pricing">Pricing</option>
                <option value="shipping">Shipping & Delivery</option>
                <option value="quality">Quality Control</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Query Details *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Please provide details about your query or issue so we can assist you better."
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Query"}
            </button>

            <p className="text-center text-sm text-gray-500">
              For urgent matters, please contact us directly at support@qualfirst.com
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
