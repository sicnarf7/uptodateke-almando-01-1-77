
import MainLayout from "@/components/layout/MainLayout";
import { NewsCard } from "@/components/ui/NewsCard";
import TrendingSection from "@/components/ui/TrendingSection";

const Business = () => {
  // Sample data for business news
  const businessNews = [
    {
      id: 1,
      title: "Kenya's economy shows 6% growth in first quarter",
      excerpt: "Central Bank reports positive economic indicators with growth across multiple sectors despite global challenges.",
      imageUrl: "https://via.placeholder.com/600x400/00008B/FFFFFF?text=Economy",
      category: "Economy",
      author: "James Omondi",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=JO",
      publishedAt: "2 hours ago",
      url: "/article/kenya-economy-growth",
    },
    {
      id: 2,
      title: "Local startup secures $5 million in funding",
      excerpt: "Nairobi-based fintech company attracts major investment to expand operations across East Africa.",
      imageUrl: "https://via.placeholder.com/600x400/006400/FFFFFF?text=Startup",
      category: "Startups",
      author: "Elizabeth Njeri",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=EN",
      publishedAt: "5 hours ago",
      url: "/article/startup-funding",
      isPremium: true,
    },
    {
      id: 3,
      title: "Nairobi Stock Exchange reports record trading day",
      excerpt: "Investors respond positively to new economic policies with increased trading volumes and rising share prices.",
      imageUrl: "https://via.placeholder.com/600x400/B8860B/FFFFFF?text=Markets",
      category: "Markets",
      author: "Robert Kinyua",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=RK",
      publishedAt: "1 day ago",
      url: "/article/nse-record-trading",
    },
    {
      id: 4,
      title: "New tax regulations to impact small businesses",
      excerpt: "Government introduces tax changes with significant implications for SMEs across various sectors.",
      imageUrl: "https://via.placeholder.com/600x400/8B4513/FFFFFF?text=Tax",
      category: "Taxation",
      author: "Mary Akinyi",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=MA",
      publishedAt: "2 days ago",
      url: "/article/tax-small-business",
    },
    {
      id: 5,
      title: "Kenya and Tanzania sign major trade agreement",
      excerpt: "Bilateral trade deal expected to boost regional commerce and reduce cross-border trade barriers.",
      imageUrl: "https://via.placeholder.com/600x400/483D8B/FFFFFF?text=Trade",
      category: "Trade",
      author: "Daniel Kimathi",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=DK",
      publishedAt: "3 days ago",
      url: "/article/kenya-tanzania-trade",
    },
    {
      id: 6,
      title: "Renewable energy investments reach new high",
      excerpt: "Foreign and local investments in Kenya's renewable energy sector create new jobs and boost green economy.",
      imageUrl: "https://via.placeholder.com/600x400/2E8B57/FFFFFF?text=Energy",
      category: "Energy",
      author: "Sarah Mutua",
      authorImageUrl: "https://via.placeholder.com/40x40/808080/FFFFFF?text=SM",
      publishedAt: "4 days ago",
      url: "/article/renewable-energy",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Business</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businessNews.map((news) => (
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

export default Business;
