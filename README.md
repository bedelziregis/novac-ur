# 🎀 NOVACOEUR - Système de Gestion des Pages d'Amour

## 🚀 Démarrage rapide

### 📁 Structure du projet
```
NOVACOEUR/
├── index.html                    # Page d'accueil
├── boutique.html                 # Page boutique des offres
├── admin.html                    # ✨ NOUVEAU - Espace admin
├── love-page.html                # ✨ NOUVEAU - Pages client d'amour
├── GUIDE_UTILISATION.md          # ✨ NOUVEAU - Guide complet
├── README.md                     # Ce fichier
└── assets/
    ├── css/
    │   ├── style.css
    │   ├── boutique.css
    │   ├── admin.css             # ✨ NOUVEAU
    │   └── love-page.css         # ✨ NOUVEAU
    ├── images/
    │   └── logo/
    └── js/
        ├── admin.js              # ✨ NOUVEAU - Gestion des pages
        └── love-page.js          # ✨ NOUVEAU - Affichage des pages
```

---

## ✨ Nouvelles fonctionnalités

### 🎯 3 Pages client d'amour (par offre)

#### **Offre 1 - Éclat Simple** 💫
- ✅ Message texte personnalisé
- ✅ 5 photos incluses
- ✅ Design simple et élégant

#### **Offre 2 - Émotion Complète** 💝
- ✅ Message texte personnalisé
- ✅ 15 photos incluses
- ✅ 1 vidéo personnelle
- ✅ Musique de fond au choix

#### **Offre 3 - Infini Amoureux** 👑
- ✅ Message texte personnalisé
- ✅ 20 photos incluses
- ✅ 3 vidéos personnelles
- ✅ Musique de fond au choix

---

### 👨‍💼 Interface Admin complète

#### Tableau de bord
- 📊 Statistiques en temps réel
- 📈 Nombre de pages par offre
- 🎯 Actions rapides

#### Création de pages
**Étape 1: Infos client**
- Nom du couple
- Email du client
- Sélection de l'offre

**Étape 2: Contenu**
- Message d'amour (jusqu'à 500 caractères)
- Upload drag & drop pour les photos
- Upload vidéos (si applicable)
- Choix de la musique

**Étape 3: Gestion**
- Aperçu avant création
- URL unique générée automatiquement
- Partage facile avec le client

#### Gestion des pages
- 👁️ Voir les pages créées
- ✏️ Modifier le contenu
- 🗑️ Supprimer définitivement
- 📋 Liste complète avec filtres

---

## 🎨 Pages client - Fonctionnalités

### Affichage
```
┌─────────────────────────────┐
│   Page d'amour personnalisée │
│                              │
│  Hero section animée         │
│  ❤️ Message d'amour         │
│  📸 Galerie interactive      │
│  🎬 Vidéos (si offre 2/3)   │
│  🎵 Musique (si offre 2/3)   │
│  ✨ Design responsive        │
└─────────────────────────────┘
```

### Interactivité
- 🖱️ Galerie avec lightbox (zoom sur photos)
- ⌨️ Navigation clavier (flèches, Échap)
- 📱 Responsive sur tous les appareils
- 💫 Animations fluides au scroll
- 🔗 Bouton de partage social

---

## 🔧 Installation

### 1. Télécharger les fichiers
Tous les fichiers sont fournis. Pas d'installation requise!

### 2. Structure des dossiers
Assurez-vous que l'arborescence suit le modèle ci-dessus.

### 3. Lancer localement
```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js
npx http-server

# Ou ouvrir directement dans le navigateur
file:///chemin/vers/NOVACOEUR/index.html
```

### 4. Accéder à l'admin
```
http://localhost:8000/admin.html
```

---

## 💾 Gestion des données

### Stockage local (localStorage)
- ✅ Automatique - pas de configuration requise
- ✅ Données persistantes même après fermeture
- ⚠️ Limité à ~5-10 MB par domaine
- ⚠️ À passer à une base de données pour production

### Exporter les données
```javascript
// Dans la console navigateur (F12):
const data = JSON.parse(localStorage.getItem('lovePages'));
console.save(data, 'lovePages.json');
```

### Importer les données
```javascript
// Restaurer depuis un fichier JSON
const imported = {...}; // Vos données
localStorage.setItem('lovePages', JSON.stringify(imported));
```

---

## 📱 URLs des pages client

Une fois une page créée, l'admin génère une URL unique:

```
love-page.html?id=1704904800000
```

Où `id` est l'identifiant unique de la page.

**Exemple complet:**
```
https://votresite.com/love-page.html?id=1704904800000
```

---

## ⚙️ Personnalisation

### Modifier les couleurs principales
**Fichier:** `assets/css/admin.css` et `assets/css/love-page.css`

```css
/* Rose principal */
#ff1a52 → Votre couleur

/* Rose foncé */
#d91e3a → Votre variante
```

### Modifier les limites par offre
**Fichier:** `assets/js/admin.js`

