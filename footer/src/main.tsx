import './main.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { FernFooter } from './FernFooter.js'

// Function to render the Unleash footer
function renderUnleashFooter() {
  // Always use a dedicated container as a direct child of body,
  // so the footer never ends up inside Fern's layout containers.
  let footerContainer = document.getElementById('fern-footer');
  if (!footerContainer) {
    footerContainer = document.createElement('div');
    footerContainer.id = 'fern-footer';
    document.body.appendChild(footerContainer);
  } else if (footerContainer.parentElement !== document.body) {
    // If Fern placed #fern-footer inside the layout, move it to body
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
