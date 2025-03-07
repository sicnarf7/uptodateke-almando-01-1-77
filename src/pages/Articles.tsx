
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import NewsCard from "@/components/ui/NewsCard";
import { format } from "date-fns";

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await articleService.getAllArticles();
      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    fetchArticles();
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Latest Articles</h1>
          <p className="text-muted-foreground text-lg mb-12">Stay informed with the most recent news and updates from Kenya</p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-card rounded-xl shadow-md h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <NewsCard
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  imageUrl={article.featuredImage.url}
                  category={article.category}
                  author={article.author.name}
                  authorImageUrl={article.author.imageUrl}
                  publishedAt={format(new Date(article.publishedAt), "MMMM d, yyyy")}
                  url={`/article/${article.slug}`}
                  isPremium={article.isPremium}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Articles;
