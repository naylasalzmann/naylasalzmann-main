import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const releases = defineCollection({
  // Load Markdown files in the `src/content/releases/` directory.
  loader: glob({ base: "./src/content/releases", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      // Flags the release shown on the homepage. Exactly one release
      // should have current: true at a time.
      current: z.boolean().default(false),
      listenUrl: z.string().url(),
      // Optional per-release override for the WATCH button. Falls back
      // to YOUTUBE_URL in consts.ts, since Watch always points at the
      // same channel today.
      watchUrl: z.string().url().optional(),
    }),
});

export const collections = { blog, releases };
