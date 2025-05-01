
import { Article } from "@/types/article";

interface ArticleFeaturedImageProps {
  article: Article;
}

const ArticleFeaturedImage = ({ article }: ArticleFeaturedImageProps) => (
  <div className="relative mb-8 rounded-xl overflow-hidden">
    {article.featuredImage && (
      <img
        src={article.featuredImage.url}
        alt={article.featuredImage.alt}
        className="w-full h-auto object-cover rounded-xl"
      />
    )}
    {article.featuredImage?.caption && (
      <div className="bg-black/60 text-white text-sm py-2 px-4 absolute bottom-0 left-0 right-0">
        {article.featuredImage.caption}
        {article.featuredImage.credit && (
          <span className="text-gray-300 ml-2">Photo: {article.featuredImage.credit}</span>
        )}
      </div>
    )}
  </div>
);

export default ArticleFeaturedImage;
