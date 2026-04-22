import { Client, Databases, Query } from 'node-appwrite'

const client = new Client()
	.setEndpoint(import.meta.env.APPWRITE_ENDPOINT)
	.setProject(import.meta.env.APPWRITE_PROJECT_ID)
	.setKey(import.meta.env.APPWRITE_API_KEY)

export const db = new Databases(client)

export const DATABASE_ID = import.meta.env.APPWRITE_DATABASE_ID
export const COLLECTIONS = {
	categories: 'categories',
	learningPosts: 'learning_posts',
	blogPosts: 'blog_posts'
} as const

export { Query }
