import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       // target: 'http://127.0.0.1:8000',
  //       target: 'https://spotbenefit.in',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   allowedHosts: true
  // },
  build: {
    outDir: 'build'
  }
})
