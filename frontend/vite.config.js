import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://35.200.180.98',
        changeOrigin: true,
      },
    },
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})
