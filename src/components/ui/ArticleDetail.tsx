
import { useParams } from "react-router-dom";
import { useArticleData } from "@/components/article/useArticleData";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleAuthorInfo from "@/components/article/ArticleAuthorInfo";
import ArticleFeaturedImage from "@/components/article/ArticleFeaturedImage";
import ArticleActions from "@/components/article/ArticleActions";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleFooter from "@/components/article/ArticleFooter";
import RelatedArticles from "@/components/article/RelatedArticles";
import LoadingSkeleton from "@/components/article/ArticleLoading";
import ArticleNotFound from "@/components/article/ArticleNotFound";
import { SEOHead } from "@/components/layout/SEOHead";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, isLoading, relatedArticles, isBookmarked, toggleBookmark } = useArticleData(slug);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!article) {
    return <ArticleNotFound />;
  }

  return (
    <>
      {article && (
        <SEOHead 
          title={`${article.title} | UpTodateKE`}
          description={article.excerpt} 
          ogImage={article.featuredImage?.url}
          canonicalUrl={`/article/${article.slug}`}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto mb-16">
          <ArticleHeader article={article} />
          <ArticleAuthorInfo article={article} />
          <ArticleFeaturedImage article={article} />
          <ArticleActions 
            article={article} 
            isBookmarked={isBookmarked} 
            toggleBookmark={toggleBookmark} 
          />
          
          <ArticleContent content={article.content} />
          
          <ArticleFooter article={article} />
        </div>
        
        {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
      </div>
    </>
  );
};

export default ArticleDetail;
