# 🌐 Configuration Cloudinary pour Éveil & Vous

## Étape 1 : Créer un compte gratuit

1. Va sur https://cloudinary.com/users/register/free
2. Inscris-toi (gratuit, 25GB/mois)
3. Confirme ton email

## Étape 2 : Récupérer ton Cloud Name

1. Connecte-toi sur https://cloudinary.com/console
2. Sur le dashboard, tu verras **Cloud Name** (exemple: `dxyz123abc`)
3. Note-le quelque part

## Étape 3 : Créer un Upload Preset (IMPORTANT !)

1. Va dans **Settings** (⚙️ en haut à droite)
2. Clique sur l'onglet **Upload**
3. Scroll vers le bas jusqu'à **Upload presets**
4. Clique sur **Add upload preset**
5. Configure comme ceci :
   - **Preset name** : `eveil_et_vous` (ou un autre nom)
   - **Signing Mode** : **Unsigned** ⚠️ (TRÈS IMPORTANT !)
   - **Folder** : `ateliers` (optionnel mais recommandé)
   - Laisse le reste par défaut
6. Clique **Save**
7. Note le nom du preset (exemple: `eveil_et_vous`)

## Étape 4 : Configurer admin-ateliers.html

Ouvre `admin-ateliers.html` et cherche ces lignes (vers la ligne 820) :

```javascript
const CLOUDINARY_CLOUD_NAME = 'TON_CLOUD_NAME'; // ⚠️ REMPLACE
const CLOUDINARY_UPLOAD_PRESET = 'TON_UPLOAD_PRESET'; // ⚠️ REMPLACE
```

Remplace par tes vraies valeurs :

```javascript
const CLOUDINARY_CLOUD_NAME = 'dxyz123abc'; // TON CLOUD NAME
const CLOUDINARY_UPLOAD_PRESET = 'eveil_et_vous'; // TON PRESET NAME
```

## Étape 5 : Tester !

1. Ouvre `admin-ateliers.html` dans ton navigateur
2. Connecte-toi (admin / eveiletvouss2025)
3. Crée ou modifie un atelier
4. Upload une image
5. Tu devrais voir "✅ Photo uploadée sur Cloudinary !"

## Troubleshooting

### Erreur "Upload failed"
- Vérifie que le preset est bien en mode **Unsigned**
- Vérifie que tu as bien copié le Cloud Name et le Preset Name

### L'image ne s'affiche pas
- Vérifie dans la console du navigateur (F12) s'il y a des erreurs
- Va sur ton dashboard Cloudinary pour voir si l'image a bien été uploadée

## Avantages Cloudinary

✅ **Gratuit** : 25GB/mois  
✅ **Rapide** : CDN mondial inclus  
✅ **Optimisation auto** : Compression et redimensionnement automatiques  
✅ **Pas de limite de taille** : Upload d'images de n'importe quelle taille  
✅ **Fiable** : 99.9% uptime

## Support

Si tu as des problèmes, dis-moi et je t'aide ! 🚀
