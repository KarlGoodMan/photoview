/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), svgr()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: {
    port: 1234,
    proxy: {
      '/api': {
        target: 'http://localhost:4001', // 指向你的 Go 后端端口
        changeOrigin: true,
        secure: false,
      },
      '/graphql': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testing/setupTests.ts',
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: './junit-report.xml',
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
