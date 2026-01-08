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
2. Split it into three separate API definitions (see [API Structure](#api-structure))
3. Save them to `fern/apis/*/openapi.json`
4. Start the dev server at `http://localhost:3000`

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

## API Structure

The Unleash API documentation is split into three separate API definitions to enable better organization and URL structure:

### API Definitions

- **Client API** (`fern/apis/client-api/`): Contains only endpoints with the "Client" tag
- **Frontend API** (`fern/apis/frontend-api/`): Contains only endpoints with the "Frontend API" tag
- **Admin API** (`fern/apis/admin-api/`): Contains all remaining endpoints (excludes Client and Frontend API tags)

### How It Works

The `scripts/fetch-openapi.mjs` script:

1. Fetches the complete OpenAPI spec from `https://us.app.unleash-hosted.com/ushosted/docs/openapi.json`
2. Filters the spec by OpenAPI tags to create three separate files:
   - `filterOpenApiSpec(data, ['Client'])` → `fern/apis/client-api/openapi.json`
   - `filterOpenApiSpec(data, ['Frontend API'])` → `fern/apis/frontend-api/openapi.json`
   - `filterOpenApiSpec(data, null, ['Client', 'Frontend API'])` → `fern/apis/admin-api/openapi.json`
3. Strips image markdown (`![Unleash Enterprise]` and `![Beta]`) that doesn't work in Fern
4. Replaces server URL with `https://app.unleash-instance.example.com`

### Benefits

This approach allows:
- **Flat URL structure**: Endpoints appear at `/api/endpoint-name` instead of `/api/tag-name/endpoint-name`
- **Granular organization**: Each API can have custom sections and layouts in `docs.yml`
- **Clear separation**: Client, Frontend, and Admin APIs are logically separated
- **Single source**: All three APIs are generated from the same upstream OpenAPI spec

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

