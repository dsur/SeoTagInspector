import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Main user schema (keeping from the original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define schemas for SEO analysis
export const seoAnalysisSchema = z.object({
  url: z.string().url(),
});

export const tagSchema = z.object({
  name: z.string(),
  content: z.string().optional(),
  status: z.enum(["good", "improve", "missing"]),
  recommendation: z.string().optional(),
});

export const metaTagsSchema = z.object({
  title: tagSchema,
  description: tagSchema,
  canonical: tagSchema,
  robots: tagSchema,
  viewport: tagSchema,
  charset: tagSchema,
  language: tagSchema,
  openGraph: z.object({
    title: tagSchema,
    description: tagSchema,
    url: tagSchema,
    type: tagSchema,
    image: tagSchema,
    siteName: tagSchema,
  }),
  twitter: z.object({
    card: tagSchema,
    title: tagSchema,
    description: tagSchema,
    image: tagSchema,
    site: tagSchema,
  }),
});

export const seoAnalysisResultSchema = z.object({
  url: z.string(),
  favicon: z.string().optional(),
  lastAnalyzed: z.string(),
  pageSize: z.string(),
  statusCode: z.number(),
  statusText: z.string(),
  healthStatus: z.enum(["good", "warning", "bad"]),
  metaTags: metaTagsSchema,
  recommendations: z.array(z.object({
    type: z.enum(["success", "warning", "error", "info"]),
    title: z.string(),
    description: z.string(),
    items: z.array(z.string()).optional(),
  })),
});

export type SeoAnalysisRequest = z.infer<typeof seoAnalysisSchema>;
export type SeoAnalysisResult = z.infer<typeof seoAnalysisResultSchema>;
export type Tag = z.infer<typeof tagSchema>;
