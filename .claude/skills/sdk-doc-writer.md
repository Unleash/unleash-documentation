# SDK documentation writer

Use this skill when writing or editing Unleash SDK documentation in `fern/pages/sdks/`.

## Key files

- `fern/pages/sdks/backend/*.mdx` — Backend SDK docs (Node, Java, Go, .NET, Ruby, Python, PHP, Rust)
- `fern/pages/sdks/frontend/*.mdx` — Frontend SDK docs (React, Vue, Svelte, Next.js, JavaScript, React Native, Android, iOS, Flutter)
- `fern/snippets/sdks/` — Reusable snippets shared across all SDK pages

## Reusable snippets

These snippets in `fern/snippets/sdks/` contain fixed wording shared across SDKs. Use `<Markdown src="..." />` to include them. If you need to change the wording, change the snippet file so all SDKs update together.

| Snippet | Purpose |
|---------|---------|
| `backend-intro.mdx` | Full backend intro: description, availability links, overview link. Takes `language` parameter. |
| `frontend-intro.mdx` | Full frontend intro: description, availability links, overview link. Takes `language` parameter. |
| `backend-singleton-warning.mdx` | "Create a single client instance..." warning for backend init sections. |
| `backend-connection.mdx` | `/api` endpoint + client API token instructions. |
| `frontend-connection.mdx` | `/api/frontend` endpoint + frontend API token instructions. |
| `impression-data-intro.mdx` | Impression data explanation for the Events section. |
| `impact-metrics.mdx` | Impact metrics explanation + link. |

## SDK page template

Not every section applies to every SDK. Skip sections that aren't relevant.
Comments in `[brackets]` are instructions, not content.

````mdx
---
title: [Language] SDK
description: Integrate feature flags in your [language] applications using the Unleash [language] SDK
og:site_name: Unleash
og:title: [Language] SDK
keywords: [language] SDK, feature flags, [other relevant keywords]
max-toc-depth: 3
---

[For backend SDKs:]
<Markdown src="/snippets/sdks/backend-intro.mdx" language="[Language]" />

[For frontend SDKs:]
<Markdown src="/snippets/sdks/frontend-intro.mdx" language="[Language]" />

[If this SDK needs additional context in the intro (unusual behavior,
framework integration, etc.), copy the intro snippet inline and adjust it.]

## Requirements

- [Language/runtime] [version] or later

[If certain features require a newer server version, note them inline
using the availability annotation.]

## Installation

[One sentence that tells the reader what they are installing. If the SDK
has required peer dependencies, name them. Examples:

"Install the SDK and its required peer dependency, `unleash-proxy-client`."
"Add the SDK to your project's dependencies."

Use `<Tabs>` when multiple package managers are available.]

<Tabs>
<Tab title="npm">
```bash
npm install [package-name]
```
</Tab>
<Tab title="yarn">
```bash
yarn add [package-name]
```
</Tab>
</Tabs>

## Initialization

[For backend SDKs:]

<Markdown src="/snippets/sdks/backend-singleton-warning.mdx" />

<Markdown src="/snippets/sdks/backend-connection.mdx" />

[For frontend SDKs — write one sentence that tells the reader what to do,
specific to the SDK. For example, React/Vue/Svelte SDKs wrap the app in a
provider component. Plain JavaScript SDKs create a client instance directly.]

<Markdown src="/snippets/sdks/frontend-connection.mdx" />

```[language]
[minimal initialization code]
```
[If the SDK has multiple initialization patterns (global instance, direct
construction, builder pattern), show the recommended approach first, then
alternatives as subsections.]

### Check if the SDK is ready

