import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DealDetail from "./pages/DealDetail";
import Checkout from "./pages/Checkout";
import Category from "./pages/Category";
import Auth from "./pages/Auth";
import MyStuff from "./pages/MyStuff";
import Favourites from "./pages/Favourites";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/deal/:id" element={<DealDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-stuff" element={<MyStuff />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
