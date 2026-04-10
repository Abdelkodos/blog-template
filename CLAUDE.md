# Blog Template — Project Guide for Claude

## What This Is

A personal blog called **tutoreviews** (`https://tutoreviews.com`) built on the [OpenBlog](https://github.com/danielcgilibert/blog-template) Astro theme. Deployed to **Cloudflare Pages** via `wrangler`.

## Stack

- **Astro** + TypeScript — framework
- **Tailwind CSS** + clsx + tailwind-merge — styling
- **TinaCMS** — optional headless CMS for authoring posts
- **Pagefind** — static search (runs as a postbuild step: `pagefind --site dist`)
- **pnpm** — package manager (use pnpm, not npm/yarn)
- **Cloudflare Pages** — hosting (project name: `tutoreviews`)

## Key Config Files

| File                        | Purpose                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `src/data/site.config.ts`   | Site metadata (title, author, description, lang, pagination)        |
| `src/data/categories.ts`    | Exhaustive list of blog categories (Zod-validated — add here first) |
| `src/data/links.ts`         | Social network links shown in header/footer                         |
| `src/data/disqus.config.ts` | Disqus comments config                                              |
| `wrangler.toml`             | Cloudflare Pages deployment config                                  |

## Commands

```bash
pnpm dev          # dev server at localhost:3000
pnpm build        # production build → ./dist (runs pagefind postbuild)
pnpm preview      # preview built site
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Adding Content

**New post:** add `.md` or `.mdx` to `src/content/blog/`. Filename = URL slug.

Required frontmatter:

```yaml
title: '...' # max 80 chars
description: '...'
pubDate: 'Jan 01 2025'
heroImage: '../../assets/images/...'
category: 'Category 1' # must exist in src/data/categories.ts
tags: ['tag1', 'tag2']
draft: false
```

**New category:** add to `src/data/categories.ts` array before using in any post — Zod will throw a build error otherwise.

## Project Structure

```
src/
  components/       Astro UI components (Category, PostCard, Header, etc.)
  content/blog/     MDX/MD blog posts
  data/             Config: site, categories, social links, disqus
  layouts/          BaseLayout, BlogPost
  pages/            Astro pages (index, post/[slug], category, tags, rss)
  utils/            Helpers: getPosts, sluglify, readTime, cn
  styles/           global.css
public/             Static assets (favicon, og image, fonts, robots.txt)
```

## Notes

- The `Category.astro` component currently has " taoufiq" appended to category names — this is a leftover test string, likely to be removed.
- `src/data/site.config.ts` still has placeholder `author: 'Your Name'` — needs to be updated.
- Social links in `src/data/links.ts` still point to the upstream template repo, not the owner's actual profiles.
- Cloudflare env vars (TinaCMS tokens) are set in the Pages dashboard, not in `wrangler.toml`.
