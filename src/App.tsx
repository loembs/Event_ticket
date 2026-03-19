import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import OrderStatus from "./pages/OrderStatus";
import NotFound from "./pages/NotFound";
import ThemeToggle from "./components/ThemeToggle";
import LoadingScreen from "./components/LoadingScreen";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ThemeToggle />
          {isLoading && <LoadingScreen />}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order/:orderId" element={<OrderStatus />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
