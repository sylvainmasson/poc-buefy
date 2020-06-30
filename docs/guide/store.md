# Gestion d'état avec VueX

Vuex est un **gestionnaire d'état (_« state management pattern »_) et une bibliothèque** pour des applications Vue.js. Il sert de zone de stockage de données centralisée pour tous les composants dans une application, avec des règles pour s'assurer que l'état ne puisse subir de mutations (changements) que d'une manière prévisible.

## Structure

Dans l'application, le store est découpé en plusieurs modules :

- **alert** : pour gérer les alertes qui s'affichent
- **pagination** : pour gérer la pagination des différents tableaux de l'application
- **user** : pour gérer les utilisateurs et l'authentification.

::: tip Note
Le module **user** est un bouchon pour simuler une connexion, déconnexion et la persistence de l'utilisateur connecté dans le store.
:::

## Persistence du store

Le contenu du store et de ses différents modules est persisté en stockage local (**local storage**).
Cela permet à l'utilisateur de ne pas perdre son paramétrage à chaque fois qu'il rafraîchit la page ou qu'il ferme son navigateur.

**Ajout de la dépendance dans les dépendances du fichier package.json** :

```json
"dependencies": {
    ...,
    "vuex-persist": "^2.2.0"
  }
```

La suite de la configuration se passe intégralement dans le fichier `store\index.js`.

**Import de la dépendance**

```javascript
import VuexPersistence from 'vuex-persist'
```

**Mise en place du stockage local VueX dans `nom_host-vuex`**

```javascript
const vuexLocal = new VuexPersistence({
  key: window.location.host + '-vuex',
  storage: window.localStorage
})
```

**Déclaration d'une mutation pour gérer le rafraîchissement du store**

```javascript
mutations: {
  RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
}
```

**Ajout du plugin dans VueX**

```javascript
plugins: [vuexLocal.plugin]
```

## Déclaration des modules

Pour découper correctement le store et son utilisation, nous utilisons des modules mais sans espace de noms. Il faut donc faire attention à ne pas nommer les actions ou les mutations de la même manière dans des modules différents.

Pour créer un nouveau module, il faut ajouter un fichier `nomModule.js` dans le répertoire `store\modules`.

Ensuite, on peut créer les différents composants d'un module VueX :

- state
- getters
- mutations
- actions

Enfin, il faut les exporter pour qu'ils soient visible ailleurs :

```javascript
export default {
  state,
  getters,
  actions,
  mutations
}
```

Dans le fichier global du store `store\index.js`, on importe classiquement les différents modules et on peut ensuite les déclarer dans le store VueX :

```javascript
modules: {
  user, pagination, alert
}
```

### Exemple de contenu du store

Le store sera ensuite découpé en module pour le stockage :

```json
{
  "user": {
    "user": {
      "id": 11,
      "matricule": "Sacha_Benoit24",
      "nomPrenom": "Sacha",
      "email": "Sacha_Benoit2423@gmail.com",
      "nom": "Colin",
      "prenom": "Pierre",
      "roles": ["ROLE_ADMINISTRATEUR"]
    },
    "isAuthenticated": true
  },
  "pagination": {
    "paginations": [
      {
        "id": "clients",
        "isPaginated": true,
        "isSimplePagination": false,
        "perPage": "15"
      }
    ],
    "defaultPagination": {
      "isPaginated": true,
      "isSimplePagination": false,
      "perPage": 15
    }
  },
  "alert": {
    "notification": {
      "message": "Suppression effectuée avec succès",
      "type": "is-success"
    },
    "msg": "",
    "variant": "",
    "show": false
  }
}
```

## Alert

Ce module permet de gérer l'affichage des alertes (notifications) dans l'application.

Par défaut, les alertes s'affichent en bas à droite de l'application et restent affichées 5 secondes.
Ce comportement est paramétrable ici :

```javascript
function notificationOpen(notification) {
  Notification.open({
    duration: 5000,
    position: 'is-bottom-right',
    message: notification.message,
    type: notification.type,
    hasIcon: true,
    queue: false
  })
}
```

