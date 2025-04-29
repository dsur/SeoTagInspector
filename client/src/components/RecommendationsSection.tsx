import { SeoAnalysisResult } from '@shared/schema';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface RecommendationsSectionProps {
  recommendations: SeoAnalysisResult['recommendations'];
}

export default function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  if (recommendations.length === 0) {
    return null;
  }
  
  // Helper to render the appropriate icon for each recommendation type
  const renderIcon = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Helper to get the appropriate styling for each recommendation type
  const getRecommendationStyle = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return "border-l-4 border-green-400 bg-green-50 dark:bg-green-900/20";
      case 'warning':
        return "border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
      case 'error':
        return "border-l-4 border-red-400 bg-red-50 dark:bg-red-900/20";
      case 'info':
        return "border-l-4 border-blue-400 bg-blue-50 dark:bg-blue-900/20";
      default:
        return "";
    }
  };
  
  // Helper to get the appropriate text color for each recommendation type
  const getTitleColor = (type: 'success' | 'warning' | 'error' | 'info') => {
    switch (type) {
      case 'success':
        return "text-green-800 dark:text-green-400";
      case 'warning':
        return "text-yellow-800 dark:text-yellow-400";
      case 'error':
        return "text-red-800 dark:text-red-400";
      case 'info':
        return "text-blue-800 dark:text-blue-400";
      default:
        return "";
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">SEO Recommendations</h3>
      
      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div 
            key={index} 
            className={`p-4 ${getRecommendationStyle(recommendation.type)}`}
          >
            <div className="flex items-start">
              <div className="mr-2 mt-0.5">
                {renderIcon(recommendation.type)}
              </div>
              <div>
                <h4 className={`font-medium ${getTitleColor(recommendation.type)}`}>
                  {recommendation.title}
                </h4>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {recommendation.description}
                </p>
                {recommendation.items && recommendation.items.length > 0 && (
                  <ul className="mt-2 ml-5 list-disc text-sm text-gray-700 dark:text-gray-300">
                    {recommendation.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
