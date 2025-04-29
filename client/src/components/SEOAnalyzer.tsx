import { useState } from "react";
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
    }
  });
  
  const handleAnalyze = (url: string) => {
    analyzeMutation.mutate(url);
  };
  
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Meta Tag Analysis */}
          <div className="lg:col-span-1">
            <WebsiteInfo websiteInfo={analysisResult} />
            <MetaTagsAnalysis metaTags={analysisResult.metaTags} />
          </div>
          
          {/* Right column: Previews */}
          <div className="lg:col-span-2">
            <PreviewTabs analysisResult={analysisResult} />
            <RecommendationsSection recommendations={analysisResult.recommendations} />
          </div>
        </div>
      )}
    </>
  );
}
