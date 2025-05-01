
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mounted, setMounted] = useState(false);

  // After mounting, we can render content that depends on JS
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default MainLayout;
