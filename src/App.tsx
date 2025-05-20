import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import SubcategoryPage from "./pages/SubcategoryPage";
import ProductPage from "./pages/ProductPage";
import InquiryPage from "./pages/InquiryPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import PostRequest from "./pages/PostRequest";
import TalkToExpert from "./pages/TalkToExpert";
import RequestCallback from "./pages/RequestCallback";
import Blog from "./pages/Blog";
import CatalogPage from "./pages/CatalogPage";
import AllCategories from "./pages/AllCategories";
import LoginPortal from "./pages/LoginPortal";
import RaiseQuery from "./pages/RaiseQuery";
import SupplierOnboarding from "./pages/SupplierOnboarding";
import ThankYou from "./pages/ThankYou";

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
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/:categoryId/:subcategoryId" element={<SubcategoryPage />} />
          <Route path="/product/:productSlug" element={<ProductPage />} />
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/our-mission" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/post-request" element={<PostRequest />} />
          <Route path="/talk-to-expert" element={<TalkToExpert />} />
          <Route path="/request-callback" element={<RequestCallback />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/login-portal" element={<LoginPortal />} />
          <Route path="/raise-query" element={<RaiseQuery />} />
          <Route path="/supplier-onboarding" element={<SupplierOnboarding />} />
          <Route path="/thank-you" element={<ThankYou />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
