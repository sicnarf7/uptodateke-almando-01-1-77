
import { Link } from "react-router-dom";

const ArticleNotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
    <p className="mb-6">Sorry, the article you're looking for doesn't exist or has been removed.</p>
    <Link to="/" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
      Return to Home Page
    </Link>
  </div>
);

export default ArticleNotFound;
