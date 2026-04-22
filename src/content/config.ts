import { defineCollection, z } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

// The learn section (categories + posts) is now managed in Appwrite.
// Only the original blog collection remains here.
const blog = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			draft: z.boolean().default(false)
		})
})

export const collections = { blog }
