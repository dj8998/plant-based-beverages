
const Testimonials = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">SHARE YOUR EXPERIENCE AND MAKE B2B BUYING MORE TRANSPARENT</h2>
          <p className="text-gray-600">
            Leave a review of the business partners you've worked with over the years. Make your voice heard and help other business leaders make a confident choice.
          </p>
        </div>
        <div className="relative">
          <img 
            src="/placeholder.svg" 
            alt="Business review platform" 
            className="w-full h-64 object-cover rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
