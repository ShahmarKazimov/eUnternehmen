import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html",
        about: "./about.html",
        contact: "./contact.html",
        imprint: "./imprint.html",
        privacy: "./privacy.html",
        terms: "./terms.html"
      }
    }
  }
})