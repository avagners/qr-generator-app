import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: true,
    // Разрешаем конкретный хост ngrok
    allowedHosts: [
      'quantally-scentless-reginald.ngrok-free.dev', // замените на актуальный хост ngrok
      'localhost',
      '127.0.0.1'
    ]
  }
})