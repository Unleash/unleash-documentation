import { SignJWT } from 'https://unpkg.com/jose@4.15.4/dist/browser/index.js';

class UnleashRBAC {
  constructor() {
    this.JWT_SECRET = 'cdNjZrBfC5REEUjR8+5PdR1+Ls/2s4MvvCFuU6/Djlg="';
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
    // Only process clicks on our target button
    if (event.target?.id !== 'fern-auth-button') return;
    

    const buttonText = event.target.textContent?.toLowerCase().trim();
    
    // Smart detection: login vs logout
    if (buttonText.includes('login')) {
      this.interceptLogin(event);
    } else if (buttonText.includes('logout')) {
      this.interceptLogout(event);
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
      // Create JWT token
      const token = await this.createToken();
      
      // Set cookie with correct domain (key insight!)
      this.setCookie(token);
      
      // Redirect using state parameter
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
    // Use the key insight: .buildwithfern.com domain
    document.cookie = `${this.COOKIE_NAME}=${token}; Path=/; Domain=.buildwithfern.com; Secure; SameSite=Lax; Max-Age=86400`;
  }

  clearCookie() {
    // Clear from the correct domain  
    const expiredCookie = `${this.COOKIE_NAME}=; Path=/; Domain=.buildwithfern.com; Secure; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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