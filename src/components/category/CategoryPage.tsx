
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/ui/NewsCard";
import MainLayout from "@/components/layout/MainLayout";
import TrendingSection from "@/components/ui/TrendingSection";
import { useArticles } from "@/hooks/useArticles";

export interface SubcategoryLink {
  label: string;
  value: string;
  path: string;
}

interface CategoryPageProps {
  title: string;
  category: string;
  subcategory?: string;
  showTrending?: boolean;
  subcategoryLinks?: SubcategoryLink[];
  emptyMessage?: string;
  layout?: "standard" | "grid" | "list";
}

const CategoryPage = ({
  title,
  category,
  subcategory,
  showTrending = true,
  subcategoryLinks = [],
  emptyMessage = "No articles found",
  layout = "standard"
}: CategoryPageProps) => {
  const { articles, isLoading } = useArticles({ 
    category, 
    subcategory 
  });

  // Determine grid column configuration based on layout
  const getGridClass = () => {
    switch (layout) {
      case "grid":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
      case "list":
        return "grid-cols-1 gap-6";
      case "standard":
      default:
        return "grid-cols-1 md:grid-cols-2 gap-6";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`flex ${subcategoryLinks.length > 0 ? 'flex-col md:flex-row justify-between items-start md:items-center' : ''} mb-8`}>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">{title}</h1>
          
          {subcategoryLinks.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {subcategoryLinks.map((link) => (
                <Link key={link.value} to={link.path}>
                  <Button 
                    variant={subcategory === link.value ? "default" : "outline"} 
                    size="sm"
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className={`${showTrending ? 'grid grid-cols-1 md:grid-cols-3 gap-8' : ''}`}>
          <div className={showTrending ? 'md:col-span-2' : ''}>
            {isLoading ? (
              <div className={`grid ${getGridClass()}`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[350px]">
                    <Skeleton className="h-full w-full rounded-lg" />
                  </div>
                ))}
              </div>
            ) : articles.length > 0 ? (
              <div className={`grid ${getGridClass()}`}>
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
                <h3 className="text-xl font-medium mb-2">{emptyMessage}</h3>
                <p className="text-muted-foreground">Add content from the admin panel to populate this section.</p>
              </div>
            )}
          </div>
          
          {showTrending && (
            <div>
              <TrendingSection />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
