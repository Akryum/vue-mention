import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'VueMention',
    },
    rollupOptions: {
      external: [
        'vue',
        'v-tooltip',
      ],
      output: {
        globals: {
          vue: 'Vue',
          'v-tooltip': 'VTooltip',
        },
      },
    },
  },
  define: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    VERSION: JSON.stringify(require('./package.json').version),
  },
})
