# Fonctionnalités de l'application

## Structure

Classiquement au département, cette nouvelle application reprend une ergonomie classique avec :

- En tête avec le nom de l'application, le menu et à droite la gestion de la connexion.
- Un corps de page.
- Un pied de page avec le logo, un lien vers l'aide, un contact par mail et la version de l'application.

De plus, l'application est totalement responsive avec un menu _burger_ en affichage mobile et après un travail sur la feuille de style `Buefy`, elle respecte les critères d'accessibilité.

<img :src="$withBase('/assets/img/app.png')" alt="Application">

## Tableau de données

Element important de nos applications, le composant **Table** de `Buefy` qui a été enrichi permet de :

- Présenter un en-tête avec le titre du tableau et des boutons d'actions configurables à droite dont l'ajout et l'exportation des données en CSV.
- Présenter un tableau filtrable, triable avec la possibilité d'avoir un détail sur chaque ligne.
- Avoir des boutons de consultation, modification, duplication, suppression sur chaque ligne avec la possibilité d'ajouter des actions particulières grâce à des slots.
- La gestion de la suppression avec un message d'alerte.
- Avoir ou non une pagination, une pagination simple et choisir le nombre d'items par page.
- Sauvegarde des filtres et possibilité de les réinitialiser.
- De présenter une vue mobile où chaque ligne est une carte. Les fonctionnalités de tri et de pagination reste disponible.

**Affichage desktop**

<img :src="$withBase('/assets/img/table.png')" alt="Table">

**Affichage mobile**

<img :src="$withBase('/assets/img/table_mobile.png')" alt="Table mobile">

## Ajout / Modification / Duplication d'un enregistrement

L'application permet d'ajouter, de modifier ou de dupliquer un client.
La validation de formulaire se fait en html5 natif avec affichage de message d'erreur sur sortie de champ. La gestion de la validation et le format des messages d'erreurs est donc géré par le navigateur lui même.

Dans cet écran, on gère les formats de champs suivants :

- Liste déroulante
- Texte avec exemple de mise en majuscule de la première lettre
- Email
- Téléphone au format 10 chiffres sans espace
- Date html5
- Autocomplétion sur les entreprises à partir d'une api
- Autocomplétion d'adresse sur la ban avec affichage de l'adresse sur une carte
- Un champ Tag Input permettant de gérer une liste d'objets liés
- Un champ html texte riche

<img :src="$withBase('/assets/img/form.png')" alt="Formulaire">

Dès que le formulaire est modifié, on affiche à l'utilisateur un message d'avertissement si il souhaite abandonner ou non ses modifications :

<img :src="$withBase('/assets/img/annulation.png')" alt="Annulation">

## Consultation d'un enregistrement

Cet écran permet de consulter les données d'un enregistrement en lecture seule. On affiche les données sur 2 colonnes en gardant le format carte.

<img :src="$withBase('/assets/img/consultation.png')" alt="Consultation">

## Gestion des alertes

La gestion des alertes est centralisée. Cela permet d'afficher les alertes à tout moment et même avant ou après une navigation de page.
Les alertes s'affichent en base de page, restent affichées 5 secondes et sont de 5 types :

- Enregistrement avec succès
- Suppression avec succès
- Succès avec message personnalisé
- Erreur ou danger avec message personnalisé
- Avertissement avec message personnalisé

Les alertes sont gérées dans le store VueX. Il suffit donc d'appeler une méthode pour afficher une alerte :

```javascript
this.$store.dispatch('addNotificationSuccessSave')
```

### Exemple d'alerte d'enregistrement avec succès

<img :src="$withBase('/assets/img/succes.png')" alt="Alerte succès">

### Exemple d'alerte d'erreur

<img :src="$withBase('/assets/img/erreur.png')" alt="Alerte erreur">

## Upload et affichage d'image

L'application permet de gérer les avatars en proposant l'upload et l'affichage d'image.
Les données de l'image sont enregistrées sur Json Server en binaire. Pour l'affichage, on décode en base 64 l'image.

Ceci est un exemple d'implémentation. Dans nos applications, il faudra enregistrer l'image sur le serveur et la réafficher à l'aide d'une requête HTTP.
Les composants développés seront toutefois réutilisables pour ce besoin.

<img :src="$withBase('/assets/img/avatar.png')" alt="Avatar">

## Gestion de carte

A partir de coordonnées géographiques latitude longitude (x,y), on affiche un marqueur sur une carte `OpenStreetMap` grâce à `Leaflet`.

<img :src="$withBase('/assets/img/carte_app.png')" alt="Carte">
