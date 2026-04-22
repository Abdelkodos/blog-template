import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime.ts'
import { siteConfig } from './src/data/site.config'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://astro.build/config
export default defineConfig({
	site: siteConfig.site,
	vite: {
		resolve: {
			alias: [
				{ find: /^@\/utils\/(.+)$/, replacement: path.resolve(__dirname, 'src/utils/$1') },
				{ find: '@/utils', replacement: path.resolve(__dirname, 'src/utils/index.ts') },
				{ find: /^@\/lib\/(.+)$/, replacement: path.resolve(__dirname, 'src/lib/$1') }
			]
		}
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		drafts: true,
		shikiConfig: {
			theme: 'material-theme-palenight',
			wrap: true
		}
	},
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				experimentalThemes: {
					light: 'vitesse-light',
					dark: 'material-theme-palenight',
				  },
				wrap: true
			},
			drafts: true
		}),
		tailwind()
	]
})
