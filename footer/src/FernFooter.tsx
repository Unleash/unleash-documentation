import React, { useEffect, useRef } from 'react';

// Import social icons (light/dark variants)
import githubLight from './assets/githubLight.png';
import githubDark from './assets/githubDark.png';
import linkedinLight from './assets/linkedinLight.png';
import linkedinDark from './assets/linkedinDark.png';
import twitterLight from './assets/twitterLight.png';
import twitterDark from './assets/twitterDark.png';
import slackLight from './assets/slackLight.png';
import slackDark from './assets/slackDark.png';
import stackoverflowLight from './assets/stackoverflowLight.png';
import stackoverflowDark from './assets/stackoverflowDark.png';
import youtubeLight from './assets/youtubeLight.png';
import youtubeDark from './assets/youtubeDark.png';

// Heart icon component
const HeartIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" className="heart-icon">
    <path d="M17.0674 4.53516V10.5352H19.0674V4.53516H17.0674Z" fill="#817AFE"/>
    <path d="M1.06738 4.53516L1.06738 10.5352H3.06738L3.06738 4.53516H1.06738Z" fill="#817AFE"/>
    <path d="M17.0674 2.53516H13.0674V10.5352H17.0674V2.53516Z" fill="#817AFE"/>
    <path d="M7.06738 2.53516H3.06738V10.5352H7.06738V2.53516Z" fill="#817AFE"/>
    <path d="M13.0674 12.5352H5.06738V14.5352H13.0674V12.5352Z" fill="#817AFE"/>
    <path d="M15.0674 10.5352H3.06738V12.5352H15.0674V10.5352Z" fill="#817AFE"/>
    <path d="M11.0674 6.53516H9.06738V10.5352H11.0674V6.53516Z" fill="#817AFE"/>
    <path d="M13.0674 4.53516H11.0674V10.5352H13.0674V4.53516Z" fill="#817AFE"/>
    <path d="M9.06738 4.53516H7.06738V10.5352H9.06738V4.53516Z" fill="#817AFE"/>
    <path d="M11.0674 14.5352H7.06738V16.5352H11.0674V14.5352Z" fill="#817AFE"/>
    <path d="M11.0674 16.5352H9.06738V18.5352H11.0674V16.5352Z" fill="#817AFE"/>
    <path d="M13.0674 14.5352H11.0674V16.5352H13.0674V14.5352Z" fill="#817AFE"/>
    <path d="M15.0674 12.5352H13.0674V14.5352H15.0674V12.5352Z" fill="#817AFE"/>
    <path d="M17.0674 10.5352H15.0674V12.5352H17.0674V10.5352Z" fill="#817AFE"/>
  </svg>
);

// Social link component with dark/light icon support
interface SocialLinkProps {
  href: string;
  label: string;
  lightIcon: string;
  darkIcon: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, label, lightIcon, darkIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <img src={lightIcon} alt={label} className="social-icon social-icon-light" width="32" height="32" />
    <img src={darkIcon} alt={label} className="social-icon social-icon-dark" width="32" height="32" />
  </a>
);

