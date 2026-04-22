/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly APPWRITE_ENDPOINT: string
	readonly APPWRITE_PROJECT_ID: string
	readonly APPWRITE_API_KEY: string
	readonly APPWRITE_DATABASE_ID: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
