module.exports = {
  head: [
    ['script', {
      src: 'https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CPromise%2CArray.from%2CEvent',
    }],
    ['script', {
      src: 'https://unpkg.com/shim-keyboard-event-key',
      async: true,
    }],
  ],
  themeConfig: {
    logo: '/vue-mention.svg',
    repo: 'Akryum/vue-mention',
    docsDir: 'packages/docs',
    locales: {
      '/': {
        lang: 'en-US',
        title: 'vue-mention',
        description: 'Mention for Vue.js',
      },
    },
    editLinks: true,
    lastUpdated: true,
    smoothScroll: true,
    sidebarDepth: 3,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
        ],
        sidebar: {
          '/guide/': [
            {
              title: 'Guide',
              collapsable: false,
              children: [
                '/guide/',
              ],
            },
          ],
        },
      },
    },
  },
}
