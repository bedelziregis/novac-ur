# ✅ API Integration - Intégration Complète

## Statut : PRÊT POUR TESTER

Le backend API est maintenant en place et le frontend a été refactorisé pour utiliser les appels API.

---

## 📋 Checklist Intégration

- ✅ **server.js** créé et corrigé (option `extended: true` ajoutée)
- ✅ **package.json** avec dependencies (express, cors, nodemon)
- ✅ **assets/js/config.js** - API_BASE_URL détection automatique
- ✅ **admin.html** - script config.js chargé
- ✅ **love-page.html** - script config.js chargé
- ✅ **assets/js/admin.js** - refactorisé pour utiliser API (DataStore avec fetch)
- ✅ **assets/js/love-page.js** - refactorisé pour utiliser API (loadPageData async)
- ✅ **Serveur Node.js** démarré sur http://localhost:3001

---

## 🧪 Tests à Effectuer

### Test 1: Créer une page dans admin
1. Ouvrir http://localhost:3001/admin.html
2. Remplir le formulaire :
   - Nom du client
   - Email
   - Type d'offre
   - Message
   - Ajouter des photos/vidéos (optionnel)
3. Cliquer "Créer la page"
4. **Vérifier:** La page s'enregistre et recharge depuis l'API

### Test 2: Accéder à la page depuis une autre device/navigateur
1. Créer une page dans admin (voir Test 1)
2. Copier l'ID de la page (visible dans la liste des pages)
3. Ouvrir http://localhost:3001/love-page.html?id=<PAGE_ID>
4. **Vérifier:** Tous les contenus s'affichent correctement

### Test 3: Vérifier la persistance
1. Créer une page dans admin
2. Arrêter et redémarrer le serveur (`npm start`)
3. Accéder à http://localhost:3001/love-page.html?id=<PAGE_ID>
4. **Vérifier:** La page persiste après redémarrage

---

## 🚀 Endpoints API Disponibles

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/api/health` | Vérifier que le serveur répond |
| GET | `/api/pages` | Récupérer toutes les pages |
| GET | `/api/pages/:id` | Récupérer une page spécifique |
| POST | `/api/pages` | Créer une nouvelle page |
| PUT | `/api/pages/:id` | Mettre à jour une page |
| DELETE | `/api/pages/:id` | Supprimer une page |

### Exemple cURL
```bash
# Récupérer toutes les pages
curl http://localhost:3001/api/pages

# Créer une page
curl -X POST http://localhost:3001/api/pages \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Jean & Marie",
    "clientEmail": "jean@example.com",
    "offerType": 2,
    "message": "Notre histoire...",
    "photos": [],
    "videos": [],
    "music": null
  }'

# Récupérer une page
curl http://localhost:3001/api/pages/1234567890

# Supprimer une page
curl -X DELETE http://localhost:3001/api/pages/1234567890
```

---

## 📁 Fichiers Modifiés/Créés

### Backend
- `server.js` - Express API server
- `package.json` - Node.js dependencies
- `data/pages.json` - JSON database (créé automatiquement)

### Frontend
- `assets/js/admin.js` - DataStore refactorisé (API calls via fetch)
- `assets/js/love-page.js` - loadPageData async (API appel)
- `assets/js/config.js` - API_BASE_URL detection
- `admin.html` - Script config.js ajouté
- `love-page.html` - Script config.js ajouté

---

## 🔄 Architecture Flux de Données

```
Admin Page (admin.html)
    ↓
Creates page with media
    ↓
admin.js → DataStore.savePage()
    ↓
Stores media in IndexedDB
    ↓
POST /api/pages with metadata
    ↓
server.js stores in data/pages.json
    ↓
Returns page object with ID

Love Page (love-page.html?id=XXX)
    ↓
love-page.js → loadPageData()
    ↓
GET /api/pages/:id
    ↓
server.js reads from data/pages.json
    ↓
Returns page object
    ↓
Display title, message, offer
    ↓
Fetch media blobs from IndexedDB (by media ID)
    ↓
Render photos, videos, music
```

---

## 💾 Stockage des Médias

- **Métadonnées**: Stockées dans `data/pages.json` (API)
- **Blobs média**: Stockés dans IndexedDB (client-side)
- **Conversion**: data URL → Blob → IndexedDB (côté admin)

---

## 🔧 Déploiement (Quand prêt)

Options de déploiement :
1. **Heroku** - `git push heroku main`
2. **Railway** - Connecter GitHub, auto-deploy
3. **Render** - Similar to Railway
4. **DigitalOcean** - VPS + PM2 for process management

Pour chaque option, vous devrez :
1. Configurer `API_BASE_URL` en production
2. (Optionnel) Ajouter authentification API
3. (Optionnel) Ajouter database (MongoDB, PostgreSQL)

---

## ⚠️ Limitations Actuelles

- ❌ Pas d'authentification API (todo pour production)
- ❌ Media blobs stockés côté client (IndexedDB) - OK pour dev, à améliorer pour prod
- ❌ Pas de limite sur la taille des pages (todo: implémenter quotas)
- ❌ Pas de gestion des erreurs réseau (todo: retry logic)

---

## 📝 Notes

- **Port**: 3001 (configurable avec `PORT` env variable)
- **CORS**: Activé pour toutes les origines (à restreindre en prod)
- **Request Size**: Limité à 50MB (ajustable dans `server.js`)
- **Database**: JSON file (`data/pages.json`) - facile à backuper

Bon test ! 🎉
