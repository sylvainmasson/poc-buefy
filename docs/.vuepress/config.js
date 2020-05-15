module.exports = {
  plugins: [
    '@vuepress/back-to-top',
    [
      '@vuepress/medium-zoom',
      {
        selector: '.theme-default-content:not(.custom) img'
      }
    ]
  ],
  base: '/poc-buefy/',
  title: 'Documentation nouvelle application exemple',
  description:
    'Documentation nouvelle application exemple front : nouvelle version VueJS, Buefy et bien plus encore ...',
  locales: {
    '/': {
      lang: 'fr-FR'
    }
  },
  themeConfig: {
    logo: '/assets/img/pied-logo.png',
    nav: [
      { text: 'Guide', link: '/' },
      {
        text: 'GitHub',
        link: 'https://github.com/sylvainmasson/poc-buefy'
      },
      {
        text: 'CodePen',
        link: 'https://codepen.io/collection/DOMJra'
      }
    ],
    // displayAllHeaders: true,
    lastUpdated: 'Dernière modification',
    sidebar: [
      {
        title: 'Guide',
        children: [
          ['guide/demarrage', 'Démarrage'],
          ['guide/structure', 'Structure des répertoires'],
          ['guide/fonctionnalite', 'Fonctionnalités']
        ]
      }
    ]
  }
}
