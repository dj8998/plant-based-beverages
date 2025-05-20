import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You for Your Application!</h1>
        <p className="text-lg text-gray-600 mb-8">
          We have received your supplier application. Our team will review your information
          and get back to you within 2-3 business days.
        </p>
        <div className="space-y-4">
          <p className="text-gray-600">
            In the meantime, feel free to explore our platform and learn more about how we
            connect Indian suppliers with global buyers.
          </p>
          <Button
            onClick={() => navigate('/')}
            className="bg-black text-white hover:bg-gray-800"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou; 