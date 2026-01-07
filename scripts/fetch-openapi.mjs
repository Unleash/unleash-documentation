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

// Helper function to filter tags and endpoints
function filterOpenApiSpec(data, tagsToKeep = null, tagsToFilter = []) {
    const filtered = JSON.parse(JSON.stringify(data)); // Deep clone

    // Filter tags array
    if (filtered.tags) {
        if (tagsToKeep) {
            // Keep only specified tags
            filtered.tags = filtered.tags.filter(tag => tagsToKeep.includes(tag.name));
        } else if (tagsToFilter.length > 0) {
            // Filter out specified tags
            filtered.tags = filtered.tags.filter(tag => !tagsToFilter.includes(tag.name));
        }
    }

    // Filter endpoints
    if (filtered.paths) {
        for (const path in filtered.paths) {
            for (const method in filtered.paths[path]) {
                const operation = filtered.paths[path][method];
                if (operation.tags) {
                    let shouldKeep = false;
                    
                    if (tagsToKeep) {
                        // Keep only if endpoint has one of the tags to keep
                        shouldKeep = operation.tags.some(tag => tagsToKeep.includes(tag));
                    } else if (tagsToFilter.length > 0) {
                        // Keep if endpoint doesn't have any filtered tags
                        shouldKeep = !operation.tags.some(tag => tagsToFilter.includes(tag));
                    } else {
                        shouldKeep = true;
                    }

                    if (!shouldKeep) {
                        delete filtered.paths[path][method];
                    }
                }
            }
            // Remove path if all methods were filtered out
            if (Object.keys(filtered.paths[path]).length === 0) {
                delete filtered.paths[path];
            }
        }
    }

    return filtered;
}

// Remove image markdown from descriptions (images don't work in Fern)
const cleanJsonString = (json) => {
    return JSON.stringify(json, null, 2)
        .replace(/!\[Unleash Enterprise\]\([^)]+\)\s*/g, '')
        .replace(/!\[Beta\]\([^)]+\)\s*/g, '');
};

// Client API: Keep ONLY "Client" tag
const clientApiData = filterOpenApiSpec(data, ['Client']);
const clientApiJsonString = cleanJsonString(clientApiData);

await fs.writeFile(
    './fern/apis/client-api/openapi.json',
    clientApiJsonString,
    'utf8',
);

console.log(`✅ Saved to fern/apis/client-api/openapi.json`);
console.log(`📦 Version: ${clientApiData.info.version}`);
console.log(`🔗 Endpoints: ${Object.keys(clientApiData.paths || {}).length}`);
console.log(`✅ Kept only tag: Client`);

// Admin API: Filter out "Client" and "Frontend API" tags
const adminApiData = filterOpenApiSpec(data, null, ['Client', 'Frontend API']);
const adminApiJsonString = cleanJsonString(adminApiData);

await fs.writeFile(
    './fern/apis/admin-api/openapi.json',
    adminApiJsonString,
    'utf8',
);

console.log(`✅ Saved to fern/apis/admin-api/openapi.json`);
console.log(`📦 Version: ${adminApiData.info.version}`);
console.log(`🔗 Endpoints: ${Object.keys(adminApiData.paths || {}).length}`);
console.log(`🚫 Filtered out tags: Client, Frontend API`);
