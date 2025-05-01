
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";

interface UseArticlesOptions {
  category?: string;
  subcategory?: string;
  isPremium?: boolean;
  limit?: number;
}

export function useArticles({ category, subcategory, isPremium, limit }: UseArticlesOptions = {}) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allArticles = await articleService.getAllArticles();
        
        // Filter articles based on parameters
        let filteredArticles = allArticles.filter(
          article => article.status === 'published'
        );
        
        // Apply category filter if provided
        if (category) {
          filteredArticles = filteredArticles.filter(
            article => article.category === category
          );
        }
        
        // Apply subcategory filter if provided
        if (subcategory) {
          filteredArticles = filteredArticles.filter(
            article => article.subcategory === subcategory
          );
        }
        
        // Apply premium filter if provided
        if (isPremium !== undefined) {
          filteredArticles = filteredArticles.filter(
            article => article.is_premium === isPremium
          );
        }
        
        // Apply limit if provided
        if (limit && filteredArticles.length > limit) {
          filteredArticles = filteredArticles.slice(0, limit);
        }
        
        setArticles(filteredArticles);
      } catch (error) {
        console.error(`Error fetching articles:`, error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category, subcategory, isPremium, limit]);

  return { articles, isLoading, error };
}
