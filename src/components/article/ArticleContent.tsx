
import { useEffect, useRef, memo } from "react";

interface ArticleContentProps {
  content: string;
}

const ArticleContent = memo(({ content }: ArticleContentProps) => {
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
    
    // Add lazy loading to images and optimize loading
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
      img.setAttribute('decoding', 'async');
      
      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', 'Article image');
      }
      
      // Add a lightweight blur-up effect
      if (!img.className.includes('image-loaded')) {
        img.style.filter = 'blur(10px)';
        img.style.transition = 'filter 0.3s ease-out';
        
        img.onload = () => {
          img.style.filter = 'blur(0)';
          img.classList.add('image-loaded');
        };
      }
    });
    
    // Return cleanup function
    return () => {
      if (contentRef.current) {
        const images = contentRef.current.querySelectorAll('img');
        images.forEach(img => {
          if (img.onload) {
            img.onload = null;
          }
        });
      }
    };
  }, [content]);
  
  return (
    <div 
      ref={contentRef}
      className="prose dark:prose-invert prose-lg max-w-none mb-12 prose-headings:font-bold prose-p:mb-6 prose-img:rounded-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-l-4 prose-blockquote:border-primary/20 prose-blockquote:pl-4 prose-blockquote:italic"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

ArticleContent.displayName = 'ArticleContent';

export default ArticleContent;
