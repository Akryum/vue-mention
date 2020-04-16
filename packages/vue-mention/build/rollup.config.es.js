import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    name: 'vue-mention',
    file: 'dist/vue-mention.esm.js',
    format: 'es',
    sourcemap: process.env.NODE_ENV === 'production',
  },
  external: [
    ...base.external,
  ],
})

export default config
