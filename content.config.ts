import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Vocabulary (Case Study, Chapter, Project, Role, Post): see GLOSSARY.md.
const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, 'Use YYYY-MM')

export default defineContentConfig({
  collections: {
    caseStudies: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: z.object({
        summary: z.string(),
        org: z.string(), // the Role's organization, or "Personal"
        role: z.string(),
        period: z.string(),
        stack: z.array(z.string()),
        status: z.enum(['published', 'in-progress']),
        outcomes: z.array(z.string()).max(3),
        cover: z.string().optional(),
        liveUrl: z.string().url().optional(),
        order: z.number(),
        featured: z.boolean().default(true),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        name: z.string(),
        blurb: z.string(),
        org: z.string(),
        year: z.number().optional(),
        stack: z.array(z.string()),
        links: z.array(z.object({ label: z.string(), url: z.string().url() })),
        order: z.number(),
      }),
    }),
    roles: defineCollection({
      type: 'data',
      source: 'roles/*.yml',
      schema: z.object({
        org: z.string(),
        title: z.string(),
        start: yearMonth,
        end: yearMonth.nullable(), // null = present
        location: z.string(),
        remote: z.boolean().default(false),
        bullets: z.array(z.string()),
      }),
    }),
    posts: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        date: z.string(),
        excerpt: z.string(),
        tags: z.array(z.string()),
        cover: z.string().optional(),
      }),
    }),
    site: defineCollection({
      type: 'data',
      source: 'site.yml',
      schema: z.object({
        name: z.string(),
        title: z.string(),
        location: z.string(),
        greeting: z.string(),
        headline: z.string(),
        bio: z.array(z.string()),
        about: z.array(z.string()),
        headshot: z.string().optional(),
        howIWork: z.array(z.object({ title: z.string(), body: z.string() })),
        contact: z.array(z.object({ label: z.string(), href: z.string(), icon: z.string() })),
        skills: z.array(z.object({ group: z.string(), items: z.array(z.string()) })),
        education: z.object({ degree: z.string(), school: z.string(), year: z.number() }),
      }),
    }),
  },
})
