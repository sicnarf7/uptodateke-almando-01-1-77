
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { categoryOptions } from "@/data/categoryOptions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/layout/SEOHead";

interface NewsProps {
  section?: string;
  category?: string;
}

const News = ({ section, category }: NewsProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract category and subcategory from URL if not provided as props
  const urlCategory = section || params.category || "";
  const urlSubcategory = category || params.subcategory || "";
  
  // Find the current category option
  const currentCategory = categoryOptions.find(
    cat => cat.value.toLowerCase() === urlCategory.toLowerCase()
  );
  
  // Get subcategories for the current category
  const subcategories = currentCategory?.subcategories || [];

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter by category and subcategory if provided
        let filteredArticles = articles.filter(article => article.status === 'published');
        
        if (urlCategory) {
          filteredArticles = filteredArticles.filter(
            article => article.category.toLowerCase() === urlCategory.toLowerCase()
          );
          
          if (urlSubcategory) {
            filteredArticles = filteredArticles.filter(
              article => article.subcategory?.toLowerCase() === urlSubcategory.toLowerCase()
            );
          }
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
  }, [urlCategory, urlSubcategory]);

  // Handle subcategory change
  const handleSubcategoryChange = (value: string) => {
    if (value === "all") {
      navigate(`/news/${urlCategory.toLowerCase()}`);
    } else {
      navigate(`/news/${urlCategory.toLowerCase()}/${value.toLowerCase()}`);
    }
  };

  // Determine title and description for the page
  const pageTitle = urlSubcategory ? 
    `${urlSubcategory} - ${urlCategory} News` : 
    urlCategory ? `${urlCategory} News` : "Latest News";
  
  const pageDescription = urlSubcategory ?
    `Read the latest ${urlSubcategory} news in ${urlCategory} from UpTodateKE` :
    urlCategory ? `Stay informed with the latest ${urlCategory} news from Kenya and around the world` : 
    "Stay informed with the most recent news and updates from Kenya";

  return (
    <MainLayout>
      <SEOHead
        title={`${pageTitle} - UpTodateKE`}
        description={pageDescription}
        canonicalUrl={`/news/${urlCategory.toLowerCase()}${urlSubcategory ? `/${urlSubcategory.toLowerCase()}` : ''}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{pageTitle}</h1>
        <p className="text-muted-foreground mb-8">{pageDescription}</p>
        
        {urlCategory && subcategories.length > 0 && (
          <div className="mb-8">
            <Tabs 
              defaultValue={urlSubcategory || "all"}
              onValueChange={handleSubcategoryChange}
              className="w-full overflow-x-auto"
            >
              <TabsList className="inline-flex w-auto min-w-full sm:min-w-0">
                <TabsTrigger value="all">All {urlCategory}</TabsTrigger>
                {subcategories.map(sub => (
                  <TabsTrigger key={sub.value} value={sub.value.toLowerCase()}>
                    {sub.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
        
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
                id={parseInt(article.id.substring(0, 8), 16)}
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
