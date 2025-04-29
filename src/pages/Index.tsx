import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import BreakingNewsTicker from "@/components/ui/BreakingNewsTicker";
import HeroSection from "@/components/ui/HeroSection";
import TrendingSection from "@/components/ui/TrendingSection";
import ContentSection from "@/components/ui/ContentSection";
import PollCard from "@/components/ui/PollCard";
import { VideoCard } from "@/components/ui/VideoCard";
import SubscriptionSection from "@/components/ui/SubscriptionSection";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";

interface Video {
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

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoPosts, setVideoPosts] = useState<Video[]>([]);

  useEffect(() => {
    // Generate video posts based on articles with "video" in the content
    const fetchVideoArticles = async () => {
      try {
        const articles = await articleService.getAllArticles();
        
        // Filter for articles that might be video-related
        // For now, we'll simulate videos from regular articles
        const videoRelated = articles
          .filter(article => article.status === 'published')
          .slice(0, 4)  // Get first 4 articles
          .map((article, index) => ({
            id: index + 1,
            title: article.title,
            thumbnailUrl: article.featuredImage?.url || `https://via.placeholder.com/640x360/${getRandomColor()}/FFFFFF?text=${encodeURIComponent(article.category)}`,
            duration: getRandomDuration(),
            views: article.view_count || Math.floor(Math.random() * 20000) + 5000,
            timeAgo: getRandomTimeAgo(),
            category: article.category,
            channelName: article.author?.name || "Kenya News",
            channelAvatarUrl: article.author?.image_url || `https://via.placeholder.com/100/888888/FFFFFF?text=${getInitials(article.author?.name || "KN")}`,
            videoUrl: `/article/${article.slug}`,
          }));
          
        setVideoPosts(videoRelated);
      } catch (error) {
        console.error('Error fetching video articles:', error);
        // Fallback to static data if API fails
        setVideoPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVideoArticles();
  }, []);

  // Helper function to get random color
  const getRandomColor = () => {
    const colors = ['000000', '800080', '006600', 'FFD700', 'FF0000', '0000FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Helper function to get random duration
  const getRandomDuration = () => {
    const min = Math.floor(Math.random() * 20) + 5;
    const sec = Math.floor(Math.random() * 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  // Helper function to get random time ago
  const getRandomTimeAgo = () => {
    const units = ['days', 'weeks', 'months'];
    const amount = Math.floor(Math.random() * 4) + 1;
    const unit = units[Math.floor(Math.random() * units.length)];
    return `${amount} ${unit} ago`;
  };

  // Helper function to get initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Poll data - we'll keep this hardcoded for now as it's not part of the article system
  const pollOptions = [
    { id: 1, text: "Focus on economic growth", votes: 156 },
    { id: 2, text: "Improve educational systems", votes: 98 },
    { id: 3, text: "Infrastructure development", votes: 127 },
    { id: 4, text: "Healthcare reforms", votes: 89 },
  ];

  return (
    <MainLayout>
      <BreakingNewsTicker />
      <HeroSection />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <ContentSection 
              title="Latest Stories" 
              description="Stay informed with the most recent updates from across Kenya"
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <TrendingSection />
            
            <div className="mt-8">
              <PollCard 
                question="What should be Kenya's top priority for development?"
                options={pollOptions}
                totalVotes={470}
                endTime="in 2 days"
              />
            </div>
          </div>
        </div>
      </div>
      
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Videos</h2>
            <a href="/videos" className="text-kenya-red hover:text-kenya-red/80 font-medium">
              View All Videos
            </a>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((id) => (
                <div key={id} className="aspect-video bg-muted animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : videoPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No video content available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoPosts.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <SubscriptionSection />
    </MainLayout>
  );
};

export default Index;
