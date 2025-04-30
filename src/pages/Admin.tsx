
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { articleService } from "@/services/articleService";
import { ArticlesTab } from "@/components/admin/tabs/ArticlesTab";
import { AuthorsTab } from "@/components/admin/tabs/AuthorsTab";
import { TagsTab } from "@/components/admin/tabs/TagsTab";
import { ImagesTab } from "@/components/admin/tabs/ImagesTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<ArticleTag[]>([]);
  const [authors, setAuthors] = useState<ArticleAuthor[]>([]);
  const [images, setImages] = useState<ArticleImage[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [articlesData, tagsData, authorsData, imagesData] = await Promise.all([
        articleService.getAllArticles(),
        articleService.getAllTags(),
        articleService.getAllAuthors(),
        articleService.getAllImages(),
      ]);

      setArticles(articlesData);
      setTags(tagsData);
      setAuthors(authorsData);
      setImages(imagesData);
    };

    fetchData();
  }, []);

  const refreshData = async () => {
    const [articlesData, tagsData, authorsData, imagesData] = await Promise.all([
      articleService.getAllArticles(),
      articleService.getAllTags(),
      articleService.getAllAuthors(),
      articleService.getAllImages(),
    ]);
    
    setArticles(articlesData);
    setTags(tagsData);
    setAuthors(authorsData);
    setImages(imagesData);
    
    // Reset article selection after successful operations
    setSelectedArticle(null);
    setIsCreatingNew(true);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Content Management System</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
            <TabsTrigger value="authors">Authors</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{isCreatingNew ? 'Create New Article' : 'Edit Article'}</h2>
              {!isCreatingNew && (
                <Button 
                  onClick={() => {
                    setSelectedArticle(null);
                    setIsCreatingNew(true);
                  }}
                  variant="default"
                  size="sm"
                >
                  Create New Article
                </Button>
              )}
            </div>
            
            <ArticlesTab 
              articles={articles}
              authors={authors}
              tags={tags}
              images={images}
              onRefresh={refreshData}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
              isCreatingNew={isCreatingNew}
              setIsCreatingNew={setIsCreatingNew}
            />
          </TabsContent>
          
          <TabsContent value="tags">
            <TagsTab tags={tags} onRefresh={refreshData} />
          </TabsContent>
          
          <TabsContent value="authors">
            <AuthorsTab authors={authors} onRefresh={refreshData} />
          </TabsContent>
          
          <TabsContent value="images">
            <ImagesTab images={images} onRefresh={refreshData} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Fix missing Button import
import { Button } from "@/components/ui/button";

export default Admin;
