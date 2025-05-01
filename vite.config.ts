
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', '*.png', 'og-image.png'],
      manifest: {
        name: 'UpTodateKE',
        short_name: 'UpToDateKE',
        description: "Kenya's Pulse, Your Playground",
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon'
          },
          {
            src: 'og-image.png',
            sizes: '1200x630',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|webp|svg|gif|json)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\/api\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 10 * 60, // 10 minutes
              },
            },
          }
        ]
      }
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Improve chunking strategy
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          editor: ['@tiptap/react', '@tiptap/starter-kit', '@tiptap/extension-link'],
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-label'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query']
        }
      }
    },
    // Generate source maps for production (better error reporting)
    sourcemap: mode !== 'production',
    // Minify for production
    minify: mode === 'production',
    // Target modern browsers for better performance
    target: 'es2020',
  }
}));
