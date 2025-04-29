import { useState, useEffect } from "react";
import URLForm from "./URLForm";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import WebsiteInfo from "./WebsiteInfo";
import MetaTagsAnalysis from "./MetaTagsAnalysis";
import PreviewTabs from "./PreviewTabs";
import RecommendationsSection from "./RecommendationsSection";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SeoAnalysisResult } from "@shared/schema";

export default function SEOAnalyzer() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);
  
  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const response = await apiRequest('POST', '/api/analyze', { url });
      const data = await response.json();
      return data as SeoAnalysisResult;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      // Scroll to results after analysis completes on mobile
      setTimeout(() => {
        if (window.innerWidth < 768) {
          window.scrollTo({
            top: document.querySelector('.result-container')?.getBoundingClientRect().top || 0 + window.scrollY - 20,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  });
  
  const handleAnalyze = (url: string) => {
    analyzeMutation.mutate(url);
  };
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      // This is just to trigger a re-render on resize
      // The actual responsive changes are handled by Tailwind classes
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <>
      <URLForm onSubmit={handleAnalyze} />
      
      {analyzeMutation.isPending && <LoadingState />}
      
      {analyzeMutation.isError && (
        <ErrorState 
          message={
            analyzeMutation.error instanceof Error 
              ? analyzeMutation.error.message 
              : "An unexpected error occurred while analyzing the website."
          }
        />
      )}
      
      {analysisResult && !analyzeMutation.isPending && (
        <div className="result-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left column: Meta Tag Analysis */}
          <div className="md:col-span-1 lg:col-span-1 order-2 md:order-1">
            <WebsiteInfo websiteInfo={analysisResult} />
            <MetaTagsAnalysis metaTags={analysisResult.metaTags} />
          </div>
          
          {/* Right column: Previews */}
          <div className="md:col-span-1 lg:col-span-2 order-1 md:order-2">
            <PreviewTabs analysisResult={analysisResult} />
            <RecommendationsSection recommendations={analysisResult.recommendations} />
          </div>
        </div>
      )}
    </>
  );
}
