
import { Article } from "@/types/article";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface ArticleFooterProps {
  article: Article;
}

const ArticleFooter = ({ article }: ArticleFooterProps) => (
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

export default ArticleFooter;
