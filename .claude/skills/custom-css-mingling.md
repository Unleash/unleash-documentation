# Custom CSS for Unleash Docs

This site is powered by [Fern](https://buildwithfern.com/), which uses Tailwind internally. We override Fern's defaults via `fern/styles.css`.

## Key files

- `fern/styles.css` — All custom CSS. Overrides Fern for theming, layout, landing page, footer, and mountain backdrop.
- `fern/docs.yml` — Fern config. Colors, typography, navbar links, layout, redirects. Also registers the footer component.
- `fern/components/CustomFooter.tsx` — Footer component. SSR'd by Fern via `footer:` in `docs.yml`. Styled by CSS classes in `styles.css`.

## Specificity strategy

Use **specificity boosting** instead of `!important`, such as:
1. **ID selectors** — `#fern-header .fern-button.filled` → specificity (1,2,0)
2. **Doubled class selectors** — `.unleash-academy-links.unleash-academy-links` → (0,2,0)
3. **Doubled ID selectors** — `#fern-sidebar#fern-sidebar` → (2,0,0)
4. **Context-adding prefixes** — `.fern-button.cta-button` → (0,2,0). Equal specificity wins because our sheet loads after Fern's.

When you double a selector, double it in every media query too. Otherwise the base rule's higher specificity wins over the unmatched media query.

```css
/* Base: (0,2,0) */
.landing-page.landing-page { padding-left: 4rem; }

/* WRONG: (0,1,0) — base wins */
@media (max-width: 768px) { .landing-page { padding-left: 1.5rem; } }

/* CORRECT: (0,2,0) — later in file, wins */
@media (max-width: 768px) { .landing-page.landing-page { padding-left: 1.5rem; } }
```

## Fern selectors

Always use Fern's documented selectors, never Tailwind utility classes (`.flex`, `.w-full`, etc.) — those may change between Fern versions.

Key selectors:
- `.fern-layout-guide` — Guide page layout (the white floating container)
- `.fern-layout-reference` / `.fern-layout-page` — API reference layout
- `#fern-header` / `.fern-header-tabs` — Header and navigation tabs
- `#fern-sidebar` — Sidebar
- `.fern-card` — Cards
- `.fern-button.minimal` / `.fern-button.filled` — Navbar link types
- `.fern-sidebar-link[data-state="active"]` — Active sidebar link

Fern's CSS custom properties: `--accent-*`, `--grayscale-*`, `--background`, `--card-background`, `--border`, `--sidebar-background`, `--header-background`, `--header-height`.

Full reference: https://buildwithfern.com/learn/docs/customization/css-selectors-reference

## Dark mode

Fern uses `.dark` / `.light` classes on `<html>`. Always use:

```css
.dark .my-element { ... }
.light .my-element { ... }
```

Never use `html[data-theme="dark"]`, `html.dark`, or `html:not([data-theme="dark"])`.

## Breakpoints

Fern's key breakpoint is **1024px** — the sidebar collapses and header tabs become a dropdown panel. This is where the mountain backdrop and z-index strategy also adapts. Below **768px**, we reset custom gap/padding on `main` and let Fern handle layout.

## Mountain backdrop

Decorative mountain texture in the bottom-right corner, rendered via `body::after` with `position: fixed`.

**The z-index trade-off:** Fern's `main` has Tailwind `z-0`. The mountain needs to render behind content, so `main` gets `z-index: 1`. But at <=1024px, Fern's header tabs dropdown sits between `#fern-header` and `main` — if `main` has a stacking context, it covers the tabs. So we hide the mountain and reset `main` to `z-index: auto` at <=1024px.

## Learning Lab

The Learning Lab pages use Fern's native `<CardGroup>` / `<Card>` components with **no custom CSS** — card images render with Fern's defaults. The old `unleash-academy-*` / `--academy-*` styling was removed when Academy became the Learning Lab and courses moved to an external LMS.

## Theme config in `docs.yml`

Prefer Fern config over custom CSS when possible:

```yaml
colors:
  background:
    light: "#EAEAED"
    dark: "#1A1924"
theme:
  sidebar: minimal
  page-actions: toolbar
```