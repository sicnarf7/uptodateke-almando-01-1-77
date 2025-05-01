
import { Article } from "@/types/article";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => (
  <>
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <Link to={`/news/${article.category.toLowerCase()}`}>
        <Badge variant="outline" className="category-tag text-sm">
          {article.category}
        </Badge>
      </Link>
      
      {article.subcategory && (
        <Link to={`/news/${article.category.toLowerCase()}/${article.subcategory.toLowerCase()}`}>
          <Badge variant="secondary" className="text-sm">
            {article.subcategory}
          </Badge>
        </Link>
      )}
      
      {article.is_premium && (
        <Badge variant="default" className="bg-amber-500 text-white premium-badge">
          PREMIUM
        </Badge>
      )}
    </div>
    
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
  </>
);

export default ArticleHeader;
