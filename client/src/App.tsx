import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Header from "./components/layout/Header";
import HeroSection from "./components/hero/HeroSection";
import ProductsSection from "./components/sections/ProductsSection";
import AuthPage from "./components/auth/AuthPage";
import FarmerDashboard from "./components/farmer/FarmerDashboard";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-white">
                <Header />
                <main>
                  <HeroSection />
                  <ProductsSection />
                </main>
              </div>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/farmer/dashboard"
            element={
              <ProtectedRoute requiredRole="farmer">
                <FarmerDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
