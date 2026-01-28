# 🚀 GUIDE DE DÉMARRAGE RAPIDE - NOVACOEUR

## ⚡ En 5 minutes

### 1️⃣ **Ouvrir l'admin**
```
Ouvrez: admin.html dans votre navigateur
```

### 2️⃣ **Créer une nouvelle page**
- Cliquez sur **"Nouvelle page"**
- Remplissez les infos du client
- Sélectionnez l'offre (1, 2 ou 3)
- Écrivez le message d'amour
- Ajoutez les photos
- (Optionnel: vidéos et musique pour offres 2 et 3)

### 3️⃣ **Créer et partager**
- Cliquez **"Créer la page d'amour"**
- Vous recevez une URL unique
- Partagez avec le client!

### 4️⃣ **Page client reçoit**
Le client accède à sa page personnalisée avec:
- 💝 Votre message d'amour
- 📸 Les photos en galerie
- 🎬 Les vidéos (si offertes)
- 🎵 La musique de fond (si offerte)
- ✨ Design élégant et responsive

---

## 📱 Les 3 Offres (en bref)

| Offre | Prix | Inclus |
|-------|------|--------|
| **1 - Éclat Simple** | 7.000 FCFA | Message + 5 photos |
| **2 - Émotion Complète** | 10.000 FCFA | Message + 15 photos + 1 vidéo + musique |
| **3 - Infini Amoureux** | 18.000 FCFA | Message + 20 photos + 3 vidéos + musique |

---

## 🎯 Workflow complet

```
ADMIN crée une page
        ↓
Remplit les infos du client
        ↓
Ajoute message, photos, vidéos, musique
        ↓
Crée la page
        ↓
Reçoit URL unique
        ↓
Partage avec CLIENT
        ↓
CLIENT ouvre la page
        ↓
Voit message, galerie, vidéos, musique
        ↓
❤️ MAGIE! ❤️
```

---

## 📂 Structure des fichiers

```
✅ admin.html          → Ouvrir pour créer les pages
✅ love-page.html      → Page client (générée automatiquement)
✅ assets/css/         → Tous les styles
✅ assets/js/          → Tous les scripts
✅ assets/images/      → Logo et images
✅ assets/music/       → Musiques présélectionnées
```

---

## 💾 Les données sont stockées

- ✅ Localement dans le navigateur (localStorage)
- ✅ Persistantes (survit à la fermeture)
- ⚠️ À sauvegarder régulièrement
- ⚠️ À migrer vers base de données en production

**Exporter vos données:**
```javascript
// Console (F12)
copy(JSON.stringify(JSON.parse(localStorage.getItem('lovePages'))))
// Puis coller dans un fichier JSON
```

---

## 🎨 Personnaliser les couleurs

**Fichier:** `assets/css/admin.css` et `assets/css/love-page.css`

Remplacer:
- `#ff1a52` → Votre couleur rose
- `#d91e3a` → Votre couleur rose foncée

---

## 🔗 URL des pages client

Une fois créée, chaque page a une URL:

```
love-page.html?id=NUMERO_UNIQUE
```

Exemple:
```
love-page.html?id=1704904800000
```

**À imprimer sur le t-shirt avec un QR code!**

---

## 🎬 Formats recommandés

**Photos:**
- JPG ou PNG
- Résolution: 1920x1080 ou plus
- Taille: max 5 MB

**Vidéos:**
- Format: MP4
- Résolution: 1920x1080 ou moins
- Durée: 30 secondes max
- Taille: max 50 MB

**Musique:**
- Format: MP3
- Qualité: 128-192 kbps
- Durée: 2-5 minutes
- Taille: max 20 MB

---

## ⚙️ Personnalisations rapides

### Modifier les limites par offre
**Fichier:** `assets/js/admin.js`

Trouver:
```javascript
const offerConfig = {
    1: { photos: 5, videos: 0, music: false },
    2: { photos: 15, videos: 1, music: true },
    3: { photos: 20, videos: 3, music: true }
};
```

Modifier les nombres selon vos besoins!

### Ajouter des musiques
1. Placez vos fichiers MP3 dans `assets/music/`
2. Modifiez la liste dans `admin.js`
3. Testez!

---

## 🐛 Problèmes courants

### Les données disparaissent
- localStorage peut être vidé
- Exportez régulièrement vos pages
- À terme: utilisez une base de données

### Impossible de charger les fichiers
- Vérifiez le format (JPG, PNG, MP4)
- Vérifiez la taille du fichier
- Rechargez la page

### La page client est vide
- Vérifiez l'ID dans l'URL
- Les données sont-elles sauvegardées?
- Ouvrez la console (F12) pour les erreurs

### Les vidéos ne jouent pas
- Testez avec un fichier MP4 de test
- Votre navigateur supporte-t-il MP4?

---

## 📊 Dashboard

Le tableau de bord affiche:
- 📈 Total de pages créées
- 🌟 Pages pour chaque offre
- 📅 Dernière mise à jour en temps réel

---

## 🌐 Déploiement

### Pour tester localement
```bash
# Python 3
python -m http.server 8000

# Ou Node.js
npx http-server
```

### Pour production
- GitHub Pages (gratuit)
- Netlify (gratuit avec options premium)
- Vercel (gratuit)
- Votre serveur propre

**Important:** À terme, utilisez une base de données!

---

## 📞 Aide

### Console d'erreurs
Ouvrez: **F12** → **Console**

Cherchez les messages d'erreur rouges.

### Vérifications basiques
- ✅ Tous les fichiers sont présents
- ✅ Les chemins des fichiers sont corrects
- ✅ JavaScript est activé
- ✅ Vous utilisez un navigateur moderne

### Navigateurs testés
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## 💡 Conseils

✅ **Avant de créer:**
- Testez chaque offre
- Vérifiez les photos et vidéos
- Testez sur mobile

✅ **Avant de partager:**
- Prévisualisez la page
- Vérifiez tous les contenus
- Testez les liens et vidéos

✅ **Maintenance:**
- Exportez vos données chaque mois
- Mettez à jour le navigateur
- Collectez les retours clients

---

## 🎁 Exemple complet

**CLIENT 1: Marie & Jean (Offre 2)**
1. Admin remplit: Marie & Jean, email@example.com
2. Admin sélectionne: Offre 2 - Émotion Complète
3. Admin écrit: "Depuis le jour où nous nous sommes rencontrés..."
4. Admin ajoute: 15 photos du couple
5. Admin ajoute: 1 vidéo de proposition
6. Admin choisit: "Passion Éternelle" comme musique
7. Admin crée la page
8. Admin reçoit: `love-page.html?id=1704904800000`
9. Admin génère un QR code de cette URL
10. Admin imprime le QR code sur un t-shirt
11. Jean reçoit le t-shirt
12. Jean scanne le QR code
13. Jean voit la page avec tout (message + photos + vidéo + musique)
14. Jean dit OUI! 💍

---

## 📈 Prochaines étapes

**Pour faire plus:**
- Ajouter authentification admin
- Connecter une base de données
- Ajouter paiement en ligne
- Envoyer emails de confirmation
- Générer les QR codes automatiquement

---

**Créée avec ❤️ pour NOVACOEUR - L'art numérique de l'amour**

Questions? Consultez [GUIDE_UTILISATION.md](GUIDE_UTILISATION.md)
