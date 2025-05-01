
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Output directory
    outDir: 'dist',
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console logs in production
        drop_debugger: true
      }
    },
    
    // Performance optimizations
    rollupOptions: {
      output: {
        // Chunk splitting strategy
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            } else if (id.includes('@tanstack') || id.includes('query')) {
              return 'vendor-query';
            } else if (id.includes('@radix-ui') || id.includes('shadcn')) {
              return 'vendor-ui';
            }
            return 'vendor'; // Default vendor chunk
          }
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    
    // Enable source maps for debugging
    sourcemap: false,
    
    // Improve CSS processing
    cssCodeSplit: true,
    cssMinify: true,
    
    // Modern browsers target for smaller bundle size
    target: 'es2018'
  },
  server: {
    // Enable gzip compression for local development
    compress: true
  }
})
