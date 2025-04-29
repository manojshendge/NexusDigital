import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth provider
import { AuthProvider } from "@/contexts/AuthContext";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";

// Protected Pages
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Other Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <ToastContainer position="top-right" autoClose={5000} />
        
        <Switch>
          {/* Public routes */}
          <Route path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
          
          {/* Auth required, but no email verification needed */}
          <Route path="/email-verification">
            <ProtectedRoute requireVerified={false}>
              <EmailVerificationPage />
            </ProtectedRoute>
          </Route>
          
          {/* Protected routes (auth + verified email required) */}
          <Route path="/dashboard">
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          </Route>
          
          {/* Fallback 404 page */}
          <Route component={NotFound} />
        </Switch>
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;
