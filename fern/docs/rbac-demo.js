import { SignJWT } from 'https://unpkg.com/jose@4.15.4/dist/browser/index.js';

class UnleashRBAC {
  constructor() {
    this.JWT_SECRET = 'cdNjZrBfC5REEUjR8+5PdR1+Ls/2s4MvvCFuU6/Djlg=';
    this.COOKIE_NAME = 'fern_token';
    this.BUTTON_SELECTOR = '#fern-auth-button';
    this.initialized = false;
    this.returnUrl = null; // Store the return URL for post-login redirect
    
    // Auto-initialize on DOM ready
    this.init();
  }

  init() {
    if (this.initialized) return;
    
    // Single, lightweight document-level click handler
    document.addEventListener('click', this.handleDocumentClick.bind(this), { 
      capture: true, 
      passive: false 
    });
    
    this.initialized = true;
    console.log('[Unleash RBAC] Minimal handler initialized');
  }

  
  handleDocumentClick(event) {
    console.log('[Unleash RBAC] Got clicked', event);
    console.log('[Unleash RBAC] Target ID:', event.target?.id);
    console.log('[Unleash RBAC] Target element:', event.target);
    
    // Only process clicks on our target button
    if (event.target?.id !== 'fern-auth-button') return;
    
    console.log('[Unleash RBAC] Button found! Processing...');
    const buttonText = event.target.textContent?.toLowerCase().trim();
    console.log('[Unleash RBAC] Button text:', buttonText);
    
    // Smart detection: login vs logout
    if (buttonText.includes('login')) {
      console.log('[Unleash RBAC] Detected login button');
      this.interceptLogin(event);
    } else if (buttonText.includes('logout')) {
      console.log('[Unleash RBAC] Detected logout button');
      this.interceptLogout(event);
    } else {
      console.log('[Unleash RBAC] Button text does not match login/logout patterns');
    }
  }

  interceptLogin(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('[Unleash RBAC] Login intercepted');
    // Capture current page URL for post-login redirect
    this.returnUrl = window.location.href;
    this.performLogin();
  }

  interceptLogout(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('[Unleash RBAC] Logout intercepted');
    this.performLogout();
  }

  async performLogin() {
    try {
      console.log('[Unleash RBAC] Starting login process...');
      
      // Create JWT token
      console.log('[Unleash RBAC] Creating JWT token...');
      const token = await this.createToken();
      console.log('[Unleash RBAC] JWT token created:', token ? 'SUCCESS' : 'FAILED');
      
      // Set cookie with correct domain (key insight!)
      console.log('[Unleash RBAC] Setting cookie...');
      this.setCookie(token);
      console.log('[Unleash RBAC] Cookie set, current cookies:', document.cookie);
      
      // Redirect using state parameter
      console.log('[Unleash RBAC] Redirecting...');
      this.redirect();
      
      console.log('[Unleash RBAC] Login successful');
    } catch (error) {
      console.error('[Unleash RBAC] Login failed:', error);
    }
  }

  performLogout() {
    try {
      // Clear cookie from correct domain
      this.clearCookie();
      
      // Redirect using state parameter  
      this.redirect();
      
      console.log('[Unleash RBAC] Logout successful');
    } catch (error) {
      console.error('[Unleash RBAC] Logout failed:', error);
    }
  }

  async createToken() {
    const encoder = new TextEncoder();
    const secretKey = encoder.encode(this.JWT_SECRET);
    
    return await new SignJWT({
      fern: {
        roles: ['unleash-admin']
      }
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .setIssuer('https://buildwithfern.com')
      .sign(secretKey);
  }

  setCookie(token) {
    // Auto-detect domain based on current hostname
    const hostname = window.location.hostname;
    let domain;
    
    if (hostname.includes('buildwithfern.com')) {
      domain = '.buildwithfern.com';
    } else if (hostname.includes('ferndocs.com')) {
      domain = '.ferndocs.com';
    } else {
      // Fallback: use the current hostname
      domain = hostname;
    }
    
    const cookieString = `${this.COOKIE_NAME}=${token}; Path=/; Domain=${domain}; Secure; SameSite=Lax; Max-Age=86400`;
    console.log('[Unleash RBAC] Setting cookie for domain:', domain);
    console.log('[Unleash RBAC] Setting cookie string:', cookieString);
    document.cookie = cookieString;
    console.log('[Unleash RBAC] Cookie set result - document.cookie:', document.cookie);
  }

  clearCookie() {
    // Auto-detect domain based on current hostname (same logic as setCookie)
    const hostname = window.location.hostname;
    let domain;
    
    if (hostname.includes('buildwithfern.com')) {
      domain = '.buildwithfern.com';
    } else if (hostname.includes('ferndocs.com')) {
      domain = '.ferndocs.com';
    } else {
      // Fallback: use the current hostname
      domain = hostname;
    }
    
    const expiredCookie = `${this.COOKIE_NAME}=; Path=/; Domain=${domain}; Secure; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    console.log('[Unleash RBAC] Clearing cookie for domain:', domain);
    document.cookie = expiredCookie;
  }

  redirect() {
    // For login: use captured return URL, for logout: use state parameter or origin
    let returnUrl;
    
    if (this.returnUrl) {
      // Login flow: use the captured current page URL
      returnUrl = this.returnUrl;
      this.returnUrl = null; // Clear after use
    } else {
      // Logout flow: use state parameter or default to origin
      const urlParams = new URLSearchParams(window.location.search);
      returnUrl = urlParams.get('state') || window.location.origin;
    }
    
    window.location.href = returnUrl;
  }

  // Manual methods for console access
  manualLogin = () => this.performLogin();
  manualLogout = () => this.performLogout();
}

// Initialize the system
const unleashRBAC = new UnleashRBAC();

// Global access for manual operations
window.UnleashRBAC = {
  login: unleashRBAC.manualLogin,
  logout: unleashRBAC.manualLogout
};

export default UnleashRBAC; 