# Structure des répertoires de l'application

```bash
.
├── babel.config.js `Configuration babel`
├── deploy.sh `Script de déploiement de la documentation dans Github pages`
├── dist `Livrables après compilation`
├── docs `Documentation VuePress`
│   ├── guide
│   └── .vuepress
│       ├── config.js `Configuration de la documentation`
│       ├── dist `Livrable de la documentation`
├── .gitignore `Fichier et répertoire ignorer par git`
├── package.json `Dépendances et configuration de l\'application`
├── .prettierrc.js `Préférences lint prettier`
├── public
│   └── index.html
├── server `Api REST Json Server`
│   ├── index.js `Configuration des données avec faker.js`
│   ├── package.json `Dépendances et configuration de Json Server`
├── src `Sources de l\'application`
│   ├── App.vue `Composant principal VueJS`
│   ├── assets `Resources statiques`
│   │   ├── font
│   │   ├── img
│   │   └── scss
│   │       ├── app.scss `Variables générales scss Buefy`
│   │       └── _variables.scss `Variables applicatives scss Buefy`
│   ├── components `Composants VueJS`
│   ├── constants
│   ├── main.js `Fichier principal JS, importation des dépendances VueJS`
│   ├── mixins `Code partagés par les composants`
│   ├── router `Configuration routage applicatif`
│   ├── services `Services dont axios pour l\'accès aux données`
│   ├── store `Store vuex`
│   │   ├── index.js `Configuration store`
│   │   └── modules `Différents modules store`
│   └── views `Composant de type vue, référencé dans le router`
├── tests
│   └── unit `Tests unitaires`
│       ├── components `Test unitaires composants`
│       ├── services `Test unitaires services`
│       └── store `Test unitaires store`
├── vue.config.js `Configuration webpack spécifique projet`
```
