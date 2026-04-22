interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	site: 'https://tutoreviews.com', // Write here your website url
	author: 'Abdelkouddouss Mekkaoui', // Site author
	title: 'Tutorial Reviews', // Site title.
	description: 'Curated tutorial reviews, tech news, and learning resources for developers.', // Description to display in the meta tags
	lang: 'en-GB',
	ogLocale: 'en_GB',
	shareMessage: 'Share this post', // Message to share a post on social media
	paginationSize: 6 // Number of posts per page
}
