import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../fern/footer-dist',
    // Inline all assets as base64 to avoid multiple file outputs
    assetsInlineLimit: 100000,
    rollupOptions: {
      output: {
        entryFileNames: `output.js`,
        assetFileNames: `output.[ext]`,
        inlineDynamicImports: true,
      },
    },
  },
})
