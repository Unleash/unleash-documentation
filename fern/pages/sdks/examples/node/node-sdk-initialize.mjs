import { initialize } from 'unleash-client';

const unleash = initialize({
  url: process.env.UNLEASH_URL,
  appName: 'my-node-name',
  customHeaders: { Authorization: process.env.UNLEASH_TOKEN },
});

unleash.on('synchronized', () => {
  // the SDK has synchronized with the server
  // and is ready to serve
});

// exit test process
setTimeout(() => process.exit(0), 200);