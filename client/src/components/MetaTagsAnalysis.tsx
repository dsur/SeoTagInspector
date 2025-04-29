import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Tag } from '@shared/schema';

interface MetaTagsAnalysisProps {
  metaTags: {
    title: Tag;
    description: Tag;
    canonical: Tag;
    robots: Tag;
    viewport: Tag;
    charset: Tag;
    language: Tag;
    openGraph: {
      title: Tag;
      description: Tag;
      url: Tag;
      type: Tag;
      image: Tag;
      siteName: Tag;
    };
    twitter: {
      card: Tag;
      title: Tag;
      description: Tag;
      image: Tag;
      site: Tag;
    };
  };
}

export default function MetaTagsAnalysis({ metaTags }: MetaTagsAnalysisProps) {
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [isTechnicalOpen, setIsTechnicalOpen] = useState(false);
  
  // Helper to render status badge
  const renderStatusBadge = (status: 'good' | 'improve' | 'missing') => {
    switch (status) {
      case 'good':
        return (
          <div className="px-2 py-1 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
            Good
          </div>
        );
      case 'improve':
        return (
          <div className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
            Improve
          </div>
        );
      case 'missing':
        return (
          <div className="px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
            Missing
          </div>
        );
      default:
        return null;
    }
  };
  
  // Helper to render a tag
  const renderTag = (tag: Tag, tagName: string, html?: string) => {
    return (
      <div className="border-b border-gray-200 dark:border-gray-700 py-3">
        <div className="flex justify-between items-start mb-1">
          <div className="font-medium">{tagName}</div>
          {renderStatusBadge(tag.status)}
        </div>
        {tag.content && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm font-mono overflow-hidden text-ellipsis block">
              {html || tag.content}
            </code>
          </div>
        )}
        {tag.status === 'missing' && (
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            No {tagName} found
          </div>
        )}
        {tag.recommendation && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {tag.recommendation}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Meta Tags Analysis</h2>
      
      {/* Essential Meta Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">Essential Tags</h3>
        
        {renderTag(metaTags.title, 'Title', `<title>${metaTags.title.content}</title>`)}
        {renderTag(metaTags.description, 'Meta Description', `<meta name="description" content="${metaTags.description.content}">`)}
        {renderTag(metaTags.canonical, 'Canonical URL', `<link rel="canonical" href="${metaTags.canonical.content}">`)}
        {renderTag(metaTags.robots, 'Robots', `<meta name="robots" content="${metaTags.robots.content}">`)}
      </div>
      
      {/* Social Media Tags Accordion */}
      <div className="mb-6">
        <button 
          className="flex justify-between items-center w-full text-left text-lg font-medium mb-3 text-gray-800 dark:text-gray-200 focus:outline-none" 
          onClick={() => setIsSocialOpen(!isSocialOpen)}
        >
          <span>Social Media Tags</span>
          <ChevronDown 
            className={`h-5 w-5 transform transition-transform duration-200 ${isSocialOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isSocialOpen ? 'max-h-[2000px]' : 'max-h-0'
          }`}
        >
          {/* OpenGraph Tags */}
          {renderTag(metaTags.openGraph.title, 'og:title', `<meta property="og:title" content="${metaTags.openGraph.title.content}">`)}
          {renderTag(metaTags.openGraph.description, 'og:description', `<meta property="og:description" content="${metaTags.openGraph.description.content}">`)}
          {renderTag(metaTags.openGraph.image, 'og:image', `<meta property="og:image" content="${metaTags.openGraph.image.content}">`)}
          {renderTag(metaTags.openGraph.url, 'og:url', `<meta property="og:url" content="${metaTags.openGraph.url.content}">`)}
          {renderTag(metaTags.openGraph.type, 'og:type', `<meta property="og:type" content="${metaTags.openGraph.type.content}">`)}
          {renderTag(metaTags.openGraph.siteName, 'og:site_name', `<meta property="og:site_name" content="${metaTags.openGraph.siteName.content}">`)}
          
          {/* Twitter Card Tags */}
          {renderTag(metaTags.twitter.card, 'twitter:card', `<meta name="twitter:card" content="${metaTags.twitter.card.content}">`)}
          {renderTag(metaTags.twitter.title, 'twitter:title', `<meta name="twitter:title" content="${metaTags.twitter.title.content}">`)}
          {renderTag(metaTags.twitter.description, 'twitter:description', `<meta name="twitter:description" content="${metaTags.twitter.description.content}">`)}
          {renderTag(metaTags.twitter.image, 'twitter:image', `<meta name="twitter:image" content="${metaTags.twitter.image.content}">`)}
          {renderTag(metaTags.twitter.site, 'twitter:site', `<meta name="twitter:site" content="${metaTags.twitter.site.content}">`)}
        </div>
      </div>
      
      {/* Technical Tags Accordion */}
      <div>
        <button 
          className="flex justify-between items-center w-full text-left text-lg font-medium mb-3 text-gray-800 dark:text-gray-200 focus:outline-none" 
          onClick={() => setIsTechnicalOpen(!isTechnicalOpen)}
        >
          <span>Technical Tags</span>
          <ChevronDown 
            className={`h-5 w-5 transform transition-transform duration-200 ${isTechnicalOpen ? 'rotate-180' : ''}`} 
          />
        </button>
        
        <div 
          className={`overflow-hidden transition-all duration-300 ${
            isTechnicalOpen ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {/* Mobile Viewport */}
          {renderTag(metaTags.viewport, 'Viewport', `<meta name="viewport" content="${metaTags.viewport.content}">`)}
          
          {/* Charset */}
          {renderTag(metaTags.charset, 'Charset', `<meta charset="${metaTags.charset.content}">`)}
          
          {/* Language */}
          {renderTag(metaTags.language, 'Language', `<html lang="${metaTags.language.content}">`)}
        </div>
      </div>
    </div>
  );
}
