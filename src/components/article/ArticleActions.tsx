
import { Article } from "@/types/article";
import { Share2Icon, BookmarkIcon, MessageSquareIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ArticleActionsProps {
  article: Article;
  isBookmarked: boolean;
  toggleBookmark: () => void;
}

const ArticleActions = ({ article, isBookmarked, toggleBookmark }: ArticleActionsProps) => (
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

export default ArticleActions;
