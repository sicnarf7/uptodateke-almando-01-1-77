
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { articleService } from "@/services/articleService";
import { Button } from "@/components/ui/button";
import { ArticlesTab } from "@/components/admin/tabs/ArticlesTab";
import { AuthorsTab } from "@/components/admin/tabs/AuthorsTab";
import { TagsTab } from "@/components/admin/tabs/TagsTab";
import { ImagesTab } from "@/components/admin/tabs/ImagesTab";
import { Helmet } from "react-helmet";

/**
 * Admin dashboard with content management system tabs
 */
const Admin = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [contentData, setContentData] = useState({
    articles: [] as Article[],
    tags: [] as ArticleTag[],
    authors: [] as ArticleAuthor[],
    images: [] as ArticleImage[]
  });
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resetFormKey, setResetFormKey] = useState(0); // Add a key to force re-render of form

  // Fetch all content data on initial load
  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to refresh all data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [articlesData, tagsData, authorsData, imagesData] = await Promise.all([
        articleService.getAllArticles(),
        articleService.getAllTags(),
        articleService.getAllAuthors(),
        articleService.getAllImages(),
      ]);

      setContentData({
        articles: articlesData,
        tags: tagsData,
        authors: authorsData,
        images: imagesData
      });
    } catch (error) {
      console.error("Error fetching content data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for refreshing data
  const handleRefresh = async () => {
    await fetchAllData();
    // Reset article selection after successful operations
    setSelectedArticle(null);
    setIsCreatingNew(true);
    setResetFormKey(prev => prev + 1); // Increment to force a form reset
  };

  // Handle creating a new article
  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsCreatingNew(true);
    setResetFormKey(prev => prev + 1); // Increment to force a form reset
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Admin Dashboard - UpTodateKE</title>
        <meta name="description" content="Admin dashboard for managing UpTodateKE articles, tags, authors, and images." />
        <meta name="robots" content="noindex, nofollow" /> {/* Don't index admin pages */}
      </Helmet>
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
                  onClick={handleCreateNew}
                  variant="default"
                  size="sm"
                >
                  Create New Article
                </Button>
              )}
            </div>
            
            <ArticlesTab 
              key={resetFormKey}
              articles={contentData.articles}
              authors={contentData.authors}
              tags={contentData.tags}
              images={contentData.images}
              onRefresh={handleRefresh}
              selectedArticle={selectedArticle}
              setSelectedArticle={setSelectedArticle}
              isCreatingNew={isCreatingNew}
              setIsCreatingNew={setIsCreatingNew}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="tags">
            <TagsTab tags={contentData.tags} onRefresh={handleRefresh} />
          </TabsContent>
          
          <TabsContent value="authors">
            <AuthorsTab authors={contentData.authors} onRefresh={handleRefresh} />
          </TabsContent>
          
          <TabsContent value="images">
            <ImagesTab images={contentData.images} onRefresh={handleRefresh} />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
