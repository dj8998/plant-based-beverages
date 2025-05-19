import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

type MultiStepInquiryProps = {
  open: boolean;
  onClose: () => void;
};

const productOptions = [
  { value: "furniture", label: "Furniture" },
  { value: "home-decor", label: "Home Decor" },
  { value: "textiles", label: "Textiles" },
  { value: "handicrafts", label: "Handicrafts" },
  { value: "specialty-collectibles", label: "Specialty & Collectibles" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "eu", label: "European Union" },
  { value: "other", label: "Other" },
];

const roleOptions = [
  { value: "buyer", label: "Buyer" },
  { value: "procurement", label: "Procurement Manager" },
  { value: "owner", label: "Business Owner" },
  { value: "other", label: "Other" },
];

export default function MultiStepInquiry({ open, onClose }: MultiStepInquiryProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    requirement: "",
    product_types: [] as string[],
    company_name: "",
    email: "",
    country: "",
    role: "",
    importing_from_india: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProductTypeChange = (productType: string) => {
    setFormData((prev) => ({
      ...prev,
      product_types: prev.product_types.includes(productType)
        ? prev.product_types.filter((type) => type !== productType)
        : [...prev.product_types, productType],
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("inquiries")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your inquiry has been submitted. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        requirement: "",
        product_types: [],
        company_name: "",
        email: "",
        country: "",
        role: "",
        importing_from_india: false,
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Tell Us About Your Requirements</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <>
                <div>
                  <label htmlFor="requirement" className="block text-sm font-medium mb-1">
                    What are you looking for? *
                  </label>
                  <textarea
                    id="requirement"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Please describe your product requirements, specifications, and any other relevant details."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Categories (Select all that apply) *
                  </label>
                  <div className="space-y-2">
                    {productOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.product_types.includes(option.value)}
                          onChange={() => handleProductTypeChange(option.value)}
                          className="rounded border-gray-300"
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-green-100 p-4 rounded-md text-sm">
                  We do not share any data with third parties. Your data is fully confidential with us.
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                >
                  Continue
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                    placeholder="Your Company Ltd."
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
                  <label htmlFor="country" className="block text-sm font-medium mb-1">
                    Country *
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select a country</option>
                    {countryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-1">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select your role</option>
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="importing_from_india"
                    name="importing_from_india"
                    checked={formData.importing_from_india}
                    onChange={handleChange}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="importing_from_india" className="text-sm">
                    Have you imported from India before?
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
