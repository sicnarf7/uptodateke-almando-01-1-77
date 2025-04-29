
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { articleService } from "@/services/articleService";
import { Skeleton } from "@/components/ui/skeleton";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slides, setSlides] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        // Fetch articles marked as published and with highest view counts
        const articles = await articleService.getAllArticles();
        // Select top 3 articles by view count for hero section
        const featuredArticles = articles
          .filter(article => article.status === 'published')
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 3);
          
        setSlides(featuredArticles);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedArticles();
  }, []);

  useEffect(() => {
    let interval: number;
    
    if (isPlaying && slides.length > 0) {
      interval = window.setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 7000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-black flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  // If no articles found, show a placeholder
  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">No Featured Articles</h2>
          <p>Publish articles to see them featured here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] bg-black overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 ken-burns">
            <img
              src={slide.featuredImage?.url || "https://via.placeholder.com/1600x900/000000/FFFFFF?text=No+Image"}
              alt={slide.featuredImage?.alt || slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-3xl animate-fade-in-up">
                <span className="inline-block mb-2 px-4 py-1 bg-kenya-red text-white text-sm font-bold rounded-full">
                  {slide.category}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 mb-6">
                  {slide.excerpt}
                </p>
                <Button 
                  className="bg-white text-black hover:bg-white/90 transition-colors"
                  size="lg"
                  asChild
                >
                  <a href={`/article/${slide.slug}`}>Read Story</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows - only show if we have slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;
