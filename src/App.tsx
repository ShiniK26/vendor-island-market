import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorSignup from "./pages/VendorSignup";
import Login from "./pages/Login";
import VendorDashboard from "./pages/VendorDashboard";
import ProductManagement from "./pages/ProductManagement";
import VendorStorefront from "./pages/VendorStorefront";
import Market from "./pages/Market";
import OrderManagement from "./pages/OrderManagement";
import ProductFinder from "./pages/ProductFinder";
import Finances from "./pages/Finances";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendor-signup" element={<VendorSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<VendorDashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/storefront" element={<VendorStorefront />} />
          <Route path="/market" element={<Market />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/product-finder" element={<ProductFinder />} />
          <Route path="/finances" element={<Finances />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
