# NOVACOEUR - Setup Backend API

## Installation rapide

### 1. Installer Node.js
Téléchargez et installez Node.js depuis https://nodejs.org/

### 2. Installer les dépendances
Ouvrez un terminal dans le dossier `NOVACOEUR` et exécutez :

```bash
npm install
```

### 3. Lancer le serveur

#### Pour le développement (avec rechargement automatique) :
```bash
npm run dev
```

#### Ou simplement :
```bash
npm start
```

Le serveur démarre sur `http://localhost:3001`

### 4. Vérifier que l'API fonctionne

Visitez `http://localhost:3001/api/health` dans votre navigateur — vous devriez voir :
```json
{"status":"OK","message":"NOVACOEUR API is running"}
```

## Architecture

- `server.js` : Serveur Express
- `data/pages.json` : Base de données (créée automatiquement)
- Les pages sont stockées localement en JSON

## Endpoints API

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/pages` | Récupérer toutes les pages |
| GET | `/api/pages/:id` | Récupérer une page par ID |
| POST | `/api/pages` | Créer une nouvelle page |
| PUT | `/api/pages/:id` | Modifier une page |
| DELETE | `/api/pages/:id` | Supprimer une page |
| GET | `/api/health` | Vérifier l'état du serveur |

## Déploiement en production

Pour héberger ce serveur :
- **Heroku** : `git push heroku main`
- **Railway** : Connecter le dépôt GitHub
- **Render** : Créer un nouveau service Web
- **DigitalOcean** : Droplet Node.js

## Notes

- Les médias (photos, vidéos, musique) sont stockés en Base64 dans la JSON.
- Limite : 50 MB par requête (configurable dans `server.js`).
- Pas de authentification ajoutée pour le moment (à implémenter en production).

## Prochaines étapes

1. Modifier `admin.js` pour utiliser l'API au lieu de `localStorage`
2. Modifier `love-page.js` pour récupérer depuis l'API
3. Tester en local
4. Déployer sur un serveur public (Heroku, Railway, etc.)
