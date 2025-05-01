
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Article } from "@/types/article";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Star, Edit, Eye, Loader2 } from "lucide-react";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";
import { useAdminData } from "@/context/AdminDataContext";

interface ArticlesTabProps {
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  isCreatingNew: boolean;
  setIsCreatingNew: (isNew: boolean) => void;
  isLoading?: boolean;
}

export const ArticlesTab = ({ 
  selectedArticle,
  setSelectedArticle,
  isCreatingNew,
  setIsCreatingNew,
  isLoading = false
}: ArticlesTabProps) => {
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const { contentData, handleRefresh } = useAdminData();
  const { articles, authors, tags, images } = contentData;
  
  const handleUpdateArticle = async (articleId: string, updates: Partial<Article>) => {
    setActionInProgress(articleId);
    try {
      await articleService.updateArticle(articleId, updates);
      toast.success("Article updated successfully");
      handleRefresh();
    } catch (error) {
      console.error("Error updating article:", error);
      toast.error(`Update failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    } finally {
      setActionInProgress(null);
    }
  };

  const toggleFeature = async (article: Article) => {
    // For this demo, we'll just increase the view count to make it featured
    await handleUpdateArticle(article.id, { 
      view_count: article.view_count + 100 
    });
  };
  
  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsCreatingNew(false);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ArticleForm 
          authors={authors}
          tags={tags}
          images={images}
          onSuccess={handleRefresh}
          isLoading={isLoading}
          setIsLoading={() => {}} // We're managing loading state at a higher level now
          articleToEdit={selectedArticle}
        />
      </div>
      
      <div>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">All Articles</h3>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                {articles.length === 0 ? (
                  <p className="text-muted-foreground">No articles yet.</p>
                ) : (
                  articles.map((article) => (
                    <div key={article.id} className="border-b pb-3 mb-3 last:border-0">
                      <h3 className="font-medium">{article.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                        {article.is_premium && <Badge variant="outline">Premium</Badge>}
                        {article.view_count > 100 && <Badge variant="default" className="bg-amber-500">Featured</Badge>}
                        {article.subcategory && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {article.subcategory}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {article.category} • {article.published_at ? format(new Date(article.published_at), "MMM d, yyyy") : 'Not published'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Views: {article.view_count}
                      </p>
                      <div className="flex mt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                          className="mr-2"
                        >
                          <Link to={`/article/${article.slug}`}>
                            <Eye className="h-3.5 w-3.5 mr-1" /> View
                          </Link>
                        </Button>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => toggleFeature(article)}
                          disabled={actionInProgress === article.id}
                        >
                          <Star className={`h-3.5 w-3.5 mr-1 ${article.view_count > 100 ? 'fill-amber-500' : ''}`} /> 
                          {article.view_count > 100 ? 'Featured' : 'Feature'}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditArticle(article)}
                        >
                          <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
