# vinayprotfolio

Personal portfolio and blog for [Vinaykumar V A](https://vinaycharlie01.github.io/).

Built with [VitePress](https://vitepress.dev) so all content — work history,
projects, and blog posts — lives in Markdown under `src/`.

## Layout

- `src/index.md` — single-page home (About, Work, Projects, Find Me)
- `src/blog/*.md` — blog posts (Go, Kubernetes, CLI tooling)
- `.vitepress/config.ts` — site config, nav, SEO
- `.vitepress/blog.data.ts` — builds the blog list from post frontmatter
- `.github/workflows/deploy.yml` — builds and publishes to `vinaycharlie01.github.io`

## Development

Requirements: Node.js 22+.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Deployment

Push to `main`. The workflow builds the site and pushes `.vitepress/dist/` to
`vinaycharlie01/vinaycharlie01.github.io`.

Requires a `PAGES_TOKEN` secret — a fine-grained personal access token with
Contents: read and write on `vinaycharlie01/vinaycharlie01.github.io`.

## Adding a blog post

Create `src/blog/your-post.md` with frontmatter:

```yaml
---
title: My post
description: A short summary shown on the blog index.
author: vinaykumar
date: 2026-10-31
tags: ['go', 'kubernetes']
---
```

The blog index picks it up automatically and sorts by date.
