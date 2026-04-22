import { db, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite'
import type { Models } from 'node-appwrite'

export interface BlogPost extends Models.Document {
	title: string
	slug: string
	description: string
	body: string
	pubDate: string
	heroImage: string
	category: string
	tags: string[]
	draft: boolean
	readTime?: string
}

export async function getBlogPosts(max = 200): Promise<BlogPost[]> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.blogPosts, [
		Query.equal('draft', false),
		Query.orderDesc('pubDate'),
		Query.limit(max)
	])
	return res.documents as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.blogPosts, [
		Query.equal('slug', slug),
		Query.limit(1)
	])
	return (res.documents[0] as BlogPost) ?? null
}

export async function getBlogCategories(): Promise<string[]> {
	const posts = await getBlogPosts()
	const categories = new Set(posts.map((p) => p.category))
	return Array.from(categories).sort()
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.blogPosts, [
		Query.equal('draft', false),
		Query.equal('category', category),
		Query.orderDesc('pubDate'),
		Query.limit(200)
	])
	return res.documents as BlogPost[]
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.blogPosts, [
		Query.equal('draft', false),
		Query.contains('tags', [tag]),
		Query.orderDesc('pubDate'),
		Query.limit(200)
	])
	return res.documents as BlogPost[]
}

export async function getBlogTags(): Promise<string[]> {
	const posts = await getBlogPosts()
	const tags = new Set<string>()
	posts.forEach((p) =>
		p.tags.forEach((t) => {
			if (t) tags.add(t.toLowerCase())
		})
	)
	return Array.from(tags).sort()
}
