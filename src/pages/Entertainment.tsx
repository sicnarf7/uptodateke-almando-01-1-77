
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Entertainment = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const allArticles = await articleService.getAllArticles();
        // Filter published Entertainment category articles
        const entertainmentArticles = allArticles.filter(
          article => article.status === 'published' && 
                    (article.category === 'Entertainment' || 
                     article.category === 'Celebrity Gossip' || 
                     article.category === 'Music' || 
                     article.category === 'Events')
        );
        setArticles(entertainmentArticles);
      } catch (error) {
        console.error("Error fetching entertainment articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-[350px]">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map((article) => (
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