Until the SDK has synchronized with Unleash, all flags evaluate to `false`
unless you have a [bootstrapped configuration](#bootstrap).

[Show how to wait for the SDK to be ready using this SDK's pattern —
event listener, callback, await, or polling.]

```[language]
[ready/synchronized event or await example]
```

## Configuration options

[Document all configuration parameters.]

[Documented as parameter fields: https://buildwithfern.com/learn/docs/writing-content/components/parameter-fields]
[Use description, default, required, and optionally deprecated fields]

[If the SDK supports environment variables, add:]
Environment variable equivalents are listed in [Environment variables](#environment-variables).

## Check flags

[Show how to evaluate a flag. Use `isEnabled` or the SDK's equivalent.]

```[language]
[isEnabled example]
```

### Check variants

[Show how to get a variant. Explain what is returned when the flag is disabled
or has no variants (the disabled variant).]

```[language]
[getVariant example]
```

## Unleash context

[Explain what the context is and how to set it. Cover static context (set at init)
and dynamic context (set per request or per evaluation) where both are supported.
For frontend SDKs, cover updateContext and setContextField methods.]

```[language]
[context example]
```

## Stop the client

[Explain how to cleanly stop the SDK. Note whether a stopped client
can be restarted.]

```[language]
[stop/destroy example]
```

## Custom strategies

[Explain how to register a custom strategy. Include a minimal example.]

The SDK supports all [built-in activation strategies](/concepts/activation-strategies).
To add a custom strategy:

```[language]
[custom strategy example]
```

## Events

[Show how to subscribe to SDK events. Use a table to list all events
the SDK emits, then show a code example.]

| Event | Description |
|-------|-------------|
| `ready` | The SDK has received its initial flag configuration. |
| `error` | An error occurred, such as a failed network request. |
| [SDK-specific events] | ... |

```[language]
[event subscription example]
```

### Impression data

<Markdown src="/snippets/sdks/impression-data-intro.mdx" />

[Show how to subscribe to impression events.]

```[language]
[impression data example]
```

## Impact metrics

[If the SDK supports impact metrics, include this section. Otherwise skip it.]

<Markdown src="/snippets/sdks/impact-metrics.mdx" />

## Bootstrap

[Explain how to provide an initial flag state so the SDK can evaluate flags
before connecting to Unleash. Cover, if applicable, offline startup, cold start
latency, ephemeral environments. Use `<Tabs>` if the SDK supports multiple
bootstrap sources (data, file, URL).]

<Tabs>
<Tab title="Inline data">
```[language]
[bootstrap with inline data]
```
</Tab>
<Tab title="File">
```[language]
[bootstrap from file]
```
</Tab>
<Tab title="URL">
```[language]
[bootstrap from URL]
```
</Tab>
</Tabs>

## Local caching and offline behavior

[Explain how the SDK persists flag configuration between restarts. Cover the
storage mechanism (file, localStorage, custom provider) and how to configure
or disable it.]

## Environment variables

[If the SDK reads configuration from environment variables, list them here.
Use a table.]

| Variable | Description |
|----------|-------------|
| ... | ... |

## Outbound network proxy

[Backend SDKs only. Document how to route SDK traffic through a corporate
HTTP proxy. Cover environment variables (HTTP_PROXY, HTTPS_PROXY) and any
SDK-specific options.]

## Framework integration

[Document framework-specific setup where needed. Use `##` subheadings per
framework. Cover startup hooks, shutdown hooks, and forking behavior
(e.g., Puma, Passenger, Sidekiq for Ruby; Spring Boot for Java).]

## Unit testing

[Document how to test code that depends on feature flags. Cover the SDK's
built-in test utilities (FakeUnleash, mock client) and manual mocking
approaches.]

## Migrating to v[X]

[Document breaking changes, renames, and deprecations for the latest
major version. Use subsections for multi-version migrations.]

### From v[Y]

[Changes specific to upgrading from this version.]

## Troubleshooting

[Use `<AccordionGroup>` for common issues]

<AccordionGroup>
<Accordion title="[Common issue for this SDK]">
[SDK-specific troubleshooting.]
</Accordion>
</AccordionGroup>
````