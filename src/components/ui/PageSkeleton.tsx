
import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <header className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <div className="hidden md:flex items-center space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero section skeleton */}
      <div className="w-full h-[40vh] relative">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <Skeleton className="h-6 w-28 mb-4" />
              <Skeleton className="h-12 w-4/5 mb-3" />
              <Skeleton className="h-12 w-3/5 mb-8" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Skeleton className="h-10 w-64 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col gap-3">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl shadow-md overflow-hidden">
              <Skeleton className="h-10 w-full" />
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-4">
                    <Skeleton className="h-4 w-1/4 mb-1" />
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-xl shadow-md overflow-hidden">
              <Skeleton className="h-10 w-full" />
              <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-full" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
                <Skeleton className="h-8 w-full mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
