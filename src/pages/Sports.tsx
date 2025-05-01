
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import TrendingSection from "@/components/ui/TrendingSection";
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const Sports = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const allArticles = await articleService.getAllArticles();
        // Filter Sports category articles
        const sportsArticles = allArticles.filter(
          article => article.status === 'published' && article.category === 'Sports'
        );
        setArticles(sportsArticles);
      } catch (error) {
        console.error("Error fetching sports articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Sports</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[350px]">
                    <Skeleton className="h-full w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
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
                <h3 className="text-xl font-medium mb-2">No Sports Articles Yet</h3>
                <p className="text-muted-foreground">Add sports articles from the admin panel to populate this section.</p>
              </div>
            )}
          </div>
          
          <div>
            <TrendingSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sports;
