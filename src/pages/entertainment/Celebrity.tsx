
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleLoading from "@/components/article/ArticleLoading";

interface CelebrityProps {
  type: "local" | "international" | "scandals";
}

const Celebrity = ({ type = "local" }: CelebrityProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const allArticles = await articleService.getAllArticles();
        // Filter articles based on category and subcategory
        const filteredArticles = allArticles.filter(article => 
          article.category === "Celebrity Gossip" && 
          (type === "local" && article.subcategory === "Local Stars" ||
           type === "international" && article.subcategory === "International Stars" ||
           type === "scandals" && article.subcategory === "Scandals & Rumors")
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [type]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Celebrity - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/entertainment/celebrity/local">
              <Button variant={type === "local" ? "default" : "outline"} size="sm">Local Stars</Button>
            </Link>
            <Link to="/entertainment/celebrity/international">
              <Button variant={type === "international" ? "default" : "outline"} size="sm">International</Button>
            </Link>
            <Link to="/entertainment/celebrity/scandals">
              <Button variant={type === "scandals" ? "default" : "outline"} size="sm">Scandals & Rumors</Button>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[350px]">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            ))}
          </div>
        ) : articles.length > 0 ? (
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
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No Celebrity {categoryTitle} Articles Yet</h3>
            <p className="text-muted-foreground">Add content from the admin panel to populate this section.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Celebrity;
