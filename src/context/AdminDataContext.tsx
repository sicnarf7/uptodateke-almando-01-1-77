
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Article, ArticleAuthor, ArticleTag, ArticleImage } from "@/types/article";
import { articleService } from "@/services/articleService";
import { toast } from "sonner";
import { checkSupabaseConnection } from "@/integrations/supabase/client";

interface AdminDataContextType {
  contentData: {
    articles: Article[];
    tags: ArticleTag[];
    authors: ArticleAuthor[];
    images: ArticleImage[];
  };
  isLoading: boolean;
  fetchAllData: () => Promise<void>;
  handleRefresh: () => Promise<void>;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};

interface AdminDataProviderProps {
  children: ReactNode;
  onCreateNew?: () => void;
}

export const AdminDataProvider: React.FC<AdminDataProviderProps> = ({ children, onCreateNew }) => {
  const [contentData, setContentData] = useState<{
    articles: Article[];
    tags: ArticleTag[];
    authors: ArticleAuthor[];
    images: ArticleImage[];
  }>({
    articles: [],
    tags: [],
    authors: [],
    images: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // Check Supabase connection on load
  useEffect(() => {
    const checkConnection = async () => {
      try {
        console.log("Admin: Checking Supabase connection...");
        const isConnected = await checkSupabaseConnection();
        console.log("Admin: Connection status:", isConnected);
        setConnectionStatus(isConnected);
        if (!isConnected) {
          setErrorDetails("Failed to connect to the database. Please check your connection or credentials.");
          toast.error("Failed to connect to database. Some features may be unavailable.");
        }
      } catch (error) {
        console.error("Admin: Error checking connection:", error);
        setConnectionStatus(false);
        setErrorDetails(`Error checking connection: ${error instanceof Error ? error.message : 'Unknown error'}`);
        toast.error("Connection check failed with an error");
      }
    };
    checkConnection();
  }, []);

  // Fetch all content data on initial load
  useEffect(() => {
    if (connectionStatus !== null) {
      fetchAllData();
    }
  }, [connectionStatus]);

  // Function to refresh all data
  const fetchAllData = async () => {
    if (connectionStatus === false) {
      console.log("Admin: Not fetching data due to connection issues");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      console.log("Admin: Fetching all data...");
      
      // Fetch articles with debug logging
      console.log("Admin: Fetching articles...");
      const articlesData = await articleService.getAllArticles();
      console.log("Admin: Articles fetched:", articlesData);
      
      // Fetch tags with debug logging
      console.log("Admin: Fetching tags...");
      const tagsData = await articleService.getAllTags();
      console.log("Admin: Tags fetched:", tagsData);
      
      // Fetch authors with debug logging
      console.log("Admin: Fetching authors...");
      const authorsData = await articleService.getAllAuthors();
      console.log("Admin: Authors fetched:", authorsData);
      
      // Fetch images with debug logging
      console.log("Admin: Fetching images...");
      const imagesData = await articleService.getAllImages();
      console.log("Admin: Images fetched:", imagesData);

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
        console.log("Admin: No data found in any table");
      }

      setErrorDetails(null);
    } catch (error) {
      console.error("Admin: Error fetching content data:", error);
      setErrorDetails(`Error fetching data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error("Error loading content. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for refreshing data
  const handleRefresh = async () => {
    console.log("Admin: Manual refresh requested");
    const isConnected = await checkSupabaseConnection();
    setConnectionStatus(isConnected);
    
    if (isConnected) {
      await fetchAllData();
      // Reset article selection after successful operations
      if (onCreateNew) {
        onCreateNew();
      }
      toast.success("Data refreshed successfully");
    } else {
      toast.error("Cannot connect to database. Please check your connection.");
    }
  };

  const value = {
    contentData,
    isLoading,
    fetchAllData,
    handleRefresh,
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};
