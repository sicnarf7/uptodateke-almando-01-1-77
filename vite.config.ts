
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
          ui: ['@radix-ui/react-tabs', '@radix-ui/react-select', '@radix-ui/react-label']
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
