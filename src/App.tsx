
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import LandingPage from "./pages/LandingPage";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProfessionalDetails from "./pages/ProfessionalDetails";
import MyAppointments from "./pages/MyAppointments";
import About from "./pages/About";
import Services from "./pages/Services";
import Professionals from "./pages/Professionals";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Wallet from "./pages/Wallet";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/professionals/:id" element={<ProfessionalDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/wallet" element={<Wallet />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
