# Configuration

## Fichier de configuration générale

Il se trouve à la racine du projet et se nomme `vue.config.js`.

Ce fichier permet de stocker toutes les configurations webpack spécifiques du projet :

```javascript
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
    port: '8081',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: 'static'
}
```

4 choses sont effectuées dans ce fichier :

- Ajouter un proxy vers notre API Rest sur `http://localhost:3000` pour rediriger vers `http://localhost:8081/` pour éviter les problèmes de **CORS** en développement.
- Fixer le port de l'application à **8081** pour éviter les collisions avec **Tomcat** qui démarre sur le port **8080** sur nos applications métiers.
- Forcer l'affichage des erreurs en surimpression sur le navigateur en développement. Ainsi le développeur est obligé de les corriger si il veut continuer à travailler.
- Générer les fichiers statiques js, css, images, fonts dans un répertoire `static` plutôt qu'à la racine.

## Configuration lint Prettier

Auparavant, nous utilisions le lint par défaut sur VueJS qui fonctionnait bien mais qui n'avait pas d'impact sur la mise en forme HTML. Prettier résoud ce problème.

Lors de la création du projet dans Vue CLI, on choisit :

- ESLint + Prettier
- Lint on save

Comme nous n'utilisons pas de fichier de configuration spécifiques, voici ce qui est ajouté dans le fichier `package.json` :

```json
 "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended",
      "@vue/prettier"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {},
    "overrides": [
      {
        "files": [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        "env": {
          "jest": true
        }
      }
    ]
  }
```

::: tip Note
On peut ajouter des règles spécifiques pour des projets.
La configuration peut se faire dans **vue ui** et les modifications sont enregistrés automatiquement dans la partie `rules`.
:::

On ajoute aussi des préférences de mise en forme sur le projet dans le fichier `.prettierrc.js` :

- Simple quote par défaut
- Pas de point virgule en fin de ligne

```javascript
module.exports = {
  singleQuote: true,
  semi: false
}
```

Maintenant, on peut corriger automatiquement la mise en forme en lançant la commande :

```bash
yarn lint
```

Cependant, on peut faire mieux avec la mise en forme automatique sur **Visual Studio Code** à l'enregistrement.
Pour cela, il faut installer l'extension **Prettier - Code formatter**.

Il reste une dernière étape pour finaliser la configuration de **Prettier** en ajoutant ans le fichier `settings.json` de préférence utilisateur de **Visual Studio Code** :

```json
  "editor.formatOnSave": true,
  "prettier.semi": false,
  "prettier.singleQuote": false,
  "prettier.tabWidth": 2,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

Cela permet de définir **Prettier** comme formatter par défaut et de définir les règles suivantes (les mêmes que dans le fichier `.prettierrc.js`) :

- Pas de point virgule en fin de ligne
- Simple quote par défaut
- Taille de la tabulation à 2 caractères

::: tip Note
On peut désactiver dans la barre d'état de **Visual Studio Code** le formatage pour les anciens projets.
:::

## Configuration Jest

Nous utilisons **Jest** pour les tests unitaires côté client.
Rien de plus simple pour mettre en place **Jest** sur un projet VueJS, on choisit l'option dans VueCLI et la configuraton est faîte automatiquement grâce au plugin dans le fichier `package.json` :

```json
  "jest": {
    "preset": "@vue/cli-plugin-unit-jest"
  }
