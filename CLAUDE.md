# Unleash Documentation

Official documentation for [Unleash](https://www.getunleash.io), powered by [Fern](https://buildwithfern.com/).

Live site: https://docs.getunleash.io

## Project structure

```
fern/
  docs.yml              # Fern config: navigation, tabs, colors, typography, redirects, footer
  styles.css            # Custom CSS overrides (layout, theming, footer, mountain backdrop)
  components/
    CustomFooter.tsx     # Footer component (SSR'd by Fern via footer: in docs.yml)
  pages/                # All content (MDX files)
    welcome.mdx         # Landing page (/)
    get-started/        # Quickstart, intro, architecture overview
    concepts/           # Core concepts (feature flags, projects, environments, etc.)
    deploy/             # Self-hosting, configuration, upgrading
    guides/             # Best practices, workflows, language-specific tutorials
    sdks/               # SDK documentation (backend/ and frontend/ subdirectories)
    enterprise-edge/    # Enterprise Edge deployment and configuration
    academy/            # Unleash Academy courses
    apis/               # API overview pages
    integrate/          # Integrations (Datadog, Slack, Jira, Terraform, etc.)
  apis/                 # OpenAPI specs (committed, updated by CI)
    admin-api/          # All endpoints except Client and Frontend
    client-api/         # Client-tagged endpoints only
    frontend-api/       # Frontend API-tagged endpoints only
  changelog/            # Release notes (Fern changelog tab)
  fonts/                # Custom Sen font
  assets/               # Logos, favicon, images
scripts/
  fetch-openapi.mjs     # Fetches OpenAPI specs from hosted Unleash instance
```

## Commands

| Command | What it does |
|---------|-------------|
| `fern docs dev` | Starts Fern dev server at localhost:3000 |
| `fern check --strict-broken-links` | Validates docs and checks for broken links |
| `node scripts/fetch-openapi.mjs` | Manually refreshes API specs |

## Fern verification requirement

For any technical changes involving Fern (configuration, CLI commands, features, or build processes):

1. Consult the official Fern documentation at https://buildwithfern.com/learn
2. Verify current Fern capabilities and syntax
3. Never assume Fern features or flags exist without verification
4. Check the Fern CLI changelog for recent updates

## Content format

All content is MDX in `fern/pages/`. Pages use YAML frontmatter:

```yaml
---
title: Page title
slug: /url-slug
description: SEO description
---
```

Navigation structure and tab placement are defined in `docs.yml`, not by the filesystem.

Fern components available in MDX: `<Note>`, `<Warning>`, `<Tip>`, `<Frame>`, `<Tabs>`, `<Tab>`, `<Steps>`, `<Accordion>`, `<AccordionGroup>`, `<Card>`, `<CardGroup>`, `<CodeBlock>`.

### Availability badges

To mark a feature as Beta (or another availability state), use the Fern badge span, not a `<Note>` or prose. Place it on its own line right after the heading, or inline after a list item's bold label:

```html
<span data-badge-type="availability" title="Beta" class="fern-docs-badge large blue subtle rounded-full">Beta</span>
```

Used across SDK pages and other documentation pages where feature availability needs to be highlighted.

### Tabs

The site has 7 tabs: Docs, APIs, SDKs, Enterprise Edge, Guides, Academy, Release notes. Each tab's navigation tree is defined under `navigation:` in `docs.yml`.

### API reference

The OpenAPI spec is split into 3 domains to keep the API reference navigable:
- **Admin API** — all endpoints except Client and Frontend
- **Client API** — Client-tagged endpoints only
- **Frontend API** — Frontend API-tagged endpoints only

## Writing standards

- Follow the [Google Developer Documentation Style Guide](https://developers.google.com/style)
- Write in second person (you, your), active voice, present tense, tailored to a technical audience
- Sentence-case headings: "Getting started", not "Getting Started"
- No emojis, no marketing language
- Short paragraphs, use line breaks and headings for readability
- Use ordered lists for sequences, unordered for non-sequential items

## Custom CSS

CSS architecture, specificity strategy, breakpoints, and dark mode conventions are documented in the `/custom-css-mingling` skill (`.claude/skills/custom-css-mingling.md`). Use that skill when working on styling.
