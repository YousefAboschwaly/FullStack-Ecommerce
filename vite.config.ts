import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    server: {
    allowedHosts: [
      "ea195634-8125-4a04-89f1-78ad0a6188de-00-16j1q39120bwy.janeway.replit.dev",
    ],
  },

})
