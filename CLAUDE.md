# CSS Architecture Guide for Unleash Documentation

Instructions and gotchas for working on the custom CSS in this Fern-powered documentation site.

## Key Files

- `fern/styles.css` — Main custom stylesheet. Overrides Fern's defaults for theming, layout, landing page, academy, and the mountain backdrop.
- `fern/docs.yml` — Fern configuration. Defines colors, typography, navbar links, layout, redirects. CSS/JS files are registered here.
- `footer/src/main.css` — Footer component styles (source). Must run `npm run build:footer` after changes to recompile into `fern/footer-dist/`.
- `fern/footer-dist/output.css` + `output.js` — Compiled footer assets. Do not edit directly.

## Fern CSS Overriding — How It Works

Fern uses Tailwind CSS internally. Custom styles in `styles.css` override Fern's defaults, which often requires `!important` because Fern's utility classes have high specificity.

### Stable Fern Selectors

Always prefer Fern's documented CSS selectors over targeting internal Tailwind classes. Full reference: https://buildwithfern.com/learn/docs/customization/css-selectors-reference

Key layout selectors:
- `.fern-layout-guide` — Guide/docs page layout (the white rounded container)
- `.fern-layout-reference` — API reference layout
- `.fern-layout-page` — Page container within layouts
- `#fern-header` — Site header
- `.fern-header-tabs` — Navigation tabs (Docs, APIs, SDKs, etc.)
- `#fern-sidebar` — Left navigation sidebar
- `.fern-sidebar-link[data-state="active"]` — Active sidebar link
- `.fern-page-actions` — Page action buttons (copy page, etc.)
- `.fern-card` — Card components
- `.fern-anchor` / `.fern-anchor-icon` — Heading anchor links
- `.fern-breadcrumb` — Breadcrumb navigation
- `.fern-button.minimal` / `.fern-button.filled` — Navbar link types

Fern's built-in CSS custom properties: `--accent-*`, `--grayscale-*`, `--background`, `--card-background`, `--border`, `--sidebar-background`, `--header-background`, `--header-height`.

### Gotcha: Never Target Tailwind Utility Classes

Fern's internal markup uses Tailwind classes like `.flex`, `.w-full`, `.space-y-1`, etc. These are implementation details and **will change between Fern versions**. Use structural selectors (`> div:first-child`, `.card-icon ~ div`) or Fern's documented classes instead.

### Gotcha: `!important` Is Sometimes Unavoidable

Fern applies styles via Tailwind utilities which have high specificity. Some overrides genuinely require `!important`. Before adding one, try specificity boosting first (e.g., `#fern-header#fern-header a` or `.fern-card.fern-card`). If that doesn't work, `!important` is acceptable — just add a comment explaining why.

## Dark Mode

Fern uses `.dark` and `.light` classes on the `<html>` element. Always use these for dark/light mode selectors:

```css
/* Correct */
.dark .my-element { ... }
.light .my-element { ... }

/* Wrong — legacy patterns, do not use */
html[data-theme="dark"] .my-element { ... }
html.dark .my-element { ... }
html:not([data-theme="dark"]) .my-element { ... }
```

## Responsive Layout Strategy

The layout uses three breakpoint tiers tied to Fern's behavior:

### Fern's Key Breakpoints

- **1024px** — The critical breakpoint. The sidebar collapses to a mobile overlay AND the header tabs expand into a dropdown panel between the header and `main`. This is where our z-index and mountain strategies must adapt.
- **768px** — Secondary breakpoint. Below this, we hand full layout control back to Fern.
- **640px** — Minor Fern breakpoint (button heights, font sizes). Not used by our custom CSS.

### `main` Element — Breakpoint-Specific Styles

| Viewport    | `z-index`         | `gap` | `padding`                    | Mountain |
|-------------|-------------------|-------|------------------------------|----------|
| >1024px     | `1 !important`    | 16px  | `padding-right: 16px`       | Visible  |
| 769–1024px  | `auto !important` | 16px  | `padding-left/right: 16px`  | Hidden   |
| <=768px     | `auto !important` | reset | reset (Fern handles it)      | Hidden   |

### Floating Container — Breakpoint-Specific Styles

| Viewport   | `margin-top` | `border-radius` | Side margins |
|------------|--------------|-----------------|--------------|
| >1024px    | 2rem         | 0.75rem         | None (main padding provides edge spacing) |
| 769–1024px | 1rem         | 0.75rem         | None (main padding provides edge spacing) |
| <=768px    | 1rem         | 0.5rem          | 8px left/right |

### Why `gap` and `padding` on `main`

Fern's `main` is a flex container with children: sidebar, content area, and ToC. Our custom spacing uses:
- **`gap: 16px`** — Creates space between flex siblings (sidebar↔content, content↔ToC)
- **`padding-right: 16px`** — Creates space between the last flex child and the viewport's right edge. `gap` does NOT create this edge spacing.
- **`padding-left: 16px`** (at <=1024px) — Once the sidebar collapses, the content becomes the first flex child and needs left-edge spacing too.
- **Reset at <=768px** — Below this width, our gap/padding interferes with Fern's responsive ToC behavior (the ToC stacks below content). Resetting lets Fern manage the layout. Small container margins (8px) preserve the floating-card look.

## Mountain Backdrop — Z-Index Architecture

The mountain texture in the bottom-right corner uses `body::after` with `position: fixed`.

### The Z-Index Problem

Fern's `<main>` element has Tailwind class `z-0` (z-index: 0). For the mountain to render behind content, main needs `z-index: 1`. But at <=1024px, Fern's header tabs expand into a dropdown panel that sits between `#fern-header` and `main` in the DOM. If main has `z-index: 1`, it creates a stacking context that renders above this tabs panel, making the tabs unclickable/invisible.

