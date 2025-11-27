import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PlacementTest from "./pages/PlacementTest";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import LessonPlayer from "./pages/LessonPlayer";
import Vocabulary from "./pages/Vocabulary";
import Speech from "./pages/Speech";
import Courses from "./pages/Courses";
import AIChatbot from "./pages/AIChatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/placement-test" element={<PlacementTest />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/lesson/:lessonId" element={<LessonPlayer />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/speech" element={<Speech />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/ai-chatbot" element={<AIChatbot />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
