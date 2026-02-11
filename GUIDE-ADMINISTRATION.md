# 📚 Guide d'Utilisation - Administration des Ateliers

## 🎯 Comment gérer vos ateliers facilement

Bonjour ! Ce guide va vous expliquer comment modifier, ajouter ou supprimer vos ateliers sans toucher au code du site.

---

## 📂 Fichiers importants

### 1. **admin-ateliers.html**
C'est votre panneau d'administration. Ouvrez ce fichier dans votre navigateur pour gérer vos ateliers.

### 2. **data/ateliers-data.json**
C'est le fichier qui contient toutes les informations de vos ateliers (dates, horaires, places, etc.)

### 3. **js/ateliers-loader.js**
Ce fichier charge automatiquement vos ateliers sur le site public. Vous n'avez pas besoin d'y toucher.

---

## 🚀 Comment utiliser le panneau d'administration

### Étape 1 : Ouvrir le panneau
1. Double-cliquez sur le fichier **admin-ateliers.html**
2. Il s'ouvre dans votre navigateur
3. Vous voyez tous vos ateliers affichés

### Étape 2 : Navigation
- **Onglet "E&V Solo"** : pour gérer les ateliers du mercredi après-midi
- **Onglet "E&V Duo"** : pour gérer les ateliers du samedi matin

---

## ✏️ Modifier un atelier existant

1. Trouvez l'atelier que vous voulez modifier
2. Cliquez sur le bouton **"✏️ Modifier"**
3. Une fenêtre s'ouvre avec tous les champs
4. Modifiez ce que vous voulez :
   - **Emoji** : l'icône de l'atelier (🎨 👃 🧘 ❤️ 🌳)
   - **Titre** : le nom de l'atelier
   - **Date** : la date complète (ex: "Mercredi 15 Janvier 2025")
   - **Horaire** : les heures (ex: "14h30 - 16h00")
   - **Description** : le texte qui décrit l'atelier
   - **Prix** : le tarif (ex: "18€ TTC")
   - **Places** : combien de places disponibles
   - **Thème** : choisissez la couleur (Créatif/Sensoriel/Yoga/Émotions/Nature)
5. Cliquez sur **"✓ Enregistrer les modifications"**
6. C'est fait ! ✅

---

## ➕ Ajouter un nouvel atelier

1. Cliquez sur le bouton **"➕ Ajouter un atelier Solo"** (ou Duo)
2. La même fenêtre s'ouvre
3. Remplissez tous les champs
4. Cliquez sur **"✓ Enregistrer les modifications"**
5. Votre nouvel atelier apparaît ! ✅

---

## 🗑️ Supprimer un atelier

1. Trouvez l'atelier à supprimer
2. Cliquez sur le bouton **"🗑️"** (poubelle)
3. Confirmez la suppression
4. L'atelier disparaît ! ✅

---

## 💾 Sauvegarder vos modifications

**IMPORTANT** : Après avoir fait vos changements, vous devez :

1. Faites défiler en bas de la page
2. Section **"💾 Sauvegarde et Export"**
3. Cliquez sur **"📥 Télécharger les données (JSON)"**
4. Un fichier **"ateliers-data.json"** se télécharge
5. **Remplacez** l'ancien fichier dans le dossier `data/` par celui-ci

### Comment remplacer le fichier :
1. Trouvez le fichier téléchargé (souvent dans "Téléchargements")
2. Copiez-le
3. Allez dans le dossier de votre site : `Eveil & Vous/data/`
4. Collez le fichier (remplacez l'ancien si demandé)
5. **C'est tout !** Vos ateliers sont maintenant à jour sur le site 🎉

---

## 🌐 Voir les changements sur le site

1. Ouvrez le fichier **ateliers.html** dans votre navigateur
2. Scrollez jusqu'à la section **"🗓️ Ateliers Programmés"**
3. Vous devriez voir tous vos ateliers à jour ! ✅

---

## ✨ Conseils et astuces

### Pour les émojis
Voici quelques émojis que vous pouvez utiliser :
- 🎨 Créatif
- 👃 Sensoriel  
- 🧘 Yoga
- ❤️ Émotions
- 🌳 Nature
- 🎭 Théâtre
- 🎵 Musique
- 📚 Lecture
- 🏃 Sport
- 🍪 Cuisine

Pour en trouver d'autres : cherchez "emoji" sur Google et copiez-collez !

### Pour les dates
Format recommandé :
- **Solo** : "Mercredi 15 Janvier 2025"
- **Duo** : "Samedi 18 Janvier 2025"

### Pour les horaires
Format recommandé :
- **Solo** : "14h30 - 16h00" (mercredi après-midi)
- **Duo** : "10h00 - 12h00" (samedi matin)

### Pour les places
- Si vous avez 8 places maximum et 2 sont déjà prises, mettez : **6**
- Quand il n'y a plus de place, mettez : **0** (le site affichera "Complet")

---

## ❓ Questions fréquentes

### "Mes modifications ne s'affichent pas sur le site"
👉 Avez-vous bien téléchargé le JSON et remplacé le fichier dans `data/` ?
👉 Actualisez la page avec **Ctrl+F5** (ou Cmd+Shift+R sur Mac)

### "J'ai fait une erreur, comment annuler ?"
👉 Fermez le panneau d'administration sans télécharger le JSON
👉 Rouvrez-le, les anciennes données seront de retour

### "Je veux remettre les ateliers par défaut"
👉 Gardez toujours une copie de sauvegarde de `ateliers-data.json`
👉 Si besoin, contactez votre développeur

### "Puis-je ajouter plus de 8 ateliers ?"
👉 Oui ! Cliquez sur "Ajouter" autant de fois que vous voulez

---

## 🆘 Besoin d'aide ?

Si vous avez un problème :
1. Vérifiez que vous avez bien suivi toutes les étapes
2. Essayez de fermer et rouvrir votre navigateur
3. Contactez votre développeur avec une capture d'écran

---

## 🎉 C'est tout !

Vous êtes maintenant autonome pour gérer vos ateliers ! 

**Rappel des étapes principales :**
1. Ouvrir **admin-ateliers.html**
2. Modifier/Ajouter/Supprimer les ateliers
3. Cliquer sur **"📥 Télécharger les données"**
4. Remplacer le fichier dans **data/**
5. Vérifier sur **ateliers.html** ✨

---

*Dernière mise à jour : Janvier 2025*
*Éveil & Vous - Gestion simplifiée*
