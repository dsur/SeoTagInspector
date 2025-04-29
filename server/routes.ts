import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { SeoAnalysisRequest, seoAnalysisSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint for analyzing website SEO
  app.post("/api/analyze", async (req, res) => {
    try {
      // Validate request body
      const validatedData = seoAnalysisSchema.parse(req.body);
      const { url } = validatedData;
      
      // Fetch the HTML content
      const response = await fetch(url, {
        headers: {
          "User-Agent": "SEO Tag Analyzer/1.0"
        }
      });
      
      if (!response.ok) {
        return res.status(400).json({
          message: `Failed to fetch URL: ${response.status} ${response.statusText}`
        });
      }
      
      const html = await response.text();
      const contentLength = html.length;
      const pageSize = (contentLength / 1024).toFixed(1) + " KB";
      
      // Parse HTML
      const $ = cheerio.load(html);
      
      // Get website favicon
      let favicon = "";
      const faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]').attr('href');
      if (faviconLink) {
        // Handle relative URLs
        if (faviconLink.startsWith('/')) {
          const urlObj = new URL(url);
          favicon = `${urlObj.protocol}//${urlObj.host}${faviconLink}`;
        } else if (!faviconLink.startsWith('http')) {
          // Handle favicon in the same directory
          favicon = new URL(faviconLink, url).toString();
        } else {
          favicon = faviconLink;
        }
      } else {
        // Default to /favicon.ico if no favicon link found
        const urlObj = new URL(url);
        favicon = `${urlObj.protocol}//${urlObj.host}/favicon.ico`;
      }
      
      // Analyze SEO tags
      const result = await storage.analyzeSeoTags(url, $, response, pageSize, favicon);
      
      return res.json(result);
    } catch (error) {
      console.error('Error analyzing URL:', error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: validationError.message
        });
      }
      
      return res.status(500).json({
        message: `Error analyzing URL: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
