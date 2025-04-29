
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface ArticlesTabProps {
  articles: Article[];
  authors: ArticleAuthor[];
  tags: ArticleTag[];
  images: ArticleImage[];
  onRefresh: () => void;
}

export const ArticlesTab = ({ articles, authors, tags, images, onRefresh }: ArticlesTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <ArticleForm 
          authors={authors}
          tags={tags}
          images={images}
          onSuccess={onRefresh}
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
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {article.category} • {article.published_at ? format(new Date(article.published_at), "MMM d, yyyy") : 'Not published'}
                    </p>
                    <div className="flex mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        asChild
                        className="mr-2"
                      >
                        <Link to={`/article/${article.slug}`}>
                          View
                        </Link>
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
