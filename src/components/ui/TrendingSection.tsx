
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

interface TrendingItem {
  id: number;
  title: string;
  url: string;
  views: number;
  timeAgo: string;
  category: string;
}

const TrendingSection = () => {
  const trendingItems: TrendingItem[] = [
    {
      id: 1,
      title: "Kenya's athletes dominate at international marathon",
      url: "/sports/athletics/marathon-dominance",
      views: 15243,
      timeAgo: "2h",
      category: "Sports",
    },
    {
      id: 2,
      title: "Government announces new education initiative",
      url: "/news/education/new-initiative",
      views: 12789,
      timeAgo: "3h",
      category: "Education",
    },
    {
      id: 3,
      title: "Popular artist drops surprise collaboration",
      url: "/entertainment/music/surprise-collab",
      views: 9876,
      timeAgo: "5h",
      category: "Music",
    },
    {
      id: 4,
      title: "Tech startup secures major international funding",
      url: "/business/startup/funding",
      views: 8654,
      timeAgo: "6h",
      category: "Business",
    },
    {
      id: 5,
      title: "New film showcasing Kenyan culture makes waves internationally",
      url: "/entertainment/film/kenyan-culture",
      views: 7532,
      timeAgo: "8h",
      category: "Entertainment",
    },
  ];

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden animate-fade-in-up">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <Flame className="h-5 w-5 text-kenya-red mr-2" />
          <h3 className="font-bold text-lg">Trending Now</h3>
        </div>
        <Link to="/trending" className="text-sm text-kenya-red hover:text-kenya-red/80 font-medium">
          View All
        </Link>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {trendingItems.map((item) => (
          <Link 
            key={item.id}
            to={item.url}
            className="block p-4 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-medium text-kenya-green mb-1 block">
                  {item.category}
                </span>
                <h4 className="font-medium text-sm md:text-base line-clamp-2 leading-tight">
                  {item.title}
                </h4>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px] text-right">
                {item.timeAgo}
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {item.views.toLocaleString()} views
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
