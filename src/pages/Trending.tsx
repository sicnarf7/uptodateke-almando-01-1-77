
import MainLayout from "@/components/layout/MainLayout";
import TrendingSection from "@/components/ui/TrendingSection";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState } from "react";

const Trending = () => {
  const [trendingArticles, setTrendingArticles] = useState([
    {
      id: 1,
      title: "Breaking: Major Political Announcement Expected Today",
      excerpt: "Political analysts are anticipating a significant announcement from government officials that could reshape the political landscape.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Politics",
      author: "Michael Odhiambo",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 hour ago",
      url: "/article/major-political-announcement",
      isPremium: false
    },
    {
      id: 2,
      title: "Viral Video: Street Performer Amazes Crowd in Nairobi",
      excerpt: "A street performer has become an overnight sensation after a video of their incredible talents went viral on social media.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Entertainment",
      author: "Emily Wangari",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "3 hours ago",
      url: "/article/viral-video-street-performer",
      isPremium: false
    },
    {
      id: 3,
      title: "Tech Giant Opens New Office in Kenya",
      excerpt: "A major international technology company has announced the opening of their new African headquarters in Nairobi.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Technology",
      author: "Robert Kimani",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "5 hours ago",
      url: "/article/tech-giant-opens-new-office",
      isPremium: true
    },
    {
      id: 4,
      title: "Record Breaking Athletic Performance at National Championships",
      excerpt: "Kenyan athletes have once again demonstrated their dominance with several record-breaking performances at the national championships.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Sports",
      author: "David Kipchoge",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "8 hours ago",
      url: "/article/record-breaking-athletic-performance",
      isPremium: false
    },
    {
      id: 5,
      title: "Economic Analysis: What the New Trade Deal Means for Kenyans",
      excerpt: "Experts weigh in on how the recently signed international trade agreement will impact the daily lives of Kenyan citizens.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Business",
      author: "Patricia Mwangi",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 day ago",
      url: "/article/new-trade-deal-analysis",
      isPremium: true
    },
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Trending Now</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trendingArticles.map((item) => (
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
          
          <div className="md:col-span-1">
            <TrendingSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Trending;
