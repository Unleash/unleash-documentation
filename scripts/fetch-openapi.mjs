import fs from 'node:fs/promises';

const unleashOpenApiUrl = 'https://us.app.unleash-hosted.com/ushosted/docs/openapi.json';
const edgeOpenApiUrl = 'https://hosted.edge.getunleash.io/docs/openapi.json';

async function fetchOpenApiSpec(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch OpenAPI spec from ${url}: ${response.statusText}`);
    }

    return response.json();
}

// A failed fetch must not fail the docs publish; keep the committed specs instead
function warnAndKeepPrevious(specName, error) {
    const message = `Could not update ${specName} OpenAPI spec, publishing with the previously committed version: ${error.message}`;
    console.warn(`⚠️ ${message}`);
    if (process.env.GITHUB_ACTIONS) {
        console.log(`::warning::${message}`);
    }
}

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

console.log('📥 Fetching Unleash OpenAPI spec...');

try {
    const data = await fetchOpenApiSpec(unleashOpenApiUrl);

    // Replace server URL with user-agnostic example
    data.servers = [
        {
            url: 'https://app.unleash-instance.example.com',
            description: 'Your Unleash instance (replace with your actual URL)',
        },
    ];

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

    // Frontend API: Keep ONLY "Frontend API" tag
    const frontendApiData = filterOpenApiSpec(data, ['Frontend API']);
    const frontendApiJsonString = cleanJsonString(frontendApiData);

    await fs.writeFile(
        './fern/apis/frontend-api/openapi.json',
        frontendApiJsonString,
        'utf8',
    );

    console.log(`✅ Saved to fern/apis/frontend-api/openapi.json`);
    console.log(`📦 Version: ${frontendApiData.info.version}`);
    console.log(`🔗 Endpoints: ${Object.keys(frontendApiData.paths || {}).length}`);
    console.log(`✅ Kept only tag: Frontend API`);

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
} catch (error) {
    warnAndKeepPrevious('Unleash', error);
}

console.log('📥 Fetching Unleash Edge OpenAPI spec...');

try {
    const edgeApiData = await fetchOpenApiSpec(edgeOpenApiUrl);

    edgeApiData.servers = [
        {
            url: 'https://edge.unleash-instance.example.com',
            description: 'Your Unleash Edge instance (replace with your actual URL)',
        },
    ];

    const edgeApiJsonString = cleanJsonString(edgeApiData);

    await fs.mkdir('./fern/apis/edge-api', { recursive: true });
    await fs.writeFile(
        './fern/apis/edge-api/openapi.json',
        edgeApiJsonString,
        'utf8',
    );

    console.log(`✅ Saved to fern/apis/edge-api/openapi.json`);
    console.log(`📦 Version: ${edgeApiData.info.version}`);
    console.log(`🔗 Endpoints: ${Object.keys(edgeApiData.paths || {}).length}`);
} catch (error) {
    warnAndKeepPrevious('Unleash Edge', error);
}
