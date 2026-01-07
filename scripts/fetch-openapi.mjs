import fs from 'node:fs/promises';

const url = 'https://us.app.unleash-hosted.com/ushosted/docs/openapi.json';

console.log('📥 Fetching OpenAPI spec...');

const response = await fetch(url);
if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
}

const data = await response.json();

// Replace server URL with user-agnostic example
data.servers = [
    {
        url: 'https://app.unleash-instance.example.com',
        description: 'Your Unleash instance (replace with your actual URL)',
    },
];

// Remove image markdown from descriptions (images don't work in Fern)
const jsonString = JSON.stringify(data, null, 2)
    .replace(/!\[Unleash Enterprise\]\([^)]+\)\s*/g, '')
    .replace(/!\[Beta\]\([^)]+\)\s*/g, '');

await fs.writeFile(
    './fern/openapi.json',
    jsonString,
    'utf8',
);

console.log(`✅ Saved to fern/openapi.json`);
console.log(`📦 Version: ${data.info.version}`);
console.log(`🔗 Endpoints: ${Object.keys(data.paths || {}).length}`);
