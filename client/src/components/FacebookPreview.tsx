import { SeoAnalysisResult } from '@shared/schema';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FacebookPreviewProps {
  analysisResult: SeoAnalysisResult;
}

export default function FacebookPreview({ analysisResult }: FacebookPreviewProps) {
  const { metaTags, url } = analysisResult;
  
  // Get OG tags with fallbacks
  const title = metaTags.openGraph.title.content || metaTags.title.content || 'No title available';
  const description = metaTags.openGraph.description.content || metaTags.description.content || 'No description available';
  const image = metaTags.openGraph.image.content || '';
  const siteName = metaTags.openGraph.siteName.content || new URL(url).hostname;
  
  // Default placeholder image if no og:image is available
  const placeholderImage = "https://via.placeholder.com/1200x630/EEEEEE/999999?text=No+Image+Available";
  
  // Determine if each OG tag exists
  const hasOgTitle = metaTags.openGraph.title.status !== 'missing';
  const hasOgDescription = metaTags.openGraph.description.status !== 'missing';
  const hasOgImage = metaTags.openGraph.image.status !== 'missing';
  const hasOgUrl = metaTags.openGraph.url.status !== 'missing';
  const hasOgType = metaTags.openGraph.type.status !== 'missing';
  const hasOgSiteName = metaTags.openGraph.siteName.status !== 'missing';
  
  return (
    <>
      <h3 className="text-xl font-semibold mb-6">Facebook Preview</h3>
      <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="Open Graph image" 
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
          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">{siteName}</div>
          <div className="font-bold text-gray-900 dark:text-white mb-2">{title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-sm">{description}</div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-medium mb-1">Open Graph Analysis</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              {hasOgTitle ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgTitle 
                  ? "og:title is properly set" 
                  : "og:title is missing (using page title as fallback)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgDescription ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgDescription 
                  ? "og:description is properly set" 
                  : "og:description is missing (using meta description as fallback)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasOgImage ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasOgImage 
                  ? "og:image is properly set (1200×630px recommended)" 
                  : "og:image is missing (no image will be displayed when shared)"}
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
                  : "og:url is missing (recommended for canonical references)"}
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
                  : "og:type is missing (recommended to set it to 'website' or appropriate type)"}
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
                  : "og:site_name is missing (helps with brand recognition)"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
