import { startUnleash } from 'unleash-client';

const unleash = await startUnleash({
  url: process.env.UNLEASH_URL,
  appName: 'my-node-name',
  customHeaders: { Authorization: process.env.UNLEASH_TOKEN },
});

// The Unleash SDK now has a fresh state from the Unleash API
const isEnabled = unleash.isEnabled('Demo');

// check variant
const variant = unleash.getVariant('demo-variant');

if (variant.name === 'blue') {
  // do something with the blue variant...
}

// use context
const unleashContext = {
  userId: '123',
  sessionId: 'some-session-id',
  remoteAddress: '127.0.0.1',
  properties: {
    region: 'EMEA',
  },
};

const enabled = unleash.isEnabled('someToggle', unleashContext);

// exit test process
setTimeout(() => process.exit(0), 200);