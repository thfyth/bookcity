import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import type { CommonServerOptions } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/

export default defineConfig((mode) => {
  let server: CommonServerOptions = {}
  const VITE_APP = loadEnv(mode.mode, process.cwd())
  // console.log(import.meta.env.as)
  if (mode.mode === 'development') {
    server = {
      host: VITE_APP.VITE_HOST,
      port: Number(VITE_APP.VITE_PORT),
      proxy: {
        [VITE_APP.VITE_BASE_URL]: {
          target: VITE_APP.VITE_PROXY_DOMAIN,
        },
      },
    }
  } else if (mode.mode === 'production') {
    console.log('我是生成者环境')
    server = {
      port: Number(VITE_APP.VITE_PORT),
      host: VITE_APP.VITE_HOST,
    }
  }
  console.log('环境:', server)
  return {
    plugins: [vue(), vueJsx()],
    baseUrl: '/',
    resolve: {
      alias: {
        // 和 tsconfig.json 中 paths设置别名的区别，
        //  paths 主要用于编译期间别名的设置。
        // 而 vite.config.ts  中别名的设置主要用于
        // cnpm run build 时检测 项目中的@路径
        // '@': path.resolve(__dirname, 'src'),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server,
  }
})
