import { fileURLToPath, URL } from 'node:url'
import federation from "@originjs/vite-plugin-federation";
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from "vite-plugin-html";
import copy from "rollup-plugin-copy";



export default defineConfig({
  test:{
    globals:true
  },
  plugins: [vue(),
  federation({
    name:'remote',
    filename:'remoteEntry.js',
    exposes:{
      './App':'./src/App.vue',
    },
    remotes:{},
  }),
createHtmlPlugin({
  inject:{
    data:{
      title:'remote'
    }
  }
}),
copy({
  targets:[{
    src:"dist/assets",
    dest:'public'
  }],
  hook:'writeBundle'
})],
build: {
  polyfillModulePreload: false,
  assetsInlineLimit: 40960,
  target: "esnext",
  minify: false,
  cssCodeSplit: false,
  rollupOptions: {
    output: {
      minifyInternalExports: false,
    },
  },
},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
