import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GooglePreview from './GooglePreview';
import FacebookPreview from './FacebookPreview';
import TwitterPreview from './TwitterPreview';
import LinkedInPreview from './LinkedInPreview';
import { SeoAnalysisResult } from '@shared/schema';

interface PreviewTabsProps {
  analysisResult: SeoAnalysisResult;
}

export default function PreviewTabs({ analysisResult }: PreviewTabsProps) {
  const [activeTab, setActiveTab] = useState("google");
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-4 sm:mb-6">
      <Tabs defaultValue="google" onValueChange={setActiveTab} value={activeTab}>
        <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <TabsList className="bg-transparent border-0 h-auto flex w-full min-w-max">
            <TabsTrigger 
              value="google" 
              className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium data-[state=active]:text-blue-600 data-[state=active]:dark:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:dark:border-blue-400 rounded-none transition-colors`}
            >
              Google
            </TabsTrigger>
            <TabsTrigger 
              value="facebook" 
              className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium data-[state=active]:text-blue-600 data-[state=active]:dark:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:dark:border-blue-400 rounded-none transition-colors`}
            >
              Facebook
            </TabsTrigger>
            <TabsTrigger 
              value="twitter" 
              className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium data-[state=active]:text-blue-600 data-[state=active]:dark:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:dark:border-blue-400 rounded-none transition-colors`}
            >
              Twitter
            </TabsTrigger>
            <TabsTrigger 
              value="linkedin" 
              className={`px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-sm sm:text-base whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium data-[state=active]:text-blue-600 data-[state=active]:dark:text-blue-400 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:dark:border-blue-400 rounded-none transition-colors`}
            >
              LinkedIn
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="google" className="p-4 sm:p-6 md:p-8 focus:outline-none">
          <GooglePreview analysisResult={analysisResult} />
        </TabsContent>
        
        <TabsContent value="facebook" className="p-4 sm:p-6 md:p-8 focus:outline-none">
          <FacebookPreview analysisResult={analysisResult} />
        </TabsContent>
        
        <TabsContent value="twitter" className="p-4 sm:p-6 md:p-8 focus:outline-none">
          <TwitterPreview analysisResult={analysisResult} />
        </TabsContent>
        
        <TabsContent value="linkedin" className="p-4 sm:p-6 md:p-8 focus:outline-none">
          <LinkedInPreview analysisResult={analysisResult} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
