
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import { useState } from "react";

interface NewsProps {
  section?: string;
  category?: string;
}

const News = ({ section, category }: NewsProps) => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: section && category ? `${section.charAt(0).toUpperCase() + section.slice(1)} - ${category.charAt(0).toUpperCase() + category.slice(1)}` : "Government Announces New Infrastructure Project",
      excerpt: "The Kenyan government has announced a major infrastructure development project aimed at improving transportation across the country.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: section || "Politics",
      author: "John Doe",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "2 hours ago",
      url: "/article/government-announces-new-infrastructure",
      isPremium: false
    },
    {
      id: 2,
      title: "Kenya's Economy Shows Strong Growth in Q2",
      excerpt: "Economic indicators show Kenya's economy growing faster than expected in the second quarter of the fiscal year.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Business",
      author: "Jane Smith",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "5 hours ago",
      url: "/article/kenyas-economy-shows-strong-growth",
      isPremium: true
    },
    {
      id: 3,
      title: "New Tech Hub Opens in Nairobi",
      excerpt: "A state-of-the-art technology hub has opened in Nairobi, providing resources for startups and established tech companies.",
      imageUrl: "https://via.placeholder.com/600x400",
      category: "Technology",
      author: "Mark Johnson",
      authorImageUrl: "https://via.placeholder.com/100",
      publishedAt: "1 day ago",
      url: "/article/new-tech-hub-opens-in-nairobi",
      isPremium: false
    },
  ]);

  const sectionTitle = section ? 
    (category ? `${section.charAt(0).toUpperCase() + section.slice(1)} - ${category.charAt(0).toUpperCase() + category.slice(1)}` : 
    `${section.charAt(0).toUpperCase() + section.slice(1)} News`) : 
    "Latest News";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{sectionTitle}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
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

export default News;
