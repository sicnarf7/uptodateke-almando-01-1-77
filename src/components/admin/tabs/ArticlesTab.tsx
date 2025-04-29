
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Star, Trash2, Edit, Eye } from "lucide-react";
import { articleService } from "@/services/articleService";
import { useToast } from "@/hooks/use-toast";

interface ArticlesTabProps {
  articles: Article[];
  authors: ArticleAuthor[];
  tags: ArticleTag[];
  images: ArticleImage[];
  onRefresh: () => void;
}

export const ArticlesTab = ({ articles, authors, tags, images, onRefresh }: ArticlesTabProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleUpdateArticle = async (articleId: string, updates: Partial<Article>) => {
    setActionInProgress(articleId);
    try {
      await articleService.updateArticle(articleId, updates);
      toast({
        title: "Article updated",
        description: "The article has been successfully updated.",
      });
      onRefresh();
    } catch (error) {
      console.error("Error updating article:", error);
      toast({
        title: "Update failed",
        description: "Failed to update the article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionInProgress(null);
    }
  };

  const toggleFeature = async (article: Article) => {
    // For this demo, we'll just increase the view count to make it featured
    // In a real app, you might have a "featured" flag
    await handleUpdateArticle(article.id, { 
      view_count: article.view_count + 100 
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ArticleForm 
          authors={authors}
          tags={tags}
          images={images}
          onSuccess={onRefresh}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>Manage your articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.length === 0 ? (
                <p className="text-muted-foreground">No articles yet.</p>
              ) : (
                articles.map((article) => (
                  <div key={article.id} className="border-b pb-3 mb-3 last:border-0">
                    <h3 className="font-medium">{article.title}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                        {article.status}
                      </Badge>
                      {article.is_premium && <Badge variant="outline">Premium</Badge>}
                      {article.view_count > 100 && <Badge variant="default" className="bg-amber-500">Featured</Badge>}
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
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
