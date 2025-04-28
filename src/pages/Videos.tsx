
import MainLayout from "@/components/layout/MainLayout";
import { VideoCard } from "@/components/ui/VideoCard";
import { useState } from "react";

const Videos = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Breaking News: Government Announces Major Policy Change",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "10:45",
      views: 120000,
      timeAgo: "3 hours ago",
      category: "News",
      channelName: "KE News Network",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/government-policy-change"
    },
    {
      id: 2,
      title: "Interview with Kenya's Rising Music Star",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "15:20",
      views: 75000,
      timeAgo: "1 day ago",
      category: "Entertainment",
      channelName: "Music Kenya",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/music-star-interview"
    },
    {
      id: 3,
      title: "How Technology is Transforming Kenyan Businesses",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "22:15",
      views: 42000,
      timeAgo: "2 days ago",
      category: "Business",
      channelName: "Tech Insights",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/tech-transforming-businesses"
    },
    {
      id: 4,
      title: "Kenya's Athletes Prepare for International Competition",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "18:30",
      views: 65000,
      timeAgo: "3 days ago",
      category: "Sports",
      channelName: "Sports Center",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/athletes-international-competition"
    },
    {
      id: 5,
      title: "Wildlife Documentary: The Great Migration",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "45:12",
      views: 98000,
      timeAgo: "1 week ago",
      category: "Documentary",
      channelName: "Kenya Wildlife",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/wildlife-great-migration"
    },
    {
      id: 6,
      title: "Kenyan Cuisine: How to Make Traditional Dishes",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "25:40",
      views: 33000,
      timeAgo: "2 weeks ago",
      category: "Food",
      channelName: "Kenya Cooking",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/traditional-kenyan-dishes"
    }
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Videos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
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
    </MainLayout>
  );
};

export default Videos;
