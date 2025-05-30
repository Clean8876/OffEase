import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path' 
import path from 'path'


export default defineConfig({
   resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
 
  server: {
    port: 3000,
  }
})
