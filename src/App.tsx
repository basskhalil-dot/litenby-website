import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Brand from "./pages/Brand.tsx";
import Packaging from "./pages/Packaging.tsx";
import PackagingDetail from "./pages/PackagingDetail.tsx";
import Storytelling from "./pages/Storytelling.tsx";
import Blog from "./pages/Blog.tsx";
import BlogDetail from "./pages/BlogDetail.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";
import { ScrollToTop } from "./components/ScrollToTop";
import { useLenis } from "./hooks/useLenis";

const queryClient = new QueryClient();

const App = () => {
  useLenis();

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <PageTransition />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/packaging" element={<Packaging />} />
          <Route path="/packaging-lab/:id" element={<PackagingDetail />} />
          <Route path="/storytelling" element={<Storytelling />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
