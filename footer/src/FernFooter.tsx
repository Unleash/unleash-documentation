import React, { useEffect, useRef } from 'react';

export const FernFooter: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🔍 Unleash Footer component mounted and rendering...');
  }, []);

  return (
    <div ref={footerRef} id="fern-footer">
      <footer>
        {/* Top Container - Main Navigation */}
        <div className="top-container">
          {/* Left section with logo and description */}
          <div className="footer-section logo-section">
            <div className="logo-and-text">
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
            </div>
            
            {/* Social Links section - under logo and text */}
            <div className="social-links">
              <a href="https://github.com/Unleash" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/unleash-hosted/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://twitter.com/getunleash" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://slack.unleash.run/" target="_blank" rel="noopener noreferrer" aria-label="Slack">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.521-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.523 2.521h-2.521V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.521A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.523v-2.521h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
              </a>
              <a href="https://stackoverflow.com/questions/tagged/unleash" target="_blank" rel="noopener noreferrer" aria-label="Stack Overflow">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.904-1.94-9.701-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM1.89 15.47V24h19.19v-8.53h-2.133v6.397H4.021v-6.396H1.89zm4.265 2.133v2.13h10.66v-2.13H6.154Z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCmqQyGgVXSdvuPiUNlzOjXw" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Server SDKs section */}
          <div className="footer-section">
            <h3 className="section-title">Server SDKs</h3>
            <ul className="footer-links">
              <li><a href="/reference/sdks/node" target="_blank" rel="noopener noreferrer">Node.js</a></li>
              <li><a href="/reference/sdks/java" target="_blank" rel="noopener noreferrer">Java</a></li>
              <li><a href="/reference/sdks/go" target="_blank" rel="noopener noreferrer">Go</a></li>
              <li><a href="/reference/sdks/rust" target="_blank" rel="noopener noreferrer">Rust</a></li>
              <li><a href="/reference/sdks/ruby" target="_blank" rel="noopener noreferrer">Ruby</a></li>
              <li><a href="/reference/sdks/python" target="_blank" rel="noopener noreferrer">Python</a></li>
              <li><a href="/reference/sdks/dotnet" target="_blank" rel="noopener noreferrer">.NET</a></li>
              <li><a href="/reference/sdks/php" target="_blank" rel="noopener noreferrer">PHP</a></li>
              <li><a href="/reference/sdks" target="_blank" rel="noopener noreferrer">All SDKs</a></li>
            </ul>
          </div>

          {/* Frontend SDKs section */}
          <div className="footer-section">
            <h3 className="section-title">Frontend SDKs</h3>
            <ul className="footer-links">
              <li><a href="/reference/sdks/javascript" target="_blank" rel="noopener noreferrer">JavaScript</a></li>
              <li><a href="/reference/sdks/react" target="_blank" rel="noopener noreferrer">React</a></li>
              <li><a href="/reference/sdks/nextjs" target="_blank" rel="noopener noreferrer">Next.js</a></li>
              <li><a href="/reference/sdks/vue" target="_blank" rel="noopener noreferrer">Vue</a></li>
              <li><a href="/reference/sdks/ios" target="_blank" rel="noopener noreferrer">iOS</a></li>
              <li><a href="/reference/sdks/android" target="_blank" rel="noopener noreferrer">Android</a></li>
              <li><a href="/reference/sdks/flutter" target="_blank" rel="noopener noreferrer">Flutter</a></li>
            </ul>
          </div>

          {/* Feature Flag use cases section */}
          <div className="footer-section">
            <h3 className="section-title">Feature Flag use cases</h3>
            <ul className="footer-links">
              <li><a href="/topics/feature-flags" target="_blank" rel="noopener noreferrer">Secure, scalable feature flags</a></li>
              <li><a href="/feature-flag-tutorials/use-cases" target="_blank" rel="noopener noreferrer">Rollbacks</a></li>
              <li><a href="/topics/compliance" target="_blank" rel="noopener noreferrer">FedRAMP, SOC2, ISO2700 compliance</a></li>
              <li><a href="/topics/gradual-rollouts" target="_blank" rel="noopener noreferrer">Progressive or gradual rollouts</a></li>
              <li><a href="/topics/trunk-based-development" target="_blank" rel="noopener noreferrer">Trunk-based development</a></li>
              <li><a href="/topics/kill-switches" target="_blank" rel="noopener noreferrer">Software kill switches</a></li>
              <li><a href="/feature-flag-tutorials/use-cases/a-b-testing" target="_blank" rel="noopener noreferrer">A/B testing</a></li>
              <li><a href="/topics/feature-management" target="_blank" rel="noopener noreferrer">Feature management</a></li>
              <li><a href="/topics/canary-releases" target="_blank" rel="noopener noreferrer">Canary releases</a></li>
            </ul>
          </div>

          {/* Product section */}
          <div className="footer-section">
            <h3 className="section-title">Product</h3>
            <ul className="footer-links">
              <li><a href="/get-started/quickstart" target="_blank" rel="noopener noreferrer">Quickstart</a></li>
              <li><a href="/get-started/unleash-overview" target="_blank" rel="noopener noreferrer">Unleash architecture</a></li>
              <li><a href="/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
              <li><a href="/product-vision" target="_blank" rel="noopener noreferrer">Product vision</a></li>
              <li><a href="/demo" target="_blank" rel="noopener noreferrer">Open live demo</a></li>
              <li><a href="/open-source" target="_blank" rel="noopener noreferrer">Open source</a></li>
              <li><a href="/enterprise" target="_blank" rel="noopener noreferrer">Enterprise feature management platform</a></li>
              <li><a href="/vs-launchdarkly" target="_blank" rel="noopener noreferrer">Unleash vs LaunchDarkly</a></li>
            </ul>
            </div>

          {/* Support section */}
          <div className="footer-section">
            <h3 className="section-title">Support</h3>
            <ul className="footer-links">
              <li><a href="/help" target="_blank" rel="noopener noreferrer">Help center</a></li>
              <li><a href="/status" target="_blank" rel="noopener noreferrer">Status</a></li>
              <li><a href="/changelog" target="_blank" rel="noopener noreferrer">Changelog</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Container - Copyright only */}
        <div className="bottom-container">
          <div className="copyright-section">
            <span>Made in a cosy atmosphere in the Nordic countries.</span>
            <div className="built-with">
              <span>Copyright © 2025 Unleash</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};