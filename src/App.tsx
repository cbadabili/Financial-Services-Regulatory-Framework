import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PublicLayout } from "@/components/layout/PublicLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import Developer from "./pages/Developer";
import Business from "./pages/Business";
import Contacts from "./pages/Contacts";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import Compliance from "./pages/Compliance";
import FinTechRoadmap from "./pages/FinTechRoadmap";
import RegulatoryAuthorities from "./pages/RegulatoryAuthorities";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Profile from "./pages/Profile";
import ComplianceWizard from "./pages/ComplianceWizard";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with PublicLayout */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          {/* Redirect /knowledge to /documents for backward compatibility */}
          <Route path="/knowledge" element={<Navigate to="/documents" replace />} />
          <Route path="/business" element={<PublicLayout><Business /></PublicLayout>} />
          <Route path="/developer" element={<PublicLayout><Developer /></PublicLayout>} />
          <Route path="/contacts" element={<PublicLayout><Contacts /></PublicLayout>} />
          {/* Rebranded roadmap route */}
          <Route path="/compliance-roadmap" element={<PublicLayout><FinTechRoadmap /></PublicLayout>} />
          {/* Route alias for easier access to the roadmap */}
          <Route path="/fintech-roadmap" element={<PublicLayout><FinTechRoadmap /></PublicLayout>} />
          {/* Regulatory authorities directory */}
          <Route path="/regulatory-authorities" element={<PublicLayout><RegulatoryAuthorities /></PublicLayout>} />
          
          <Route path="/login" element={<Login />} />
          {/* Registration route */}
          <Route path="/register" element={<Register />} />
          {/* Email verification route */}
          <Route path="/verify-email" element={<VerifyEmail />} />
          
          {/* Admin/Portal routes with private Layout */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          {/* Public information-browsing routes */}
          <Route
            path="/documents"
            element={
              <PublicLayout>
                <Documents />
              </PublicLayout>
            }
          />
          <Route
            path="/search"
            element={
              <PublicLayout>
                <Search />
              </PublicLayout>
            }
          />
          <Route path="/compliance" element={<ProtectedRoute requiredPermission="manage_compliance"><Layout><Compliance /></Layout></ProtectedRoute>} />
          <Route path="/compliance-wizard" element={<ProtectedRoute><Layout><ComplianceWizard /></Layout></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute requiredPermission="view_analytics"><Layout><Analytics /></Layout></ProtectedRoute>} />
          <Route path="/alerts" element={<ProtectedRoute><Layout><Alerts /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
