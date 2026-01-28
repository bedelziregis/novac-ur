# Guide de Débogage - NOVACOEUR Admin Panel

## Comment Vérifier les Erreurs

### Étape 1 : Ouvrir la Console Développeur
- Appuyez sur **F12** ou **Ctrl+Shift+I** (Windows)
- Allez dans l'onglet **Console**

### Étape 2 : Accéder à la Page Admin
- Ouvrez `admin.html`
- Vous devriez voir dans la console :
  ```
  [NOVACOEUR] Page chargée - Vérification de session...
  ```

### Étape 3 : Se Connecter
- **Pseudo**: `nova`
- **Mot de passe**: `Nov123@@@`
- Cliquez sur "Se connecter"

### Résultats Attendus dans la Console

#### ✓ Connexion Réussie
```
[NOVACOEUR] Session valide - Affichage interface admin
[NOVACOEUR] Initialisation interface admin
[NOVACOEUR] ✓ Dashboard mis à jour
[NOVACOEUR] ✓ Navigation onglets activée
[NOVACOEUR] ✓ Formulaires initialisés
[NOVACOEUR] ✓ Logout configuré
[NOVACOEUR] ✓ Interface admin prête
```

#### ✗ Erreur d'Authentification
```
❌ Session invalide - Affichage formulaire de connexion
```

## Codes de Diagnostic

### Messages de Succès
- `[NOVACOEUR] ✓` = Opération réussie
- `[NOVACOEUR] Page chargée` = Page admin chargée
- `[NOVACOEUR] Session valide` = Authentification OK

### Messages d'Erreur
- `[NOVACOEUR] ❌` = Erreur
- `[NOVACOEUR] Erreur ...` = Problème détecté
- `[NOVACOEUR] ... non trouvé!` = Élément DOM manquant

## Test des Fonctionnalités

### Test 1 : Tab Navigation (Navigation par Onglets)
1. Cliquez sur "Nouvelle page"
2. Console devrait montrer :
   ```
   [NOVACOEUR] Clic menu item - Nouvelle page
   [NOVACOEUR] ✓ Onglet activé
   ```

### Test 2 : Formulaire
1. Remplissez le formulaire
2. Console devrait montrer :
   ```
   [NOVACOEUR] Offre sélectionnée: 1
   [NOVACOEUR] ✓ Sections mises à jour
   ```

### Test 3 : Gérer les Pages
1. Cliquez sur "Gérer les pages"
2. Console devrait montrer :
   ```
   [NOVACOEUR] Chargement des pages gérées
   [NOVACOEUR] X pages trouvées
   [NOVACOEUR] ✓ Pages chargées et affichées
   ```

### Test 4 : Déconnexion
1. Cliquez sur "Déconnexion"
2. Console devrait montrer :
   ```
   [NOVACOEUR] Déconnexion
   [NOVACOEUR] ✓ Session terminée
   [NOVACOEUR] ✓ Interface réinitialisée pour connexion
   ```

## Troubleshooting

### Problème : Rien n'apparaît dans la console
**Cause** : La page n'est pas chargée correctement
**Solution** : Actualisez la page (F5)

### Problème : "... non trouvé!" pour un élément
**Cause** : L'élément HTML n'existe pas dans le DOM
**Solution** : Vérifiez que l'ID dans le HTML correspond au JavaScript

### Problème : Les boutons ne répondent pas
**Cause** : Les event listeners ne sont pas attachés
**Solution** : Regardez si `setupFormHandlers` ou `setupTabNavigation` affiche une erreur

### Problème : Impossible de se connecter
**Cause** : Identifiants incorrects ou session corrompue
**Solution** : 
1. Videz localStorage (F12 → Storage → Local Storage → Supprimer tout)
2. Actualisez la page
3. Réessayez avec : nova / Nov123@@@

## Infos Système

- **Identifiants Admin** : nova / Nov123@@@
- **Timeout Session** : 24 heures
- **Stockage** : localStorage
- **Clés Utilisées** :
  - `lovePages` = Pages sauvegardées
  - `novacoeur_admin_session` = Données de session

## Contact/Support

Si vous voyez des erreurs en rouge dans la console, copiez le message d'erreur complet et contactez le développeur.

---
**Dernière mise à jour** : Session avec logging complet activé
