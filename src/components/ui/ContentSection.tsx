
import { useState } from "react";
import NewsCard from "./NewsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentSectionProps {
  title: string;
  description?: string;
}

const ContentSection = ({ title, description }: ContentSectionProps) => {
  const [activeTab, setActiveTab] = useState("latest");

  const featuredNews = [
    {
      id: 1,
      title: "Kenya's Digital Revolution: How Technology is Transforming Lives",
      excerpt: "From mobile banking to agricultural innovations, technology is reshaping how Kenyans live and work.",
      imageUrl: "https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Digital+Revolution",
      category: "Technology",
      author: "John Maina",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=JM",
      publishedAt: "6 hours ago",
      url: "/news/tech/digital-revolution",
      isPremium: true,
    },
    {
      id: 2,
      title: "Inside Kenya's Booming Music Industry: The Rise of Afro-Beats",
      excerpt: "Kenyan artists are making waves globally with unique sounds and collaborations.",
      imageUrl: "https://via.placeholder.com/600x400/800080/FFFFFF?text=Music+Industry",
      category: "Entertainment",
      author: "Wanjiku Njeri",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=WN",
      publishedAt: "12 hours ago",
      url: "/entertainment/music/afrobeats-rise",
      isPremium: false,
    },
    {
      id: 3,
      title: "Climate Change: How Kenya is Leading the Green Revolution in Africa",
      excerpt: "Innovative policies and community initiatives are positioning Kenya as a climate action leader.",
      imageUrl: "https://via.placeholder.com/600x400/006600/FFFFFF?text=Climate+Action",
      category: "Environment",
      author: "David Omondi",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=DO",
      publishedAt: "1 day ago",
      url: "/news/environment/climate-leadership",
      isPremium: false,
    },
    {
      id: 4,
      title: "Kenya's Athletes Set New Records at International Championships",
      excerpt: "Kenyan runners continue to dominate world athletics with exceptional performances.",
      imageUrl: "https://via.placeholder.com/600x400/000000/FFFFFF?text=Athletics",
      category: "Sports",
      author: "Faith Kipyegon",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=FK",
      publishedAt: "2 days ago",
      url: "/sports/athletics/new-records",
      isPremium: false,
    },
    {
      id: 5,
      title: "Exploring Kenya's Hidden Culinary Treasures",
      excerpt: "Beyond nyama choma: Discovering the rich and diverse food cultures across Kenya.",
      imageUrl: "https://via.placeholder.com/600x400/FFD700/FFFFFF?text=Kenyan+Cuisine",
      category: "Food & Culture",
      author: "Maria Akinyi",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=MA",
      publishedAt: "3 days ago",
      url: "/lifestyle/food/culinary-treasures",
      isPremium: true,
    },
    {
      id: 6,
      title: "Sustainable Tourism: Kenya's New Approach to Wildlife Conservation",
      excerpt: "How eco-tourism is helping preserve Kenya's wildlife while empowering local communities.",
      imageUrl: "https://via.placeholder.com/600x400/006600/FFFFFF?text=Wildlife+Conservation",
      category: "Tourism",
      author: "James Letura",
      authorImageUrl: "https://via.placeholder.com/100/888888/FFFFFF?text=JL",
      publishedAt: "4 days ago",
      url: "/travel/sustainable-tourism",
      isPremium: false,
    },
  ];

  const popularNews = [...featuredNews].sort((a, b) => a.id % 2 === 0 ? -1 : 1);
  const recommendedNews = [...featuredNews].sort((a, b) => a.id % 3 === 0 ? -1 : 1);

  return (
    <section className="py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        <Tabs defaultValue="latest" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="latest" onClick={() => setActiveTab("latest")}>
                Latest
              </TabsTrigger>
              <TabsTrigger value="popular" onClick={() => setActiveTab("popular")}>
                Popular
              </TabsTrigger>
              <TabsTrigger value="recommended" onClick={() => setActiveTab("recommended")}>
                For You
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="latest" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularNews.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedNews.map((news) => (
                <NewsCard key={news.id} {...news} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContentSection;
