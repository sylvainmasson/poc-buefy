# Tests unitaires

## Principe

Les objectifs des tests unitaires sur la partie front sont assez proches de ceux que l'on peut faire habituellement :

- Augmenter la confiance
- Augmenter la qualité du code
- Documenter

Pour rappel, la présentation de la configuration des tests unitaires et leur mise en place est faite [ici](configuration.md#configuration-jest).

## Quoi tester et ne pas tester

### A tester

Pour les composants, il faut tester le contrat du composant c'est à dire tester les entrées, sorties et éviter de tester la logique interne du composant.

Entrées :

- Données du composant
- Propriétés du composant (`props`)
- Les interactions utilisateurs
- Le cycle de vie du composant : `mounted()`, `created`, ...
- Le store **VueX** et son utilisation
- Les paramètres de route

Sorties :

- Ce qui est affiché dans le **DOM**
- Les appels de fonctions externes
- Les évènements émis par le composant
- Le changement de route
- Les mises à jour du store **VueX**
- Les changements sur les composants enfants

:::tip Note
Pour des tests unitaires sur autre chose que des composants, on se rapproche beaucoup de ce que l'on fait habituellement avec **Junit**.
On teste le comportement de la fonction et si on veut aller plus loin, on peut tester plus pour atteindre une couverture de tests unitaires de 100%.
:::

### A ne pas Tester

- Ne pas tester les détails de l'implémentation
- Ne pas tester le framework lui même, c'est déjà fait !
- Ne pas tester les librairies tierce

### Exemple

**ActionButton.vue**

```html
<template>
  <div class="field has-addons">
    <slot name="before" />
    <base-button
      type="is-success is-small"
      icon-right="eye"
      title="Voir"
      v-if="isReadable"
      @click="$emit('click-read')"
      data-testid="button-read"
    />
    <base-button
      type="is-link is-small"
      icon-right="pencil"
      title="Modifier"
      v-if="isEditable"
      @click="$emit('click-edit')"
      data-testid="button-modify"
    />
    <base-button
      type="is-danger is-small"
      icon-right="delete"
      title="Supprimer"
      v-if="isDeletable"
      @click="remove"
      data-testid="button-delete"
    />
    <slot name="after" />
  </div>
</template>
```

Entrées :

- Données :
  - `isReadable`, `isEditable`, `isDeletable` ces 3 booléens déterminent l'affichage ou non des données, on doit donc tester ces propriétés
- Clic sur les boutons, vérification que les méthodes sont bien appelés.

Sorties :

- Ce qui est affiché dans le **DOM** :
  - Basé sur les entrants, vérification de l'affichage des boutons
- Événements émis par le composant :
  - Vérification de l'appel des évènements sur clic

## Implémentation

On reste toujours sur le même composant `ActionButton` et nous allons mettre en place les tests décrits précedemment.

Après avoir crée le fichier `ActionButton.spec.js` dans le répertoire `tests/unit/components`, on importe les composants que l'on a besoin en provenance `@vue/test-utils`, le composant que l'on veut tester et éventuellement **Buefy**.

```javascript
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Buefy from 'buefy'
import ActionButton from '@/components/ActionButton.vue'
```

Ensuite, il faut créer un composant **Vue** local et l'initialiser avec ce qui est nécessaire dans les tests.

```javascript
const localVue = createLocalVue()

localVue.use(Buefy)
```

Enfin, on peut mettre en place les tests avec un bloc `describe` et chaque test sera une fonction anonyme `it`

```javascript
describe('ActionButton.vue, lecture', () => {
  it('Should not render button read, if isReadable false', () => {
    const wrapper = shallowMount(ActionButton, { localVue })
    expect(wrapper.find('[data-testid="button-read"]').exists()).toBe(false)
  })
})
```

### Description d'un test

Ici, on veut tester que le bouton `read` existe **si** la propriété `isReadable` est à `true`.

```javascript
it('Should render button read, if isReadable true', () => {
  const wrapper = shallowMount(ActionButton, {
    propsData: {
      isReadable: true
    },
    localVue
  })
  expect(wrapper.find('[data-testid="button-read"]').exists()).toBe(true)
})
```

Voici les différentes étapes :

Initialiser une constante `wrapper` pour recréer l'environnement vue en passant en paramètre le composant, les `propsData` et notre `localVue`

```javascript
const wrapper = shallowMount(ActionButton, {
  propsData: {
    isReadable: true
  },
  localVue
})
```

On a donc passé la propriété `isReadable` à `true`. Le bouton `read` doit donc être visible. C'est ce que l'on va tester maintenant en utilisant l'attribut `data-testid` qui permet de retrouver facilement un composant pour les tests.

Dans le template :

```html
<base-button
  type="is-success is-small"
  icon-right="eye"
  title="Voir"
  v-if="isReadable"
  @click.native="$emit('click-read')"
  data-testid="button-read"
/>
```

Dans le test unitaire :

```javascript
expect(wrapper.find('[data-testid="button-read"]').exists()).toBe(true)
```

Si le test passe bien, cela veut bien dire que le bouton s'affiche si la propriété est vraie.

### Exemple déclenchement d'un évènement

Ici on veut tester que l'évènement est bien émis lors que clic sur le bouton pour le composant parent.

```javascript
it('Should emmit click-edit, if button edit is clicked', () => {
  const wrapper = shallowMount(ActionButton, {
    propsData: {
      isEditable: true
    },
    localVue
  })
  wrapper.find('[data-testid="button-modify"]').trigger('click')
  const clickRead = wrapper.emitted('click-edit')
  expect(clickRead).toHaveLength(1)
})
```

De la même manière que précédemment, on initialise le contexte pour le test avec `shallowMount`.

Ensuite, on simule le clic sur le bouton :

```javascript
wrapper.find('[data-testid="button-modify"]').trigger('click')
```

Enfin, on vérifie que l'évènement a bien été émis une seule fois :

```javascript
const clickRead = wrapper.emitted('click-edit')
expect(clickRead).toHaveLength(1)
```

### Exemple avec VueX

Ici le but du test est de vérifier le comportement du composant lorsque l'utilisateur est authentifié.
Ces données se trouvent dans **VueX**. Il va donc falloir simuler le fonctionnement du store pour pouvoir tester ce composant.

Première étape, importer et utiliser **VueX**

```javascript
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)
```

Initialiser le contenu du store, actions avec des mocks **Jest** et getters

```javascript
let store
let actions = {
  fetchUser: jest.fn(),
  disconnectUser: jest.fn()
}
let getters = {
  authenticatedUser: () => user,
  isAuthenticated: () => true
}
```

Création du store avant chaque test

```javascript
beforeEach(() => {
  store = new Vuex.Store({
    getters,
    actions
  })
})
```

Dans chaque test, injection du store dans le `shallowMount` en plus du `localVue`

```javascript
const wrapper = shallowMount(Connexion, { store, localVue })
```

Premier test, vérification que le bouton connexion n'est pas affiché si on est connecté

```javascript
it('Should not render connection button, if authenticated', () => {
  store = new Vuex.Store({
    getters
  })
  const wrapper = shallowMount(Connexion, { store, localVue })
  expect(wrapper.find('[data-testid="bouton-connexion"]').exists()).toBe(false)
})
```

2ème test, vérification de l'affichage de l'utilisateur et de la déconnexion si on est connecté

```javascript
it('Should render user and disconnect, if authenticated', () => {
  const wrapper = shallowMount(Connexion, { store, localVue })
  expect(wrapper.find('[data-testid="label-utilisateur"]').exists()).toBe(true)
  expect(wrapper.find('[data-testid="label-utilisateur"]').text()).toEqual(
    'nomPrenom (matricule)'
  )
  expect(wrapper.find('[data-testid="deconnexion"]').exists()).toBe(true)
  expect(wrapper.find('[data-testid="deconnexion"]').text()).toEqual(
    'Déconnexion'
  )
})
```

Dernier test, vérification que l'on est déconnecté lorsque l'on clique sur déconnexion.

Ici, on vérifie 2 choses :

- L'appel de l'action `disconnectUser` dans le store
- La redirection vers la racine via un appel `router.push`

```javascript
it('Should render user and disconnect, if authenticated', () => {
  const wrapper = shallowMount(Connexion, { store, localVue })
  expect(wrapper.find('[data-testid="label-utilisateur"]').exists()).toBe(true)
  expect(wrapper.find('[data-testid="label-utilisateur"]').text()).toEqual(
    'nomPrenom (matricule)'
  )
  expect(wrapper.find('[data-testid="deconnexion"]').exists()).toBe(true)
  expect(wrapper.find('[data-testid="deconnexion"]').text()).toEqual(
    'Déconnexion'
  )
})
```

## Tester VueX

Le store doit aussi être testé. C'est ce que l'on va s'atteler à faire ici.

Un module du store étant un fichier js classique, le tester reste assez simple.

### Initialisation

Importation du module à tester

```javascript
import pagination from '@/store/modules/pagination.js'
```

Avant chaque test, initialisation des données

```javascript
beforeEach(() => {
  newPagination = {
    id: id,
    ...pagination.state.defaultPagination
  }
})
```

### Test des getters

1er test, vérification que l'on retourne la pagination par défaut est retournée si la pagination n'existe pas. On teste des attributs et des méthodes d'objets.

Ce test permet de montrer l'apple d'un getter : `pagination.getters.getPaginationById`.

```javascript
it("Should return default pagination, if pagination with id doesn't exist", () => {
  const getPaginationById = pagination.getters.getPaginationById(
    pagination.state
  )
  expect(getPaginationById(id)).toEqual(newPagination)
})
```

2ème test, vérification que l'on retourne la pagination passé en paramètre si elle existe.

En plus, on appelle une mutation : `pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)` en passant le `state` pour enregistrer au préalable notre pagination.

```javascript
it('Should return pagination, if pagination with id exist', () => {
  newPagination.isPaginated = false
  pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
  const getPaginationById = pagination.getters.getPaginationById(
    pagination.state
  )
  expect(getPaginationById(id)).toEqual(newPagination)
})
```

### Test des mutations

Test de l'ajout d'une pagination si elle n'existe pas au préalable dans le store

```javascript
it("Should add pagination, if pagination doesn't exist", () => {
  pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
  expect(pagination.state.paginations).toContain(newPagination)
})
```

Test de la modification si la pagination existe déjà

```javascript
it('Should modify pagination, if pagination exist', () => {
  pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination2)
  newPagination.isPaginated = false
  pagination.mutations.SAVE_PAGINATION(pagination.state, newPagination)
  expect(pagination.state.paginations).toContain(newPagination)
})
```
