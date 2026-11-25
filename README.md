# Harjot Singh Makkar - Infrastructure Engineering Portfolio

Production portfolio and technical architecture writing for Harjot Singh Makkar, Cloud SRE and Infrastructure Engineer.

- Live site: https://harjotmakkar.dev
- Repository: https://github.com/harjot322/HarjotMakkar-Portfolio

## Overview

The site presents production engineering case studies and technical articles focused on Kubernetes platform operations, GitOps delivery pipelines, cloud infrastructure automation, and site reliability engineering.

### Content

- Case Studies (`/work`): In-depth architecture breakdowns covering zero-downtime AKS migrations, Envoy Gateway adoption via Gateway API, multi-account AWS inventory aggregation (400+ accounts), OpenSearch disaster recovery verification pipelines, and batch storage optimizations.
- Technical Articles (`/blog`): Operational deep-dives on GitOps trunk-based delivery rulesets, Wiz shift-left security enforcement, AWS IAM cross-account role assumption, and production monitoring.
- Interactive Scheduling (`/about` and `/`): Direct booking integration via Cal.com.
- Newsletter (`/blog`): Technical subscription capture via Aveiro.
- Resume (`/resume`): ATS-optimized engineering resume with direct PDF export.

## Architecture and Tech Stack

- Framework: Next.js 16 (App Router, static site generation)
- Edge Runtime: Cloudflare Workers using OpenNext (@opennextjs/cloudflare)
- Asset Delivery: Cloudflare global edge CDN with pre-rendered directory-based static assets (sub-20ms edge latency)
- Design System: Once UI with SCSS modules and tokenized styling
- Content Engine: MDX with KaTeX math rendering and aspect-ratio preserved SVG diagrams
- Language: TypeScript 5.8

## Local Development

Prerequisites: Node.js 20+

1. Install dependencies:
```bash
npm install
```

2. Run local development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

3. Run TypeScript type checks:
```bash
npx tsc --noEmit
```

## Production Build and Deployment

The project builds via OpenNext for Cloudflare Workers.

1. Build worker bundle and prepare static assets:
```bash
npm run build:worker
```

This command runs the prebuild post cache generator, compiles Next.js pages into static HTML and RSC payloads, bundles the OpenNext worker, and copies directory index assets into `.open-next/assets/`.

2. Deploy via Wrangler:
```bash
npx wrangler deploy
```

Continuous deployment is handled automatically via Cloudflare Workers GitHub integration. Pushes to the `master` branch deploy to `https://harjotmakkar.dev`.

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0). See the [LICENSE](./LICENSE) file for details.
