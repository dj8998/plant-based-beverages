
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

type MultiStepInquiryProps = {
  open: boolean;
  onClose: () => void;
};

// Form validation schemas for each step
const step1Schema = z.object({
  requirement: z.string().min(10, "Please provide more details about your requirement"),
  productTypes: z.array(z.string()).min(1, "Select at least one product type"),
});

const step2Schema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  country: z.string().min(1, "Country is required"),
  role: z.string().min(1, "Role is required"),
  importingFromIndia: z.enum(["yes", "no"]),
});

// Form data type
type InquiryFormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema>;

const MultiStepInquiry = ({ open, onClose }: MultiStepInquiryProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<InquiryFormData>>({
    productTypes: [],
    importingFromIndia: "no",
  });
  const { toast } = useToast();

  // Step 1 form
  const step1Form = useForm<z.infer<typeof step1Schema>>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      requirement: "",
      productTypes: [],
    },
  });

  // Step 2 form
  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      companyName: "",
      email: "",
      country: "",
      role: "",
      importingFromIndia: "no",
    },
  });

  const handleStep1Submit = (data: z.infer<typeof step1Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const handleStep2Submit = (data: z.infer<typeof step2Schema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);

    // Here you would typically send the data to your backend
    console.log("Form submitted:", { ...formData, ...data });
  };

  const handleClose = () => {
    setStep(1);
    step1Form.reset();
    step2Form.reset();
    onClose();
  };

  const productOptions = [
    { value: "furniture", label: "Furniture" },
    { value: "textiles", label: "Textiles" },
    { value: "handicrafts", label: "Handicrafts" },
    { value: "jewelry", label: "Jewelry" },
    { value: "leather", label: "Leather Goods" },
    { value: "apparel", label: "Apparel" },
  ];

  const roleOptions = [
    { value: "founder", label: "Founder" },
    { value: "buyer", label: "Buyer" },
    { value: "designer", label: "Designer" },
    { value: "manager", label: "Manager" },
    { value: "other", label: "Other" },
  ];

  const countryOptions = [
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
    { value: "other", label: "Other" },
  ];

  const toggleProductType = (type: string) => {
    const currentTypes = step1Form.getValues("productTypes") || [];
    if (currentTypes.includes(type)) {
      step1Form.setValue(
        "productTypes",
        currentTypes.filter((t) => t !== type)
      );
    } else {
      step1Form.setValue("productTypes", [...currentTypes, type]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            QualFirst Buyer Inquiry
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <Form {...step1Form}>
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6">
              <h2 className="text-xl font-semibold">Tell us what you need</h2>

              <FormField
                control={step1Form.control}
                name="requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="We are looking for wooden dining tables with metal legs, made in reclaimed teak. Quantity 200 units/month"
                        className="min-h-[120px] bg-gray-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <p className="font-medium">What type of products are you looking for?</p>
                <FormField
                  control={step1Form.control}
                  name="productTypes"
                  render={() => (
                    <FormItem>
                      <div className="bg-gray-100 p-4 rounded-md">
                        <div className="flex flex-wrap gap-2">
                          {productOptions.map((option) => {
                            const isSelected = step1Form
                              .getValues("productTypes")
                              ?.includes(option.value);
                            return (
                              <div
                                key={option.value}
                                className={`px-3 py-1 rounded-md cursor-pointer flex items-center gap-1 ${
                                  isSelected
                                    ? "bg-gray-300"
                                    : "bg-gray-200 hover:bg-gray-300"
                                }`}
                                onClick={() => toggleProductType(option.value)}
                              >
                                {option.label}
                                {isSelected && (
                                  <X
                                    className="h-4 w-4 cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleProductType(option.value);
                                    }}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-green-100 p-4 rounded-md text-sm">
                We do not share any data with third parties. Your data is fully confidential with us.
              </div>

              <Button type="submit" className="w-full bg-black text-white">
                Continue
              </Button>
            </form>
          </Form>
        )}

        {step === 2 && (
          <Form {...step2Form}>
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-6">
              <h2 className="text-xl font-semibold">Tell us about you</h2>

              <FormField
                control={step2Form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step2Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={step2Form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={step2Form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={step2Form.control}
                name="importingFromIndia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Are you currently importing from India?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-black text-white">
                Submit
              </Button>
            </form>
          </Form>
        )}

        {step === 3 && (
          <div className="space-y-6 py-6">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-xl font-bold">Thank You!</h2>
              <p className="text-gray-700">
                Thanks for submitting your requirement. Our sourcing team will review it and match
                you with the most relevant manufacturers within 48 hours.
              </p>
            </div>
            
            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full border-black text-black"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepInquiry;
