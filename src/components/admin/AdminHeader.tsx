
import React from 'react';
import { useAdminData } from '@/context/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Bug, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const AdminHeader = () => {
  const { contentData, handleRefresh } = useAdminData();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Content Management System</h1>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            console.log("Content data:", contentData);
            toast.info("Check browser console for debug info");
          }}
          variant="outline"
          size="sm"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
        <Button 
          onClick={handleRefresh}
          variant="outline"
          size="sm"
        >
          <RefreshCw className="h-4 w-4 mr-2" /> 
          Refresh Data
        </Button>
      </div>
    </div>
  );
};
