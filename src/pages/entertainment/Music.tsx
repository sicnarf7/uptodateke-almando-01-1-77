
import { SubcategoryLink } from "@/components/category/CategoryPage";
import CategoryPage from "@/components/category/CategoryPage";
import MainLayout from "@/components/layout/MainLayout";
import { useArticles } from "@/hooks/useArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsCard } from "@/components/ui/NewsCard";
import { format } from "date-fns";

interface MusicProps {
  type: "gengetone" | "gospel" | "afrobeats";
}

const Music = ({ type = "gengetone" }: MusicProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);
  
  // Define subcategory mapping
  const subcategoryMap: Record<string, string> = {
    "gengetone": "Gengetone",
    "gospel": "Gospel",
    "afrobeats": "Afrobeats"
  };
  
  const subcategory = subcategoryMap[type];
  
  // Define subcategory navigation links
  const subcategoryLinks: SubcategoryLink[] = [
    {
      label: "Gengetone",
      value: "Gengetone",
      path: "/entertainment/music/gengetone"
    },
    {
      label: "Gospel",
      value: "Gospel",
      path: "/entertainment/music/gospel"
    },
    {
      label: "Afrobeats",
      value: "Afrobeats",
      path: "/entertainment/music/afrobeats"
    }
  ];
  
  const { articles, isLoading } = useArticles({
    category: "Music",
    subcategory
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Music - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            {subcategoryLinks.map((link) => (
              <a key={link.value} href={link.path}>
                <button 
                  className={`px-4 py-1 text-sm rounded-full ${
                    subcategory === link.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {link.label}
                </button>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
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
              <h3 className="text-xl font-medium mb-2">No {categoryTitle} Music Articles Yet</h3>
              <p className="text-muted-foreground">Add music articles from the admin panel to populate this section.</p>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Music Videos</h2>
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">No Music Videos Yet</h3>
            <p className="text-muted-foreground">Music videos feature will be available soon.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Music;
