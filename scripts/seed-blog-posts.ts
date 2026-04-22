import { Client, Databases, ID, Permission, Role } from 'node-appwrite'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env') })

const { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, APPWRITE_API_KEY, APPWRITE_DATABASE_ID } =
	process.env

if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_API_KEY || !APPWRITE_DATABASE_ID) {
	console.error('Missing required env vars. Check .env file.')
	process.exit(1)
}

const client = new Client()
	.setEndpoint(APPWRITE_ENDPOINT)
	.setProject(APPWRITE_PROJECT_ID)
	.setKey(APPWRITE_API_KEY)

const db = new Databases(client)
const DATABASE_ID = APPWRITE_DATABASE_ID
const COLLECTION_ID = 'blog_posts'

async function createCollection() {
	console.log('Creating blog_posts collection...')
	try {
		await db.createCollection(DATABASE_ID, COLLECTION_ID, 'Blog Posts', [
			Permission.read(Role.any())
		])
		console.log('Collection created.')
	} catch (e: any) {
		if (e.code === 409) {
			console.log('Collection already exists, skipping creation.')
		} else {
			throw e
		}
	}
}

async function createAttributes() {
	console.log('Creating attributes...')
	const attrs: Array<() => Promise<any>> = [
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'title', 200, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'slug', 200, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'description', 1000, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'body', 100000, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'pubDate', 100, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'heroImage', 1000, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'category', 200, true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'tags', 100, true, undefined, true),
		() => db.createBooleanAttribute(DATABASE_ID, COLLECTION_ID, 'draft', true),
		() => db.createStringAttribute(DATABASE_ID, COLLECTION_ID, 'readTime', 50, false)
	]

	for (const create of attrs) {
		try {
			await create()
		} catch (e: any) {
			if (e.code === 409) continue
			throw e
		}
	}

	console.log('Attributes created. Waiting for them to be available...')
	await new Promise((r) => setTimeout(r, 5000))
}

async function createIndexes() {
	console.log('Creating indexes...')
	const indexes: Array<() => Promise<any>> = [
		() => db.createIndex(DATABASE_ID, COLLECTION_ID, 'idx_slug', 'unique', ['slug'], ['asc']),
		() =>
			db.createIndex(
				DATABASE_ID,
				COLLECTION_ID,
				'idx_draft_pubdate',
				'key',
				['draft', 'pubDate'],
				['asc', 'desc']
			),
		() => db.createIndex(DATABASE_ID, COLLECTION_ID, 'idx_category', 'key', ['category'], ['asc']),
		() =>
			db.createIndex(
				DATABASE_ID,
				COLLECTION_ID,
				'idx_draft_category',
				'key',
				['draft', 'category', 'pubDate'],
				['asc', 'asc', 'desc']
			)
	]

	for (const create of indexes) {
		try {
			await create()
		} catch (e: any) {
			if (e.code === 409) continue
			throw e
		}
	}

	console.log('Indexes created. Waiting...')
	await new Promise((r) => setTimeout(r, 3000))
}

