import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from '@honkhonk/vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      '$api': path.resolve('./src/api'),
      '$components': path.resolve('./src/components'),
      '$interfaces': path.resolve('./src/interfaces'),
      '$pages': path.resolve('./src/pages'),
      '$styles': path.resolve('./src/styles'),
      '$root': path.resolve('./src'),
      '$svgs': path.resolve('./src/assets/svgs'),
    }
  },
  assetsInclude: ['**/*.svg'],
})
