import './main.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { FernFooter } from './FernFooter.js'

// Function to render the Unleash footer - similar to the original custom-footer.js approach
function renderUnleashFooter() {
  console.log('🔍 Attempting to render Unleash Footer...');
  console.log('📍 Current URL:', window.location.href);
  console.log('📄 Document ready state:', document.readyState);
  
  // Look for common footer selectors that Fern might use
  const possibleSelectors = [
    '#fern-footer',
    '[data-fern-footer]', 
    '.fern-footer',
    'footer',
    '#footer',
    '.footer'
  ];
  
  let footerContainer: HTMLElement | null = null;
  
  // Try to find an existing footer container
  for (const selector of possibleSelectors) {
    footerContainer = document.querySelector(selector);
    if (footerContainer) {
      console.log(`✅ Found footer container using selector: ${selector}`);
      break;
    }
  }
  
  // If no footer found, create one at the end of body
  if (!footerContainer) {
    console.log('📦 Creating new footer container at end of body');
    footerContainer = document.createElement('div');
    footerContainer.id = 'fern-footer';
    footerContainer.setAttribute('data-react-footer', 'true');
    document.body.appendChild(footerContainer);
  }
  
  // Clear any existing content and render our React footer
  footerContainer.innerHTML = '';
  
  try {
    const root = createRoot(footerContainer);
    root.render(
      <React.StrictMode>
        <FernFooter />
      </React.StrictMode>
    );
    console.log('✅ Footer successfully rendered!');
  } catch (error) {
    console.error('❌ Error rendering footer:', error);
    // Fallback to simple HTML if React fails
    footerContainer.innerHTML = `
      <div style="padding: 20px; text-align: center; background: #f3f4f6; border-top: 1px solid #e5e7eb;">
        <p>Unleash Documentation Footer</p>
        <p style="font-size: 12px; color: #666;">© 2025 Unleash. All rights reserved.</p>
      </div>
    `;
  }
}

// Render when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderUnleashFooter);
} else {
  renderUnleashFooter();
}

// Re-render on navigation changes (for SPA behavior)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(renderUnleashFooter, 100);
  }
}).observe(document, { subtree: true, childList: true });
