
import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";

interface VideoCardProps {
  id: number;
  title: string;
  thumbnailUrl: string;
  duration: string;
  views: number;
  timeAgo: string;
  category: string;
  channelName: string;
  channelAvatarUrl: string;
  videoUrl: string;
}

export const VideoCard = ({
  id,
  title,
  thumbnailUrl,
  duration,
  views,
  timeAgo,
  category,
  channelName,
  channelAvatarUrl,
  videoUrl,
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${id * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={videoUrl} className="block">
        <div className="relative overflow-hidden rounded-xl aspect-video mb-2">
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-kenya-red rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-0.5 px-2 rounded-md flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
          
          <div className="absolute top-2 left-2">
            <span className="category-tag">{category}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-base md:text-lg line-clamp-2 group-hover:text-kenya-red transition-colors">
          {title}
        </h3>
      </Link>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center">
          <img
            src={channelAvatarUrl}
            alt={channelName}
            className="h-8 w-8 rounded-full mr-2 object-cover"
          />
          <div>
            <p className="text-xs font-medium">{channelName}</p>
            <p className="text-xs text-muted-foreground">{views.toLocaleString()} views • {timeAgo}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
