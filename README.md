# Unleash Documentation

Work in progress. This repository contains the Unleash documentation built with Fern.

## Prerequisites

Install the Fern CLI globally:

```bash
npm install -g fern-api
```

## Local development

Start the local development server:

```bash
fern docs dev
```

The dev server runs on `http://localhost:3000` by default. Use `--port` to specify a different port:

```bash
fern docs dev --port 8080
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

