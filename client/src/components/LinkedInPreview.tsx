import { SeoAnalysisResult } from '@shared/schema';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface LinkedInPreviewProps {
  analysisResult: SeoAnalysisResult;
}

export default function LinkedInPreview({ analysisResult }: LinkedInPreviewProps) {
  const { metaTags, url, favicon } = analysisResult;
  
  // Get OG tags with fallbacks (LinkedIn uses Open Graph tags)
  const title = metaTags.openGraph.title.content || metaTags.title.content || 'No title available';
  const description = metaTags.openGraph.description.content || metaTags.description.content || 'No description available';
  const image = metaTags.openGraph.image.content || '';
  const siteName = metaTags.openGraph.siteName.content || new URL(url).hostname;
  
  // Default placeholder image if no og:image is available
  const placeholderImage = "https://via.placeholder.com/1200x630/EEEEEE/999999?text=No+Image+Available";
  
  // Determine if each relevant OG tag exists
  const hasOgTitle = metaTags.openGraph.title.status !== 'missing';
  const hasOgDescription = metaTags.openGraph.description.status !== 'missing';
  const hasOgImage = metaTags.openGraph.image.status !== 'missing';
  const hasOgType = metaTags.openGraph.type.status !== 'missing';
  const hasOgSiteName = metaTags.openGraph.siteName.status !== 'missing';
  const hasOgUrl = metaTags.openGraph.url.status !== 'missing';
  
  return (
    <>
      <h3 className="text-xl font-semibold mb-6">LinkedIn Preview</h3>
      <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-700 rounded overflow-hidden bg-white dark:bg-gray-800">
        <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="LinkedIn share image" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = placeholderImage;
              }}
            />
          ) : (
            <img 
              src={placeholderImage} 
              alt="Placeholder image" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-3">
          <div className="font-bold text-gray-900 dark:text-white text-base mb-1">{title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">{description}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs flex items-center">
            {favicon && (
              <img 
                src={favicon} 
                alt="Website favicon" 
                className="w-4 h-4 mr-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            {siteName}
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-medium mb-1">LinkedIn Sharing Analysis</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            LinkedIn uses Open Graph tags for link sharing previews.
          </p>
          
          <ul className="space-y-2">
            <li className="flex items-center">
              {hasOgTitle ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgTitle ? "og:title is properly set" : "og:title is missing"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgDescription ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgDescription ? "og:description is properly set" : "og:description is missing"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgImage ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgImage ? "og:image is properly set" : "og:image is missing"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgType ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgType 
                  ? `og:type is set to "${metaTags.openGraph.type.content}"`
                  : "og:type is missing (recommended for content categorization)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgUrl ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgUrl 
                  ? "og:url is properly set" 
                  : "og:url is missing (helps with tracking and canonical references)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgSiteName ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgSiteName 
                  ? "og:site_name is properly set" 
                  : "og:site_name is missing (adds brand context)"}
              </span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Recommendations</h4>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 text-gray-700 dark:text-gray-300">
            <p>For better LinkedIn sharing:</p>
            <ul className="list-disc ml-5 mt-1">
              {!hasOgType && (
                <li>Add <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">og:type</code> tag (set to "website" or appropriate type)</li>
              )}
              {!hasOgUrl && (
                <li>Add <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">og:url</code> for proper canonical references</li>
              )}
              {!hasOgSiteName && (
                <li>Add <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">og:site_name</code> for brand recognition</li>
              )}
              {!hasOgImage && (
                <li>Add <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">og:image</code> with an image of at least 1200×630 pixels</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
