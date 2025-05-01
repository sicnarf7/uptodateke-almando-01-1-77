
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { format } from "date-fns";
import { Share2Icon, BookmarkIcon, MessageSquareIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NewsCard } from "@/components/ui/NewsCard";

// Article components
const ArticleHeader = ({ article }: { article: Article }) => (
  <>
    <div className="mb-6">
      <span className="category-tag mb-2">{article.category}</span>
      {article.is_premium && <span className="premium-badge ml-2">PREMIUM</span>}
    </div>
    
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
  </>
);

const ArticleAuthorInfo = ({ article }: { article: Article }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-4">
      {article.author && (
        <>
          <img
            src={article.author.image_url}
            alt={article.author.name}
            className="h-12 w-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
          />
          <div>
            <p className="font-medium">{article.author.name}</p>
            <p className="text-sm text-muted-foreground">{article.author.role}</p>
          </div>
        </>
      )}
    </div>
    
    <div className="text-sm text-muted-foreground">
      {format(new Date(article.published_at), "MMMM d, yyyy")}
    </div>
  </div>
);

const ArticleFeaturedImage = ({ article }: { article: Article }) => (
  <div className="relative mb-8 rounded-xl overflow-hidden">
    {article.featuredImage && (
      <img
        src={article.featuredImage.url}
        alt={article.featuredImage.alt}
        className="w-full h-auto object-cover rounded-xl"
      />
    )}
    {article.featuredImage?.caption && (
      <div className="bg-black/60 text-white text-sm py-2 px-4 absolute bottom-0 left-0 right-0">
        {article.featuredImage.caption}
        {article.featuredImage.credit && (
          <span className="text-gray-300 ml-2">Photo: {article.featuredImage.credit}</span>
        )}
      </div>
    )}
  </div>
);

const ArticleActions = ({ article, isBookmarked, toggleBookmark }: { 
  article: Article; 
  isBookmarked: boolean; 
  toggleBookmark: () => void;
}) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex space-x-2">
      {article.tags && article.tags.map((tag) => (
        <Link
          key={tag.id}
          to={`/tag/${tag.slug}`}
          className="text-sm bg-muted px-3 py-1 rounded-full hover:bg-muted/80 transition-colors"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
    
    <div className="flex space-x-2">
      <button 
        onClick={toggleBookmark}
        className={`p-2 rounded-full transition-colors ${
          isBookmarked 
            ? 'text-kenya-gold bg-kenya-gold/10' 
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        <BookmarkIcon size={18} className={isBookmarked ? "fill-kenya-gold" : ""} />
      </button>
      <button 
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
        aria-label="Share"
      >
        <Share2Icon size={18} />
      </button>
      <button 
        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
        aria-label="Comment"
      >
        <MessageSquareIcon size={18} />
      </button>
    </div>
  </div>
);

const ArticleFooter = ({ article }: { article: Article }) => (
  <>
    <Separator className="my-8" />
    
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      {article.author && (
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-semibold">About the Author</h3>
          <p className="text-muted-foreground">{article.author.bio}</p>
        </div>
      )}
      
      <div className="flex space-x-2">
        {article.author && (
          <Link 
            to={`/author/${article.author.id}`}
            className="bg-muted px-4 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm"
          >
            More from this author
          </Link>
        )}
      </div>
    </div>
  </>
);

const RelatedArticles = ({ articles }: { articles: Article[] }) => (
  <div className="max-w-6xl mx-auto">
    <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((related) => (
        <NewsCard
          key={related.id}
          id={parseInt(related.id)}
          title={related.title}
          excerpt={related.excerpt}
          imageUrl={related.featuredImage?.url || ""}
          category={related.category}
          author={related.author?.name || ""}
          authorImageUrl={related.author?.image_url || ""}
          publishedAt={format(new Date(related.published_at), "MMMM d, yyyy")}
          url={`/article/${related.slug}`}
          isPremium={related.is_premium}
        />
      ))}
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-md mb-4 animate-pulse"></div>
      <div className="w-full h-72 bg-gray-200 dark:bg-gray-800 rounded-md mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const ArticleNotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
    <p className="mb-6">Sorry, the article you're looking for doesn't exist or has been removed.</p>
    <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
      Return to Home Page
    </Link>
  </div>
);

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
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

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!article) {
    return <ArticleNotFound />;
  }

  return (
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
        
        <div 
          className="prose dark:prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-p:mb-6 prose-img:rounded-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <ArticleFooter article={article} />
      </div>
      
      {relatedArticles.length > 0 && <RelatedArticles articles={relatedArticles} />}
    </div>
  );
};

export default ArticleDetail;
