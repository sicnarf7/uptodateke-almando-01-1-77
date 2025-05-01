
import { Article } from "@/types/article";

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => (
  <div 
    className="prose dark:prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-p:mb-6 prose-img:rounded-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4 prose-blockquote:italic"
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

export default ArticleContent;
