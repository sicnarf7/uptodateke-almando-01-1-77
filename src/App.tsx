
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eager load main layout and loading component
import MainLayout from "./components/layout/MainLayout";

// Lazy load all the page components
const Index = lazy(() => import("./pages/Index"));
const Articles = lazy(() => import("./pages/Articles"));
const Article = lazy(() => import("./pages/Article"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Entertainment = lazy(() => import("./pages/Entertainment"));
const News = lazy(() => import("./pages/News"));
const Trending = lazy(() => import("./pages/Trending"));
const Videos = lazy(() => import("./pages/Videos"));
const Celebrity = lazy(() => import("./pages/entertainment/Celebrity"));
const Music = lazy(() => import("./pages/entertainment/Music"));
const Events = lazy(() => import("./pages/entertainment/Events"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const Advertise = lazy(() => import("./pages/Advertise"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Sports = lazy(() => import("./pages/Sports"));
const Business = lazy(() => import("./pages/Business"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center w-full h-screen">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000 // 30 seconds
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            
            {/* Static pages */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/sitemap" element={<Sitemap />} />
            
            {/* Additional main sections */}
            <Route path="/trending" element={<Trending />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/business" element={<Business />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
