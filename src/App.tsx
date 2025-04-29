
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Benefits from "./pages/Benefits";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardQRCodes from "./pages/DashboardQRCodes";
import DashboardReferralLinks from "./pages/DashboardReferralLinks";
import DashboardHistory from "./pages/DashboardHistory";
import DashboardPartners from "./pages/DashboardPartners";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationForm from "./pages/ApplicationForm";

const queryClient = new QueryClient();

const App = () => {
  // Check if user is admin for protected routes
  const isAdmin = () => {
    const user = localStorage.getItem("user");
    if (!user) return false;
    try {
      return JSON.parse(user).isAdmin === true;
    } catch (e) {
      return false;
    }
  };

  // Check if user is logged in for protected routes
  const isAuthenticated = () => {
    return localStorage.getItem("user") !== null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/apply" element={<ApplicationForm />} />
            <Route 
              path="/dashboard" 
              element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard/qr-codes" 
              element={isAuthenticated() ? <DashboardQRCodes /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard/referral-links" 
              element={isAuthenticated() ? <DashboardReferralLinks /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard/history" 
              element={isAuthenticated() ? <DashboardHistory /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/dashboard/partners" 
              element={isAuthenticated() ? <DashboardPartners /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={isAdmin() ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
