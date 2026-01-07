# Unleash Documentation

Work in progress. This repository contains the Unleash documentation built with Fern.

## Prerequisites

- Node.js 20+
- Fern CLI (installed globally):

```bash
npm install -g fern-api
```

## Local development

Start the local development server (automatically fetches latest API spec):

```bash
npm run dev
```

This will:
1. Fetch the latest OpenAPI spec from the hosted Unleash instance
2. Save it to `fern/openapi.json`
3. Start the dev server at `http://localhost:3000`

### Manual commands

If you need to run commands separately:

```bash
# Fetch OpenAPI spec only
npm run fetch

# Start dev server without fetching
fern docs dev

# Build docs (with automatic fetch)
npm run build
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

