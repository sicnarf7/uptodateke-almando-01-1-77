
import { useState, useEffect } from "react";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";

export const useArticleData = (slug: string | undefined) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      if (slug) {
        const fetchedArticle = await articleService.getArticleBySlug(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
          const related = await articleService.getRelatedArticles(fetchedArticle);
          setRelatedArticles(related);
        }
      }
      setIsLoading(false);
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return {
    article,
    isLoading,
    relatedArticles,
    isBookmarked,
    toggleBookmark
  };
};