export const FernFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Unleash Footer component mounted');
  }, []);

  return (
    <div ref={footerRef} id="fern-footer">
      <footer>
        {/* Top Container - Main Navigation */}
        <div className="top-container">
          {/* Left section with logo and description - uses CSS Grid for alignment */}
          <div className="footer-section logo-section">
            <div className="logo-container">
              {/* Dark logo for light mode */}
              <svg className="unleash-logo unleash-logo-dark" width="48" height="48" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z" fill="#1A4049"/>
                <path d="M91.43 45.71V91.43H114.28V45.71H91.43ZM68.57 68.57V45.71H45.71V114.28H91.43V91.43H68.57V68.57Z" fill="white"/>
                <path d="M91.43 45.71V91.43H114.28V45.71H91.43ZM68.57 68.57V45.71H45.71V114.28H91.43V91.43H68.57V68.57Z" fill="white"/>
                <path d="M91.4299 91.43H114.29V114.29H91.4299V91.43Z" fill="#817AFE"/>
              </svg>

              {/* White logo for dark mode */}
              <svg className="unleash-logo unleash-logo-light" width="48" height="48" viewBox="0 0 161 161" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80.6201 160.62C124.803 160.62 160.62 124.803 160.62 80.62C160.62 36.4372 124.803 0.619995 80.6201 0.619995C36.4373 0.619995 0.620117 36.4372 0.620117 80.62C0.620117 124.803 36.4373 160.62 80.6201 160.62Z" fill="white"/>
                <path d="M92.0501 46.33V92.05H114.9V46.33H92.0501ZM69.1901 69.19V46.33H46.3301V114.9H92.0501V92.05H69.1901V69.19Z" fill="white"/>
                <path d="M92.0501 46.33V92.05H114.9V46.33H92.0501ZM69.1901 69.19V46.33H46.3301V114.9H92.0501V92.05H69.1901V69.19Z" fill="#1A4049"/>
                <path d="M92.05 92.05H114.91V114.91H92.05V92.05Z" fill="#817AFE"/>
              </svg>
            </div>

            <p className="company-description">
              Unleash reduces the risk of releasing new features, drives innovation by streamlining the software release process, and increases revenue by optimizing end-user experience. While we serve the needs of the world's largest, most security-conscious organizations, we are also rated the "Easiest Feature Management system to use" by G2.
            </p>

            {/* Social Links section - aligned with description via grid */}
            <div className="social-links">
              <SocialLink href="https://github.com/Unleash" label="GitHub" lightIcon={githubLight} darkIcon={githubDark} />
              <SocialLink href="https://www.linkedin.com/company/unleash-hosted/" label="LinkedIn" lightIcon={linkedinLight} darkIcon={linkedinDark} />
              <SocialLink href="https://twitter.com/getunleash" label="X (Twitter)" lightIcon={twitterLight} darkIcon={twitterDark} />
              <SocialLink href="https://slack.unleash.run/" label="Slack" lightIcon={slackLight} darkIcon={slackDark} />
              <SocialLink href="https://stackoverflow.com/questions/tagged/unleash" label="Stack Overflow" lightIcon={stackoverflowLight} darkIcon={stackoverflowDark} />
              <SocialLink href="https://www.youtube.com/@getunleash" label="YouTube" lightIcon={youtubeLight} darkIcon={youtubeDark} />
            </div>
          </div>

          {/* Server SDKs section */}
          <div className="footer-section">
            <h3 className="section-title">Server SDKs</h3>
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

          {/* Frontend SDKs section */}
          <div className="footer-section">
            <h3 className="section-title">Frontend SDKs</h3>
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

          {/* Feature Flag use cases section */}
          <div className="footer-section">
            <h3 className="section-title">Feature Flag use cases</h3>
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

          {/* Product section */}
          <div className="footer-section">
            <h3 className="section-title">Product</h3>
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

          {/* Support section */}
          <div className="footer-section">
            <h3 className="section-title">Support</h3>
            <ul className="footer-links">
              <li><a href="https://www.getunleash.io/support" target="_blank" rel="noopener noreferrer">Help center</a></li>
              <li><a href="https://unleash.instatus.com" target="_blank" rel="noopener noreferrer">Status</a></li>
              <li><a href="https://github.com/Unleash/unleash/releases" target="_blank" rel="noopener noreferrer">Changelog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Container - uses same grid alignment as logo section */}
        <div className="bottom-container">
          <div className="logo-spacer" aria-hidden="true"></div>
          <div className="copyright-section">
            <span className="made-with-love"><HeartIcon /> Made in a cosy atmosphere in the Nordic countries.</span>
            <div className="built-with">
              <span>Copyright © {new Date().getFullYear()} Unleash</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};