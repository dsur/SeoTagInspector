import { SeoAnalysisResult } from '@shared/schema';

interface GooglePreviewProps {
  analysisResult: SeoAnalysisResult;
}

export default function GooglePreview({ analysisResult }: GooglePreviewProps) {
  const { metaTags, url } = analysisResult;
  
  // Get display URL
  const displayUrl = url.toLowerCase();
  
  // Get title and description with fallbacks
  const title = metaTags.title.content || 'No title available';
  const description = metaTags.description.content || 'No description available';
  
  // Get character counts for analysis
  const titleCharCount = title?.length || 0;
  const descriptionCharCount = description?.length || 0;
  
  // Determine title analysis
  const getTitleAnalysis = () => {
    if (titleCharCount === 0) {
      return {
        className: "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400",
        heading: "Missing title:",
        content: "Your page doesn't have a title tag. Add a descriptive title between 50-60 characters."
      };
    } else if (titleCharCount < 30) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "Title too short:",
        content: `${titleCharCount} characters. Google typically displays the first 50-60 characters. Consider a more descriptive title.`
      };
    } else if (titleCharCount > 60) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "Title too long:",
        content: `${titleCharCount} characters. Google typically displays the first 50-60 characters. Your title may be truncated in search results.`
      };
    } else {
      return {
        className: "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400",
        heading: "Good length:",
        content: `${titleCharCount} characters (Google typically displays the first 50-60 characters)`
      };
    }
  };
  
  // Determine description analysis
  const getDescriptionAnalysis = () => {
    if (descriptionCharCount === 0) {
      return {
        className: "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400",
        heading: "Missing description:",
        content: "Your page doesn't have a meta description. Add a descriptive meta description between 120-155 characters."
      };
    } else if (descriptionCharCount < 80) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "Description too short:",
        content: `${descriptionCharCount} characters. Google typically displays up to 155-160 characters. Consider adding more descriptive content.`
      };
    } else if (descriptionCharCount > 160) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "Description too long:",
        content: `${descriptionCharCount} characters. Google typically displays up to 155-160 characters. Your description may be truncated in search results.`
      };
    } else {
      return {
        className: "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400",
        heading: "Good length:",
        content: `${descriptionCharCount} characters (Google typically displays up to 155-160 characters)`
      };
    }
  };
  
  // Get URL analysis
  const getUrlAnalysis = () => {
    const hasParameters = url.includes('?');
    const hasLongPath = url.split('/').length > 4;
    
    if (hasParameters) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "URL contains parameters:",
        content: "URLs with query parameters are less SEO-friendly. Consider using clean, readable URLs without parameters."
      };
    } else if (hasLongPath) {
      return {
        className: "bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400",
        heading: "Deep URL structure:",
        content: "Deeply nested URLs may be less effective for SEO. Consider a flatter URL structure."
      };
    } else {
      return {
        className: "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400",
        heading: "Good URL structure:",
        content: "Clean and readable URL without unnecessary parameters"
      };
    }
  };
  
  const titleAnalysis = getTitleAnalysis();
  const descriptionAnalysis = getDescriptionAnalysis();
  const urlAnalysis = getUrlAnalysis();
  
  return (
    <>
      <h3 className="text-xl font-semibold mb-6">Google Search Preview</h3>
      <div className="max-w-2xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-900 shadow-sm">
        <div className="mb-1 text-xl text-blue-700 dark:text-blue-500 font-medium hover:underline cursor-pointer">
          {title}
        </div>
        <div className="text-sm text-green-700 dark:text-green-500 mb-1">
          {displayUrl}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-medium mb-1">Title Analysis</h4>
          <div className={`text-sm ${titleAnalysis.className} p-3`}>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{titleAnalysis.heading}</span> 
            <span className="text-gray-700 dark:text-gray-300"> {titleAnalysis.content}</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Description Analysis</h4>
          <div className={`text-sm ${descriptionAnalysis.className} p-3`}>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{descriptionAnalysis.heading}</span> 
            <span className="text-gray-700 dark:text-gray-300"> {descriptionAnalysis.content}</span>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">URL Analysis</h4>
          <div className={`text-sm ${urlAnalysis.className} p-3`}>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{urlAnalysis.heading}</span> 
            <span className="text-gray-700 dark:text-gray-300"> {urlAnalysis.content}</span>
          </div>
        </div>
      </div>
    </>
  );
}
