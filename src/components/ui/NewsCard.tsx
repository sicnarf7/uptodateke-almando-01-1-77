
import { useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkIcon, Share2Icon, MessageSquareIcon } from "lucide-react";

interface NewsCardProps {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  url: string;
  isPremium?: boolean;
}

const NewsCard = ({
  id,
  title,
  excerpt,
  imageUrl,
  category,
  author,
  authorImageUrl,
  publishedAt,
  url,
  isPremium = false,
}: NewsCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="news-card group animate-fade-in-up" style={{ animationDelay: `${id * 0.1}s` }}>
      <div className="relative overflow-hidden h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className="category-tag">{category}</span>
          {isPremium && (
            <span className="premium-badge">PREMIUM</span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <Link to={url} className="block">
          <h3 className="font-bold text-lg md:text-xl mb-2 line-clamp-2 hover:text-kenya-red transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={authorImageUrl}
              alt={author}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-medium">{author}</p>
              <p className="text-xs text-muted-foreground">{publishedAt}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={toggleBookmark}
              className={`p-1.5 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-kenya-gold bg-kenya-gold/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
            >
              <BookmarkIcon size={16} className={isBookmarked ? "fill-kenya-gold" : ""} />
            </button>
            <button 
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              aria-label="Comment"
            >
              <MessageSquareIcon size={16} />
            </button>
            <button 
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              aria-label="Share"
            >
              <Share2Icon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
