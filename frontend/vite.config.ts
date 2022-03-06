import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '$api': path.resolve('./src/api'),
      '$components': path.resolve('./src/components'),
      '$interfaces': path.resolve('./src/interfaces'),
      '$pages': path.resolve('./src/pages'),
      '$styles': path.resolve('./src/styles'),
      '$root': path.resolve('./src'),
    }
  }
})
