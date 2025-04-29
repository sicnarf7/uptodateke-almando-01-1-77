
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TrendingSection from "@/components/ui/TrendingSection";
import { NewsCard } from "@/components/ui/NewsCard";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Trending = () => {
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter published articles and sort by view count (highest first)
        const trending = articles
          .filter(article => article.status === 'published')
          .sort((a, b) => b.view_count - a.view_count);
          
        setTrendingArticles(trending);
      } catch (error) {
        console.error('Error fetching trending articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTrendingArticles();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trending Now</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[400px] rounded-lg overflow-hidden">
                    <Skeleton className="h-full w-full" />
                  </div>
                ))}
              </div>
            ) : trendingArticles.length === 0 ? (
              <div className="text-center py-16 bg-muted/20 rounded-lg">
                <p className="text-lg text-muted-foreground">No trending articles yet</p>
                <p className="text-sm text-muted-foreground mt-2">Articles will appear here once they gain views</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trendingArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    id={parseInt(article.id.substring(0, 8), 16)} // Convert part of UUID to number for animation delay
                    title={article.title}
                    excerpt={article.excerpt}
                    imageUrl={article.featuredImage?.url || ""}
                    category={article.category}
                    author={article.author?.name || ""}
                    authorImageUrl={article.author?.image_url || ""}
                    publishedAt={format(new Date(article.published_at), "MMMM d, yyyy")}
                    url={`/article/${article.slug}`}
                    isPremium={article.is_premium}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="md:col-span-1">
            <TrendingSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trending;
