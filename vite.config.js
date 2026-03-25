import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/holiday/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    open: true
  },
  plugins: [
    VitePWA({
      // 注册 Service Worker 策略
      registerType: 'autoUpdate',
      
      // 应用清单 (manifest.json)
      manifest: {
        name: 'A KANG TOOLS - Hotel Booking System',
        short_name: 'A KANG TOOLS',
        description: 'Hotel Service Booking System with offline support',
        theme_color: '#1a1a1a',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/holiday/',
        start_url: '/holiday/',
        icons: [
          {
            src: '/holiday/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/holiday/favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        categories: ['productivity', 'utilities'],
        screenshots: [
          {
            src: '/holiday/favicon.svg',
            sizes: '540x720',
            type: 'image/svg+xml'
          }
        ]
      },
      
      // Service Worker 策略
      workbox: {
        // 缓存策略：静态资源使用 CacheFirst，API 请求使用 NetworkFirst
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(js|css|woff2?)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 天
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*\.json$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 7 天
              }
            }
          }
        ],
        // 预缓存文件列表（自动生成）
        globPatterns: [
          '**/*.{js,css,html,svg,png,jpg,jpeg,gif,woff,woff2,ttf,eot}'
        ],
        // 忽略某些文件
        globIgnores: [
          '**/node_modules/**/*',
          'dist/stats.html'
        ],
        // 清理过期缓存
        cleanupOutdatedCaches: true,
        // 最大化缓存
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
      },
      
      // 开发环境配置
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true
      }
    })
  ]
})
