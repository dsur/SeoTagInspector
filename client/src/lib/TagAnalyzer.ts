import { Tag } from "@shared/schema";

/**
 * Utility class for analyzing and providing feedback on SEO meta tags
 */
export class TagAnalyzer {
  /**
   * Analyze a title tag for SEO best practices
   */
  static analyzeTitle(title: string | undefined): Tag {
    if (!title) {
      return {
        name: 'title',
        status: 'missing',
        recommendation: 'Add a title tag (50-60 characters recommended)'
      };
    }
    
    if (title.length < 30) {
      return {
        name: 'title',
        content: title,
        status: 'improve',
        recommendation: `Your title is too short (${title.length} characters). Aim for 50-60 characters.`
      };
    }
    
    if (title.length > 60) {
      return {
        name: 'title',
        content: title,
        status: 'improve',
        recommendation: `Your title is too long (${title.length} characters). Trim to 50-60 characters.`
      };
    }
    
    return {
      name: 'title',
      content: title,
      status: 'good',
      recommendation: `Good length: ${title.length} characters`
    };
  }
  
  /**
   * Analyze a meta description for SEO best practices
   */
  static analyzeDescription(description: string | undefined): Tag {
    if (!description) {
      return {
        name: 'description',
        status: 'missing',
        recommendation: 'Add a meta description (120-155 characters recommended)'
      };
    }
    
    if (description.length < 80) {
      return {
        name: 'description',
        content: description,
        status: 'improve',
        recommendation: `Your description is too short (${description.length} characters). Aim for 120-155 characters.`
      };
    }
    
    if (description.length > 160) {
      return {
        name: 'description',
        content: description,
        status: 'improve',
        recommendation: `Your description is too long (${description.length} characters). Trim to 120-155 characters.`
      };
    }
    
    return {
      name: 'description',
      content: description,
      status: 'good',
      recommendation: `Good length: ${description.length} characters`
    };
  }
  
  /**
   * Determine the status class for a tag
   */
  static getStatusClass(status: 'good' | 'improve' | 'missing'): string {
    switch (status) {
      case 'good':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400';
      case 'improve':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400';
      case 'missing':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400';
      default:
        return '';
    }
  }
}
