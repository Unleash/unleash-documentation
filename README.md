<a href="https://getunleash.io" title="Unleash - Empowering developers to release with confidence">
    <img src="./.github/github_header_opaque_landscape.svg" alt="Unleash logo banner">
</a>

# Unleash Documentation
## What is Unleash?

Unleash is a powerful open-source solution for feature management. It streamlines your development workflow, accelerates software delivery, and empowers teams to control how and when they roll out new features to end users. With Unleash, you can deploy code to production in smaller, more manageable releases at your own pace.

Feature flags in Unleash let you test your code with real production data, reducing the risk of negatively impacting your users' experience. It also enables your team to work on multiple features simultaneously without the need for separate feature branches.

Unleash is the most popular open-source solution for feature flagging on GitHub. It supports 15 official client and server SDKs and over 15 community SDKs. You can even create your own SDK if you wish. Unleash is compatible with any language and framework.

**[Try Unleash Enterprise for free](https://www.getunleash.io/plans/enterprise-payg)**

## About this repository

This repository contains the source code for the official [Unleash documentation](https://docs.getunleash.io), powered by [Fern](https://buildwithfern.com/).

## Quickstart

### Prerequisites
- Node.js 20+

To get the documentation environment running locally, follow these steps:

### Clone the repository

```bash
git clone https://github.com/Unleash/unleash-documentation.git
cd unleash-documentation
```
### Install dependencies

```bash
npm install
```

### Install the Fern CLI

```bash
npm install -g fern-api
```

### Start the development server

```bash
npm run dev
```

Once the server starts, you can view the documentation at `http://localhost:3000`.

### Command reference

| Command | Action |
| --- | --- |
| `npm run dev` | Fetches latest specs, builds the custom footer, and starts the dev server. |
| `fern docs dev` | Starts the dev server directly (does not fetch spec or build the footer). |
| `npm run fetch` | Updates the local `openapi.json` files from the hosted instance. |
| `npm run build:footer` | Recompiles the React-based custom footer. |
| `fern check --strict-broken-links` | Validates the documentation and fails on broken links. |

## Architecture and tooling

Our docs stack has the following components:
- **Engine**: [Fern](https://buildwithfern.com/).
- **API specs**: OpenAPI spec fetched dynamically from the Unleash instance.
- **Custom components**: React + Vite (for the custom footer).

### API structure

To keep our API reference navigable, we split the main Unleash OpenAPI spec into three distinct domains:

- **Client API** (`fern/apis/client-api/`): Contains only endpoints with the "Client" tag.
- **Frontend API** (`fern/apis/frontend-api/`): Contains only endpoints with the "Frontend API" tag.
- **Admin API** (`fern/apis/admin-api/`): Contains all remaining endpoints (excludes Client and Frontend API tags).

## Custom footer

The footer is a standalone React component. If you modify the code in `footer/src/`, you must rebuild it to see changes in the preview.

```bash
npm run build:footer
```

## Contributing

We welcome contributions to the Unleash documentation. If you find something that's wrong, unclear, or missing, feel free to open an issue or submit a pull request.

To contribute:

1. Fork and clone this repository.
2. Create a new branch for your changes.
3. Run the dev server locally to preview your changes using `npm run dev`.
4. Submit a pull request to this repository.

For contributions to the Unleash product itself, see the main [Unleash repository](https://github.com/Unleash/unleash).

## Migration history

This documentation was migrated to its own repository on 2 February 2026. It previously lived in the `website` folder of the main [Unleash repository](https://github.com/Unleash/unleash).

You can find the commit history prior to the migration date in the [`Unleash/unleash`](https://github.com/Unleash/unleash) repository.
