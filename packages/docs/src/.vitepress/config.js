const head = [
  ['link', { rel: 'icon', href: `/vue-screen/favicon.ico` }],
  ['meta', { property: 'og:title', content: `Vue-Screen` }],
  ['meta', { property: 'og:description', content: `Reactive screen size and media query states for Vue components. Integrates with most UI frameworks out of the box.` }],
  ['meta', { property: 'og:image', content: `https://repository-images.githubusercontent.com/181772522/80a74800-8595-11eb-90ce-102e7efee0a6` }],
]

if (process.env.NODE_ENV === 'production') {
  head.push([
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
    },
  ])
}

module.exports = {
  // base: '/vue-screen/',
  lang: 'en-US',
  title: 'Vue-Screen',
  description: '"Reactive screen size and media query states for Vue components. Integrates with most UI frameworks out of the box.',

  head,

  themeConfig: {
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' },
      {
        text: 'API Reference',
        link: '/api/',
        activeMatch: '^/api/'
      },
      {
        text: 'Github',
        link: 'https://github.com/reegodev/vue-screen',
      },
    ],

    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: 'Getting Started',
      children: [
        { text: 'Introduction', link: '/' },
        { text: 'Getting Started', link: '/guide/getting-started' },
        {
          text: 'Configuration',
          link: '/guide/configuration/composition-api',
          children: [
            { text: 'Composition API', link: '/guide/configuration/composition-api' },
            { text: 'Plugin', link: '/guide/configuration/plugin' },
          ]
        },
      ]
    },
    {
      text: 'Supported CSS frameworks',
      children: [
        { text: 'TailwindCSS', link: '/guide/frameworks/tailwind' },
        { text: 'Bootstrap', link: '/guide/frameworks/bootstrap' },
        { text: 'Bulma', link: '/guide/frameworks/bulma' },
        { text: 'Foundation', link: '/guide/frameworks/foundation' },
        { text: 'Materialize', link: '/guide/frameworks/materialize' },
        { text: 'Semantic UI', link: '/guide/frameworks/semantic-ui' },
        { text: 'Custom', link: '/guide/frameworks/custom' },
      ]
    },
    {
      text: 'SSR',
      children: [
        { text: 'Caveats', link: '/guide/ssr/caveats' },
        { text: 'Nuxt', link: '/guide/ssr/nuxt' },
      ]
    },
    {
      text: 'Examples',
      children: [
        { text: 'Sharing configurations', link: '/guide/examples/shared-config' },
        { text: 'Custom Tailwind config', link: '/guide/examples/custom-tailwind-config' },
      ]
    }
  ]
}

function getApiSidebar() {
  return [
    {
      text: 'API Reference',
      link: '/api/',
      children: [
        { text: 'Screen', link: '/api/screen' },
        { text: 'Grid', link: '/api/grid' },
      ]
    },
  ]
}
