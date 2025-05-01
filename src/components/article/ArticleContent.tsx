
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface ArticleContentProps {
  content: string;
}

const ArticleContent = ({ content }: ArticleContentProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Process the article content after render
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Process internal links to use router navigation
    const internalLinks = contentRef.current.querySelectorAll('a[href^="/"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          window.history.pushState({}, '', href);
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      });
    });
    
    // Add lazy loading to images
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', 'Article image');
      }
    });
  }, [content]);
  
  return (
    <div 
      ref={contentRef}
      className="prose dark:prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-p:mb-6 prose-img:rounded-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4 prose-blockquote:italic"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default ArticleContent;
