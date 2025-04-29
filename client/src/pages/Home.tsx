import SEOAnalyzer from "@/components/SEOAnalyzer";
import Footer from "@/components/Footer";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { theme, setTheme } = useThemeToggle();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">SEO Tag Analyzer</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 self-end sm:self-auto"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Analyze and visualize SEO meta tags for any website
          </p>
        </header>
        
        {/* Main Content */}
        <SEOAnalyzer />
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
