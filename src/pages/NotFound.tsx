
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="relative">
          <div className="text-[150px] font-bold text-kenya-red leading-none opacity-10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
            <p className="text-xl text-muted-foreground max-w-md mb-8">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-kenya-red hover:bg-kenya-red/90 text-white">
                <Link to="/">Go back home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
