# Campagne Configuration App

Une application React moderne pour la configuration de campagnes marketing interactives.

## 🚀 Fonctionnalités

- **Configuration de campagnes** : Interface complète pour configurer des campagnes marketing
- **Gestion des codes PIN** : Système sécurisé de codes PIN pour l'authentification
- **Jeux interactifs** : Support de 4 types de jeux (Roue de la fortune, Machine à sous, Boîtes mystères, Cartes)
- **Personnalisation** : Couleurs personnalisables et upload de logo
- **Gestion des récompenses** : CRUD complet pour les gains et récompenses
- **Conditions de récupération** : Configuration des conditions pour récupérer les gains
- **Interface responsive** : Optimisée pour desktop, tablette et mobile

## 🛠 Technologies

- **React 19** - Framework frontend
- **TypeScript** - Typage statique
- **Material-UI v7** - Composants UI
- **React Hook Form** - Gestion des formulaires
- **Vite** - Build tool moderne
- **ESLint** - Linting et qualité de code

## 📦 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd frontend-challenge

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

## 🏗 Architecture

```
src/
├── components/          # Composants React
│   ├── modals/         # Modales réutilisables
│   └── ...             # Autres composants
├── hooks/              # Hooks personnalisés
├── types/              # Types TypeScript
├── theme/              # Configuration du thème MUI
└── ...
```

## ⚡ Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `npm run lint` - Vérification ESLint

## 🎨 Fonctionnalités Principales

### Configuration de Campagne
- Formulaire complet avec validation
- Sauvegarde automatique en localStorage
- Interface responsive et intuitive

### Système de Jeux
- 4 types de jeux disponibles
- Personnalisation des couleurs
- Upload de logo par drag & drop

### Gestion des Récompenses
- Ajout/modification/suppression des gains
- Gestion des stocks
- Catégorisation des récompenses

### Codes PIN Sécurisés
- Validation des codes PIN
- Codes interdits pour la sécurité
- Interface de configuration intuitive

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop, Tablette, Mobile
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier

## 🤝 Contribution

1. Fork du projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit des changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.