On peut afficher différents type d'alerte :

- Notification de succès générique avec le message `Enregistrement effectué avec succès`
- Notification de suppression générique avec le message `Suppression effectuée avec succès`
- Notification de succès avec message paramétré
- Notification d'erreur avec le format suivant `Quelque chose s'est mal passé :` et ensuite le message d'erreur paramétré
- Notification d'avertissement (type warning) avec message paramétré

### Utilisation

**Notification de succès générique avec le message `Enregistrement effectué avec succès`**

```javascript
this.$store.dispatch('addNotificationSuccessSave')
```

**Notification de suppression générique avec le message `Suppression effectuée avec succès`**

```javascript
this.$store.dispatch('addNotificationSuccessDelete')
```

**Notification de succès avec message paramétré**

```javascript
this.$store.dispatch('addNotificationSuccess', 'Mon message')
```

**Notification d'erreur**

```javascript
this.$store.dispatch('addNotificationError', 'Message erreur')
```

**Notification d'avertissement (type warning) avec message paramétré**

```javascript
this.$store.dispatch('addNotificationWarning', 'Message avertissement')
```

## Pagination

Ce module permet de gérer et de sauvegarder le comportement de la pagination pour chaque tableau de l'application.

Voici les éléments qui sont stockés par pagination de tableau :

- Pagination ou non `isPaginated`
- Pagination simple ou non `isSimplePagination`
- Nombre d'éléments par page `perPage`

Chaque pagination est stockée de la manière suivante dans un tableau avec pour chacune un attribut `id` qui permet de la retrouver :

```json
"paginations": [
    {
    "id": "clients",
    "isPaginated": true,
    "isSimplePagination": false,
    "perPage": "15"
    }
]
```

### Comportement

- Si la pagination d'un tableau n'existe pas. On propose une pagination par défaut sinon on renvoie la pagination par rapport à son `id`
- Lors de l'enregistrement d'une pagination :
  - Si elle n'existe pas, elle est crée
  - Si elle existe, elle est mise à jour

### Utilisation

La gestion de la pagination se fait dans le composant décrit [ici](composant.md#pagination).

**Récupération d'une pagination pour un tableau**

```javascript
this.$store.getters.getPaginationById(this.id)
```

**Enregistrement d'une pagination pour un tableau**

```javascript
this.$store.commit('SAVE_PAGINATION', this.pagination)
```

## User (Gestion de la connexion)

Ce module permet de gérer la connexion, la déconnexion et l'utilisateur connecté.
C'est un mock qui ne sera pas réutilisé dans nos projets. Son seul but est de montrer le fonctionnement du composant de [connexion](composant.md#connexion).

Ce module comprend les données suivantes :

- `isAuthenticated` : vrai si un utilisateur est authentifié, faux sinon
- `authenticatedUser` : information sur l'utilisateur connecté dont voici les données.

**Structure des données de l'utilisateur connecté**

```json
"user": {
    "id": 11,
    "matricule": "Sacha_Benoit24",
    "nomPrenom": "Sacha",
    "email": "Sacha_Benoit2423@gmail.com",
    "nom": "Colin",
    "prenom": "Pierre",
    "roles": ["ROLE_ADMINISTRATEUR"]
}
```

### Utilisation

**Récupération d'un utilisateur à partir de son id**

```javascript
this.$store.dispatch('fetchUser', Math.floor(Math.random() * Math.floor(20)))
```

Cette méthode permet 3 choses :

- Enregistrer l'utilisateur dans `authenticatedUser`
- Passer `isAuthenticated` à `true`
- Ajouter une alerte de bienvenue à l'utilisateur avec son nom et prénom

**Déconnexion de l'utilisateur**

```javascript
this.$store.dispatch('disconnectUser')
```

Cette méthode permet 2 choses :

- Supprimer la valeur `authenticatedUser`
- Passer `isAuthenticated` à `false`