### The Solution: Breakpoint-Dependent Z-Index

- **>1024px**: Mountain visible at `z-index: 0`, main at `z-index: 1 !important`, footer at `z-index: 1`.
- **<=1024px**: Mountain hidden (`display: none`), main at `z-index: auto !important` (no stacking context), tabs panel renders normally above main.

This trade-off hides the mountain on tablet/mobile (where it was already small) in exchange for correct tab panel behavior.

### Approaches That Don't Work

1. **`z-index: -1` on the mountain** — Puts the mountain behind `#fern-docs`, which has an opaque `background-color`. The mountain becomes invisible.
2. **Fern's `background-image` config in `docs.yml`** — Renders a full-page `background-size: cover` image via `.fern-background-image`. Designed for wallpaper backgrounds, not decorative corner elements. Breaks header/navigation.
3. **`position: relative` on `#fern-header`** — Overrides Fern's `position: sticky`, removing the sticky behavior and creating a gap below the header (because `main` still has `margin-top: var(--header-height)` to account for the sticky header). Never set `position` on `#fern-header`.
4. **`z-index: 2` on `.fern-header-tabs` without `!important`** — Fern's own styles win the specificity battle. Adding `!important` helps, but the real fix is removing the stacking context from main.
5. **`theme.body: canvas` in `docs.yml`** — Fern's canvas mode wraps the content area in a `.canvas-wrapper` element with a card-like background (using the `card-background` color). However, the wrapper is a flex child of `main` alongside the sidebar, so: (a) it can't be centered on the page — `margin: auto` only centers within the flex slot after the sidebar, not relative to the viewport; (b) `max-width` creates asymmetry — the wrapper hugs the left edge of its slot, leaving excess space only on the right; (c) the wrapper includes the ToC, making it wider than our desired container which wraps only the content. Styling `.fern-layout-guide` directly gives us precise control over just the content area, which is what we need.

## Known Issue: Heading Anchor Icon Partially Hidden

The anchor/link icon that appears on hover over headings (h2, h3, etc.) is partially obscured by the left edge of the `.fern-layout-guide` container's rounded corner and background. The icon is not a standard DOM element — it's generated by Fern internally (likely via CSS pseudo-element or JS injection on hover), which makes it impossible to inspect in DevTools or target with CSS selectors.

What we know:
- Searching the DOM for `.fern-anchor` or `[class*="anchor"]` returns no elements — the only "anchor" match is inside a bundled JS string
- Forcing `:hover` state in DevTools does not make the element appear in the DOM tree
- The icon appears to render in the left gutter area where the container's `border-radius` and `background-color` clip over it
- Attempting to style `.fern-anchor` or `.fern-anchor-icon` globally has previously broken Fern's Steps component, which also uses anchor/copy icons

This is a pre-existing issue that predates the CSS refactor. A potential fix would require Fern to expose the anchor element in a targetable way, or adjusting the container's left padding to give the anchor room. Parking this for now.

## The Floating Container Design

`.fern-layout-guide` and `.fern-layout-reference .fern-layout-page` are styled as white cards with rounded corners floating over the gray page background. This is a key design element that is preserved at all viewport widths:

- Desktop: Full rounded corners (0.75rem) and shadow
- Tablet: Same styling, reduced top margin
- Mobile: Reduced rounding (0.5rem), 8px side margins for edge spacing

## Navbar Links

Navbar links are configured in `docs.yml` under `navbar-links`. They render as:
- `type: github` → `.fern-button.minimal` (with extra `h-10` class, but don't target that — it's Tailwind)
- `type: minimal` → `.fern-button.minimal`
- `type: filled` → `.fern-button.filled`

Since both `github` and `minimal` types share the `.fern-button.minimal` class, use `:not([href*="github"])` to exclude the GitHub button when styling only the text links.

## Academy Section

The Academy section uses custom HTML components in MDX with custom CSS classes (`unleash-academy-*`). Variables are namespaced as `--academy-*` (previously `--ifm-*` from the Docusaurus migration). These are self-contained — defined and consumed within the Academy section only.

## Footer

The footer is a standalone React + Vite component in `footer/src/`. After editing footer source files:

```bash
npm run build:footer
```

This compiles to `fern/footer-dist/output.css` + `output.js`. The footer uses its own CSS custom properties and supports dark mode via `.dark` class.

## Testing Checklist

When modifying CSS, test these pages at the breakpoints below in both light and dark mode:

**Breakpoints to test:** 1440px, 1089px (tabs just expanded), 768px, 642px, 375px

**Pages to test:**
1. Landing page (`/`) — hero, cards, card hover states
2. Guide page (`/get-started/quickstart`) — floating container, sidebar, ToC, spacing
3. API reference page (`/api`) — reference layout, two-column grid
4. Academy page (`/unleash-academy`) — banner, course cards, badges, buttons

**Specific checks:**
- Mountain backdrop — visible at >1024px in bottom-right, behind all content. Hidden at <=1024px.
- Expanded tabs panel — at <=1024px, clicking a tab section should show the full navigation panel above the content (not behind it).
- Container edge spacing — at all widths, the white container should have visible space between it and the viewport edges. No content should be cut off.
- Footer — renders above mountain at desktop. Proper spacing at all widths.

## Useful Links

- Fern CSS selectors reference: https://buildwithfern.com/learn/docs/customization/css-selectors-reference
- Fern docs.yml reference: https://buildwithfern.com/learn/docs/configuration/site-level-settings
- Fern page-level settings: https://buildwithfern.com/learn/docs/configuration/page-level-settings
- Fern redirects: https://buildwithfern.com/learn/docs/seo/redirects
- Fern custom CSS/JS: https://buildwithfern.com/learn/docs/customization/custom-css-js
