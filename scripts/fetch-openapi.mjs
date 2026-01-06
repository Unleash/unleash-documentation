import fs from 'node:fs/promises';

const url = 'https://us.app.unleash-hosted.com/ushosted/docs/openapi.json';

console.log('📥 Fetching OpenAPI spec...');

const response = await fetch(url);
if (!response.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: ${response.statusText}`);
}

const data = await response.json();

await fs.writeFile(
    './fern/openapi.json',
    JSON.stringify(data, null, 2),
    'utf8',
);

console.log(`✅ Saved to fern/openapi.json`);
console.log(`📦 Version: ${data.info.version}`);
console.log(`🔗 Endpoints: ${Object.keys(data.paths || {}).length}`);
