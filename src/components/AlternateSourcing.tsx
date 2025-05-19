import { images } from "@/config/images";

const AlternateSourcing = () => {
  return (
    <div className="bg-pink-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img 
            src={images.about.mission}
            alt="Sourcing illustration" 
            className="w-full h-64 object-cover rounded-md shadow-md"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">LOOKING TO ALTERNATE SOURCING UNIT?</h2>
          <p className="text-gray-600">
            Connect with your next client on Qualfirst.<br/>
            Get in front of verified global buyers inside a curated platform designed for serious exporters and importers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlternateSourcing;
