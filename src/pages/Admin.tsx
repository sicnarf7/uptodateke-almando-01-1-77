
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
import { SEOHead } from "@/components/layout/SEOHead";
import { toast } from "sonner";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [resetFormKey, setResetFormKey] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);

  // Check Supabase connection on load
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected);
      if (!isConnected) {
        toast.error("Failed to connect to database. Some features may be unavailable.");
      }
    };
    checkConnection();
  }, []);

  // Fetch all content data on initial load
  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to refresh all data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching all data...");
      
      // Add small delays between calls to prevent race conditions
      const articlesData = await articleService.getAllArticles();
      console.log("Articles fetched:", articlesData);
      
      const tagsData = await articleService.getAllTags();
      console.log("Tags fetched:", tagsData);
      
      const authorsData = await articleService.getAllAuthors();
      console.log("Authors fetched:", authorsData);
      
      const imagesData = await articleService.getAllImages();
      console.log("Images fetched:", imagesData);

      setContentData({
        articles: articlesData || [],
        tags: tagsData || [],
        authors: authorsData || [],
        images: imagesData || []
      });
      
      // Check if we received any data
      const hasData = (
        articlesData?.length > 0 || 
        tagsData?.length > 0 || 
        authorsData?.length > 0 || 
        imagesData?.length > 0
      );
      
      if (!hasData) {
        console.log("No data found in any table");
      }
    } catch (error) {
      console.error("Error fetching content data:", error);
      toast.error("Error loading content. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for refreshing data
  const handleRefresh = async () => {
    const isConnected = await checkSupabaseConnection();
    setConnectionStatus(isConnected);
    
    if (isConnected) {
      await fetchAllData();
      // Reset article selection after successful operations
      setSelectedArticle(null);
      setIsCreatingNew(true);
      setResetFormKey(prev => prev + 1); // Increment to force a form reset
      toast.success("Data refreshed successfully");
    } else {
      toast.error("Cannot connect to database. Please check your connection.");
    }
  };

  // Handle creating a new article
  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsCreatingNew(true);
    setResetFormKey(prev => prev + 1); // Increment to force a form reset
  };
  
  if (connectionStatus === false) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Content Management System</h1>
          
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Cannot connect to the database. Please check your connection settings and try again.
            </AlertDescription>
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              className="mt-4"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEOHead
        title="Admin Dashboard - UpTodateKE"
        description="Admin dashboard for managing UpTodateKE articles, tags, authors, and images."
        noIndex={true} // Don't index admin pages
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <Button 
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> 
            Refresh Data
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Loading content...</p>
          </div>
        ) : (
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
        )}
      </div>
    </MainLayout>
  );
};

export default Admin;
