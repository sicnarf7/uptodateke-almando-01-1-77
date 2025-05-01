
import { Link } from "react-router-dom";
import { categoryOptions } from "@/data/categoryOptions";
import { Button } from "@/components/ui/button";

const ArticleNotFound = () => (
  <div className="container mx-auto px-4 py-16">
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
      <p className="mb-6">Sorry, the article you're looking for doesn't exist or has been removed.</p>
      
      <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors inline-block mb-8">
        Return to Home Page
      </Link>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-3">Browse by category</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {categoryOptions.slice(0, 8).map(category => (
            <Link key={category.value} to={`/news/${category.value.toLowerCase()}`}>
              <Button variant="outline" size="sm">{category.label}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ArticleNotFound;
