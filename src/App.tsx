import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Entertainment from "./pages/Entertainment";
import News from "./pages/News";
import Trending from "./pages/Trending";
import Videos from "./pages/Videos";
import Celebrity from "./pages/entertainment/Celebrity";
import Music from "./pages/entertainment/Music";
import Events from "./pages/entertainment/Events";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Entertainment routes */}
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/entertainment/celebrity/local" element={<Celebrity type="local" />} />
          <Route path="/entertainment/celebrity/international" element={<Celebrity type="international" />} />
          <Route path="/entertainment/celebrity/scandals" element={<Celebrity type="scandals" />} />
          <Route path="/entertainment/music/gengetone" element={<Music type="gengetone" />} />
          <Route path="/entertainment/music/gospel" element={<Music type="gospel" />} />
          <Route path="/entertainment/music/afrobeats" element={<Music type="afrobeats" />} />
          <Route path="/entertainment/events/concerts" element={<Events type="concerts" />} />
          <Route path="/entertainment/events/festivals" element={<Events type="festivals" />} />
          <Route path="/entertainment/events/nightlife" element={<Events type="nightlife" />} />
          <Route path="/entertainment/events/featured" element={<Events type="featured" />} />
          
          {/* News routes */}
          <Route path="/news" element={<News />} />
          <Route path="/news/politics/elections" element={<News section="politics" category="elections" />} />
          <Route path="/news/politics/bills" element={<News section="politics" category="bills" />} />
          <Route path="/news/politics/government" element={<News section="politics" category="government" />} />
          <Route path="/news/business/startups" element={<News section="business" category="startups" />} />
          <Route path="/news/business/economy" element={<News section="business" category="economy" />} />
          <Route path="/news/business/markets" element={<News section="business" category="markets" />} />
          <Route path="/news/tech/gadgets" element={<News section="tech" category="gadgets" />} />
          <Route path="/news/tech/apps" element={<News section="tech" category="apps" />} />
          <Route path="/news/tech/innovation" element={<News section="tech" category="innovation" />} />
          <Route path="/news/featured" element={<News section="featured" />} />
          
          {/* Other main routes */}
          <Route path="/trending" element={<Trending />} />
          <Route path="/videos" element={<Videos />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
