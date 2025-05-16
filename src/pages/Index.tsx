
import Navbar from '../components/Navbar';
import CategoryNav from '../components/CategoryNav';
import Hero from '../components/Hero';
import CompanyInfo from '../components/CompanyInfo';
import CategoryOverview from '../components/CategoryOverview';
import ProductSearch from '../components/ProductSearch';
import ConnectSteps from '../components/ConnectSteps';
import Testimonials from '../components/Testimonials';
import AlternateSourcing from '../components/AlternateSourcing';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategoryNav />
      <main className="flex-grow">
        <Hero />
        <CompanyInfo />
        <CategoryOverview />
        <ProductSearch />
        <ConnectSteps />
        <Testimonials />
        <AlternateSourcing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
