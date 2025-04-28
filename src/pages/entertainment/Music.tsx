
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface MusicProps {
  type: "gengetone" | "gospel" | "afrobeats";
}

const Music = ({ type = "gengetone" }: MusicProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);

  const [musicNews, setMusicNews] = useState([
    {
      id: 1,
      title: `New ${categoryTitle} Release Takes Charts By Storm`,
      excerpt: `The latest ${categoryTitle} music is making waves across Kenya and beyond.`,
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Music",
      author: "Music Critic",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "3 hours ago",
      url: "/article/new-music-release",
      isPremium: false
    },
    {
      id: 2,
      title: `Top ${categoryTitle} Artists Announce Collaboration`,
      excerpt: "Fans are excited about the upcoming collaboration between these popular artists.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Music",
      author: "Industry Insider",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 day ago",
      url: "/article/artist-collaboration",
      isPremium: false
    }
  ]);

  const [musicVideos, setMusicVideos] = useState([
    {
      id: 1,
      title: `Latest ${categoryTitle} Music Video`,
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "4:32",
      views: 78000,
      timeAgo: "5 days ago",
      category: "Music",
      channelName: "Music Kenya",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/latest-music-video"
    },
    {
      id: 2,
      title: `${categoryTitle} Artist Interview`,
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "12:45",
      views: 45000,
      timeAgo: "1 week ago",
      category: "Music",
      channelName: "Entertainment Now",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/artist-interview"
    },
    {
      id: 3,
      title: `Behind the Scenes: Making of ${categoryTitle} Hit Song`,
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "8:20",
      views: 32000,
      timeAgo: "2 weeks ago",
      category: "Music",
      channelName: "Music Insights",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/behind-the-scenes"
    },
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Music - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/entertainment/music/gengetone">
              <Button variant={type === "gengetone" ? "default" : "outline"} size="sm">Gengetone</Button>
            </Link>
            <Link to="/entertainment/music/gospel">
              <Button variant={type === "gospel" ? "default" : "outline"} size="sm">Gospel</Button>
            </Link>
            <Link to="/entertainment/music/afrobeats">
              <Button variant={type === "afrobeats" ? "default" : "outline"} size="sm">Afrobeats</Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicNews.map((item) => (
              <NewsCard
                key={item.id}
                id={item.id}
                title={item.title}
                excerpt={item.excerpt}
                imageUrl={item.imageUrl}
                category={item.category}
                author={item.author}
                authorImageUrl={item.authorImageUrl}
                publishedAt={item.publishedAt}
                url={item.url}
                isPremium={item.isPremium}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Music Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {musicVideos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnailUrl={video.thumbnailUrl}
                duration={video.duration}
                views={video.views}
                timeAgo={video.timeAgo}
                category={video.category}
                channelName={video.channelName}
                channelAvatarUrl={video.channelAvatarUrl}
                videoUrl={video.videoUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Music;
