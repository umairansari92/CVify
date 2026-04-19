import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024 // 10 MB
      },
      includeAssets: ['CVify Favicon.jpg', 'pwa-192.svg', 'pwa-512.svg'],
      manifest: {
        name: 'CVify Pro',
        short_name: 'CVify Pro',
        description: 'Best Free ATS Resume Builder & AI Cover Letter Generator',
        theme_color: '#020617',
        background_color: '#020617',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/CVify Favicon.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any'
          },
          {
            src: '/CVify Favicon.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('recharts')) return 'vendor-charts';
            if (id.includes('three')) return 'vendor-three';
            if (id.includes('framer-motion') || id.includes('motion')) return 'vendor-animation';
            if (id.includes('@react-pdf')) return 'vendor-pdf';
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons';
            return 'vendor'; // Baki sab common dependencies
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
