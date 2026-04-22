import { db, DATABASE_ID, COLLECTIONS, Query } from '@/lib/appwrite'
import type { Models } from 'node-appwrite'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Category extends Models.Document {
	title: string
	handle: string
	description?: string
	parentCategory?: string
}

export interface LearningPost extends Models.Document {
	title: string
	description: string
	pubDate: string
	type: 'tutorial-review' | 'news'
	categories: string[]
	draft: boolean
	provider?: string
	rating?: number
	takeaways?: string
	projectsBuilt: string[]
	body?: string
}

// ─── Path map helpers ─────────────────────────────────────────────────────────

/**
 * Build { category.$id → fullUrlPath } map by walking the parentCategory chain.
 * e.g. scrimba → "providers/scrimba", ai-news → "news/ai-news"
 */
export function buildCategoryPathMap(categories: Category[]): Record<string, string> {
	const byHandle: Record<string, Category> = {}
	for (const cat of categories) byHandle[cat.handle] = cat

	const cache: Record<string, string> = {}

	function getPath(handle: string, visited = new Set<string>()): string {
		if (cache[handle] !== undefined) return cache[handle]
		if (visited.has(handle)) return handle
		const cat = byHandle[handle]
		if (!cat?.parentCategory) {
			cache[handle] = handle
		} else {
			visited.add(handle)
			cache[handle] = `${getPath(cat.parentCategory, visited)}/${handle}`
		}
		return cache[handle]
	}

	const result: Record<string, string> = {}
	for (const cat of categories) result[cat.$id] = getPath(cat.handle)
	return result
}

/** Build reverse map: fullUrlPath → Category */
export function buildPathToCategoryMap(
	categories: Category[],
	pathMap: Record<string, string>
): Record<string, Category> {
	const result: Record<string, Category> = {}
	for (const cat of categories) {
		const path = pathMap[cat.$id]
		if (path) result[path] = cat
	}
	return result
}

// ─── Appwrite queries ─────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.categories, [Query.limit(200)])
	return res.documents as Category[]
}

export async function getLearnPosts(max = 200): Promise<LearningPost[]> {
	const res = await db.listDocuments(DATABASE_ID, COLLECTIONS.learningPosts, [
		Query.equal('draft', false),
		Query.orderDesc('pubDate'),
		Query.limit(max)
	])
	return res.documents as LearningPost[]
}

export async function getLearnPostById(id: string): Promise<LearningPost> {
	return (await db.getDocument(DATABASE_ID, COLLECTIONS.learningPosts, id)) as LearningPost
}

// ─── Tree helpers ─────────────────────────────────────────────────────────────

export function getRootCategories(all: Category[]): Category[] {
	return all.filter((c) => !c.parentCategory)
}

export function getChildCategories(parentHandle: string, all: Category[]): Category[] {
	return all.filter((c) => c.parentCategory === parentHandle)
}

export function filterPostsByCategory(handle: string, posts: LearningPost[]): LearningPost[] {
	return posts.filter((p) => p.categories.includes(handle))
}
