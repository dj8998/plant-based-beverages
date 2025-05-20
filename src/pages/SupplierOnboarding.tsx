import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '../integrations/supabase/client';
import { toast } from 'sonner';

// Types for our form data
interface SupplierFormData {
  // Section 1: Basic Information
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  website: string;
  registrationNumber: string;
  gstIecCode: string;

  // Section 2: Factory & Capacity
  yearOfEstablishment: string;
  numberOfEmployees: string;
  manufacturingLocations: string[];
  monthlyProductionCapacity: {
    min: string;
    max: string;
    unit: string;
  };
  privateLabelServices: boolean;
  customProductDevelopment: boolean;

  // Section 3: Product Details
  topCategories: string[];
  subcategories: string[];
  moq: {
    min: string;
    max: string;
    unit: string;
  };
  leadTime: string;

  // Section 4: Export & Compliance
  currentlyExporting: boolean;
  exportCountries: string[];
  certifications: string[];

  // Section 5: Communication & Support
  languagesSpoken: string[];
  preferredChannels: string[];
  inHouseQualityControl: boolean;
  openToAudits: boolean;

  // Final Section
  confirmInformation: boolean;
  agreeToContact: boolean;
}

const initialFormData: SupplierFormData = {
  companyName: '',
  contactPersonName: '',
  email: '',
  phone: '',
  website: '',
  registrationNumber: '',
  gstIecCode: '',
  yearOfEstablishment: '',
  numberOfEmployees: '',
  manufacturingLocations: [],
  monthlyProductionCapacity: {
    min: '',
    max: '',
    unit: 'units'
  },
  privateLabelServices: false,
  customProductDevelopment: false,
  topCategories: [],
  subcategories: [],
  moq: {
    min: '',
    max: '',
    unit: 'units'
  },
  leadTime: '',
  currentlyExporting: false,
  exportCountries: [],
  certifications: [],
  languagesSpoken: [],
  preferredChannels: [],
  inHouseQualityControl: false,
  openToAudits: false,
  confirmInformation: false,
  agreeToContact: false,
};

const stepNames = {
  1: "Basic Information",
  2: "Factory & Capacity",
  3: "Product Details",
  4: "Export & Compliance",
  5: "Communication & Support"
};

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Denmark",
  "Norway",
  "Finland",
  "Japan",
  "South Korea",
  "Singapore",
  "UAE",
  "Saudi Arabia",
  "South Africa"
];

const SupplierOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<SupplierFormData>(initialFormData);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof SupplierFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.companyName || !formData.contactPersonName || !formData.email || 
          !formData.phone || !formData.registrationNumber || !formData.gstIecCode) {
        toast.error('Please fill in all required fields in Basic Information');
        return;
      }

      if (!formData.manufacturingLocations.length) {
        toast.error('Please provide manufacturing locations');
        return;
      }

      if (!formData.monthlyProductionCapacity.min || !formData.monthlyProductionCapacity.max) {
        toast.error('Please provide production capacity range');
        return;
      }

      if (!formData.moq.min || !formData.moq.max) {
        toast.error('Please provide MOQ range');
        return;
      }

      if (!formData.confirmInformation || !formData.agreeToContact) {
        toast.error('Please confirm the information and agree to be contacted');
        return;
      }

      // Format data for Supabase
      const supabaseData = {
        // Basic Information
        company_name: formData.companyName,
        contact_person_name: formData.contactPersonName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || null,
        registration_number: formData.registrationNumber,
        gst_iec_code: formData.gstIecCode,

        // Factory & Capacity
        year_of_establishment: formData.yearOfEstablishment,
        number_of_employees: formData.numberOfEmployees,
        manufacturing_locations: formData.manufacturingLocations,
        monthly_production_capacity: formData.monthlyProductionCapacity,
        private_label_services: formData.privateLabelServices,
        custom_product_development: formData.customProductDevelopment,

        // Product Details
        top_categories: formData.topCategories,
        subcategories: formData.subcategories,
        moq: formData.moq,
        lead_time: formData.leadTime,

        // Export & Compliance
        currently_exporting: formData.currentlyExporting,
        export_countries: formData.exportCountries,
        certifications: formData.certifications,

        // Communication & Support
        languages_spoken: formData.languagesSpoken,
        in_house_quality_control: formData.inHouseQualityControl,
        open_to_audits: formData.openToAudits,

        // Final Section
        confirm_information: formData.confirmInformation,
        agree_to_contact: formData.agreeToContact,

        // Metadata
        status: 'pending'
      };

      const { error } = await supabase
        .from('supplier_applications')
        .insert([supabaseData]);

      if (error) {
        console.error('Supabase Error:', error);
        throw error;
      }

      toast.success('Application submitted successfully!');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-sm text-gray-500">Please provide your company's basic details. All fields marked with * are required.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                  placeholder="Enter your company name"
                />
              </div>
              <div>
                <Label htmlFor="contactPersonName">Contact Person Name *</Label>
                <Input
                  id="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                  required
                  placeholder="Enter contact person's name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="Enter your website URL"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">Company Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                  required
                  placeholder="Enter your company registration number"
                />
              </div>
              <div>
                <Label htmlFor="gstIecCode">GST / IEC Code *</Label>
                <Input
                  id="gstIecCode"
                  value={formData.gstIecCode}
                  onChange={(e) => handleInputChange('gstIecCode', e.target.value)}
                  required
                  placeholder="Enter your GST or IEC code"
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Factory & Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="yearOfEstablishment">Year of Establishment</Label>
                <Select
                  value={formData.yearOfEstablishment}
                  onValueChange={(value) => handleInputChange('yearOfEstablishment', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 35 }, (_, i) => 1990 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                <Select
                  value={formData.numberOfEmployees}
                  onValueChange={(value) => handleInputChange('numberOfEmployees', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201+">201+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="manufacturingLocations">Manufacturing Locations</Label>
                <Input
                  id="manufacturingLocations"
                  value={formData.manufacturingLocations.join(', ')}
                  onChange={(e) => handleInputChange('manufacturingLocations', e.target.value.split(',').map(loc => loc.trim()))}
                  placeholder="Enter locations separated by commas"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Production Capacity</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="minCapacity" className="text-sm">Minimum</Label>
                    <Input
                      id="minCapacity"
                      type="number"
                      value={formData.monthlyProductionCapacity.min}
                      onChange={(e) => handleInputChange('monthlyProductionCapacity', {
                        ...formData.monthlyProductionCapacity,
                        min: e.target.value
                      })}
                      placeholder="Min"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxCapacity" className="text-sm">Maximum</Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      value={formData.monthlyProductionCapacity.max}
                      onChange={(e) => handleInputChange('monthlyProductionCapacity', {
                        ...formData.monthlyProductionCapacity,
                        max: e.target.value
                      })}
                      placeholder="Max"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacityUnit" className="text-sm">Unit</Label>
                    <Select
                      value={formData.monthlyProductionCapacity.unit}
                      onValueChange={(value) => handleInputChange('monthlyProductionCapacity', {
                        ...formData.monthlyProductionCapacity,
                        unit: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="sqm">Square Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privateLabelServices"
                  checked={formData.privateLabelServices}
                  onCheckedChange={(checked) => handleInputChange('privateLabelServices', checked)}
                />
                <Label htmlFor="privateLabelServices">Do you offer private label services?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="customProductDevelopment"
                  checked={formData.customProductDevelopment}
                  onCheckedChange={(checked) => handleInputChange('customProductDevelopment', checked)}
                />
                <Label htmlFor="customProductDevelopment">Do you support custom product development?</Label>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Top Categories You Serve</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Home & Living',
                    'Decor & Handicrafts',
                    'Fashion & Accessories',
                    'Tableware & Kitchen',
                    'Festive & Gifting',
                    'Specialty & Collectibles'
                  ].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.topCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          const newCategories = checked
                            ? [...formData.topCategories, category]
                            : formData.topCategories.filter(c => c !== category);
                          handleInputChange('topCategories', newCategories);
                        }}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="subcategories">Subcategories / Product Lines</Label>
                <Input
                  id="subcategories"
                  value={formData.subcategories.join(', ')}
                  onChange={(e) => handleInputChange('subcategories', e.target.value.split(',').map(sub => sub.trim()))}
                  placeholder="Enter subcategories separated by commas"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Minimum Order Quantity (MOQ)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="minMOQ" className="text-sm">Minimum</Label>
                    <Input
                      id="minMOQ"
                      type="number"
                      value={formData.moq.min}
                      onChange={(e) => handleInputChange('moq', {
                        ...formData.moq,
                        min: e.target.value
                      })}
                      placeholder="Min"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxMOQ" className="text-sm">Maximum</Label>
                    <Input
                      id="maxMOQ"
                      type="number"
                      value={formData.moq.max}
                      onChange={(e) => handleInputChange('moq', {
                        ...formData.moq,
                        max: e.target.value
                      })}
                      placeholder="Max"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="moqUnit" className="text-sm">Unit</Label>
                    <Select
                      value={formData.moq.unit}
                      onValueChange={(value) => handleInputChange('moq', {
                        ...formData.moq,
                        unit: value
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="units">Units</SelectItem>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="meters">Meters</SelectItem>
                        <SelectItem value="sqm">Square Meters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="leadTime">Lead Time for Production</Label>
                <Input
                  id="leadTime"
                  value={formData.leadTime}
                  onChange={(e) => handleInputChange('leadTime', e.target.value)}
                  placeholder="e.g., 30-45 days"
                  required
                />
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Export & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="currentlyExporting"
                  checked={formData.currentlyExporting}
                  onCheckedChange={(checked) => handleInputChange('currentlyExporting', checked)}
                />
                <Label htmlFor="currentlyExporting">Do you currently export products?</Label>
              </div>
              <div>
                <Label htmlFor="exportCountries">Export Countries</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {countries.map((country) => (
                    <div key={country} className="flex items-center space-x-2">
                      <Checkbox
                        id={country}
                        checked={formData.exportCountries.includes(country)}
                        onCheckedChange={(checked) => {
                          const newCountries = checked
                            ? [...formData.exportCountries, country]
                            : formData.exportCountries.filter(c => c !== country);
                          handleInputChange('exportCountries', newCountries);
                        }}
                      />
                      <Label htmlFor={country}>{country}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Certifications / Standards Followed</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'ISO',
                    'SEDEX',
                    'GOTS',
                    'CE',
                    'BSCI',
                    'SA8000',
                    'WRAP',
                    'Oeko-Tex'
                  ].map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={cert}
                        checked={formData.certifications.includes(cert)}
                        onCheckedChange={(checked) => {
                          const newCerts = checked
                            ? [...formData.certifications, cert]
                            : formData.certifications.filter(c => c !== cert);
                          handleInputChange('certifications', newCerts);
                        }}
                      />
                      <Label htmlFor={cert}>{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Communication & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Languages Spoken</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'English',
                    'Hindi',
                    'French',
                    'Spanish'
                  ].map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.languagesSpoken.includes(language)}
                        onCheckedChange={(checked) => {
                          const newLanguages = checked
                            ? [...formData.languagesSpoken, language]
                            : formData.languagesSpoken.filter(l => l !== language);
                          handleInputChange('languagesSpoken', newLanguages);
                        }}
                      />
                      <Label htmlFor={language}>{language}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inHouseQualityControl"
                  checked={formData.inHouseQualityControl}
                  onCheckedChange={(checked) => handleInputChange('inHouseQualityControl', checked)}
                />
                <Label htmlFor="inHouseQualityControl">Do you have in-house quality control?</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="openToAudits"
                  checked={formData.openToAudits}
                  onCheckedChange={(checked) => handleInputChange('openToAudits', checked)}
                />
                <Label htmlFor="openToAudits">Would you be open to audits by QualFirst team?</Label>
              </div>
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="confirmInformation"
                    checked={formData.confirmInformation}
                    onCheckedChange={(checked) => handleInputChange('confirmInformation', checked)}
                    required
                  />
                  <Label htmlFor="confirmInformation" className="font-medium">
                    I confirm that the information provided is true and complete.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToContact"
                    checked={formData.agreeToContact}
                    onCheckedChange={(checked) => handleInputChange('agreeToContact', checked)}
                    required
                  />
                  <Label htmlFor="agreeToContact" className="font-medium">
                    I agree to be contacted by QualFirst for verification and onboarding.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Supplier Onboarding</h1>
          <p className="text-gray-600">
            Join our network of verified Indian manufacturers and connect with global buyers. 
            This form helps us understand your capabilities and match you with the right opportunities.
          </p>
        </div>
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    step <= currentStep ? 'bg-black text-white' : 'bg-gray-200'
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm text-gray-600">{stepNames[step as keyof typeof stepNames]}</span>
              </div>
            ))}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
          </div>
        </div>

        {renderStep()}

        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < 5 ? (
            <Button
              className="ml-auto"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              className="ml-auto"
              onClick={handleSubmit}
              disabled={!formData.confirmInformation || !formData.agreeToContact}
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierOnboarding; 