
import { Article } from "@/types/article";
import { format } from "date-fns";

interface ArticleAuthorInfoProps {
  article: Article;
}

const ArticleAuthorInfo = ({ article }: ArticleAuthorInfoProps) => (
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

export default ArticleAuthorInfo;
