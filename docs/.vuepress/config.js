module.exports = {
  plugins: [
    'vuepress-plugin-mermaidjs',
    '@vuepress/back-to-top',
    'vuepress-plugin-element-tabs',
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
          ['guide/fonctionnalite', 'Fonctionnalités'],
          ['guide/configuration', 'Configuration'],
          ['guide/donnees', 'Données et API'],
          ['guide/composant', 'Composants'],
          ['guide/store', 'Store VueX'],
          ['guide/formulaire', 'Formulaire']
        ]
      }
    ]
  }
}
