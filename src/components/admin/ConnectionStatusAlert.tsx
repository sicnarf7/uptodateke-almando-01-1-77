
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Database, RefreshCw } from "lucide-react";
import { Button } from '@/components/ui/button';
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { useAdminData } from '@/context/AdminDataContext';
import { toast } from "sonner";

interface ConnectionStatusAlertProps {
  connectionStatus: boolean | null;
  errorDetails: string | null;
  setConnectionStatus: (status: boolean) => void;
  setErrorDetails: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const ConnectionStatusAlert: React.FC<ConnectionStatusAlertProps> = ({
  connectionStatus,
  errorDetails,
  setConnectionStatus,
  setErrorDetails,
  isLoading,
  setIsLoading
}) => {
  const { fetchAllData } = useAdminData();
  
  // Handler for refreshing data
  const handleRefresh = async () => {
    console.log("Admin: Manual refresh requested");
    setIsLoading(true);
    
    try {
      const isConnected = await checkSupabaseConnection();
      setConnectionStatus(isConnected);
      
      if (isConnected) {
        await fetchAllData();
        setErrorDetails(null);
        toast.success("Connection restored and data refreshed");
      } else {
        setErrorDetails("Still unable to connect to the database");
        toast.error("Cannot connect to database. Please check your connection.");
      }
    } catch (error) {
      console.error("Error during refresh:", error);
      setErrorDetails(`Error during refresh: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error("Refresh failed with an error");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (connectionStatus === false) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>
          Cannot connect to the database. Please check your connection settings and try again.
          {errorDetails && (
            <div className="mt-2 p-2 bg-destructive/10 rounded text-sm font-mono overflow-auto max-h-40">
              {errorDetails}
            </div>
          )}
        </AlertDescription>
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          className="mt-4"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} /> Try Again
        </Button>
      </Alert>
    );
  }
  
  if (errorDetails) {
    return (
      <Alert variant="destructive" className="mb-6">
        <Database className="h-4 w-4" />
        <AlertTitle>Database Issue</AlertTitle>
        <AlertDescription>
          {errorDetails}
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
};
