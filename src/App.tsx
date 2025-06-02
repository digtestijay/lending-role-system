import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRouter from "./components/DashboardRouter";
import LoanApplicationForm from "./components/forms/LoanApplicationForm";
import LoansListPage from "./components/pages/LoansListPage";
import CustomersPage from "./components/pages/CustomersPage";
import CollectionsPage from "./components/pages/CollectionsPage";
import CustomerDetailsPage from "./components/pages/CustomerDetailsPage";
import CustomerEditPage from "./components/pages/CustomerEditPage";
import NotFound from "./pages/NotFound";
import CustomerInfoForm from "./components/forms/CustomerInfoForm";
import FamilyMembersForm from "./components/forms/FamilyMembersForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />
            
            {/* Customer Info Form Route */}
            <Route
              path="/customer-info"
              element={
                <ProtectedRoute>
                  <CustomerInfoForm />
                </ProtectedRoute>
              }
            />

            {/* Customer Details Routes */}
            <Route
              path="/customer/:id"
              element={
                <ProtectedRoute>
                  <CustomerDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/:id/edit"
              element={
                <ProtectedRoute>
                  <CustomerEditPage />
                </ProtectedRoute>
              }
            />
            
            {/* Agent Routes */}
            <Route
              path="/loan-application"
              element={
                <ProtectedRoute requiredRole="agent">
                  <LoanApplicationForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/loans"
              element={
                <ProtectedRoute requiredRole="agent">
                  <LoansListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/customers"
              element={
                <ProtectedRoute requiredRole="agent">
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agent/collections"
              element={
                <ProtectedRoute requiredRole="agent">
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />

            {/* GRT Routes */}
            <Route
              path="/grt/loans"
              element={
                <ProtectedRoute requiredRole="grt">
                  <LoansListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grt/customers"
              element={
                <ProtectedRoute requiredRole="grt">
                  <CustomersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grt/collections"
              element={
                <ProtectedRoute requiredRole="grt">
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grt/reports"
              element={
                <ProtectedRoute requiredRole="grt">
                  <div className="p-4"><h1 className="text-2xl font-bold">Reports Coming Soon</h1></div>
                </ProtectedRoute>
              }
            />

            {/* BM Routes */}
            <Route
              path="/bm/performance"
              element={
                <ProtectedRoute requiredRole="bm">
                  <div className="p-4"><h1 className="text-2xl font-bold">Team Performance Coming Soon</h1></div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/bm/loans"
              element={
                <ProtectedRoute requiredRole="bm">
                  <LoansListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bm/collections"
              element={
                <ProtectedRoute requiredRole="bm">
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bm/customers"
              element={
                <ProtectedRoute requiredRole="bm">
                  <CustomersPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <div className="p-4"><h1 className="text-2xl font-bold">User Management Coming Soon</h1></div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/loans"
              element={
                <ProtectedRoute requiredRole="admin">
                  <LoansListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute requiredRole="admin">
                  <div className="p-4"><h1 className="text-2xl font-bold">Analytics Coming Soon</h1></div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requiredRole="admin">
                  <div className="p-4"><h1 className="text-2xl font-bold">Settings Coming Soon</h1></div>
                </ProtectedRoute>
              }
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
