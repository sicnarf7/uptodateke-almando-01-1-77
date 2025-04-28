
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CelebrityProps {
  type: "local" | "international" | "scandals";
}

const Celebrity = ({ type = "local" }: CelebrityProps) => {
  const categoryTitle = type.charAt(0).toUpperCase() + type.slice(1);

  const [celebrities, setCelebrities] = useState([
    {
      id: 1,
      title: type === "local" ? "Kenya's Top Artist Launches New Project" : 
            type === "international" ? "Hollywood Star to Visit Kenya" : 
            "Famous Singer Addresses Controversy",
      excerpt: "The celebrated figure has made headlines with their latest announcement.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Celebrity",
      author: "Entertainment Reporter",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "5 hours ago",
      url: "/article/celebrity-news-item",
      isPremium: false
    },
    {
      id: 2,
      title: type === "local" ? "Rising Star Wins Major Award" : 
            type === "international" ? "Global Icon Announces World Tour" : 
            "Truth Behind the Viral Rumor",
      excerpt: "Details about the latest developments in the celebrity world.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Celebrity",
      author: "Gossip Columnist",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 day ago",
      url: "/article/celebrity-news-details",
      isPremium: false
    },
    {
      id: 3,
      title: type === "local" ? "Actor Signs Major TV Deal" : 
            type === "international" ? "International Celebrity's Kenyan Connection" : 
            "Leaked Photos Cause Social Media Stir",
      excerpt: "The latest news from the entertainment industry that has everyone talking.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Celebrity",
      author: "Media Insider",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "2 days ago",
      url: "/article/major-celebrity-news",
      isPremium: type === "scandals" ? true : false
    },
  ]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Celebrity - {categoryTitle}</h1>
          <div className="flex flex-wrap gap-2">
            <Link to="/entertainment/celebrity/local">
              <Button variant={type === "local" ? "default" : "outline"} size="sm">Local Stars</Button>
            </Link>
            <Link to="/entertainment/celebrity/international">
              <Button variant={type === "international" ? "default" : "outline"} size="sm">International</Button>
            </Link>
            <Link to="/entertainment/celebrity/scandals">
              <Button variant={type === "scandals" ? "default" : "outline"} size="sm">Scandals & Rumors</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrities.map((item) => (
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
    </MainLayout>
  );
};

export default Celebrity;
