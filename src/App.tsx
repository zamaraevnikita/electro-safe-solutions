
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/catalog" element={<Catalog />} />
          {/* Placeholder routes for other pages */}
          <Route path="/about" element={<div>О компании - в разработке</div>} />
          <Route path="/blog" element={<div>Блог - в разработке</div>} />
          <Route path="/faq" element={<div>FAQ - в разработке</div>} />
          <Route path="/contacts" element={<div>Контакты - в разработке</div>} />
          <Route path="/profile" element={<div>Личный кабинет - в разработке</div>} />
          <Route path="/privacy" element={<div>Политика конфиденциальности - в разработке</div>} />
          <Route path="/terms" element={<div>Публичная оферта - в разработке</div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
