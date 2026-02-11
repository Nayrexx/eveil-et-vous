# 🔥 Guide Firebase - Éveil & Vous

## Vue d'ensemble

Votre site utilise maintenant **Firebase Firestore** pour stocker les données en temps réel. Plus besoin d'exporter/importer des fichiers JSON !

## Avantages

✅ **Synchronisation automatique** - Les modifications sont visibles partout instantanément
✅ **Sauvegarde cloud** - Vos données sont sécurisées sur les serveurs Google
✅ **Multi-appareils** - Accédez à l'admin depuis n'importe quel appareil
✅ **Fallback local** - Si Firebase est indisponible, le site fonctionne quand même

## Structure des données

Les données sont organisées dans 3 collections Firebase :

```
📁 ateliers/
   ├── ateliersSolo (items: [...])
   └── ateliersDuo (items: [...])

📁 reservations/
   ├── {id1}: { parentNom, parentEmail, enfantPrenom, ... }
   ├── {id2}: { ... }
   └── ...

📁 waitlist/
   ├── {id1}: { nom, email, atelierTitre, ... }
   ├── {id2}: { ... }
   └── ...
```

## Console Firebase

Accédez à vos données sur : https://console.firebase.google.com/project/eveil-et-vous/firestore

Vous pouvez y voir :
- Toutes les réservations
- Les inscriptions en liste d'attente
- Les ateliers et leurs places restantes

## Migration des données

### Première utilisation

Quand vous ouvrez l'admin pour la première fois avec Firebase :
1. Les données locales (localStorage) sont automatiquement migrées vers Firebase
2. Un message confirme la migration

### Migration manuelle

Si vous avez des données locales à migrer :
1. Allez dans **Admin** → **Paramètres**
2. Cliquez sur **📤 Migrer vers Firebase**

## Synchronisation

### Rafraîchir les données

Dans **Admin** → **Paramètres**, cliquez sur **🔄 Rafraîchir depuis Firebase** pour recharger les données.

### Indicateurs de statut

- 🟢 **Firebase connecté** : Données synchronisées en temps réel
- 🟡 **Mode local** : Firebase indisponible, utilisation du stockage local

## Sécurité

### Règles Firestore actuelles (mode test)

Pendant le développement, Firebase est en "mode test" - tout le monde peut lire/écrire.

### Pour la production

Allez sur Firebase Console → Firestore → Règles et remplacez par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Ateliers : lecture publique, écriture admin
    match /ateliers/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Réservations : écriture publique (pour réserver), lecture admin
    match /reservations/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Liste d'attente : idem
    match /waitlist/{document=**} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## Quota gratuit Firebase

Le plan gratuit "Spark" inclut :
- 1 GB de stockage
- 50 000 lectures/jour
- 20 000 écritures/jour

Largement suffisant pour votre utilisation !

## Résolution de problèmes

### "Firebase non connecté"

1. Vérifiez votre connexion internet
2. Vérifiez que le projet Firebase existe
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Données non synchronisées

1. Cliquez sur **🔄 Rafraîchir depuis Firebase**
2. Videz le cache du navigateur
3. Reconnectez-vous à l'admin

### Erreur de permission

Si vous voyez "Missing or insufficient permissions" :
1. Allez sur Firebase Console → Firestore → Règles
2. Vérifiez que les règles permettent l'accès
3. En mode test, utilisez ces règles temporaires :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Configuration technique

Fichier : `js/firebase-config.js`

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyCw6cMaXCe8gqRYcRwuXT2gkzgDAcJLJp0",
    authDomain: "eveil-et-vous.firebaseapp.com",
    projectId: "eveil-et-vous",
    storageBucket: "eveil-et-vous.firebasestorage.app",
    messagingSenderId: "1095424492114",
    appId: "1:1095424492114:web:79a65370efab450ed6d58b"
};
```

## Support

Pour toute question sur Firebase : https://firebase.google.com/docs/firestore
