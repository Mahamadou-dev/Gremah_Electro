// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ],
  server: {
    historyApiFallback: true // ⚠ Dans Vite, ça marche, mais doit être écrit côté devServer
  },
  preview: {
    historyApiFallback: true // Pour le mode preview aussi
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['framer-motion'],
          icons: ['react-icons']
        }
      }
    }
  }
})
