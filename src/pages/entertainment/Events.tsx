
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface EventsProps {
  type: "concerts" | "festivals" | "nightlife" | "featured";
}

const Events = ({ type = "concerts" }: EventsProps) => {
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
          article.category === "Events" && 
          (type === "concerts" && article.subcategory === "Concerts" ||
           type === "festivals" && article.subcategory === "Festivals" ||
           type === "nightlife" && article.subcategory === "Nightlife" ||
           type === "featured" && article.is_premium) // Premium events are considered featured
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching event articles:", error);
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
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Events - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/entertainment/events/concerts">
              <Button variant={type === "concerts" ? "default" : "outline"} size="sm">Concerts</Button>
            </Link>
            <Link to="/entertainment/events/festivals">
              <Button variant={type === "festivals" ? "default" : "outline"} size="sm">Festivals</Button>
            </Link>
            <Link to="/entertainment/events/nightlife">
              <Button variant={type === "nightlife" ? "default" : "outline"} size="sm">Nightlife</Button>
            </Link>
            <Link to="/entertainment/events/featured">
              <Button variant={type === "featured" ? "default" : "outline"} size="sm">Featured</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3].map((i) => (
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
                <h3 className="text-xl font-medium mb-2">No {categoryTitle} Events Yet</h3>
                <p className="text-muted-foreground">Add events from the admin panel to populate this section.</p>
              </div>
            )}
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-card rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center">
                <Calendar className="h-5 w-5 text-kenya-red mr-2" />
                <h3 className="font-bold text-lg">Upcoming Events</h3>
              </div>
              
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming events scheduled.</p>
                <p className="text-xs text-muted-foreground mt-2">Events will appear here once they are added in the admin panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
