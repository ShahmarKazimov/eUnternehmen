import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],

  root: './',
  base: './',
  publicDir: 'src/assets',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        imprint: resolve(__dirname, 'imprint.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        about: resolve(__dirname, 'about.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop()

          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            return `images/[name].[hash][extname]`
          }

          if (/css/i.test(extType)) {
            return `css/[name].[hash][extname]`
          }

          if (/woff|woff2|ttf|eot/i.test(extType)) {
            return `fonts/[name].[hash][extname]`
          }

          return `assets/[name].[hash][extname]`
        },
      },
    },
    minify: 'esbuild',
    sourcemap: false,
  },

  server: {
    port: 3000,
    open: true,
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@js': resolve(__dirname, './js'),
      '@css': resolve(__dirname, './src/css'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
})