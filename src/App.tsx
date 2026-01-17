import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import EventsPage from "@/pages/EventsPage";
import Gallery from "./pages/Gallery";
import Sponsors from "./pages/Sponsors";
import Prizes from "./pages/Prizes";
import NotFound from "./pages/NotFound";
import PaperPresentation from "./pages/events/PaperPresentation";
import ProjectExpo from "./pages/events/ProjectExpo";
import TreasureHunt from "./pages/events/TreasureHunt";
import CircuitTrade from "./pages/events/CircuitTrade";
import HardwareHackArena from "./pages/events/HardwareHackArena";
import NeuralNexusQuiz from "./pages/events/NeuralNexusQuiz";

import ImagePreloader from "./components/ImagePreloader";

const queryClient = new QueryClient();

const App = () => {
  console.log("App: Rendering new App structure with EventsPage");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ImagePreloader />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/paper-presentation" element={<PaperPresentation />} />
            <Route path="/events/project-expo" element={<ProjectExpo />} />
            <Route path="/events/treasure-hunt" element={<TreasureHunt />} />
            <Route path="/events/circuit-trade" element={<CircuitTrade />} />
            <Route path="/events/hardware-hack-arena" element={<HardwareHackArena />} />
            <Route path="/events/neural-nexus-quiz" element={<NeuralNexusQuiz />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/prizes" element={<Prizes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

};

export default App;