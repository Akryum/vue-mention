import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    exports: 'named',
    name: 'vue-mention',
    file: 'dist/vue-mention.umd.js',
    format: 'umd',
    sourcemap: true,
  },
})

export default config
