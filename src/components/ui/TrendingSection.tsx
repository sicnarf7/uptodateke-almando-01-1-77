
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { articleService } from "@/services/articleService";
import { Article } from "@/types/article";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const TrendingSection = () => {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter published articles and sort by view count (highest first)
        const trending = articles
          .filter(article => article.status === 'published')
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 5); // Take top 5
          
        setTrendingArticles(trending);
      } catch (error) {
        console.error('Error fetching trending articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrendingArticles();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: false });
    } catch (error) {
      return ''; // Return empty string if date is invalid
    }
  };

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
        {isLoading ? (
          // Loading skeletons
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="p-4">
              <Skeleton className="h-4 w-1/4 mb-1" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          ))
        ) : trendingArticles.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No trending articles yet
          </div>
        ) : (
          trendingArticles.map((article) => (
            <Link 
              key={article.id}
              to={`/article/${article.slug}`}
              className="block p-4 hover:bg-gray-50 dark:hover:bg-black/20 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-medium text-kenya-green mb-1 block">
                    {article.category}
                  </span>
                  <h4 className="font-medium text-sm md:text-base line-clamp-2 leading-tight">
                    {article.title}
                  </h4>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 min-w-[40px] text-right">
                  {formatTimeAgo(article.published_at)}
                </div>
              </div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {article.view_count.toLocaleString()} views
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingSection;
