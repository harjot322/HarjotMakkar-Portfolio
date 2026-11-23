# Harjot Singh Makkar — Portfolio

Personal portfolio and technical writing site for **Harjot Singh Makkar**, Cloud SRE & Infrastructure Engineer.

Built with [Once UI](https://once-ui.com) for Next.js (magic-portfolio template).

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: Once UI
- **Content**: MDX (blog posts and work case studies)
- **Styling**: SCSS modules + Once UI design tokens

## Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Run dev server**
```bash
npm run dev
```

**3. Edit personal info**
```
src/resources/content.tsx       — name, bio, experience, skills
src/resources/once-ui.config.ts — domain, theme, routes
```

**4. Add blog posts / case studies**
```
src/app/blog/posts/*.mdx        — technical writing
src/app/work/projects/*.mdx     — project case studies
```

**5. Add your resume PDF**
```
public/myself/HarjotSinghMakkar2026updated.pdf
```

## Project Structure

```
src/
  app/
    page.tsx              — Homepage
    about/page.tsx        — About / CV
    work/                 — Case studies
    blog/                 — Technical writing
    resume/page.tsx       — Résumé page
    gallery/page.tsx      — Gallery
  resources/
    content.tsx           — All personal content (single source of truth)
    once-ui.config.ts     — Theme, routes, SEO config
  components/             — Layout components (Header, Footer, etc.)
public/
  images/                 — Project images, gallery, og images
```

## Deployment

Recommended: [Vercel](https://vercel.com) — connect this repo and deploy.

Set these env vars for password protection (optional):
```
PAGE_ACCESS_PASSWORD=...
PAGE_ACCESS_SECRET=...
```
