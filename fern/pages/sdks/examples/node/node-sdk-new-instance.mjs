import { Unleash } from 'unleash-client';

console.error("Creating new Unleash instance");
const unleash = new Unleash({
  url: process.env.UNLEASH_URL,
  appName: 'my-node-name',
  customHeaders: { Authorization: process.env.UNLEASH_TOKEN },
});

unleash.on('ready', console.log.bind(console, 'ready'));

// optional error handling when using unleash directly
unleash.on('error', console.error);

// exit test process
setTimeout(() => process.exit(0), 200);