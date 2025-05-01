
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
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConnectionStatusAlert } from "@/components/admin/ConnectionStatusAlert";
import { AdminDataProvider } from "@/context/AdminDataContext";

/**
 * Admin dashboard with content management system tabs
 */
const Admin = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [resetFormKey, setResetFormKey] = useState(0);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Handler for creating a new article
  const handleCreateNew = () => {
    setSelectedArticle(null);
    setIsCreatingNew(true);
    setResetFormKey(prev => prev + 1); // Increment to force a form reset
  };

  return (
    <MainLayout>
      <SEOHead
        title="Admin Dashboard - UpTodateKE"
        description="Admin dashboard for managing UpTodateKE articles, tags, authors, and images."
        noIndex={true} // Don't index admin pages
      />
      
      <AdminDataProvider onCreateNew={handleCreateNew}>
        <div className="container mx-auto px-4 py-8">
          <AdminHeader />
          
          <ConnectionStatusAlert 
            connectionStatus={connectionStatus}
            errorDetails={errorDetails}
            setConnectionStatus={setConnectionStatus}
            setErrorDetails={setErrorDetails}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          
          {isLoading ? (
            <AdminLoading />
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
                  selectedArticle={selectedArticle}
                  setSelectedArticle={setSelectedArticle}
                  isCreatingNew={isCreatingNew}
                  setIsCreatingNew={setIsCreatingNew}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="tags">
                <TagsTab />
              </TabsContent>
              
              <TabsContent value="authors">
                <AuthorsTab />
              </TabsContent>
              
              <TabsContent value="images">
                <ImagesTab />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </AdminDataProvider>
    </MainLayout>
  );
};

const AdminLoading = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4" />
    <p className="text-lg text-muted-foreground">Loading content...</p>
  </div>
);

export default Admin;
