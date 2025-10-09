import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorSignup from "./pages/VendorSignup";
import VendorDashboard from "./pages/VendorDashboard";
import ProductManagement from "./pages/ProductManagement";
import VendorStorefront from "./pages/VendorStorefront";
import Market from "./pages/Market";
import OrderManagement from "./pages/OrderManagement";
import ProductFinder from "./pages/ProductFinder";
import Finances from "./pages/Finances";
import Announcements from "./pages/Announcements";
import Updates from "./pages/Updates";
import BasicVerification from "./pages/BasicVerification";
import IdentityVerification from "./pages/IdentityVerification";
import EmailAuthentication from "./pages/EmailAuthentication";
import FundPassword from "./pages/FundPassword";
import AboutUs from "./pages/AboutUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CryptoDeposit from "./pages/CryptoDeposit";
import DepositBTC from "./pages/DepositBTC";
import DepositETH from "./pages/DepositETH";
import DepositUSDTTRC from "./pages/DepositUSDTTRC";
import DepositUSDTERC from "./pages/DepositUSDTERC";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/vendor-signup" element={<VendorSignup />} />
          <Route path="/dashboard" element={<VendorDashboard />} />
          <Route path="/products" element={<ProductManagement />} />
          <Route path="/storefront" element={<VendorStorefront />} />
          <Route path="/market" element={<Market />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/product-finder" element={<ProductFinder />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/basic-verification" element={<BasicVerification />} />
          <Route path="/identity-verification" element={<IdentityVerification />} />
          <Route path="/email-authentication" element={<EmailAuthentication />} />
          <Route path="/fund-password" element={<FundPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/crypto-deposit" element={<CryptoDeposit />} />
          <Route path="/deposit/btc" element={<DepositBTC />} />
          <Route path="/deposit/eth" element={<DepositETH />} />
          <Route path="/deposit/usdt-trc" element={<DepositUSDTTRC />} />
          <Route path="/deposit/usdt-erc" element={<DepositUSDTERC />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
