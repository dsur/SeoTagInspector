import { users, type User, type InsertUser, SeoAnalysisResult, Tag } from "@shared/schema";
import * as cheerio from "cheerio";
import { Response } from "node-fetch";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  analyzeSeoTags(
    url: string, 
    $: cheerio.CheerioAPI, 
    response: Response,
    pageSize: string,
    favicon: string
  ): Promise<SeoAnalysisResult>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async analyzeSeoTags(
    url: string, 
    $: cheerio.CheerioAPI, 
    response: Response,
    pageSize: string,
    favicon: string
  ): Promise<SeoAnalysisResult> {
    // Initialize result with basic website information
    const result: SeoAnalysisResult = {
      url,
      favicon,
      lastAnalyzed: new Date().toISOString(),
      pageSize,
      statusCode: response.status,
      statusText: response.statusText,
      healthStatus: "good", // Default, will adjust based on analysis
      metaTags: {
        title: this.analyzeTitle($),
        description: this.analyzeDescription($),
        canonical: this.analyzeCanonical($, url),
        robots: this.analyzeRobots($),
        viewport: this.analyzeViewport($),
        charset: this.analyzeCharset($),
        language: this.analyzeLanguage($),
        openGraph: {
          title: this.analyzeOgTag($, 'og:title'),
          description: this.analyzeOgTag($, 'og:description'),
          url: this.analyzeOgTag($, 'og:url'),
          type: this.analyzeOgTag($, 'og:type'),
          image: this.analyzeOgTag($, 'og:image'),
          siteName: this.analyzeOgTag($, 'og:site_name'),
        },
        twitter: {
          card: this.analyzeTwitterTag($, 'twitter:card'),
          title: this.analyzeTwitterTag($, 'twitter:title'),
          description: this.analyzeTwitterTag($, 'twitter:description'),
          image: this.analyzeTwitterTag($, 'twitter:image'),
          site: this.analyzeTwitterTag($, 'twitter:site'),
        },
      },
      recommendations: this.generateRecommendations($),
    };

    // Adjust health status based on analysis
    const missingTags = this.countMissingTags(result);
    const improveTags = this.countImproveTags(result);

    if (missingTags > 4) {
      result.healthStatus = "bad";
    } else if (missingTags > 1 || improveTags > 2) {
      result.healthStatus = "warning";
    }

    return result;
  }

  private analyzeTitle($: cheerio.CheerioAPI): Tag {
    const titleTag = $('title').text().trim();
    
    if (!titleTag) {
      return {
        name: 'title',
        status: 'missing',
        recommendation: 'Add a title tag (50-60 characters recommended)'
      };
    }
    
    if (titleTag.length < 10) {
      return {
        name: 'title',
        content: titleTag,
        status: 'improve',
        recommendation: `Your title is too short (${titleTag.length} characters). Aim for 50-60 characters.`
      };
    }
    
    if (titleTag.length > 60) {
      return {
        name: 'title',
        content: titleTag,
        status: 'improve',
        recommendation: `Your title is too long (${titleTag.length} characters). Trim to 50-60 characters.`
      };
    }
    
    return {
      name: 'title',
      content: titleTag,
      status: 'good',
      recommendation: `Good length: ${titleTag.length} characters`
    };
  }

  private analyzeDescription($: cheerio.CheerioAPI): Tag {
    const descriptionTag = $('meta[name="description"]').attr('content')?.trim();
    
    if (!descriptionTag) {
      return {
        name: 'description',
        status: 'missing',
        recommendation: 'Add a meta description (120-155 characters recommended)'
      };
    }
    
    if (descriptionTag.length < 50) {
      return {
        name: 'description',
        content: descriptionTag,
        status: 'improve',
        recommendation: `Your description is too short (${descriptionTag.length} characters). Aim for 120-155 characters.`
      };
    }
    
    if (descriptionTag.length > 160) {
      return {
        name: 'description',
        content: descriptionTag,
        status: 'improve',
        recommendation: `Your description is too long (${descriptionTag.length} characters). Trim to 120-155 characters.`
      };
    }
    
    return {
      name: 'description',
      content: descriptionTag,
      status: 'good',
      recommendation: `Good length: ${descriptionTag.length} characters`
    };
  }

  private analyzeCanonical($: cheerio.CheerioAPI, url: string): Tag {
    const canonicalTag = $('link[rel="canonical"]').attr('href')?.trim();
    
    if (!canonicalTag) {
      return {
        name: 'canonical',
        status: 'missing',
        recommendation: `Add a canonical URL tag: <link rel="canonical" href="${url}">`
      };
    }
    
    return {
      name: 'canonical',
      content: canonicalTag,
      status: 'good'
    };
  }

  private analyzeRobots($: cheerio.CheerioAPI): Tag {
    const robotsTag = $('meta[name="robots"]').attr('content')?.trim();
    
    if (!robotsTag) {
      return {
        name: 'robots',
        status: 'missing',
        recommendation: 'Add a robots meta tag: <meta name="robots" content="index, follow">'
      };
    }
    
    return {
      name: 'robots',
      content: robotsTag,
      status: 'good'
    };
  }

  private analyzeViewport($: cheerio.CheerioAPI): Tag {
    const viewportTag = $('meta[name="viewport"]').attr('content')?.trim();
    
    if (!viewportTag) {
      return {
        name: 'viewport',
        status: 'missing',
        recommendation: 'Add a viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0">'
      };
    }
    
    return {
      name: 'viewport',
      content: viewportTag,
      status: 'good'
    };
  }

  private analyzeCharset($: cheerio.CheerioAPI): Tag {
    const charsetTag = $('meta[charset]').attr('charset')?.trim();
    
    if (!charsetTag) {
      return {
        name: 'charset',
        status: 'missing',
        recommendation: 'Add a charset meta tag: <meta charset="UTF-8">'
      };
    }
    
    return {
      name: 'charset',
      content: charsetTag,
      status: 'good'
    };
  }

  private analyzeLanguage($: cheerio.CheerioAPI): Tag {
    const langAttr = $('html').attr('lang')?.trim();
    
    if (!langAttr) {
      return {
        name: 'language',
        status: 'missing',
        recommendation: 'Add a language attribute to the html tag: <html lang="en">'
      };
    }
    
    return {
      name: 'language',
      content: langAttr,
      status: 'good'
    };
  }

  private analyzeOgTag($: cheerio.CheerioAPI, property: string): Tag {
    const ogTag = $(`meta[property="${property}"]`).attr('content')?.trim();
    const name = property.replace('og:', '');
    
    if (!ogTag) {
      return {
        name: name,
        status: 'missing',
        recommendation: `Add an Open Graph ${name} tag: <meta property="${property}" content="Your content">`
      };
    }
    
    // Special case for og:image
    if (property === 'og:image' && ogTag) {
      return {
        name: name,
        content: ogTag,
        status: 'good',
        recommendation: `Image found. Ideal size is 1200x630 pixels.`
      };
    }
    
    return {
      name: name,
      content: ogTag,
      status: 'good'
    };
  }

  private analyzeTwitterTag($: cheerio.CheerioAPI, name: string): Tag {
    const twitterTag = $(`meta[name="${name}"]`).attr('content')?.trim();
    const tagName = name.replace('twitter:', '');
    
    if (!twitterTag) {
      // Check if we can fall back to Open Graph for some tags
      if (['twitter:title', 'twitter:description', 'twitter:image'].includes(name)) {
        const ogProperty = name.replace('twitter:', 'og:');
        const ogTag = $(`meta[property="${ogProperty}"]`).attr('content')?.trim();
        
        if (ogTag) {
          return {
            name: tagName,
            content: ogTag + ' (using og fallback)',
            status: 'improve',
            recommendation: `Using Open Graph fallback. Add a dedicated ${name} tag.`
          };
        }
      }
      
      return {
        name: tagName,
        status: 'missing',
        recommendation: `Add a Twitter ${tagName} tag: <meta name="${name}" content="Your content">`
      };
    }
    
    // Special case for twitter:card
    if (name === 'twitter:card' && twitterTag === 'summary') {
      return {
        name: tagName,
        content: twitterTag,
        status: 'improve',
        recommendation: `Consider using "summary_large_image" for better visibility`
      };
    }
    
    return {
      name: tagName,
      content: twitterTag,
      status: 'good'
    };
  }

  private generateRecommendations($: cheerio.CheerioAPI) {
    const recommendations = [];
    
    // Check for missing essential tags
    const missingEssentialTags = [];
    if (!$('title').text().trim()) missingEssentialTags.push('title');
    if (!$('meta[name="description"]').attr('content')) missingEssentialTags.push('meta description');
    if (!$('link[rel="canonical"]').attr('href')) missingEssentialTags.push('canonical link');
    if (!$('meta[name="robots"]').attr('content')) missingEssentialTags.push('robots meta tag');
    
    if (missingEssentialTags.length > 0) {
      recommendations.push({
        type: 'error',
        title: 'Missing essential tags',
        description: 'Add these important SEO tags to improve your visibility:',
        items: missingEssentialTags.map(tag => `Add a ${tag} tag`)
      });
    }
    
    // Check for social media tags
    const missingSocialTags = [];
    if (!$('meta[property="og:title"]').attr('content')) missingSocialTags.push('og:title');
    if (!$('meta[property="og:description"]').attr('content')) missingSocialTags.push('og:description');
    if (!$('meta[property="og:image"]').attr('content')) missingSocialTags.push('og:image');
    if (!$('meta[property="og:url"]').attr('content')) missingSocialTags.push('og:url');
    if (!$('meta[property="og:type"]').attr('content')) missingSocialTags.push('og:type');
    if (!$('meta[name="twitter:card"]').attr('content')) missingSocialTags.push('twitter:card');
    if (!$('meta[name="twitter:image"]').attr('content')) missingSocialTags.push('twitter:image');
    
    if (missingSocialTags.length > 0) {
      recommendations.push({
        type: 'warning',
        title: 'Improve social media presence',
        description: 'Add these tags to enhance how your content appears when shared:',
        items: missingSocialTags.map(tag => `Add ${tag} tag`)
      });
    }
    
    // Check for title length
    const title = $('title').text().trim();
    if (title && (title.length < 30 || title.length > 60)) {
      recommendations.push({
        type: 'warning',
        title: 'Optimize title length',
        description: `Your title is ${title.length} characters. Aim for 50-60 characters for optimal display in search results.`
      });
    }
    
    // Check for description length
    const description = $('meta[name="description"]').attr('content')?.trim();
    if (description && (description.length < 80 || description.length > 160)) {
      recommendations.push({
        type: 'warning',
        title: 'Optimize description length',
        description: `Your description is ${description.length} characters. Aim for 120-155 characters for optimal display in search results.`
      });
    }
    
    // Add positive feedback if everything looks good
    if (
      title && title.length >= 30 && title.length <= 60 &&
      description && description.length >= 80 && description.length <= 160 &&
      $('link[rel="canonical"]').attr('href') &&
      $('meta[name="robots"]').attr('content') &&
      $('meta[property="og:title"]').attr('content') &&
      $('meta[property="og:description"]').attr('content') &&
      $('meta[property="og:image"]').attr('content')
    ) {
      recommendations.push({
        type: 'success',
        title: 'Well optimized page',
        description: 'Your page has all the important SEO tags properly implemented. Keep up the good work!'
      });
    }
    
    return recommendations;
  }

  private countMissingTags(result: SeoAnalysisResult): number {
    let count = 0;
    
    // Check basic tags
    if (result.metaTags.title.status === 'missing') count++;
    if (result.metaTags.description.status === 'missing') count++;
    if (result.metaTags.canonical.status === 'missing') count++;
    if (result.metaTags.robots.status === 'missing') count++;
    if (result.metaTags.viewport.status === 'missing') count++;
    
    // Check OpenGraph tags
    if (result.metaTags.openGraph.title.status === 'missing') count++;
    if (result.metaTags.openGraph.description.status === 'missing') count++;
    if (result.metaTags.openGraph.image.status === 'missing') count++;
    
    // Check Twitter tags
    if (result.metaTags.twitter.card.status === 'missing') count++;
    if (result.metaTags.twitter.image.status === 'missing') count++;
    
    return count;
  }

  private countImproveTags(result: SeoAnalysisResult): number {
    let count = 0;
    
    // Check basic tags
    if (result.metaTags.title.status === 'improve') count++;
    if (result.metaTags.description.status === 'improve') count++;
    
    // Check OpenGraph tags
    if (result.metaTags.openGraph.title.status === 'improve') count++;
    if (result.metaTags.openGraph.description.status === 'improve') count++;
    
    // Check Twitter tags
    if (result.metaTags.twitter.card.status === 'improve') count++;
    
    return count;
  }
}

export const storage = new MemStorage();
