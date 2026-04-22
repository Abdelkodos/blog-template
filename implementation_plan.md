# Migrate Blog Posts from MDX to Appwrite

## Goal

Move the blog's content source from local MDX files (`src/content/blog/`) to Appwrite, matching the pattern already used by the Learning Library. Posts will be stored with a markdown `body` field plus metadata columns, and all pages will fetch from Appwrite at build time.

## Proposed Appwrite Collection: `blog_posts`

| Field         | Type     | Required | Description                                           |
| ------------- | -------- | -------- | ----------------------------------------------------- |
| `title`       | string   | ✅       | Post title (max 80 chars)                             |
| `slug`        | string   | ✅       | URL slug (unique, used in `/post/[slug]`)             |
| `description` | string   | ✅       | Meta description / excerpt                            |
| `body`        | string   | ✅       | Full markdown content                                 |
| `pubDate`     | string   | ✅       | ISO date string                                       |
| `heroImage`   | string   | ✅       | URL to hero image (external or from Appwrite Storage) |
| `category`    | string   | ✅       | Category handle (matches `categories` collection)     |
| `tags`        | string[] | ✅       | Array of tag strings                                  |
| `draft`       | boolean  | ✅       | Draft flag (false = published)                        |
| `readTime`    | string   |          | e.g. "5 min read" (computed or manual)                |

> [!IMPORTANT]
> **Hero images**: Since Appwrite stores markdown text (not files), hero images need to be URLs — either external links or Appwrite Storage file URLs. The current MDX posts use local `../../assets/images/` paths which won't work from Appwrite. We'll use placeholder image URLs for the seed data.

## Proposed Changes

### 1. Appwrite Setup

#### [NEW] `scripts/seed-blog-posts.ts`

A one-time Node.js script that:

- Creates the `blog_posts` collection in Appwrite (with all attributes + indexes)
- Seeds the 6 existing MDX posts into the collection
- Run with: `npx tsx scripts/seed-blog-posts.ts`

---

### 2. Data Layer

#### [MODIFY] `src/lib/appwrite.ts`

Add `blogPosts: 'blog_posts'` to the `COLLECTIONS` object.

#### [NEW] `src/utils/blog.ts`

New utility file (parallel to `learn.ts`) with:

- `BlogPost` interface
- `getBlogPosts(max?)` — fetch published posts sorted by date
- `getBlogPostBySlug(slug)` — fetch single post
- `getBlogCategories()` — get unique categories from posts
- `getBlogPostsByCategory(category)` — filter by category
- `getBlogPostsByTag(tag)` — filter by tag
- `getBlogTags()` — get all unique tags

---

### 3. Pages

#### [MODIFY] `src/pages/index.astro`

Switch from `getPosts()` (Astro content collection) to `getBlogPosts()` (Appwrite). Remove `post.render()` call, use pre-computed `readTime` field.

#### [MODIFY] `src/pages/post/[...slug].astro`

- Fetch from Appwrite (`getBlogPostBySlug`)
- Render markdown body using a markdown-to-HTML renderer
- Keep related posts logic but query Appwrite

#### [MODIFY] `src/pages/category/[category]/[page].astro`

Switch to Appwrite-sourced categories and posts.

#### [MODIFY] `src/pages/tags/index.astro` (if exists)

Switch tags to come from Appwrite.

---

### 4. Components

#### [MODIFY] `src/components/PostCard.astro`

- Accept `heroImage` as a URL string instead of an Astro image import
- Use `<img>` tag instead of Astro's `<Image>` for external URLs

#### [MODIFY] `src/layouts/BlogPost.astro`

- Accept `heroImage` as URL string
- Render markdown body from Appwrite with `set:html`
- Remove dependency on `CollectionEntry<'blog'>`

---

### 5. Cleanup

#### [DELETE] `src/content/blog/*.mdx` (optional, after verification)

Keep as backup initially, then remove once Appwrite is confirmed working.

#### [MODIFY] `src/utils/index.ts`

Update exports to use new `blog.ts` functions instead of `post.ts`.

## Open Questions

> [!IMPORTANT]
> **Hero images strategy**: The current posts use local image files. For Appwrite, should we:
>
> 1. Upload images to Appwrite Storage and use their URLs?
> 2. Use external URLs (e.g., Unsplash placeholders)?
> 3. Keep images in `/public/` and reference them by path?
>
> I'll go with option 3 (copy images to `/public/images/blog/` and reference by path) unless you prefer otherwise.

> [!WARNING]
> **Markdown rendering**: Appwrite stores plain markdown text. We'll need to render it to HTML at build time. I'll use a markdown library (like `marked` or Astro's built-in markdown processing) to convert the body field to HTML.

## Verification Plan

### Automated Tests

- Run `pnpm dev` and verify no build errors
- Check homepage shows posts from Appwrite
- Check `/post/[slug]` renders markdown correctly
- Check category pages work
- Browser test all pages

### Manual Verification

- Compare rendered output before/after migration
- Verify markdown syntax highlighting still works
