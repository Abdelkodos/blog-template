# Tutorial Reviews — Project Guide

## What This Is

A personal blog and learning library called **Tutorial Reviews** (`https://tutoreviews.com`) built on the [OpenBlog](https://github.com/danielcgilibert/blog-template) Astro theme. Deployed to **Cloudflare Pages** via `wrangler`.

**Author:** Abdelkouddouss Mekkaoui — [LinkedIn](https://www.linkedin.com/in/abdelkouddouss-mekkaoui/)

## Stack

- **Astro 4** + TypeScript — framework
- **Tailwind CSS 3** + clsx + tailwind-merge — styling
- **Logigroup Design System** — custom CSS + Tailwind plugin (see section below)
- **Appwrite** (`node-appwrite`) — backend/database for the Learning Library
- **TinaCMS** — optional headless CMS for authoring blog posts
- **Pagefind** — static search (runs as a postbuild step: `pagefind --site dist`)
- **pnpm** — package manager (use pnpm, not npm/yarn)
- **Cloudflare Pages** — hosting (project name: `tutoreviews`)

## Key Config Files

| File                        | Purpose                                                              |
| --------------------------- | -------------------------------------------------------------------- |
| `src/data/site.config.ts`   | Site metadata (title, author, description, lang, pagination)         |
| `src/data/categories.ts`    | Blog categories for MDX posts (Zod-validated — add here first)       |
| `src/data/links.ts`         | Social links (currently LinkedIn only)                               |
| `src/data/disqus.config.ts` | Disqus comments config                                               |
| `src/lib/appwrite.ts`       | Appwrite client + database/collection IDs                            |
| `.env`                      | Appwrite credentials (APPWRITE_ENDPOINT, PROJECT_ID, API_KEY, DB_ID) |
| `wrangler.toml`             | Cloudflare Pages deployment config                                   |
| `tailwind.config.cjs`       | Extended Tailwind config with Logigroup design system                |

## Commands

```bash
pnpm dev          # dev server at localhost:4321 (TinaCMS + Astro)
pnpm build        # production build → ./dist (runs pagefind postbuild)
pnpm preview      # preview built site
pnpm lint         # ESLint
pnpm format       # Prettier
```

## Appwrite Backend

The Learning Library section uses **Appwrite** as a headless backend. The client is configured in `src/lib/appwrite.ts`.

### Database Collections

| Collection         | ID               | Purpose                              |
| ------------------ | ---------------- | ------------------------------------ |
| **categories**     | `categories`     | Hierarchical topic categories (tree) |
| **learning_posts** | `learning_posts` | Tutorial reviews and news articles   |

### Category Schema (`Category`)

| Field            | Type              | Description                              |
| ---------------- | ----------------- | ---------------------------------------- |
| `title`          | string            | Display name                             |
| `handle`         | string            | URL-safe slug (also used for parent ref) |
| `description`    | string (optional) | Short description                        |
| `parentCategory` | string (optional) | Handle of parent category (null = root)  |

### LearningPost Schema

| Field           | Type              | Description                        |
| --------------- | ----------------- | ---------------------------------- |
| `title`         | string            | Post title                         |
| `description`   | string            | Summary                            |
| `pubDate`       | string            | Publication date                   |
| `type`          | enum              | `tutorial-review` or `news`        |
| `categories`    | string[]          | Array of category handles          |
| `draft`         | boolean           | Draft flag                         |
| `provider`      | string (optional) | e.g. "Scrimba"                     |
| `rating`        | number (optional) | Score out of 10 (for reviews)      |
| `takeaways`     | string (optional) | Key takeaways                      |
| `projectsBuilt` | string[]          | Projects built during the tutorial |
| `body`          | string (optional) | Full post body                     |

### Utility Functions (`src/utils/learn.ts`)

- `getAllCategories()` — fetch all categories from Appwrite
- `getLearnPosts(max?)` — fetch non-draft posts, sorted by date
- `getLearnPostById(id)` — fetch a single post
- `getRootCategories(all)` — filter to root-level categories
- `getChildCategories(parentHandle, all)` — get direct children
- `filterPostsByCategory(handle, posts)` — filter posts by category
- `buildCategoryPathMap(categories)` — build `{ $id → full/url/path }` map
- `buildPathToCategoryMap(categories, pathMap)` — reverse map `{ path → Category }`

## Learning Library Pages

The `/learn` section is a hierarchical file-browser-style interface for navigating categories and posts.

| Page               | File                              | Description                             |
| ------------------ | --------------------------------- | --------------------------------------- |
| `/learn`           | `src/pages/learn/index.astro`     | Root: category grid + latest posts      |
| `/learn/[...slug]` | `src/pages/learn/[...slug].astro` | Dynamic category pages with breadcrumbs |
| `/learn/post/[id]` | (linked from LearningPostCard)    | Individual post page                    |

### Key Components

| Component          | File                                    | Purpose                                 |
| ------------------ | --------------------------------------- | --------------------------------------- |
| `DirectoryTree`    | `src/components/DirectoryTree.astro`    | Recursive sidebar tree nav              |
| `LearningPostCard` | `src/components/LearningPostCard.astro` | Post card with type badge, rating, date |
| `TitlePage`        | `src/components/TitlePage.astro`        | Page title with decorative Shape icon   |

## Logigroup Design System

A comprehensive design system living in two places:

### 1. CSS Custom Properties + Components (`src/styles/logigroup.css`)

~1500 lines defining:

- **Design tokens** — brand colors (navy, blue, orange), neutrals, semantic colors, typography, radius, shadows, transitions
- **Base styles** — body, headings, links, code blocks, prose overrides
- **Component classes** — `.btn`, `.card`, `.badge`, `.alert`, `.input`, `.chip`, `.progress-*`, `.toggle-*`, `.toast`, `.navbar`, etc.
- **Dark mode** — full dark mode support via `.dark` class

### 2. Tailwind Plugin (`tailwind.config.cjs`)

Mirrors the CSS design system as Tailwind utilities:

- **Custom colors** — `navy`, `blue`, `orange`, `lgray`, `success`, `warning`, `danger`, `info`, `surface`, `muted`
- **Font families** — `font-display` (Outfit), `font-body` (DM Sans), `font-mono` (JetBrains Mono)
- **Custom font sizes** — `2xs` through `6xl` with tuned line-heights
- **Animations** — `fade-up`, `fade-in`, `slide-in`, `scale-in`, `pulse-blue`
- **Component classes** — registered via `addComponents()` and `addUtilities()`

### Usage

Import `logigroup.css` for CSS-first approach, or use Tailwind classes like `text-blue`, `bg-navy`, `btn btn-primary`, `card`, `badge-success`, etc.

## Blog (MDX) Content

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
  components/       Astro UI components (Header, Footer, DirectoryTree, etc.)
  components/icons/ SVG icon components (LinkedIn, Github, Shape, etc.)
  content/blog/     MDX/MD blog posts (Astro content collection)
  data/             Config: site, categories, social links, disqus
  layouts/          BaseLayout, BlogPost
  lib/              Appwrite client configuration
  pages/            Astro pages (index, learn/*, post/*, category/*, rss)
  utils/            Helpers: learn.ts (Appwrite), post.ts (blog), sluglify, readTime, cn
  styles/           global.css, logigroup.css (design system)
public/             Static assets (favicon, og image, fonts, robots.txt)
```

## Notes

- Cloudflare env vars (TinaCMS tokens, Appwrite keys) are set in the Pages dashboard, not in `wrangler.toml`.
- The `Category.astro` component may have leftover test strings — check before deploy.
- The blog's category system (`src/data/categories.ts`) is separate from the Learning Library categories (Appwrite). Header "Categories" nav links to `/learn`.

## Changelog

### 2026-04-21 — Session 2: Branding & documentation overhaul

**Files changed:**

- `src/data/site.config.ts`
  - Author → `Abdelkouddouss Mekkaoui`
  - Title → `Tutorial Reviews`
  - Description → updated from placeholder lorem ipsum

- `src/components/Footer.astro`
  - Author name is now a clickable link to LinkedIn (opens in new tab)

- `src/data/links.ts`
  - Commented out Github and Twitter (pointed to upstream template)
  - LinkedIn is now the only active social link, pointing to owner's profile

- `src/components/Header.astro`
  - "Categories" nav link now points to `/learn` (dynamic Appwrite categories) instead of `/tags`

- `CLAUDE.md`
  - Full rewrite: documented Appwrite backend, Learning Library pages, Logigroup design system, updated project structure

### 2026-04-21 — Session 1: Learning Library bug fixes

**Files changed:**

- `src/pages/learn/[...slug].astro`
  - Removed leftover `xxxxxx` test string from sub-category description
  - Fixed `pt-8` → `line-clamp-1` on sub-category descriptions
  - Fixed `-mt-4` → `mt-1` on category description paragraph
  - Added `relative z-10` to category description

- `src/components/TitlePage.astro`
  - Added `relative z-10` to the title container to fix stacking with Shape icon
