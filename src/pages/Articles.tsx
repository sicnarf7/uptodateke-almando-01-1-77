
import { useState, useEffect, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { NewsCard } from "@/components/ui/NewsCard";
import { format } from "date-fns";
import { SEOHead } from "@/components/layout/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy loaded component for news cards
const ArticleCardGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

// Skeleton loader for articles
const ArticleSkeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex flex-col gap-3 bg-card rounded-lg overflow-hidden border animate-pulse">
          <Skeleton className="h-52 w-full" />
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
            <Skeleton className="h-6 w-[85%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await articleService.getAllArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <MainLayout>
      <SEOHead 
        title="Latest Articles - UpTodateKE"
        description="Browse our collection of the latest news articles and updates from Kenya. Stay informed with UpTodateKE."
        canonicalUrl="/articles"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Latest Articles</h1>
          <p className="text-muted-foreground text-lg mb-12">Stay informed with the most recent news and updates from Kenya</p>

          {isLoading ? (
            <ArticleSkeletons />
          ) : (
            <Suspense fallback={<ArticleSkeletons />}>
              <ArticleCardGrid articles={articles} />
            </Suspense>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Articles;
