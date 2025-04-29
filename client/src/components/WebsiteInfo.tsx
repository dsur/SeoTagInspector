import { ExternalLink } from 'lucide-react';
import { SeoAnalysisResult } from '@shared/schema';

interface WebsiteInfoProps {
  websiteInfo: SeoAnalysisResult;
}

export default function WebsiteInfo({ websiteInfo }: WebsiteInfoProps) {
  const { url, favicon, lastAnalyzed, pageSize, statusCode, statusText, healthStatus } = websiteInfo;

  // Format date for display
  const formattedDate = new Date(lastAnalyzed).toLocaleString();
  
  // Get user-friendly health status indicator
  const getHealthIndicator = () => {
    switch (healthStatus) {
      case 'good':
        return (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full">
            Good
          </div>
        );
      case 'warning':
        return (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full">
            Needs Improvement
          </div>
        );
      case 'bad':
        return (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1 rounded-full">
            Poor
          </div>
        );
      default:
        return null;
    }
  };

  // Get status code color
  const getStatusColor = () => {
    if (statusCode >= 200 && statusCode < 300) {
      return "text-green-600 dark:text-green-400";
    } else if (statusCode >= 300 && statusCode < 400) {
      return "text-yellow-600 dark:text-yellow-400";
    } else {
      return "text-red-600 dark:text-red-400";
    }
  };

  // Format display URL
  const displayUrl = url.replace(/^https?:\/\//, '');
  
  // Truncate URL if it's too long
  const truncatedUrl = displayUrl.length > 30 ? 
    displayUrl.substring(0, 30) + '...' : 
    displayUrl;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center justify-between gap-2 mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Website Information</h2>
        {getHealthIndicator()}
      </div>
      
      <div className="flex items-center mb-4 overflow-hidden">
        {favicon && (
          <img 
            src={favicon} 
            alt="Website favicon" 
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center text-sm sm:text-base truncate"
          title={url}
        >
          <span className="truncate">{displayUrl}</span>
          <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 flex-shrink-0" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Last analyzed</div>
          <div className="text-sm sm:text-base">{formattedDate}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Page size</div>
          <div className="text-sm sm:text-base">{pageSize}</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Status code</div>
          <div className={`text-sm sm:text-base ${getStatusColor()}`}>
            {statusCode} {statusText}
          </div>
        </div>
      </div>
    </div>
  );
}
