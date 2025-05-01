
import { Article } from "@/types/article";

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader = ({ article }: ArticleHeaderProps) => (
  <>
    <div className="mb-6">
      <span className="category-tag mb-2">{article.category}</span>
      {article.is_premium && <span className="premium-badge ml-2">PREMIUM</span>}
    </div>
    
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{article.title}</h1>
  </>
);

export default ArticleHeader;
