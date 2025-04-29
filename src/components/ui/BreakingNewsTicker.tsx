
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { articleService } from "@/services/articleService";
import { Article } from "@/types/article";

interface TickerItem {
  id: string;
  text: string;
  url: string;
  isBreaking?: boolean;
}

const BreakingNewsTicker = () => {
  const [tickerItems, setTickerItems] = useState<TickerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter published articles and sort by published date (newest first)
        const latestArticles = articles
          .filter(article => article.status === 'published')
          .sort((a, b) => 
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
          )
          .slice(0, 5); // Take latest 5
          
        // Convert articles to ticker items
        const items = latestArticles.map((article, index) => ({
          id: article.id,
          text: article.title,
          url: `/article/${article.slug}`,
          isBreaking: index === 0, // Make the most recent article "breaking"
        }));
        
        setTickerItems(items);
      } catch (error) {
        console.error('Error fetching ticker articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLatestArticles();
  }, []);

  // Rotate ticker items every few seconds
  useEffect(() => {
    if (tickerItems.length <= 1) return; // Don't rotate if there's only one or no items
    
    const timer = setInterval(() => {
      setTickerItems((prevItems) => {
        const newItems = [...prevItems];
        const firstItem = newItems.shift();
        if (firstItem) {
          newItems.push(firstItem);
        }
        return newItems;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [tickerItems.length]);

  // If loading or no items, show placeholder
  if (isLoading || tickerItems.length === 0) {
    return (
      <div className="bg-black text-white overflow-hidden w-full py-2 border-b border-gray-800">
        <div className="relative flex items-center h-8">
          <div className="min-w-max px-3 py-1 bg-kenya-red font-bold text-sm rounded-r-md z-10">
            TRENDING NOW
          </div>
          <div className="overflow-hidden flex-1 ml-2">
            <div className="whitespace-nowrap inline-block">
              {isLoading ? "Loading latest news..." : "No breaking news at the moment"}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white overflow-hidden w-full py-2 border-b border-gray-800">
      <div className="relative flex items-center h-8">
        <div className="min-w-max px-3 py-1 bg-kenya-red font-bold text-sm rounded-r-md z-10">
          TRENDING NOW
        </div>
        <div className="overflow-hidden flex-1 ml-2">
          <div className="whitespace-nowrap inline-block animate-ticker">
            {tickerItems.map((item) => (
              <Link
                key={item.id}
                to={item.url}
                className="ticker-item hover:text-kenya-red"
              >
                {item.isBreaking && (
                  <span className="breaking-news mr-2">BREAKING</span>
                )}
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