```javascript
const offerConfig = {
    1: { photos: 5, videos: 0, music: false },    // Offre 1
    2: { photos: 15, videos: 1, music: true },    // Offre 2
    3: { photos: 20, videos: 3, music: true }     // Offre 3
};
```

### Ajouter des musiques présélectionnées
**Fichier:** `assets/js/admin.js`

1. Placez vos fichiers MP3 dans `assets/music/`
2. Modifiez les options de musique
3. Testez!

---

## 🌐 Déploiement

### Option 1: Hébergement statique simple
- ✅ GitHub Pages
- ✅ Netlify
- ✅ Vercel
- ✅ Cloudflare Pages

**Les données seront en localStorage du client!**

### Option 2: Hébergement avec backend (recommandé)
- 🔒 Base de données (MongoDB, PostgreSQL)
- 👤 Authentification admin
- 💳 Système de paiement
- 📧 Notifications par email
- ☁️ Stockage cloud des fichiers

---

## 🐛 Troubleshooting

### Les pages ne se chargent pas
1. Vérifiez que tous les fichiers sont présents
2. Vérifiez les chemins d'accès (fichiers/dossiers)
3. Ouvrez la console (F12) pour voir les erreurs

### Les photos n'apparaissent pas
- Vérifiez le format (JPG, PNG)
- Vérifiez la taille du fichier
- Vérifiez que localStorage n'est pas plein

### Les données disparaissent
- localStorage peut être vidé en vidant le cache
- Récupérez régulièrement vos données
- À terme: utilisez une base de données

### La vidéo ne joue pas
- Vérifiez le navigateur (tous supportent MP4)
- Testez avec un fichier MP4 de test
- Vérifiez le codec (H.264)

---

## 🚀 Prochaines étapes (Production)

### Phase 1: Sécurité
- [ ] Ajouter authentification admin
- [ ] Ajouter protection par mot de passe
- [ ] Valider les entrées utilisateur

### Phase 2: Données
- [ ] Intégrer une base de données
- [ ] Stocker les fichiers en CDN
- [ ] Implémenter la sauvegarde automatique

### Phase 3: Paiement
- [ ] Intégrer Stripe/PayPal
- [ ] Créer le système de commande
- [ ] Générer des factures

### Phase 4: Communication
- [ ] Emails de confirmation
- [ ] Notifications aux clients
- [ ] Rappels de paiement

### Phase 5: Fonctionnalités avancées
- [ ] Éditeur de page en temps réel
- [ ] Webhooks et intégrations
- [ ] Analytics et statistiques
- [ ] Modération du contenu

---

## 📞 Support

### Problèmes courants

**Console pleine d'erreurs?**
- Vérifiez F12 → Console
- Cherchez "Uncaught"
- Vérifiez les chemins de fichiers

**Pages ne s'ouvrent pas?**
- Testez avec http://localhost:8000
- Pas d'accès file:// pour localStorage

**Fichiers trop volumineux?**
- Photos: max 5 MB recommandé
- Vidéos: max 50 MB recommandé
- localStorage: ~10 MB total

---

## 📄 Fichiers importants

| Fichier | Description |
|---------|-------------|
| `admin.html` | Interface de gestion admin |
| `love-page.html` | Modèle de page client |
| `admin.js` | Logique admin et stockage |
| `love-page.js` | Logique d'affichage des pages |
| `admin.css` | Styles admin |
| `love-page.css` | Styles pages client |

---

## 💡 Conseils d'utilisation

✅ **Avant le lancement:**
- Testez chaque offre
- Vérifiez la galerie et vidéos
- Testez sur mobile
- Nettoyez le localStorage régulièrement

✅ **Pour les clients:**
- Donnez des instructions claires
- Testez l'URL avant d'envoyer
- Vérifiez la musique/vidéos
- Faites un aperçu avant partage

✅ **Maintenance:**
- Exportez vos données chaque mois
- Mettez à jour les navigateurs
- Testez les nouvelles offres
- Collectez les retours clients

---

## 📊 Statistiques

- **Pages créées:** Compteur dans le tableau de bord
- **Offres utilisées:** Statistiques par offre
- **Dernière mise à jour:** En temps réel

---

## 🎯 Utilisation en production

### Liens à partager avec les clients

```
https://votresite.com/love-page.html?id=CLIENT_ID
```

### QR Code
Générez un QR code pointant vers cette URL:
- Utilisez https://qr-server.com/
- Ou un outil en ligne de votre choix
- Imprimez sur le t-shirt!

### Partage social
Chaque page a un bouton de partage:
- Partageable sur WhatsApp
- Partageable sur Facebook
- Copie du lien disponible

---

## 📝 Licence

NOVACOEUR © 2026. Tous droits réservés.

---

**Créée avec ❤️ pour NOVACOEUR - L'art numérique de l'amour**

Version: 1.0 | Date: 28 Janvier 2026
