# Composants de l'application

Tous les composants de l'application se trouvent dans le dossier `\src\components`. Ces composants sont testés et leur tests unitaires respectifs se trouvent dans le dossier `\tests\unit\components\`.

## Barre de navigation

La composant barre de navigation de l'application se nomme `Navbar`.

Par défaut, les menus sont cachés si l'utilisateur n'est pas authentifié, c'est à dire si le booléen, du module store `user`, `isAuthenticated` est à `false`.
Ce comportement peut bien sûr être changé selon les besoins de l'application.

La barre de navigation se compose :

- d'un titre en 2 parties et 2 couleurs avec un lien pour revenir à la page d'accueil
- du menu de l'application avec ses différentes entrées
- Du composant de connexion décrit ci-dessous.

<img :src="$withBase('/assets/img/connexion_connected.png')" alt="Barre de navigation">

La barre de navigation est compatible mobile avec l'affichage classique d'un menu **burger**

<img :src="$withBase('/assets/img/navbar_burger.gif')" alt="Menu burger">

La partie du menu propre à chaque application se définit dans le slot `start` :

```html
<template slot="start" v-if="isAuthenticated">
  <b-navbar-item @click="$router.push({ name: 'Clients' })">
    Client
  </b-navbar-item>
  <b-navbar-dropdown label="Info" hoverable>
    <b-navbar-item>
      Aide
    </b-navbar-item>
    <b-navbar-item>
      Contact
    </b-navbar-item>
  </b-navbar-dropdown>
</template>
```

**Propriétés**

| Nom    | Description            | Type                 | Obligatoire | Valeur par Défaut |
| ------ | ---------------------- | -------------------- | ----------- | ----------------- |
| titre1 | Début du titre en bleu | Chaîne de caractères | Oui         |                   |
| titre2 | Suite du titre en vert | Chaîne de caractères | Oui         |                   |

## Connexion

Ce composant permet de gérer la connexion à l'application.
Il se nomme `Connexion`

Les données de ce composant proviennent du store **VueX**. Le comportement du composant de connexion et du store gérant l'authentification est bouchonné pour simplifier le développement. La structure pourra être cependant conservée lors de l'intégration dans le projet squelette.

Le composant a 2 états :

- L'utilisateur n'est pas connecté, le booléen `isAuthenticated` est à `false`, on présente alors le bouton de connexion. Sur clic sur le bouton de connexion, on déclenche alors la méthode du store pour récupérer l'utilisateur, mettre à jour l'utilisateur connecté et le booléen `isAuthenticated` à `true`.
- L'utilisateur est connecté, le booléen `isAuthenticated` est à `true` et l'objet `authenticatedUser` est rempli. On présente alors le nom, prénom de l'utilisateur avec entre parenthèse son matricule et un menu déroulant proposant la déconnexion. Lors de la déconnexion, on déclenche la méthode du store pour déconnecter l'utilisateur et on revient à l'état initial.

  <img :src="$withBase('/assets/img/connexion.gif')" alt="Connexion">

::: tip Note
Le composant de **connexion** est compatible mobile et s'intègre dans la barre de navigation en mobile dans le menu **burger**.
:::

## Pied de page

Le composant pied de page se nomme logiquement `Footer`.

Il présente :

- Le logo du département
- Un lien d'aide
- Un lien de contact pour envoyer un mail vers l'assistance numérique
- Le numéro de la version

<img :src="$withBase('/assets/img/footer.png')" alt="Pied de page">

**Propriétés**

| Nom     | Description              | Type                 | Obligatoire | Valeur par Défaut |
| ------- | ------------------------ | -------------------- | ----------- | ----------------- |
| version | Version de l'application | Chaîne de caractères | Non         |                   |

## Bouton de base

Le composant `BaseButton` permet de définir un comportement et affichage cohérent des boutons de l'application.
C'est juste un composant squelette qui permet de passer les attributs, les méthodes d'un bouton avec le code suivant :

```javascript
<b-button v-on="$listeners" v-bind="$attrs">
```

Il possède aussi un slot qui permet de redéfinir le libellé.

**Exemple d'utilisation**

```html
<base-button
  title="Ajouter un enregistrement"
  libelle="Ajouter"
  type="is-success"
  icon-left="plus"
  v-if="isAdd"
  v-on:click="add"
/>
```

Avec utilisation du slot `libelle`

```html
<base-button
  type="is-link"
  title="Connexion"
  @click.native="connexion"
  v-if="!isAuthenticated"
>
  <template slot="libelle">
    <strong>Connexion</strong>
  </template>
</base-button>
```

:::: tabs

::: tab Propriétés

| Nom     | Description       | Type                 | Obligatoire | Valeur par Défaut |
| ------- | ----------------- | -------------------- | ----------- | ----------------- |
| libelle | Libellé du bouton | Chaîne de caractères | Non         |                   |

:::

::: tab Slots

| Nom     | Description       |
| ------- | ----------------- |
| libelle | Libellé du bouton |

:::

::::

## En tête de tableau

Ce composant nommé 'TabHeader` permet de gérer les en-têtes de tableau.

Par défaut, il permet d'afficher 2 boutons :

- **Ajouter** pour naviguer ver la page d'ajout d'un composant
- **Exporter** pour déclencher l'export CSV

Ces 2 boutons peuvent être cachés.

On peut ajouter aussi des boutons avant et après avec 2 slots `before` et `after`.

**Demo**

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-user="sylvainmasson" data-slug-hash="MWammEE" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="ExampleTabHeader">
  <span>See the Pen <a href="https://codepen.io/sylvainmasson/pen/MWammEE">
  ExampleTabHeader</a> by Sylvain Masson (<a href="https://codepen.io/sylvainmasson">@sylvainmasson</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

:::: tabs

::: tab Propriétés

| Nom          | Description                         | Type                 | Obligatoire | Valeur par Défaut |
| ------------ | ----------------------------------- | -------------------- | ----------- | ----------------- |
| title        | Titre de l'en-tête                  | Chaîne de caractères | Oui         |                   |
| isAdd        | Affichage ou non du bouton d'ajout  | Booléen              | Non         |                   |
| isExportable | Affichage ou non du bouton d'export | Booléen              | Non         |                   |

:::

::: tab Évènements

| Nom          | Description                            |
| ------------ | -------------------------------------- |
| click-add    | Déclenché sur le clic du bouton ajout  |
| click-export | Déclenché sur le clic du bouton export |

:::

::: tab Slots

| Nom    | Description                      |
| ------ | -------------------------------- |
| before | Affiché avant le bouton ajouter  |
| after  | Affiché après le bouton exporter |

:::

::::

## Résultat vide

## Boutons d'action tableau

## Pagination

## En tête de formulaire

## Pied de formulaire

## Champ input

## Champ texte riche

## Champ adresse

## Téléchargement image

## Affichage image

## Carte avec marqueur

## Libellé valeur
