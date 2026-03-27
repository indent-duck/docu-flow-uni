import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import NewRequestPage from "./pages/NewRequestPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";
import StaffLoginPage from "./pages/staff/StaffLoginPage";
import StaffDashboardPage from "./pages/staff/StaffDashboardPage";
import StaffRequestDetailPage from "./pages/staff/StaffRequestDetailPage";
import EditProfilePage from "./pages/EditProfilePage";
import SecurityPage from "./pages/SecurityPage";
import HelpPage from "./pages/HelpPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-request" element={<NewRequestPage />} />
          <Route path="/request/:id" element={<RequestDetailPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/staff" element={<StaffLoginPage />} />
          <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
          <Route path="/staff/request/:id" element={<StaffRequestDetailPage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/profile/security" element={<SecurityPage />} />
          <Route path="/profile/help" element={<HelpPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
