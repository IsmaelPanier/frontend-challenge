# Challenge Technique Frontend

## Aperçu
Ce dépôt contient un challenge technique pour les candidats développeurs frontend. Le challenge consiste à implémenter la page de configuration "Ma Campagne" en utilisant React, Material UI et react-hook-form.

## Description du Challenge
Vous devez développer la page de configuration "Ma Campagne" comme présentée dans la maquette fournie. Cette page permet aux utilisateurs de configurer des campagnes marketing avec des éléments interactifs incluant des actions, des jeux, des récompenses et des conditions de récupération. Notez que seule la page de configuration de campagne est à implémenter, pas la navigation latérale ni les autres pages.

Notez que ce challenge est volontairement ambitieux dans sa portée. L'évaluation portera davantage sur la qualité de votre implémentation et la maîtrise des technologies (React, MaterialUI, react-hook-form) que sur la quantité de fonctionnalités complétées. Privilégiez une implémentation soignée et bien structurée des composants principaux plutôt qu'une réalisation complète mais superficielle de l'ensemble de la page.

## Exigences

### Exigences Techniques
- Implémenter l'interface utilisateur selon la maquette fournie
- Utiliser React pour construire l'interface
- Implémenter la logique du formulaire avec react-hook-form
- Gérer les champs conditionnels et les sections pliables
- Implémenter les validations et les alertes
- S'assurer que les données du formulaire correspondent à la structure de réponse API fournie
- Aucun backend n'est attendu, vous pouvez simuler les interactions avec un backend (localStorage, mock API, etc.) pour rendre l'application interactive

### Fonctionnalités Clés à Implémenter

1. **En-tête et Navigation**
   - Les boutons "Mon Code PIN", "QR Code" et autres boutons similaires doivent ouvrir des modales (le contenu des modales peut être ignoré)
   - Le bouton "SAUVEGARDER" doit sauvegarder les modifications de la campagne

2. **Système d'Alertes**
   - La section d'alerte doit contenir toutes les alertes relatives à la campagne
   - Alertes à implémenter :
     - Alerte : code PIN non configuré
     - Info : message sur l'importance des couleurs personnalisées pour l'image de l'établissement et l'engagement des joueurs

3. **Organisation des Actions de Campagne**
   - L'ordre des actions doit être modifiable par drag and drop
   - Prendre en charge différents types d'actions (Avis Google, Parrainage, etc.)
   - Ne pas implémenter les boutons "Modifier" et "En savoir plus" de l'action Parrainage
   - Afficher un avertissement pour les actions en double

4. **Sélection du Type de Jeu**
   - La "Roue de la Fortune" doit être sélectionnée par défaut
   - Permettre la sélection entre les quatre types de jeux disponibles
   - Si le profil est "BASIC", la sélection du type de jeu doit être désactivée (roue par défaut)

5. **Personnalisation du Jeu**
   - Implémenter la validation des inputs pour les couleurs (format hexadécimal)
   - Le dépôt d'image doit pouvoir se faire en drag and drop
   - Implémenter le bouton "Voir l'aperçu" (la fonctionnalité d'aperçu elle-même n'est pas requise)
   - Si le profil est "BASIC", la personnalisation des couleurs doit être désactivée

6. **Configuration des Récompenses**
   - Si le jeu n'est pas "100% Gagnant", ajouter automatiquement une PERTE au tableau des gains
   - Si le jeu est "100% Gagnant", au moins un gain doit être en quantité illimitée (initial_limit = -1)
   - Ne pas implémenter le comportement du bouton "Tirage au sort"
   - Permettre l'ajout, la modification et la suppression des récompenses

7. **Conditions de Récupération**
   - Le tableau des conditions doit être synchronisé avec le tableau des gains
   - Implémenter l'interrupteur "Pour tous les gains"
   - Implémenter l'interrupteur "Sous condition d'achat minimal" avec champ de saisie conditionnel

8. **Navigation Latérale** *(Optionnel)*
   - La navigation latérale est visible dans la maquette mais son implémentation n'est pas requise
   - Concentrez-vous uniquement sur la page de configuration de campagne

## Comment Participer
1. Forker ce dépôt sur votre compte GitHub personnel
2. Cloner votre fork sur votre machine locale
3. Installer les dépendances avec `npm install` ou `yarn install`
4. Démarrer le serveur de développement avec `npm start` ou `yarn start`
5. Implémenter les fonctionnalités requises
6. Pousser votre travail sur votre fork GitHub
7. Nous envoyer par email le lien vers votre dépôt GitHub contenant votre solution

## Critères d'Évaluation
- Qualité et organisation du code
- Maîtrise des technologies utilisées (React, MaterialUI, react-hook-form)
- Implémentation précise de l'interface utilisateur selon la maquette
- Implémentation correcte de la logique de formulaire avec react-hook-form
- Gestion des champs conditionnels et validation
- Gestion d'état appropriée
- Implémentation des sections pliables
- Considérations de design responsive
- Expérience utilisateur globale

Rappel : Une implémentation partielle mais bien exécutée sera mieux évaluée qu'une implémentation complète mais de qualité moindre.

## Ressources
- La structure de l'objet Campagne se trouve dans `doc/CampaignType.ts`
- La maquette de design est disponible dans le dépôt sous `doc/Configuration Campagne.png`