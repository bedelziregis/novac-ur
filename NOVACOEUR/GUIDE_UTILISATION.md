# 🎀 SYSTÈME DE GESTION DES PAGES D'AMOUR NOVACOEUR

## 📋 Vue d'ensemble

Bienvenue dans votre plateforme complète de gestion des pages d'amour personnalisées. Ce système vous permet de créer des pages uniques pour vos clients selon 3 offres différentes.

---

## 🎁 Les 3 Offres

### 📍 Offre 1 - Éclat Simple (7.000 FCFA)
- **Message texte** personnalisé
- **5 photos** incluses
- Page simple et élégante

### 💝 Offre 2 - Émotion Complète (Tarif standard)
- **Message texte** personnalisé
- **15 photos** incluses
- **1 vidéo personnelle**
- **Musique de fond** au choix
- Mise en page enrichie

### 👑 Offre 3 - Infini Amoureux (Offre premium)
- **Message texte** personnalisé
- **20 photos** incluses
- **3 vidéos personnelles**
- **Musique de fond** au choix
- Expérience premium complète

---

## 🚀 Comment utiliser

### 1️⃣ Accéder à l'espace Admin
- Naviguez vers **`admin.html`**
- Authentifiez-vous (actuellement sans mot de passe pour test)

### 2️⃣ Créer une nouvelle page
1. Cliquez sur **"Nouvelle page"** dans le menu
2. Remplissez les informations du client:
   - Nom du couple
   - Email du client
   - Sélectionnez l'offre
3. Rédigez le message d'amour
4. Ajoutez les photos (glissez-déposez ou cliquez)
5. Si offre 2 ou 3: Ajoutez les vidéos
6. Si offre 2 ou 3: Choisissez la musique
7. Cliquez **"Créer la page d'amour"**

### 3️⃣ Partager la page avec le client
- Après création, vous recevrez une **URL unique**
- Exemple: `love-page.html?id=1234567890`
- Partagez ce lien avec votre client!

### 4️⃣ Gérer les pages créées
- Accédez à **"Gérer les pages"**
- Consultez toutes vos pages créées
- Actions disponibles:
  - 👁️ **Voir**: Prévisualiser la page
  - ✏️ **Modifier**: Éditer le contenu (en développement)
  - 🗑️ **Supprimer**: Supprimer définitivement

---

## 💾 Stockage des données

Les données sont stockées localement en **localStorage**:
- ✅ Pas de serveur requis pour démarrer
- ✅ Données sauvegardées même après fermeture
- ⚠️ À migrer vers base de données pour production

**Pour exporter vos pages:**
```javascript
// Ouvrir la console (F12) et taper:
console.log(JSON.parse(localStorage.getItem('lovePages')))
```

---

## 🎨 Caractéristiques des pages client

### Fonctionnalités incluses:
- ✨ **Galerie interactive** - Lightbox avec navigation
- 🎬 **Lecteur vidéo** - Lectures fluides
- 🎵 **Lecteur audio** - Musique de fond
- 📱 **Responsive design** - Adapté à tous les appareils
- 💫 **Animations élégantes** - Transitions fluides
- 🔗 **Partage social** - Bouton de partage natif

### Navigation dans la galerie:
- Cliquez sur une photo pour ouvrir la lightbox
- Flèches ← → pour naviguer
- Échap pour fermer
- Flèches clavier supportées

---

## 📱 Formats de fichiers acceptés

### Photos:
- JPG, PNG, WebP
- Taille max recommandée: 5 MB par photo
- Format: Paysage ou portrait

### Vidéos:
- MP4, WebM
- Taille max recommandée: 50 MB par vidéo
- Format: 16:9 recommandé

### Musique:
- MP3, WAV, M4A
- Ou choisir parmi 3 musiques présélectionnées

---

## ⚙️ Configuration avancée

### Ajouter vos propres musiques
1. Placez vos fichiers audio dans `assets/music/`
2. Mettez à jour `admin.js` section "Music Options"

### Personnaliser les couleurs
Éditez `assets/css/admin.css` et `assets/css/love-page.css`:
```css
/* Couleur principale (rose) */
#ff1a52 → Votre couleur
#d91e3a → Variante foncée
```

### Modifier les limites par offre
Éditez `assets/js/admin.js`:
```javascript
const offerConfig = {
    1: { photos: 5, videos: 0, music: false },
    2: { photos: 15, videos: 1, music: true },
    3: { photos: 20, videos: 3, music: true }
};
```

---

## 🔐 Sécurité & RGPD

- ✅ Les données sont stockées localement
- ✅ Pas de transmission de données externe (par défaut)
- ✅ Chaque page a une URL unique non prévisible
- ⚠️ Mise en place recommandée: Authentification admin

---

## 🚨 Troubleshooting

### Les photos ne s'affichent pas
- Vérifiez le format et la taille
- Rechargez la page

### La page client est vide
- Vérifiez l'ID dans l'URL
- Les données sont-elles sauvegardées?

### Les vidéos ne jouent pas
- Votre navigateur supporte-t-il le format MP4?
- Testez avec un fichier video.mp4 de test

### localStorage est plein
- Videz le cache du navigateur
- Exportez vos données avant

---

## 📈 Prochaines étapes

### Pour production:
1. **Backend** - Node.js/Express pour gérer les utilisateurs
2. **Base de données** - MongoDB/PostgreSQL pour les pages
3. **Authentification** - Système de login sécurisé
4. **Paiement** - Intégration Stripe/PayPal
5. **Email** - Notifications aux clients
6. **CDN** - Hébergement des fichiers

---

## 💡 Conseils d'utilisation

✅ **Qualité des photos** - Utilisez des photos bien éclairées et en haute résolution
✅ **Messages émouvants** - Écrivez des messages sincères et touchants
✅ **Musique adaptée** - Choisissez une musique qui correspond à l'histoire du couple
✅ **Timing vidéo** - Gardez les vidéos courtes (< 30 sec pour les présélectionnées)
✅ **Test avant** - Toujours tester la page en preview avant d'envoyer au client

---

## 📞 Support

Pour toute question ou amélioration:
- Vérifiez la console du navigateur (F12) pour les erreurs
- Assurez-vous que JavaScript est activé
- Testez avec un navigateur moderne (Chrome, Firefox, Safari, Edge)

---

**Créée avec ❤️ pour NOVACOEUR - L'art numérique de l'amour**
