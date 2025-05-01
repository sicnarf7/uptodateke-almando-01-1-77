
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/useArticles";

const Entertainment = () => {
  const { articles, isLoading } = useArticles({
    category: 'Entertainment'
  });
  
  // We also want to include related categories
  const { articles: celebrityArticles, isLoading: isLoadingCelebrity } = useArticles({
    category: 'Celebrity Gossip'
  });
  
  const { articles: musicArticles, isLoading: isLoadingMusic } = useArticles({
    category: 'Music'
  });
  
  const { articles: eventsArticles, isLoading: isLoadingEvents } = useArticles({
    category: 'Events'
  });
  
  // Combine all entertainment related articles
  const allEntertainmentArticles = [...articles, ...celebrityArticles, ...musicArticles, ...eventsArticles];
  const isLoadingAny = isLoading || isLoadingCelebrity || isLoadingMusic || isLoadingEvents;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Entertainment</h1>
          <div className="space-x-4">
            <Link to="/entertainment/celebrity/local">
              <Button variant="outline">Celebrity</Button>
            </Link>
            <Link to="/entertainment/music/gengetone">
              <Button variant="outline">Music</Button>
            </Link>
            <Link to="/entertainment/events/concerts">
              <Button variant="outline">Events</Button>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          {isLoadingAny ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-[350px]">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : allEntertainmentArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allEntertainmentArticles.slice(0, 3).map((article) => (
                <NewsCard
                  key={article.id}
                  id={parseInt(article.id.substring(0, 8), 16)}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.featuredImage?.url || ""}
                  category={article.category}
                  author={article.author?.name || ""}
                  authorImageUrl={article.author?.image_url || ""}
                  publishedAt={format(new Date(article.published_at || new Date()), "MMMM d, yyyy")}
                  url={`/article/${article.slug}`}
                  isPremium={article.is_premium}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No Entertainment Articles Yet</h3>
              <p className="text-muted-foreground">Add content from the admin panel to populate this section.</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Trending Videos</h2>
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No Videos Available</h3>
            <p className="text-muted-foreground">Video content will be available soon.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Entertainment;
