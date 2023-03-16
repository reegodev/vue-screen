const path = require('path')
const port = process.env.EXAMPLES_PORT || 8081

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      'vue-screen': path.join(__dirname, '../lib/dist/vue-screen.esm.js')
    }
  },

  server: {
    port
  },
})
