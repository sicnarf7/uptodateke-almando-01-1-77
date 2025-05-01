
import { Article } from "@/types/article";
import { NewsCard } from "@/components/ui/NewsCard";
import { format } from "date-fns";

interface RelatedArticlesProps {
  articles: Article[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => (
  <div className="max-w-6xl mx-auto">
    <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((related) => (
        <NewsCard
          key={related.id}
          id={parseInt(related.id)}
          title={related.title}
          excerpt={related.excerpt}
          imageUrl={related.featuredImage?.url || ""}
          category={related.category}
          author={related.author?.name || ""}
          authorImageUrl={related.author?.image_url || ""}
          publishedAt={format(new Date(related.published_at), "MMMM d, yyyy")}
          url={`/article/${related.slug}`}
          isPremium={related.is_premium}
        />
      ))}
    </div>
  </div>
);

export default RelatedArticles;
