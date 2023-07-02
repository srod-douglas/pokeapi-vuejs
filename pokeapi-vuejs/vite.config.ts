import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// {
//   template: {
//     compilerOptions: {
//       isCustomElement: (tag) => [''].includes(tag),
//     }
//   }
// }



// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { VitePWA } from 'vite-plugin-pwa'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), VitePWA({ registerType: 'autoUpdate' })],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })