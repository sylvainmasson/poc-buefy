# Introduction

Cette nouvelle application exemple présente comment utiliser VueJS et Buefy pour l'implémentation d'applications métiers.

Elle présente classiquement un CRUD (Create, Read, Update, Delete) sur des clients avec une connexion et une gestion de droits à minima.

Pour simplifier les choses et ne pas avoir à gérer la partie serveur, les données proviennent de JSON Server qui permet d'avoir une api REST complète à partir de données JSON sans code.

L'alimentation aléatoire des données se fait avec faker.js pour avoir un jeu de données suffisamment réaliste.

## Outils et frameworks utilisés

| Nature                                           | Outil      | Version    |
| ------------------------------------------------ | ---------- | ---------- |
| Langage                                          | Javascript | ES6        |
| Framework applicatif front                       | VueJS      | 2.6        |
| Framework CSS                                    | Buefy      | 0.8        |
| Framework de test Front                          | Jest       | 24.9       |
| Module Bundler et gestion de configuration Front | Webpack    | 4.4        |
| Gestion des dépendances Front                    | NPM + Yarn | 6.4 et 1.2 |

:::warning Note de compatibilité
VueCli 3 requiert Node.js >= 8.9
:::
