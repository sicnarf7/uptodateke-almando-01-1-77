
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, BellRing, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import MegaMenu from "./MegaMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [currentMegaMenu, setCurrentMegaMenu] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMegaMenuToggle = (menuName: string) => {
    if (currentMegaMenu === menuName) {
      setMegaMenuOpen(false);
      setCurrentMegaMenu(null);
    } else {
      setMegaMenuOpen(true);
      setCurrentMegaMenu(menuName);
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="h-10 w-auto sm:h-10 flex items-center">
                <span className="font-bold text-2xl md:text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-kenya-red to-kenya-purple animate-pulse-kenya">
                  UpTodateKE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div 
                className="nav-link cursor-pointer"
                onClick={() => handleMegaMenuToggle('news')}
              >
                News
              </div>
              <div 
                className="nav-link cursor-pointer"
                onClick={() => handleMegaMenuToggle('entertainment')}
              >
                Entertainment
              </div>
              <Link to="/trending" className="nav-link">
                Trending
              </Link>
              <Link to="/videos" className="nav-link">
                Videos
              </Link>
            </nav>

            {/* Search and Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="h-10 w-64 pl-10 pr-4 rounded-full bg-muted dark:bg-muted border-none focus:ring-2 focus:ring-kenya-red focus:outline-none transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
              
              <button 
                onClick={toggleDarkMode}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="h-6 w-6 text-kenya-gold" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
              
              <Button className="rounded-full bg-kenya-red hover:bg-kenya-red/90 text-white">
                Subscribe
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mega Menu */}
        <div className={`mega-menu ${megaMenuOpen ? 'active' : ''}`}>
          <MegaMenu type={currentMegaMenu} onClose={() => setMegaMenuOpen(false)} />
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      >
        <div 
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-black shadow-xl transform transition-transform ease-in-out duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="font-bold text-2xl tracking-tight" onClick={toggleMobileMenu}>
                UpTodateKE
              </Link>
              <button onClick={toggleMobileMenu} className="rounded-full p-1 hover:bg-muted">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-full pl-10 pr-4 rounded-full bg-muted dark:bg-muted focus:ring-2 focus:ring-kenya-red focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>

            <nav className="flex-1 space-y-6">
              <Link to="/news" className="block text-lg font-medium" onClick={toggleMobileMenu}>
                News
              </Link>
              <Link to="/entertainment" className="block text-lg font-medium" onClick={toggleMobileMenu}>
                Entertainment
              </Link>
              <Link to="/trending" className="block text-lg font-medium" onClick={toggleMobileMenu}>
                Trending
              </Link>
              <Link to="/videos" className="block text-lg font-medium" onClick={toggleMobileMenu}>
                Videos
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <button 
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition-colors"
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-5 w-5 text-kenya-gold" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
                <Button size="sm" className="rounded-full bg-kenya-red hover:bg-kenya-red/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Space for fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
