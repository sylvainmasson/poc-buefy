# Démarrage

## Premier lancement

### Installation des dépendances

```bash
yarn install
```

### Compilation et chargement à chaud pour le développement

```bash
yarn serve
```

### Installation et lancement de l'api REST d'accès aux données

```bash
yarn db
```

Pour information, ce script se positionne dans le répertoire `server`, installe les dépendances et lance la base de données :

```bash
cd server
yarn install
json-server --watch index.js
```

### Commande regroupant les 2 précédentes pour démarrer la partie cliente et serveur

```bash
yarn start
```

## Autres commandes

### Compilation pour la production

```bash
yarn build
```

### Lancement des tests unitaires

```bash
yarn test:unit
```

### Contrôle et correction syntaxique des fichiers

```bash
yarn lint
```

### Compilation et chargement à chaud de la documentation pour le développement

```bash
yarn docs:dev
```

### Compilation de la documentation pour la production

```bash
yarn docs:build
```
