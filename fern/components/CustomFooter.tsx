const CDN_BASE = 'https://cdn.getunleash.io/docs-assets';

const githubLight = `${CDN_BASE}/githubLight.png`;
const githubDark = `${CDN_BASE}/githubDark.png`;
const linkedinLight = `${CDN_BASE}/linkedinLight.png`;
const linkedinDark = `${CDN_BASE}/linkedinDark.png`;
const twitterLight = `${CDN_BASE}/twitterLight.png`;
const twitterDark = `${CDN_BASE}/twitterDark.png`;
const slackLight = `${CDN_BASE}/slackLight.png`;
const slackDark = `${CDN_BASE}/slackDark.png`;
const stackoverflowLight = `${CDN_BASE}/stackoverflowLight.png`;
const stackoverflowDark = `${CDN_BASE}/stackoverflowDark.png`;
const youtubeLight = `${CDN_BASE}/youtubeLight.png`;
const youtubeDark = `${CDN_BASE}/youtubeDark.png`;

const heartIcon = `${CDN_BASE}/heart.svg`;

function SocialLink({ href, label, lightIcon, darkIcon }: {
  href: string;
  label: string;
  lightIcon: string;
  darkIcon: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social-link">
      <img src={lightIcon} alt={label} className="footer-social-icon block dark:hidden" width="32" height="32" />
      <img src={darkIcon} alt={label} className="footer-social-icon hidden dark:block" width="32" height="32" />
    </a>
  );
}

