# Gestion des formulaires

## Principe

Pour une question de simplicité, nous utilisons la validation automatique **HTML5** sur sortie de champ et changement (`on-blur`).

Par exemple, l'utilisateur arrive sur un champ obligatoire, il ne le remplit pas, un message d'erreur apparaît.
Ce message disparaît lorsque le champ est valide.
Par contre, les messages d'erreur n'apparaissent pas à priori. On laisse l'utilisateur remplir le champ et le quitter avant éventuellement de lui afficher une erreur.

**Exemple avec un champ obligatoire**

```html
<field-input
  id="nom"
  label="Nom"
  v-model="client.nom"
  type="text"
  required="true"
  maxlength="50"
  :has-counter="false"
  @input="changeNom"
/>
```

Les explications sur le composant `FieldInput` se trouvent [ici](composant.md#champ-input).

Le bouton **Valider** n'est pas grisé lorsque le formulaire est invalide.
Lors de la validation d'un formulaire invalide, le focus est mis sur le premier champ en erreur avec un message invitant à remplir ce champ.
On respecte la progression de remplissage du formulaire et les champs non modifiés et pas valide ne sont pas encore en erreur mais le seront au fur et à mesure du remplissage du formulaire

<img :src="$withBase('/assets/img/form_error.png')" alt="Formulaire invalide">

## Fonctionnement

On déclare classiquement un formulaire avec appel d'une méthode pour la validation (`submit`) en utilisant `prevent` pour que l'évènement `submit` ne recharge plus la page :

```html
<form id="signUpForm" @submit.prevent="submit"></form>
```

Ensuite, on appelle la méthode `submit` pour faire ce que l'on a à faire lors de la validation du formulaire :

```javascript
submit() {
    // Enregistrement des données
}
```

**Demo**

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="result" data-user="sylvainmasson" data-slug-hash="NWxwyLR" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="FormValidation">
  <span>See the Pen <a href="https://codepen.io/sylvainmasson/pen/NWxwyLR">
  FormValidation</a> by Sylvain Masson (<a href="https://codepen.io/sylvainmasson">@sylvainmasson</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Gestion de l'annulation

Lors du clic sur le bouton **Annuler**, on vérifie si le formulaire a été modifié et si c'est le cas, on affiche une fenêtre d'avertissement à l'utilisateur pour l'informer qu'il va perdre des données.

<img :src="$withBase('/assets/img/annulation.png')" alt="Annulation">

Pour cela, on a besoin d'utiliser 3 variables :

- `changement` pour tracer que le formulaire a bien été modifié
- `premierChargement` pour savoir si c'est le premier chargement de la page et ne pas tracer le changement
- `enregistrement` pour ne pas afficher la fenêtre d'avertissement après un enregistrement

Ensuite, on utilise la fonctionnalité `watch` de VueJS pour surveiller la modification de l'objet qui est concernée par le formulaire.
L'option `deep: true` permet de vérifier les changements sur tous les attributs de l'objet.

```javascript
 watch: {
    /**
     * Gestion de la première modification du client
     */
    client: {
        deep: true,
        handler() {
        if (this.premierChargement) {
            this.changement = true
        } else {
            this.premierChargement = true
        }
        }
    }
 }
```

::: tip Note
Lors de l'enregistrement du formulaire, il faut bien penser à passer `enregistrement` à `true` pour que la fenêtre d'avertissement n'apparaissent pas
:::

Pour afficher la fenêtre d'avertissement, on utilise la notion d'intercepteurs de navigation par composant avec la méthode `beforeRouteLeave` qui permet de déclencher des choses lorsque l'on quitte la route courante (notre formulaire) vers une autre route.

On s'en sert ici pour déclencher notre message d'avertissement si c'est nécessaire. C'est à dire si le formulaire a été changé et si il n'a pas été enregistré.

```javascript
beforeRouteLeave(routeTo, routeFrom, next) {
    AnnulationService.annulation(
        routeTo,
        routeFrom,
        next,
        this.changement,
        this.enregistrement
    )
}
```

La fonctionnalité est gérée dans `AnnulationService` :

```javascript
  annulation(from, to, next, changement, enregistrement) {
    if (changement && !enregistrement) {
      Dialog.confirm({
        title: 'Annulation',
        message:
          'Souhaitez vous vraiment abandonner ? Vous avez des modifications non sauvegardées.',
        confirmText: 'Oui',
        cancelText: 'Non',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => next(),
        onCancel: () => next(false)
      })
    } else {
      next()
    }
  }
```

Donc **si** changement et pas enregistrement du formulaire, on affiche la fenêtre d'avertissement **sinon** on navigue vers la route suivante.

Lorsque l'utilisateur clique sur **Oui**, on navigue aussi vers la route suivante **sinon** on reste sur le formulaire pour qu'il complète sa saisie.

## Cas particulier de l'auto-complétion

Nous utilisons le composant `Autocomplete` de **Buefy**. Ce composant permet de gérer des objets lors de la sélection mais la valeur affichée (`v-model`) est toujours un libellé. Cela nous impose des contraintes pour être sur que l'utilisateur ait sélectionné un objet dans la liste et pas laissé un libellé ce qui pourrait poser problème lors de l'enregistrement.

**Exemple d'utilisation du composant**

```html
<b-autocomplete
  id="entreprise"
  ref="entreprise"
  placeholder="Saisissez le début du nom de l'entreprise. Exemple : département de Loire-atlantique"
  v-model="libelleEntreprise"
  icon="magnify"
  :keep-first="true"
  :open-on-focus="true"
  :data="entreprises"
  field="libelle"
  @select="selectEntreprise"
  @input="searchEntreprise"
  @typing="clearEntreprise"
  required
  clearable
>
  <template slot="empty">Pas de résultats</template>
</b-autocomplete>
```

On a bien ici un `v-model` égale au libellé de l'entreprise.

:::: tabs

::: tab Propriétés

| Nom           | Description                                     | Type    | Obligatoire | Valeur par Défaut |
| ------------- | ----------------------------------------------- | ------- | ----------- | ----------------- |
| v-model       | Libellé de l'entreprise                         | Texte   | Oui         |                   |
| field         | Propriété de l'objet à afficher                 | Texte   | Oui         |                   |
| data          | Liste d'entreprises autocomplétion de recherche | Tableau | Oui         |                   |
| ref           | Référence dans le dom                           | Texte   | Non         |                   |
| field         | Propriété de l'objet à afficher                 | Texte   | Oui         |                   |
| icon          | Icône de début de ligne                         | Texte   | Non         |                   |
| placeholder   | Texte d'aide avant saisie                       | Texte   | Non         |                   |
| clearable     | Ajout d'un bouton pour effacer la saisie        | Booléen | Non         |                   |
| keep-first    | Premier résultat présélectionné                 | Booléen | Non         |                   |
| open-on-focus | Ouvre la liste déroulante sur focus             | Booléen | Non         |                   |

:::

::: tab Évènements

| Nom    | Description                                                     |
| ------ | --------------------------------------------------------------- |
| select | Déclencher sur sélection d'une valeur dans la liste             |
| input  | Déclencher sur changement de valeur, déclenche l'autocomplétion |
| typing | Déclencher sur saisie utilisateur                               |

:::

::: tab Slots

| Nom   | Description                                 |
| ----- | ------------------------------------------- |
| empty | Affiché si pas de résultat d'autocomplétion |

:::

::::

Pour gérer correctement l'autocomplete, on a besoin de **3 méthodes** :

`selectEntreprise` déclenché sur la sélection dans l'autocomplétion pour alimenter l'objet entreprise du client

```javascript
/**
 * Sélection d'une entreprise dans l'autocomplétion
 * @param {Object} item entreprise sélectionnée
 */
selectEntreprise(item) {
    if (item) {
    // On alimente l'entreprise du client avec celle sélectionnée dans l'autocomplétion
    this.client.entreprise = {
        siret: item.siret,
        siren: item.siren,
        nic: item.nic,
        nom_raison_sociale: item.nom_raison_sociale,
        enseigne: item.enseigne,
        libelle: item.enseigne
        ? item.nom_raison_sociale + ' (' + item.enseigne + ')'
        : item.nom_raison_sociale
    }
    }
}
```

`searchEntreprise` déclenche la recherche sur l'api à chaque caractère saisi dans l'autocomplétion :

```javascript
/**
 * Recherche des entreprises, déclenché par le composant d'autocomplétion
 * @param {String} term terme de recherche
 */
searchEntreprise(term) {
    EntrepriseService.search(term)
    .then(response => {
        if (response.data) {
        this.entreprises = response.data.etablissement
        if (this.entreprises) {
            // Ajout du libellé de l'entreprise
            this.entreprises.forEach(element => {
            element.libelle = element.enseigne
                ? element.nom_raison_sociale + ' (' + element.enseigne + ')'
                : element.nom_raison_sociale
            })
        }
        }
    })
    .catch((this.entreprises = []))
}
```

`clearEntreprise` qui permet de vider l'objet sélectionné à chaque fois que l'utilisateur tape un caractère dans l'autocomplétion.
Cela permet de s'assurer que l'objet entreprise est vide si il n'y a pas de sélection :

```javascript
 /**
 * Lorsque l'on saisie dans l'autocomplétion, on efface l'entreprise du client
 * Obligeant l'utilisateur à sélectionner une entreprise dans la liste
 */
clearEntreprise() {
    this.client.entreprise = {}
}
```

Avec ses 3 méthodes, nous pouvons gérer correctement la validation de l'autocomplétion. Il reste néanmoins 2 choses à faire.

Alimenter le libellé de l'entreprise lorsque l'on arrive sur l'écran en modification :

```javascript
if (this.client.entreprise) {
  this.libelleEntreprise = this.client.entreprise.libelle
}
```

Vérifier qu'une entreprise a bien été sélectionnée dans la liste au moment de la validation

```javascript
// Vérification qu'une entreprise a bien été saisie
if (!this.client.entreprise.libelle) {
  // Si pas de saisie, on oblige l'utilisateur à la saisir
  this.$refs.entreprise.focus()
}
```

## Tag input

Ce composant permet de sélectionner plusieurs éléments (objet ou non) avec une autocomplétion.

Cela peut être très utile pour lier plusieurs éléments à un élément en cours.

**Exemple d'utilisation**

<img :src="$withBase('/assets/img/taginput.gif')" alt="Tag input">

```html
<b-taginput
  id="contacts"
  v-model="client.contacts"
  :data="filteredContacts"
  autocomplete
  field="nomComplet"
  icon="label"
  placeholder="Ajouter un contact"
  @typing="searchContact"
  :before-adding="verificationDoublonContact"
>
  <template slot="empty">
    <b-icon icon="emoticon-sad" size="is-small"></b-icon>
    <span>Pas de résultat</span>
  </template>
</b-taginput>
```

:::: tabs

::: tab Propriétés

| Nom          | Description                                   | Type    | Obligatoire | Valeur par Défaut |
| ------------ | --------------------------------------------- | ------- | ----------- | ----------------- |
| v-model      | Liste de contacts du client                   | Tableau | Oui         |                   |
| data         | Liste de contacts autocomplétion de recherche | Tableau | Oui         |                   |
| autocomplete | Si oui ajout de l'autocomplétion              | Booléen | Non         | Non               |
| field        | Propriété de l'objet à afficher               | Texte   | Oui         |                   |
| icon         | Icône de début de ligne                       | Texte   | Non         |                   |
| placeholder  | Texte d'aide avant saisie                     | Texte   | Non         |                   |

:::

::: tab Évènements

| Nom           | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| typing        | Déclenchement de l'autocomplétion sur saisie utilisateur     |
| before-adding | Méthode déclenchée avant l'ajout ici vérification de doublon |

:::

::: tab Slots

| Nom   | Description                                 |
| ----- | ------------------------------------------- |
| empty | Affiché si pas de résultat d'autocomplétion |

:::

::::

**Autocomplétion**

```javascript
searchContact(term) {
    ClientService.searchClient(term)
    .then(response => {
        const clients = response.data
        this.filteredContacts = clients
        .filter(client => client.id !== this.client.id)
        .map(client => {
            return {
            id: client.id,
            nomComplet: `${client.nom} ${client.prenom}`
            }
        })
    })
    .catch(e => {
        this.$store.dispatch('addNotificationError', e.response.data)
    })
}
```

**Vérification de doublon**

```javascript
verificationDoublonContact(item) {
    return UtilService.notIn(this.client.contacts, item, 'id')
}
```

```javascript
notIn(items, item, key) {
    let retour = true
    if (items) {
      items.forEach(function(itemList) {
        if (itemList[key] === item[key]) {
          retour = false
        }
      })
    }
    return retour
}
```
