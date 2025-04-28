
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { VideoCard } from "@/components/ui/VideoCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Entertainment = () => {
  const [featuredNews, setFeaturedNews] = useState([
    {
      id: 1,
      title: "Popular Artist Announces New Album",
      excerpt: "The award-winning artist has announced the release date for their highly anticipated new album.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Music",
      author: "James Wilson",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "3 hours ago",
      url: "/article/popular-artist-announces-new-album",
      isPremium: false
    },
    {
      id: 2,
      title: "Film Festival Returns to Nairobi",
      excerpt: "After a two-year hiatus, the international film festival is making a comeback to Nairobi with over 50 films.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Events",
      author: "Sarah Kimani",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 day ago",
      url: "/article/film-festival-returns-to-nairobi",
      isPremium: true
    },
  ]);

  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Behind the Scenes with Kenya's Top Musicians",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "15:24",
      views: 45000,
      timeAgo: "2 days ago",
      category: "Music",
      channelName: "KE Music",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/behind-the-scenes"
    },
    {
      id: 2,
      title: "Interview with Rising Star Actor",
      thumbnailUrl: "https://via.placeholder.com/600x400",
      duration: "8:12",
      views: 23000,
      timeAgo: "1 week ago",
      category: "Celebrity",
      channelName: "Entertainment Now",
      channelAvatarUrl: "https://via.placeholder.com/100",
      videoUrl: "/video/interview-rising-star"
    }
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Entertainment</h1>
          <div className="space-x-4">
            <Link to="/entertainment/celebrity/local">
              <Button variant="outline">Celebrity</Button>
            </Link>
            <Link to="/entertainment/music/gengetone">
              <Button variant="outline">Music</Button>
            </Link>
            <Link to="/entertainment/events/concerts">
              <Button variant="outline">Events</Button>
            </Link>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredNews.map((item) => (
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
          <h2 className="text-2xl font-bold mb-6">Trending Videos</h2>
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
      </div>
    </MainLayout>
  );
};

export default Entertainment;
