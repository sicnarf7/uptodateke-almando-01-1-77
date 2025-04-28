
import MainLayout from "@/components/layout/MainLayout";
import BreakingNewsTicker from "@/components/ui/BreakingNewsTicker";
import HeroSection from "@/components/ui/HeroSection";
import TrendingSection from "@/components/ui/TrendingSection";
import ContentSection from "@/components/ui/ContentSection";
import PollCard from "@/components/ui/PollCard";
import { VideoCard } from "@/components/ui/VideoCard";
import SubscriptionSection from "@/components/ui/SubscriptionSection";

const Index = () => {
  const pollOptions = [
    { id: 1, text: "Focus on economic growth", votes: 156 },
    { id: 2, text: "Improve educational systems", votes: 98 },
    { id: 3, text: "Infrastructure development", votes: 127 },
    { id: 4, text: "Healthcare reforms", votes: 89 },
  ];

  const videos = [
    {
      id: 1,
      title: "Behind the Scenes: Nairobi's Growing Tech Hub",
      thumbnailUrl: "https://via.placeholder.com/640x360/000000/FFFFFF?text=Tech+Hub",
      duration: "12:34",
      views: 24568,
      timeAgo: "3 days ago",
      category: "Tech",
      channelName: "KE Insider",
      channelAvatarUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=KI",
      videoUrl: "/videos/tech-hub",
    },
    {
      id: 2,
      title: "The Future of Kenyan Music: Interview with Top Producers",
      thumbnailUrl: "https://via.placeholder.com/640x360/800080/FFFFFF?text=Music+Future",
      duration: "18:21",
      views: 18972,
      timeAgo: "1 week ago",
      category: "Music",
      channelName: "Beat Masters",
      channelAvatarUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=BM",
      videoUrl: "/videos/music-producers",
    },
    {
      id: 3,
      title: "Kenya's Wildlife Conservation Success Stories",
      thumbnailUrl: "https://via.placeholder.com/640x360/006600/FFFFFF?text=Wildlife",
      duration: "22:15",
      views: 15342,
      timeAgo: "2 weeks ago",
      category: "Nature",
      channelName: "Wild Explorer",
      channelAvatarUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=WE",
      videoUrl: "/videos/wildlife-conservation",
    },
    {
      id: 4,
      title: "Street Food Tour: Exploring Nairobi's Culinary Gems",
      thumbnailUrl: "https://via.placeholder.com/640x360/FFD700/FFFFFF?text=Food+Tour",
      duration: "15:42",
      views: 12789,
      timeAgo: "3 weeks ago",
      category: "Food",
      channelName: "Taste of Kenya",
      channelAvatarUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=TK",
      videoUrl: "/videos/street-food",
    },
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </section>
      
      <SubscriptionSection />
    </MainLayout>
  );
};

export default Index;
