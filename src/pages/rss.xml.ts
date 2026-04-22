import rss from '@astrojs/rss'
import { siteConfig } from '@/data/site.config'
import { getBlogPosts } from '@/utils/blog'

export async function GET(context: any) {
	const posts = await getBlogPosts()
	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.title,
			description: post.description,
			pubDate: new Date(post.pubDate),
			link: `post/${post.slug}/`
		}))
	})
}
