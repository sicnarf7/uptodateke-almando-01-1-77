
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import TrendingSection from "@/components/ui/TrendingSection";

const Sports = () => {
  // Sample data for sports news
  const sportsNews = [
    {
      id: 1,
      title: "Harambee Stars secure vital win in World Cup qualifiers",
      excerpt: "Kenya's national football team keeps qualification hopes alive with impressive performance against strong opponents.",
      imageUrl: "https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Football",
      category: "Football",
      author: "John Kamau",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=JK",
      publishedAt: "4 hours ago",
      url: "/article/harambee-stars-win",
    },
    {
      id: 2,
      title: "Kenya Sevens team prepares for Olympic challenge",
      excerpt: "After qualifying for the Olympics, Kenya's rugby sevens squad intensifies training ahead of the global competition.",
      imageUrl: "https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Rugby",
      category: "Rugby",
      author: "Jane Wanjiru",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=JW",
      publishedAt: "6 hours ago",
      url: "/article/kenya-sevens-olympics",
    },
    {
      id: 3,
      title: "Marathon champion sets sights on breaking world record",
      excerpt: "Kenya's long-distance running champion reveals plans to attempt world record at upcoming major marathon.",
      imageUrl: "https://via.placeholder.com/600x400/00FF00/FFFFFF?text=Athletics",
      category: "Athletics",
      author: "David Maina",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=DM",
      publishedAt: "1 day ago",
      url: "/article/marathon-world-record",
      isPremium: true,
    },
    {
      id: 4,
      title: "Local basketball league announces expansion plans",
      excerpt: "Kenya Basketball Federation reveals plans to add more teams and improve infrastructure in coming season.",
      imageUrl: "https://via.placeholder.com/600x400/FFA500/FFFFFF?text=Basketball",
      category: "Basketball",
      author: "Sarah Ochieng",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=SO",
      publishedAt: "2 days ago",
      url: "/article/basketball-expansion",
    },
    {
      id: 5,
      title: "Young cricket star signs with international league",
      excerpt: "Rising Kenyan cricket talent secures contract with prestigious international cricket league.",
      imageUrl: "https://via.placeholder.com/600x400/800080/FFFFFF?text=Cricket",
      category: "Cricket",
      author: "Michael Otieno",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=MO",
      publishedAt: "3 days ago",
      url: "/article/cricket-star-contract",
    },
    {
      id: 6,
      title: "Government announces funding boost for sports development",
      excerpt: "Ministry of Sports reveals increased budget allocation to support grassroots sports programs across the country.",
      imageUrl: "https://via.placeholder.com/600x400/008000/FFFFFF?text=Sports+Development",
      category: "Policy",
      author: "Lucy Waithera",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=LW",
      publishedAt: "4 days ago",
      url: "/article/sports-funding-boost",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Sports</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sportsNews.map((news) => (
                <NewsCard
                  key={news.id}
                  id={news.id}
                  title={news.title}
                  excerpt={news.excerpt}
                  imageUrl={news.imageUrl}
                  category={news.category}
                  author={news.author}
                  authorImageUrl={news.authorImageUrl}
                  publishedAt={news.publishedAt}
                  url={news.url}
                  isPremium={news.isPremium}
                />
              ))}
            </div>
          </div>
          
          <div>
            <TrendingSection />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Sports;
