import fs from 'node:fs/promises';

const repo = 'Unleash/unleash';
const docsYmlPath = './fern/docs.yml';

console.log(`Fetching GitHub stars for ${repo}...`);

const response = await fetch(`https://api.github.com/repos/${repo}`);
if (!response.ok) {
    throw new Error(`Failed to fetch GitHub repo data: ${response.statusText}`);
}

const data = await response.json();
const stars = data.stargazers_count ?? 0;
const abbreviated = `${(stars / 1000).toFixed(1)}k`;

console.log(`Stars: ${stars} -> ${abbreviated}`);

const docsYml = await fs.readFile(docsYmlPath, 'utf8');
const updated = docsYml.replace(
    /(text: )\S+(\n\s+icon: fa-brands fa-github)/,
    `$1${abbreviated}$2`,
);

const pattern = /(text: )\S+(\n\s+icon: fa-brands fa-github)/;
if (!pattern.test(docsYml)) {
    console.log('No GitHub star navbar link found in docs.yml — skipping.');
} else {
    await fs.writeFile(docsYmlPath, updated, 'utf8');
    console.log(`Updated docs.yml GitHub stars to ${abbreviated}`);
}
