
import { Link } from "react-router-dom";

interface MegaMenuProps {
  type: string | null;
  onClose: () => void;
}

const MegaMenu = ({ type, onClose }: MegaMenuProps) => {
  if (!type) return null;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pt-4 pb-6">
      {type === 'news' && (
        <>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Politics</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news/politics/elections" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Elections
                </Link>
              </li>
              <li>
                <Link to="/news/politics/bills" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Bills & Legislation
                </Link>
              </li>
              <li>
                <Link to="/news/politics/government" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Government
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Business</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news/business/startups" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link to="/news/business/economy" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Economy
                </Link>
              </li>
              <li>
                <Link to="/news/business/markets" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Markets
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Tech</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news/tech/gadgets" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Gadgets
                </Link>
              </li>
              <li>
                <Link to="/news/tech/apps" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Apps
                </Link>
              </li>
              <li>
                <Link to="/news/tech/innovation" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Innovation
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="h-full flex flex-col bg-muted rounded-lg overflow-hidden">
              <div className="h-40 bg-kenya-red/10">
                <img
                  src="https://via.placeholder.com/400x200/FF0000/FFFFFF?text=Top+Story"
                  alt="Featured news"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <span className="category-tag mb-2">Featured</span>
                <h4 className="font-bold mb-2">Latest development in Kenyan politics</h4>
                <p className="text-sm text-muted-foreground">The latest updates on the political landscape in Kenya...</p>
              </div>
              <div className="p-4 pt-0">
                <Link
                  to="/news/featured"
                  onClick={onClose}
                  className="text-kenya-red hover:text-kenya-red/80 font-medium text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {type === 'entertainment' && (
        <>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Celebrity Gossip</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/entertainment/celebrity/local" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Local Stars
                </Link>
              </li>
              <li>
                <Link to="/entertainment/celebrity/international" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  International Stars
                </Link>
              </li>
              <li>
                <Link to="/entertainment/celebrity/scandals" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Scandals & Rumors
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Music</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/entertainment/music/gengetone" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Gengetone
                </Link>
              </li>
              <li>
                <Link to="/entertainment/music/gospel" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Gospel
                </Link>
              </li>
              <li>
                <Link to="/entertainment/music/afrobeats" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Afrobeats
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/entertainment/events/concerts" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Concerts
                </Link>
              </li>
              <li>
                <Link to="/entertainment/events/festivals" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Festivals
                </Link>
              </li>
              <li>
                <Link to="/entertainment/events/nightlife" onClick={onClose} className="text-muted-foreground hover:text-primary transition-colors">
                  Nightlife
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <div className="h-full flex flex-col bg-muted rounded-lg overflow-hidden">
              <div className="h-40 bg-kenya-purple/10">
                <img
                  src="https://via.placeholder.com/400x200/800080/FFFFFF?text=Featured+Event"
                  alt="Featured event"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <span className="category-tag mb-2">Upcoming</span>
                <h4 className="font-bold mb-2">Biggest Music Festival of the Year</h4>
                <p className="text-sm text-muted-foreground">Don't miss the biggest gathering of Kenyan artists...</p>
              </div>
              <div className="p-4 pt-0">
                <Link
                  to="/entertainment/events/featured"
                  onClick={onClose}
                  className="text-kenya-red hover:text-kenya-red/80 font-medium text-sm"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MegaMenu;
