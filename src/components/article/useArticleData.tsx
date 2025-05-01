
import { useState, useEffect, useCallback } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { useQuery } from "@tanstack/react-query";

export const useArticleData = (slug: string | undefined) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Fetch article data with React Query for proper caching
  const { 
    data: article,
    isLoading: isArticleLoading
  } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => slug ? articleService.getArticleBySlug(slug) : null,
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    gcTime: 1000 * 60 * 60,    // 1 hour
  });
  
  // Fetch related articles with React Query
  const {
    data: relatedArticles = [],
    isLoading: isRelatedLoading
  } = useQuery({
    queryKey: ['relatedArticles', article?.id],
    queryFn: () => article ? articleService.getRelatedArticles(article) : [],
    enabled: !!article,
    staleTime: 1000 * 60 * 5,  // 5 minutes
    gcTime: 1000 * 60 * 60,    // 1 hour
  });

  // Scroll to top when slug changes
  useEffect(() => {
    if (slug) {
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const toggleBookmark = useCallback(() => {
    setIsBookmarked(prev => !prev);
  }, []);

  return {
    article,
    isLoading: isArticleLoading || isRelatedLoading,
    relatedArticles,
    isBookmarked,
    toggleBookmark
  };
};