const SEED_POSTS = [
	{
		title: 'TypeScript2',
		slug: 'astro',
		description: 'TypeScript2 description here 2',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/placeholder-about.jpg',
		category: 'Category 1',
		tags: ['JavaScript', 'css', 'HTML5', 'GitHub'],
		draft: false,
		readTime: '8 min read',
		body: `**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax:

\`\`\`astro
---
const name = 'Astro'
---

<div>
  <h1>Hello {name}!</h1>
  <!-- Outputs <h1>Hello Astro!</h1> -->
</div>
\`\`\`

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components:

\`\`\`astro
---
const name = 'Astro'
---

<h1 class={name}>Attribute expressions are supported</h1>

<MyComponent templateLiteralNameAttribute={\`MyNameIs\${name}\`} />
\`\`\`

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements:

\`\`\`astro
---
const items = ['Dog', 'Cat', 'Platypus']
---

<ul>
  {items.map((item) => <li>{item}</li>)}
</ul>
\`\`\`

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import:

\`\`\`astro
---
import MyComponent from './MyComponent.astro'
const Element = 'div'
const Component = MyComponent
---

<Element>Hello!</Element>
<!-- renders as <div>Hello!</div> -->
<Component />
<!-- renders as <MyComponent /> -->
\`\`\`

### Fragments

Astro supports using either \`<Fragment> </Fragment>\` or the shorthand \`<> </>\`.

### Differences between Astro and JSX

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between \`.astro\` files and JSX.

#### Attributes

In Astro, you use the standard \`kebab-case\` format for all HTML attributes instead of the \`camelCase\` used in JSX.

#### Multiple Elements

An Astro component template can render multiple elements with no need to wrap everything in a single \`<div>\` or \`<>\`, unlike JavaScript or JSX.

#### Comments

In Astro, you can use standard HTML comments or JavaScript-style comments.`
	},
	{
		title: 'Tutorial: Create an Astro Component',
		slug: 'create-astro-component',
		description: 'Learn how to create your first Astro component.',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/placeholder-hero.jpg',
		category: 'Category 1',
		tags: ['JavaScript', 'css', 'HTML5', 'GitHub'],
		draft: false,
		readTime: '4 min read',
		body: `**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax:

\`\`\`astro
---
const name = 'Astro'
---

<div>
  <h1>Hello {name}!</h1>
</div>
\`\`\`

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components.`
	},
	{
		title: 'MacBook',
		slug: 'macbook',
		description:
			'The new MacBook Pro 2022 is here. With the Apple M2 chip, a new design, and more, the new MacBook Pro is the best laptop Apple has ever made.',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/book.jpg',
		category: 'Category 4',
		tags: ['PC'],
		draft: false,
		readTime: '7 min read',
		body: `**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax.

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components.

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements.

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import.

### Fragments

Astro supports using either \`<Fragment> </Fragment>\` or the shorthand \`<> </>\`.

### Differences between Astro and JSX

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between \`.astro\` files and JSX.`
	},
	{
		title: 'MacBook Pro 2022',
		slug: 'astro-copy-2',
		description:
			'The new MacBook Pro 2022 is here. With the Apple M2 chip, a new design, and more, the new MacBook Pro is the best laptop Apple has ever made.',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/bg.jpg',
		category: 'Category 1',
		tags: ['JavaScript', 'css', 'HTML5', 'GitHub'],
		draft: false,
		readTime: '8 min read',
		body: `# Title

**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax.

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components.

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements.

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import.

### Fragments

Astro supports using either \`<Fragment> </Fragment>\` or the shorthand \`<> </>\`.

### Differences between Astro and JSX

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between \`.astro\` files and JSX.`
	},
	{
		title: 'Astro Components',
		slug: 'astro-copy-3',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non dia',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/te.jpg',
		category: 'Category 2',
		tags: ['JavaScript', 'css', 'HTML5', 'GitHub'],
		draft: false,
		readTime: '8 min read',
		body: `**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax.

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components.

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements.

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import.

### Fragments

Astro supports using either \`<Fragment> </Fragment>\` or the shorthand \`<> </>\`.

### Differences between Astro and JSX

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between \`.astro\` files and JSX.`
	},
	{
		title: 'Components',
		slug: 'astro-copy-4',
		description:
			'Astro components are HTML templates with superpowers. They are a superset of HTML, with support for including components and JavaScript expressions.',
		pubDate: '2022-07-02',
		heroImage: '/images/blog/banner.jpg',
		category: 'Category 3',
		tags: ['JavaScript', 'css', 'HTML5', 'GitHub', 'Ordenador'],
		draft: false,
		readTime: '8 min read',
		body: `**If you know HTML, you already know enough to write your first Astro component.**

Astro component syntax is a superset of HTML. The syntax was [designed to feel familiar to anyone with experience writing HTML or JSX](#differences-between-astro-and-jsx), and adds support for including components and JavaScript expressions.

## JSX-like Expressions

You can define local JavaScript variables inside of the frontmatter component script between the two code fences (\`---\`) of an Astro component. You can then inject these variables into the component's HTML template using JSX-like expressions!

### Variables

Local variables can be added into the HTML using the curly braces syntax.

### Dynamic Attributes

Local variables can be used in curly braces to pass attribute values to both HTML elements and components.

### Dynamic HTML

Local variables can be used in JSX-like functions to produce dynamically-generated HTML elements.

### Dynamic Tags

You can also use dynamic tags by setting a variable to an HTML tag name or a component import.

### Fragments

Astro supports using either \`<Fragment> </Fragment>\` or the shorthand \`<> </>\`.

### Differences between Astro and JSX

Astro component syntax is a superset of HTML. It was designed to feel familiar to anyone with HTML or JSX experience, but there are a couple of key differences between \`.astro\` files and JSX.`
	}
]

async function seedPosts() {
	console.log(`Seeding ${SEED_POSTS.length} blog posts...`)
	for (const post of SEED_POSTS) {
		try {
			await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), post)
			console.log(`  + ${post.title} (/${post.slug})`)
		} catch (e: any) {
			if (e.code === 409) {
				console.log(`  ~ ${post.title} already exists, skipping.`)
			} else {
				console.error(`  ! Failed to create "${post.title}":`, e.message)
			}
		}
	}
}

async function main() {
	await createCollection()
	await createAttributes()
	await createIndexes()
	await seedPosts()
	console.log('\nDone! Blog posts are now in Appwrite.')
}

main().catch((e) => {
	console.error('Fatal error:', e)
	process.exit(1)
})
