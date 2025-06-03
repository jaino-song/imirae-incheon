import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // string shorthand: /api -> http://localhost:5005/api
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        // Remove /api prefix if your server routes don't have it
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
})
