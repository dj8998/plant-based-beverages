import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Footer from '../components/Footer';

export default function TalkToExpert() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business_type: "",
    requirements: "",
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
        .from("expert_consultations")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your consultation request has been submitted. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        business_type: "",
        requirements: "",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
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
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold mb-2 text-center">Talk to an Expert</h1>
              <p className="text-center text-gray-600 mb-8">
                Get personalized guidance from our sourcing experts
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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

                  <div>
                    <label htmlFor="business_type" className="block text-sm font-medium mb-1">
                      Business Type *
                    </label>
                    <select
                      id="business_type"
                      name="business_type"
                      value={formData.business_type}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select your business type</option>
                      <option value="retailer">Retailer</option>
                      <option value="wholesaler">Wholesaler</option>
                      <option value="distributor">Distributor</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium mb-1">
                    Your Requirements *
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please describe your business needs and what you'd like to discuss with our expert."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Request Consultation"}
                </button>

                <p className="text-center text-sm text-gray-500">
                  Our experts will review your request and schedule a consultation at your preferred time.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
