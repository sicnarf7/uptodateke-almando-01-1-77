
const LoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-800 rounded-md mb-4 animate-pulse"></div>
      <div className="w-full h-72 bg-gray-200 dark:bg-gray-800 rounded-md mb-6 animate-pulse"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full h-6 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

export default LoadingSkeleton;
