import { SeoAnalysisResult } from '@shared/schema';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface TwitterPreviewProps {
  analysisResult: SeoAnalysisResult;
}

export default function TwitterPreview({ analysisResult }: TwitterPreviewProps) {
  const { metaTags, url } = analysisResult;
  
  // Get Twitter tags with fallbacks
  const title = metaTags.twitter.title.content || metaTags.openGraph.title.content || metaTags.title.content || 'No title available';
  const description = metaTags.twitter.description.content || metaTags.openGraph.description.content || metaTags.description.content || 'No description available';
  const image = metaTags.twitter.image.content || metaTags.openGraph.image.content || '';
  const site = new URL(url).hostname;
  
  // Default placeholder image if no twitter:image is available
  const placeholderImage = "https://via.placeholder.com/1200x600/EEEEEE/999999?text=No+Image+Available";
  
  // Check twitter card type
  const cardType = metaTags.twitter.card.content || 'summary';
  const isLargeCard = cardType === 'summary_large_image';
  
  // Determine if each Twitter tag exists or has fallback
  const hasTwitterCard = metaTags.twitter.card.status !== 'missing';
  const hasTwitterTitle = metaTags.twitter.title.status !== 'missing';
  const hasTwitterDescription = metaTags.twitter.description.status !== 'missing';
  const hasTwitterImage = metaTags.twitter.image.status !== 'missing';
  const hasTwitterSite = metaTags.twitter.site.status !== 'missing';
  
  // Check if using OG fallbacks
  const usingOgTitleFallback = metaTags.twitter.title.status === 'missing' && metaTags.openGraph.title.status !== 'missing';
  const usingOgDescFallback = metaTags.twitter.description.status === 'missing' && metaTags.openGraph.description.status !== 'missing';
  const usingOgImageFallback = metaTags.twitter.image.status === 'missing' && metaTags.openGraph.image.status !== 'missing';
  
  return (
    <>
      <h3 className="text-xl font-semibold mb-6">Twitter Card Preview</h3>
      <div className="max-w-md mx-auto border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-800">
        <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt="Twitter Card image" 
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
          <div className="font-bold text-gray-900 dark:text-white mb-1">{title}</div>
          <div className="text-gray-700 dark:text-gray-300 text-sm mb-2">{description}</div>
          <div className="text-gray-500 dark:text-gray-400 text-xs">{site}</div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div>
          <h4 className="font-medium mb-1">Twitter Card Analysis</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              {hasTwitterCard ? (
                cardType === 'summary' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {!hasTwitterCard 
                  ? "twitter:card is missing (defaults to 'summary')" 
                  : cardType === 'summary'
                    ? "twitter:card is set to 'summary' (consider using 'summary_large_image')"
                    : `twitter:card is set to '${cardType}'`}
              </span>
            </li>
            <li className="flex items-center">
              {hasTwitterTitle ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : usingOgTitleFallback ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasTwitterTitle 
                  ? "twitter:title is properly set"
                  : usingOgTitleFallback
                    ? "twitter:title is missing (using og:title as fallback)"
                    : "twitter:title is missing (using page title as fallback)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasTwitterDescription ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : usingOgDescFallback ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasTwitterDescription 
                  ? "twitter:description is properly set"
                  : usingOgDescFallback
                    ? "twitter:description is missing (using og:description as fallback)"
                    : "twitter:description is missing (using meta description as fallback)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasTwitterImage ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : usingOgImageFallback ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="ml-2 text-sm">
                {hasTwitterImage 
                  ? "twitter:image is properly set"
                  : usingOgImageFallback
                    ? "twitter:image is missing (using og:image as fallback)"
                    : "twitter:image is missing (no image will be displayed when shared)"}
              </span>
            </li>
            <li className="flex items-center">
              {hasTwitterSite ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              )}
              <span className="ml-2 text-sm">
                {hasTwitterSite 
                  ? `twitter:site is set to "${metaTags.twitter.site.content}"`
                  : "twitter:site is missing (add your Twitter handle for attribution)"}
              </span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Recommendations</h4>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-3 text-gray-700 dark:text-gray-300">
            <p>For better Twitter sharing:</p>
            <ul className="list-disc ml-5 mt-1">
              {!hasTwitterImage && (
                <li>Add dedicated <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">twitter:image</code> tag</li>
              )}
              {cardType === 'summary' && (
                <li>Change <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">twitter:card</code> to <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">summary_large_image</code></li>
              )}
              {!hasTwitterSite && (
                <li>Add <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">twitter:site</code> with your Twitter handle</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
