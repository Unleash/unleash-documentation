# SVG diagram author

Use this skill when creating or editing hand-authored SVG diagrams for documentation pages (`fern/assets/*.svg`).

## Brand colors

These are the SVG diagram colors. Each color must mean one thing consistently across all diagrams on a page.

| Color | Hex | Use for |
|-------|-----|---------|
| Purple | `#817AFE` | Accent and hero elements: the main line or curve the diagram is about, trunk lines. Matches the site accent in `docs.yml`. |
| Orange | `#EB5600` | Bad or warning only: risks, failures, anti-patterns. Never for neutral emphasis. |
| Highlight green | `#A0E3AB` | Positive highlight fills: chips, badges, the elements the diagram singles out. |
| Dark green | `#1A4049` | Text on highlight green fills; pairs with `#A0E3AB`. Not for outlines, it reads as navy blue at stroke widths. |
| Text | `#1A1924` | Headings and lane labels. |
| Muted text | `#6E6D76` | Annotations and captions. |
| Muted lines | `#A9A7B4` | Secondary lines, axes, unrelated data points, brackets. |
| Border | `#DCDAE7` | Card borders and subtle dividers. |
| Soft purple | `#F1F0FE` | Fill behind purple text chips. |
| Card background | `#F7F7FA` | The baked-in diagram background; see the background rule below. |

## Style rules

- **Flat shapes**: solid fills without outlines for chips, badges, and dots. Reserve strokes for lines, curves, and brackets, not shape borders.
- **Sentence case for labels** ("Feature complete", "High-risk merges", "Time"). Literal identifiers (branch names like `main`, flag names) keep their real casing.
- **No full sentences or full stops inside diagrams.** Labels and fragments only; keep text minimal. Explanation belongs in the page prose or the alt text.
- **Open arrowheads**, chevron strokes with round caps, not filled triangles:
  ```xml
  <marker id="axis-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M2 1 L9 5 L2 9" fill="none" stroke="#A9A7B4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker>
  ```
- **Bake in a light card background** so the diagram looks the same in light and dark mode: a full-size `<rect width="..." height="..." rx="12" fill="#F7F7FA"/>` as the first painted element, following `change-request-overview.svg`. SVGs embedded as images can't follow the site's theme toggle, so the diagram carries its own backdrop and renders as a light card on both themes. Embed with a plain Markdown image, no `<Frame>`; the card replaces the frame.
- **Canvas around 880px wide**; font sizes 15px for labels, 17 to 19px bold for lane and panel titles.
- **One visual hierarchy**: mute supporting elements (gray lines, gray dots) so the single hero element (purple) carries the eye.
- **Set `role="img"` and a descriptive `aria-label`** on the root `<svg>`, and keep it in sync with the Markdown image alt text.

## Sen font

Embed the Sen font in each SVG so it renders correctly inside `<img>` contexts, where page CSS fonts don't apply. The woff2 is only 22 KB, so a data URI is fine:

```xml
<style>
  @font-face {
    font-family: 'Sen';
    src: url(data:font/woff2;base64,BASE64_OF_fern/fonts/Sen-VariableFont_wght.woff2) format('woff2');
    font-weight: 400 800;
  }
  text { font-family: 'Sen', 'Helvetica Neue', Arial, sans-serif; }
</style>
```

Generate the base64 from `fern/fonts/Sen-VariableFont_wght.woff2` with a small build script rather than hand-editing the SVG. Reference examples: `fern/assets/trunk-based-development-branching.svg` and `fern/assets/trunk-based-development-deploy-release.svg`.

## Verifying

Render a preview with headless Chrome before shipping; Quick Look does not load embedded fonts and gives misleading output:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --screenshot=preview.png --window-size=920,460 --default-background-color=FFFFFFFF \
  "file:///path/to/diagram.svg"
```
