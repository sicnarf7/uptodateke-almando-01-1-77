
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsProps {
  section?: string;
  category?: string;
}

const News = ({ section, category }: NewsProps) => {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter by category if provided
        let filteredArticles = articles.filter(article => article.status === 'published');
        
        if (category) {
          filteredArticles = filteredArticles.filter(
            article => article.category.toLowerCase() === category.toLowerCase()
          );
        } else if (section) {
          filteredArticles = filteredArticles.filter(
            article => article.category.toLowerCase().includes(section.toLowerCase())
          );
        }
        
        // Sort by published date (newest first)
        filteredArticles.sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        
        setNews(filteredArticles);
      } catch (error) {
        console.error('Error fetching news articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [section, category]);

  const sectionTitle = section ? 
    (category ? `${section.charAt(0).toUpperCase() + section.slice(1)} - ${category.charAt(0).toUpperCase() + category.slice(1)}` : 
    `${section.charAt(0).toUpperCase() + section.slice(1)} News`) : 
    "Latest News";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{sectionTitle}</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[400px] rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-16 bg-muted/20 rounded-lg">
            <p className="text-lg text-muted-foreground">No articles found in this category</p>
            <p className="text-sm text-muted-foreground mt-2">Check back later or browse other categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article) => (
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
    </MainLayout>
  );
};

export default News;
