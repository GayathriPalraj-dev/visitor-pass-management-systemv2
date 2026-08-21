import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiTarget = 'https://visitor-pass-management-systemv2.onrender.com'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: true,
        secure: true,
      },
      '/health': {
        target: apiTarget,
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
