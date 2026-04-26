import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Force a single styled-components instance — prevents Sanity Studio
      // theme context from breaking when glbslCMS has a different version.
      'styled-components': path.resolve('./node_modules/styled-components'),
    },
  },
  server: {
    port: 3000,
    host: true,
    strictPort: false,
  },
  optimizeDeps: {
    // Pre-bundle Sanity Studio dependencies for smoother dev server startup
    include: ['@sanity/ui', '@sanity/icons'],
  },
  build: {
    target: 'es2015',
    minify: 'esbuild',
  },
  esbuild: {
    target: 'es2015'
  },
  define: {
    // Sanity Studio uses process.env; polyfill it so the fallback values work in the browser
    'process.env': {}
  }
})
