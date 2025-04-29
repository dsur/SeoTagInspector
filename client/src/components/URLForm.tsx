import { useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface URLFormProps {
  onSubmit: (url: string) => void;
}

export default function URLForm({ onSubmit }: URLFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  const validateUrl = (url: string): boolean => {
    // Basic URL validation
    let urlToCheck = url.trim();
    
    // Add protocol if missing
    if (!/^https?:\/\//i.test(urlToCheck)) {
      urlToCheck = `https://${urlToCheck}`;
    }
    
    try {
      new URL(urlToCheck);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }
    
    if (!validateUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }
    
    // Add protocol if missing
    let submittedUrl = url.trim();
    if (!/^https?:\/\//i.test(submittedUrl)) {
      submittedUrl = `https://${submittedUrl}`;
    }
    
    onSubmit(submittedUrl);
  };
  
  return (
    <div className="mb-6 sm:mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="https://example.com"
            className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {error && (
            <div className="absolute text-xs sm:text-sm text-red-500 mt-1">{error}</div>
          )}
        </div>
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          Analyze
        </Button>
      </form>
    </div>
  );
}
