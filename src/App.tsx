import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import ProductPage from "./pages/ProductPage";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import PostRequest from "./pages/PostRequest";
import TalkToExpert from "./pages/TalkToExpert";
import RequestCallback from "./pages/RequestCallback";
import Blog from "./pages/Blog";
import RaiseQuery from "./pages/RaiseQuery";
import ThankYou from "./pages/ThankYou";
import ServicesPage from "./pages/ServicesPage";
import ProductsPage from "./pages/ProductsPage";
import ContactInquiryPage from "./pages/ContactInquiryPage";
import LaunchArticle from "./pages/LaunchArticle";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productSlug" element={<ProductPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inquiry" element={<ContactInquiryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-mission" element={<AboutUs />} />
          <Route path="/contact" element={<ContactInquiryPage />} />
          <Route path="/post-requirement" element={<PostRequest />} />
          <Route path="/talk-to-expert" element={<TalkToExpert />} />
          <Route path="/request-callback" element={<RequestCallback />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/raise-query" element={<RaiseQuery />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/launch-article" element={<LaunchArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