export default function CustomFooter() {
  return (
    <footer>
      <div className="footer-top">
        {/* Logo section */}
        <div className="footer-logo">
          <div className="footer-logo-icon">
            <svg className="block dark:hidden" width="48" height="48" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z" fill="#1A4049"/>
              <path d="M91.43 45.71V91.43H114.28V45.71H91.43ZM68.57 68.57V45.71H45.71V114.28H91.43V91.43H68.57V68.57Z" fill="white"/>
              <path d="M91.43 45.71V91.43H114.28V45.71H91.43ZM68.57 68.57V45.71H45.71V114.28H91.43V91.43H68.57V68.57Z" fill="white"/>
              <path d="M91.4299 91.43H114.29V114.29H91.4299V91.43Z" fill="#817AFE"/>
            </svg>
            <svg className="hidden dark:block" width="48" height="48" viewBox="0 0 161 161" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M80.6201 160.62C124.803 160.62 160.62 124.803 160.62 80.62C160.62 36.4372 124.803 0.619995 80.6201 0.619995C36.4373 0.619995 0.620117 36.4372 0.620117 80.62C0.620117 124.803 36.4373 160.62 80.6201 160.62Z" fill="white"/>
              <path d="M92.0501 46.33V92.05H114.9V46.33H92.0501ZM69.1901 69.19V46.33H46.3301V114.9H92.0501V92.05H69.1901V69.19Z" fill="white"/>
              <path d="M92.0501 46.33V92.05H114.9V46.33H92.0501ZM69.1901 69.19V46.33H46.3301V114.9H92.0501V92.05H69.1901V69.19Z" fill="#1A4049"/>
              <path d="M92.05 92.05H114.91V114.91H92.05V92.05Z" fill="#817AFE"/>
            </svg>
          </div>

          <p className="footer-logo-description">
            Unleash reduces the risk of releasing new features, drives innovation by streamlining the software release process, and increases revenue by optimizing end-user experience. While we serve the needs of the world's largest, most security-conscious organizations, we are also rated the &ldquo;Easiest Feature Management system to use&rdquo; by G2.
          </p>

          <div className="footer-logo-social">
            <SocialLink href="https://github.com/Unleash" label="GitHub" lightIcon={githubLight} darkIcon={githubDark} />
            <SocialLink href="https://www.linkedin.com/company/unleash-hosted/" label="LinkedIn" lightIcon={linkedinLight} darkIcon={linkedinDark} />
            <SocialLink href="https://twitter.com/getunleash" label="X (Twitter)" lightIcon={twitterLight} darkIcon={twitterDark} />
            <SocialLink href="https://slack.unleash.run/" label="Slack" lightIcon={slackLight} darkIcon={slackDark} />
            <SocialLink href="https://stackoverflow.com/questions/tagged/unleash" label="Stack Overflow" lightIcon={stackoverflowLight} darkIcon={stackoverflowDark} />
            <SocialLink href="https://www.youtube.com/@getunleash" label="YouTube" lightIcon={youtubeLight} darkIcon={youtubeDark} />
          </div>
        </div>

        <div className="footer-section footer-col-3">
          <h3 className="footer-section-title">Server SDKs</h3>
          <ul className="footer-links">
            <li><a href="/sdks/node">Node.js</a></li>
            <li><a href="/sdks/java">Java</a></li>
            <li><a href="/sdks/go">Go</a></li>
            <li><a href="/sdks/rust">Rust</a></li>
            <li><a href="/sdks/ruby">Ruby</a></li>
            <li><a href="/sdks/python">Python</a></li>
            <li><a href="/sdks/dotnet">.NET</a></li>
            <li><a href="/sdks/php">PHP</a></li>
            <li><a href="/sdks">All SDKs</a></li>
          </ul>
        </div>

        <div className="footer-section footer-col-4">
          <h3 className="footer-section-title">Frontend SDKs</h3>
          <ul className="footer-links">
            <li><a href="/sdks/javascript-browser">JavaScript</a></li>
            <li><a href="/sdks/react">React</a></li>
            <li><a href="/sdks/next-js">Next.js</a></li>
            <li><a href="/sdks/vue">Vue</a></li>
            <li><a href="/sdks/ios">iOS</a></li>
            <li><a href="/sdks/android">Android</a></li>
            <li><a href="/sdks/flutter">Flutter</a></li>
          </ul>
        </div>

        <div className="footer-section footer-col-5">
          <h3 className="footer-section-title">Feature Flag use cases</h3>
          <ul className="footer-links">
            <li><a href="/guides/feature-flag-best-practices">Secure, scalable feature flags</a></li>
            <li><a href="https://www.getunleash.io/feature-flag-use-cases-rollbacks" target="_blank" rel="noopener noreferrer">Rollbacks</a></li>
            <li><a href="/privacy-and-compliance/compliance-overview">FedRAMP, SOC2, ISO2700 compliance</a></li>
            <li><a href="/guides/gradual-rollout">Progressive or gradual rollouts</a></li>
            <li><a href="/guides/trunk-based-development">Trunk-based development</a></li>
            <li><a href="https://www.getunleash.io/feature-flag-use-cases-software-kill-switches" target="_blank" rel="noopener noreferrer">Software kill switches</a></li>
            <li><a href="/guides/a-b-testing">A/B testing</a></li>
            <li><a href="https://www.getunleash.io/blog/feature-management" target="_blank" rel="noopener noreferrer">Feature management</a></li>
            <li><a href="https://www.getunleash.io/blog/canary-deployment-what-is-it" target="_blank" rel="noopener noreferrer">Canary releases</a></li>
          </ul>
        </div>

        <div className="footer-section footer-col-6">
          <h3 className="footer-section-title">Product</h3>
          <ul className="footer-links">
            <li><a href="/get-started/quickstart">Quickstart</a></li>
            <li><a href="/get-started/unleash-overview">Unleash architecture</a></li>
            <li><a href="https://www.getunleash.io/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
            <li><a href="https://www.getunleash.io/product-vision" target="_blank" rel="noopener noreferrer">Product vision</a></li>
            <li><a href="https://app.unleash-hosted.com/demo/login" target="_blank" rel="noopener noreferrer">Open live demo</a></li>
            <li><a href="https://www.getunleash.io/open-source" target="_blank" rel="noopener noreferrer">Open source</a></li>
            <li><a href="https://www.getunleash.io/enterprise-feature-management-platform" target="_blank" rel="noopener noreferrer">Enterprise feature management platform</a></li>
            <li><a href="https://www.getunleash.io/unleash-vs-launchdarkly" target="_blank" rel="noopener noreferrer">Unleash vs LaunchDarkly</a></li>
          </ul>
        </div>

        <div className="footer-section footer-col-7">
          <h3 className="footer-section-title">Support</h3>
          <ul className="footer-links">
            <li><a href="https://www.getunleash.io/support" target="_blank" rel="noopener noreferrer">Help center</a></li>
            <li><a href="https://unleash.instatus.com" target="_blank" rel="noopener noreferrer">Status</a></li>
            <li><a href="https://github.com/Unleash/unleash/releases" target="_blank" rel="noopener noreferrer">Changelog</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-spacer" aria-hidden="true" />
        <div className="footer-bottom-content">
          <span className="footer-made-with"><img src={heartIcon} alt="" width="16" height="16" /> Made in a cosy atmosphere in the Nordic countries.</span>
          <span className="footer-copyright">Copyright &copy; {new Date().getFullYear()} Unleash</span>
        </div>
      </div>
    </footer>
  );
}
