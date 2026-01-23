# Unleash Documentation

Work in progress. This repository contains the Unleash documentation built with Fern.

## Prerequisites

- Node.js 20+
- Fern CLI (installed globally):

```bash
npm install -g fern-api
```

## Local development

Start the local development server:

```bash
npm run dev
```

This will:
1. Fetch the latest OpenAPI spec from the hosted Unleash instance
2. Split it into three separate API definitions (see [API Structure](#api-structure))
3. Save them to `fern/apis/*/openapi.json`
4. Build the custom footer component (see [Custom Footer](#custom-footer))
5. Start the dev server at `http://localhost:3000`

If you don't need to fetch the latest OpenAPI spec or rebuild the footer, you can run the Fern dev server directly for faster startup:

```bash
fern docs dev
```

### Manual commands

If you need to run commands separately:

```bash
# Fetch OpenAPI spec only
npm run fetch

# Build footer only
npm run build:footer

# Start dev server without fetching or building footer
fern docs dev

# Build docs (with automatic fetch and footer build)
npm run build
```

## API structure

The Unleash API documentation is split into three separate API definitions to enable better organization and URL structure:

### API definitions

- **Client API** (`fern/apis/client-api/`): Contains only endpoints with the "Client" tag
- **Frontend API** (`fern/apis/frontend-api/`): Contains only endpoints with the "Frontend API" tag
- **Admin API** (`fern/apis/admin-api/`): Contains all remaining endpoints (excludes Client and Frontend API tags)

### How it works

The `scripts/fetch-openapi.mjs` script:

1. Fetches the complete OpenAPI spec from `https://us.app.unleash-hosted.com/ushosted/docs/openapi.json`
2. Filters the spec by OpenAPI tags to create three separate files:
   - `filterOpenApiSpec(data, ['Client'])` → `fern/apis/client-api/openapi.json`
   - `filterOpenApiSpec(data, ['Frontend API'])` → `fern/apis/frontend-api/openapi.json`
   - `filterOpenApiSpec(data, null, ['Client', 'Frontend API'])` → `fern/apis/admin-api/openapi.json`
3. Strips image markdown (`![Unleash Enterprise]` and `![Beta]`) that doesn't work in Fern
4. Replaces server URL with `https://app.unleash-instance.example.com`

## Custom footer

We build a custom footer built with React. The footer source code is in `footer/src/` and is compiled to `fern/footer-dist/`.

### How it works

Fern supports [custom JavaScript and CSS](https://buildwithfern.com/learn/docs/customization/custom-css-js) that can replace or enhance the default components. The footer is built as a React component using Vite:

- **Source**: `footer/src/FernFooter.tsx` and `footer/src/main.css`
- **Output**: `fern/footer-dist/output.js` and `fern/footer-dist/output.css`
- **Config**: Referenced in `fern/docs.yml` under `css` and `js` sections

### Building the footer

The footer is built automatically when running `npm run dev` or `npm run build`. To build it manually:

```bash
npm run build:footer
```

Or directly:

```bash
cd footer && npm install && npm run build
```

## Validation

Check for errors and warnings (does not fail on broken links):

```bash
fern check --warnings --broken-links
```

Check with strict mode (fails on broken links):

```bash
fern check --strict-broken-links
```

## Preview and publishing

Generate a preview URL:

```bash
fern generate --docs --preview
```

