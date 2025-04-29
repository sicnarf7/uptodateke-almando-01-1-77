
import { useState, useEffect } from "react";
import { NewsCard } from "@/components/ui/NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface ContentSectionProps {
  title: string;
  description?: string;
}

const ContentSection = ({ title, description }: ContentSectionProps) => {
  const [activeTab, setActiveTab] = useState("latest");
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await articleService.getAllArticles();
        // Only show published articles
        const publishedArticles = fetchedArticles.filter(article => article.status === 'published');
        setArticles(publishedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Sort articles based on the active tab
  const getArticlesByTab = (tab: string) => {
    if (articles.length === 0) return [];
    
    switch (tab) {
      case "latest":
        // Sort by published date (newest first)
        return [...articles].sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
      case "popular":
        // Sort by view count (highest first)
        return [...articles].sort((a, b) => b.view_count - a.view_count);
      case "recommended":
        // For now, just mix things up a bit differently (could be improved with user preferences)
        return [...articles].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return articles;
    }
  };

  const renderArticleList = (tabArticles: Article[]) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[400px] rounded-lg overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
          ))}
        </div>
      );
    }

    if (tabArticles.length === 0) {
      return <p className="text-center text-muted-foreground py-12">No articles available. Publish some articles to see them here!</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabArticles.map((article) => (
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
    );
  };

  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        <Tabs defaultValue="latest" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="latest" onClick={() => setActiveTab("latest")}>
                Latest
              </TabsTrigger>
              <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                Popular
              </TabsTrigger>
              <TabsTrigger value="recommended" onClick={() => setActiveTab("recommended")}>
                For You
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="latest" className="space-y-8">
            {renderArticleList(getArticlesByTab("latest"))}
          </TabsContent>

          <TabsContent value="popular" className="space-y-8">
            {renderArticleList(getArticlesByTab("popular"))}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-8">
            {renderArticleList(getArticlesByTab("recommended"))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContentSection;
