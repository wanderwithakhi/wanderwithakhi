import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection for "The Outside" (Travel, Geography, Outdoor Guides)
const travelCollection = defineCollection({
  loader: glob({ base: './src/content/travel', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    coverImage: z.string().optional(),
    category: z.string(),     // e.g. "Guides", "Diaries", "Adventure"
    location: z.string(),     // e.g. "Kyoto, Japan"
    duration: z.string(),     // e.g. "5 min read"
  })
});

// Collection for "The Inside" (Mindfulness, Reflections, Somatic Practice)
const mindfulnessCollection = defineCollection({
  loader: glob({ base: './src/content/mindfulness', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    coverImage: z.string().optional(),
    category: z.string(),     // e.g. "Meditation", "Yoga", "Reflections"
    duration: z.string(),     // e.g. "7 min read"
  })
});

// Collection for "Wellness" (Slow Living & Veganism)
const wellnessCollection = defineCollection({
  loader: glob({ base: './src/content/wellness', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    coverImage: z.string().optional(),
    category: z.string(),     // e.g. "Slow Living", "Plant-Based"
    duration: z.string(),     // e.g. "6 min read"
  })
});

export const collections = {
  'travel': travelCollection,
  'mindfulness': mindfulnessCollection,
  'wellness': wellnessCollection,
};
