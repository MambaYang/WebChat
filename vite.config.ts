import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    global: {},
  },
  css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: '@root-entry-name: default;',
          
          modifyVars: {
            // 此处也可设置直角、边框色、字体大小等
            'my-border-color': '#e7e7e7'
          }
        },
      },
  }
})