```

Il faut aussi noter que les fichiers de test unitaire **Jest** sont prises en compte dans le formatage avec cette configuration :

```json
  "overrides": [
      {
        "files": [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        "env": {
          "jest": true
        }
      }
    ]
```

Les tests unitaires se trouvent dans le répertoire `tests/unit` et pour être pris en compte les fichiers doivent être de la forme `*.spec.js`

::: tip Note
Pour des facilitées de lecture, des sous répertoires ont été crées pour être en phase le découpage du projet :

- components
- services
- stores
  :::

Les tests unitaires peuvent être lancés par la commande :

```bash
yarn test:unit
```

On peut aussi ne tester qu'un seul fichier pour cela soit plus rapide à l'éxecution :

```bash
yarn test:unit nomFichier.spec.js
```

La commande de lancement de test unitaire permet aussi d'avoir des traces et la couverture unitaire.
Extrait de la commande dans le fichier `package.json` :

```json
"test:unit": "vue-cli-service test:unit --verbose --coverage=true"
```

## Configuration Buefy et SCSS

### Installation

Lors de la création du projet, on choisit un pré-processeur **CSS** : `SASS\SCSS (with node-saas)`

Pour installer **Buefy**, on installe le plugin en lançant la ligne de commande suivante à la racine du projet :

```bash
vue add vue-cli-plugin-buefy
```

On répond alors aux questions suivantes pour ajouter un pré-processeur **SCSS** et les îcones **Material Design** plutôt que **Font Awesome** :

```bash
? Add Buefy style? scss
? Include Material Design Icons? Yes
? Include Font Awesome Icons? No
```

Ce plugin fait les choses suivantes :

- Ajout des lignes suivantes dans le fichier `main.js` :

```javascript
import Buefy from 'buefy'
// Import du fichier scss de l'application
import './assets/scss/app.scss'

Vue.use(Buefy)
```

- Ajout des fichiers `_variables.scss` et `app.scss` dans le répertoire `src/assets/scss`
- Import des icônes Material dans le fichier `public/index.html` :

```html
<link
  rel="stylesheet"
  href="//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css"
/>
```

### Paramétrage

On peut maintenant définir et / ou écraser les styles de Buefy.
Dans le fichier `_variables.scss` se trouvent les variables principales SCSS de Buefy. Afin d'être accessible des changements ont été faits dans ce fichier :

- Changement des couleurs verte, turquoise, cyan, bleu, violette et rouge :

```scss
$green: hsl(132, 100%, 27%);
$turquoise: hsl(171, 100%, 38%);
$cyan: hsl(192, 88%, 33%);
$blue: hsl(217, 80%, 50%);
$purple: hsl(256, 60%, 56%);
$red: hsl(348, 80%, 47%);
```

- Pour des questions de gout, la couleur primaire (principale) devient le bleu à la place du violet :

```scss
$primary: $blue !default;
```

Le fichier `app.scss` permet de définir les styles propres de l'application.
Quelques changements ont été appliqué au niveau du style :

- Ajout de la police spécifique et définition de la couleur du titre applicatif :

```css
@font-face {
  font-family: 'sf_new_republicbold';
  src: url('../font/SFNewRepublicBold.ttf') format('truetype');
}

/* Titre
-------------------------------------------------- */
.titrebleu {
  font-family: 'sf_new_republicbold';
  font-size: 1.6em;
  color: #004667;
}

.titrevert {
  margin-left: 5px;
  padding-right: 10px;
  font-family: 'sf_new_republicbold';
  font-size: 1.6em;
  color: hsl(69, 59%, 37%);
}
```

- Mise à jour des ombres :

```css
.navbar {
  box-shadow: 0 2px 4px -1px rgba(10, 10, 10, 0.1), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}
// Card and table
.card {
  // Par défaut, buefy
  // box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
}

.card-header {
  margin-bottom: 0.5rem !important;
  // Par défaut, buefy
  // box-shadow: 0 1px 2px rgba(10, 10, 10, 0.1)
  box-shadow: 0 1px 3px rgba(10, 10, 10, 0.1);
}
```

- Resserrement de certains composants :

```css
.card-content {
  padding: 0.75rem !important;
}

.b-table .level:not(.top) {
  padding-bottom: 0.2rem !important;
}

.hero-body {
  padding: 4.5rem 1.5rem !important;
}

@media screen and (max-width: 768px) {
  .level-left + .level-right {
    margin-top: 0 !important;
  }

  .field.is-grouped.is-grouped-multiline:last-child {
    margin-bottom: 0 !important;
  }
}
```

- Déplacement des notifications :

```css
.notification {
  padding: 0.5rem 2.25rem 0.5rem 0.5rem;
}

.notices.is-bottom {
  padding-bottom: 60px;
}

.notices.is-top {
  padding-top: 60px;
}
```

- Correction dysfonctionnement autocompletion pour passer par dessus le footer :

```css
.dropdown-menu {
  z-index: 50 !important;
}
```
