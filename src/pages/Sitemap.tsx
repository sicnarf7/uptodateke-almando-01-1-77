
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Sitemap = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto py-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Sitemap</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-kenya-red">Main Sections</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-kenya-red transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-kenya-red transition-colors">News</Link>
              </li>
              <li>
                <Link to="/entertainment" className="hover:text-kenya-red transition-colors">Entertainment</Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-kenya-red transition-colors">Trending</Link>
              </li>
              <li>
                <Link to="/videos" className="hover:text-kenya-red transition-colors">Videos</Link>
              </li>
              <li>
                <Link to="/sports" className="hover:text-kenya-red transition-colors">Sports</Link>
              </li>
              <li>
                <Link to="/business" className="hover:text-kenya-red transition-colors">Business</Link>
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-8 text-kenya-red">About</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-kenya-red transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-kenya-red transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-kenya-red transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/advertise" className="hover:text-kenya-red transition-colors">Advertise With Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-kenya-red">News Categories</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Politics</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/news/politics/elections" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Elections
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/politics/bills" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Bills & Legislation
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/politics/government" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Government
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mt-2">
                <span className="font-medium">Business</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/news/business/startups" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Startups
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/business/economy" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Economy
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/business/markets" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Markets
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mt-2">
                <span className="font-medium">Technology</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/news/tech/gadgets" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Gadgets
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/tech/apps" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Apps
                    </Link>
                  </li>
                  <li>
                    <Link to="/news/tech/innovation" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Innovation
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-kenya-red">Entertainment</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Celebrity</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/entertainment/celebrity/local" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Local Stars
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/celebrity/international" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      International Stars
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/celebrity/scandals" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Scandals & Rumors
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mt-2">
                <span className="font-medium">Music</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/entertainment/music/gengetone" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Gengetone
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/music/gospel" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Gospel
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/music/afrobeats" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Afrobeats
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="mt-2">
                <span className="font-medium">Events</span>
                <ul className="pl-4 py-1 space-y-1">
                  <li>
                    <Link to="/entertainment/events/concerts" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Concerts
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/events/festivals" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Festivals
                    </Link>
                  </li>
                  <li>
                    <Link to="/entertainment/events/nightlife" className="text-muted-foreground hover:text-kenya-red transition-colors">
                      Nightlife
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-8 text-kenya-red">Legal</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-kenya-red transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-kenya-red transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-kenya-red transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sitemap;
