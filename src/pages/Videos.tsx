
import MainLayout from "@/components/layout/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";

const Videos = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Videos</h1>
        
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-xl font-medium mb-2">Video Content Coming Soon</h3>
          <p className="text-muted-foreground">This feature will be available in a future update.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Videos;
