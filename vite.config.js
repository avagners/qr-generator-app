import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      // Указываем входную точку для сборки
      input: {
        main: './index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: true,
    // Разрешаем все хосты (полезно для туннелей типа ngrok)
    allowedHosts: 'all'
  }
})