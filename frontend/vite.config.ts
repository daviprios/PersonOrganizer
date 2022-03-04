import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  alias: {
    '$api': path.resolve('./src/api'),
    '$components': path.resolve('./src/components'),
    '$pages': path.resolve('./src/pages'),
    '$styles': path.resolve('./src/styles'),
    '$root': path.resolve('./src'),
  }
})
