# 🔐 ACCÈS ADMIN - NOVACOEUR

## Identifiants de connexion

**Pseudo:** `nova`  
**Mot de passe:** `Nov123@@@`

---

## 🔑 Comment accéder à l'Admin

1. Ouvrez `admin.html` dans votre navigateur
2. Une page de connexion s'affichera
3. Entrez votre pseudo et mot de passe
4. Cliquez "Connexion"
5. Accédez à l'interface admin

---

## 🛡️ Sécurité

- ✅ Les identifiants sont protégés
- ✅ La session est sauvegardée localement
- ✅ Timeout après 24 heures
- ✅ Bouton "Déconnexion" disponible

---

## ⚠️ IMPORTANT POUR LA PRODUCTION

**EN DÉVELOPPEMENT (Actuellement):**
- Les identifiants sont stockés en JavaScript (pas sécurisé)
- Les identifiants sont visibles dans le code source

**POUR LA PRODUCTION, VOUS DEVEZ:**
1. ✅ Ajouter un backend (Node.js, PHP, etc.)
2. ✅ Implémenter une vraie base de données
3. ✅ Hasher les mots de passe
4. ✅ Utiliser JWT ou sessions sécurisées
5. ✅ Ajouter HTTPS obligatoire
6. ✅ Ajouter un système de rate limiting

---

## 🚀 Pour changer les identifiants

**Fichier:** `assets/js/auth.js`

Recherchez:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'nova',
    password: 'Nov123@@@'
};
```

Modifiez les valeurs selon vos besoins.

---

## 📝 Fonctionnalités de sécurité actuelles

- ✅ Session localStorage
- ✅ Page de login requise
- ✅ Bouton déconnexion
- ✅ Timeout de session (24h)
- ✅ Masquage du mot de passe

---

**Créée avec ❤️ pour NOVACOEUR**
