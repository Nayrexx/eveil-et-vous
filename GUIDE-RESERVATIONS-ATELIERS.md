# 📋 Guide Système de Réservation Ateliers

## 🎯 Vue d'ensemble

Système complet de réservation pour les **16 ateliers** (8 Solo + 8 Duo) avec :
- ✅ Cartes visuelles pour chaque atelier
- ✅ Formulaire de réservation sans paiement
- ✅ Gestion automatique des places
- ✅ Statut "Complet" automatique
- ✅ Notifications et confirmations
- ✅ Interface d'administration

---

## 📁 Fichiers créés

| Fichier | Description |
|---------|-------------|
| `reserver-atelier.html` | Page publique de réservation (16 cartes) |
| `admin-reservations.html` | Interface admin pour gérer les réservations |
| `data/reservations-ateliers.json` | Données des ateliers et réservations |

---

## 🌐 Page de Réservation (`reserver-atelier.html`)

### Fonctionnalités
- **16 cartes d'ateliers** avec design moderne
- **Filtres** : Tous / Solo / Duo / Disponibles
- **Badge "Dernières places"** quand moins de 3 places
- **Badge "Complet"** automatique
- **Formulaire modal** pour réserver
- **Confirmation visuelle** après réservation

### Comment réserver (côté visiteur)
1. Choisir un atelier avec des places disponibles
2. Cliquer sur "Réserver ma place"
3. Remplir : Nom, Email, Téléphone, Prénom enfant, Âge
4. Pour les ateliers Duo : ajouter le nom du parent participant
5. Accepter les CGV
6. Confirmer → Réservation enregistrée !

### Données stockées
- Nom et coordonnées du parent
- Prénom et âge de l'enfant
- Parent participant (pour Duo)
- Message/besoins particuliers
- Date de réservation
- N° de confirmation unique

---

## 🔧 Interface Admin (`admin-reservations.html`)

### Accès
Via **Admin → Réservations** (connexion requise)

### Onglet "Ateliers"
- Vue des 16 ateliers avec jauge de remplissage
- **Marquer complet** : Bloque les réservations
- **Rouvrir** : Permet à nouveau les réservations
- **Éditer** : Modifier date, horaire, places

### Onglet "Réservations"
- Liste de toutes les réservations
- Voir les détails complets
- Annuler une réservation (rend la place)
- Export CSV

### Onglet "Paramètres"
- Email de notification admin
- Places max par type d'atelier
- Réinitialisation des données

### Statistiques en temps réel
- Nombre total de réservations
- Ateliers complets
- Places restantes totales
- Revenu estimé (18€/réservation)

---

## 💰 Paiement

**Aucun paiement en ligne** - Le paiement se fait sur place le jour de l'atelier.

Le formulaire indique clairement :
> "Paiement sur place - Aucun paiement en ligne requis"

---

## 📧 Notifications (optionnel)

Le système est prêt pour **EmailJS** (emails automatiques).

### Pour activer les emails :
1. Créer un compte sur https://www.emailjs.com/
2. Créer un service email (Gmail, Outlook...)
3. Créer 2 templates :
   - `template_client` : Confirmation au parent
   - `template_admin` : Notification à vous
4. Décommenter le code EmailJS dans `reserver-atelier.html`

### Variables disponibles pour les templates :
```
{{parent_nom}}
{{parent_email}}
{{enfant_prenom}}
{{enfant_age}}
{{atelier_titre}}
{{atelier_date}}
{{atelier_heure}}
{{numero_reservation}}
```

---

## 🗄️ Stockage des données

Les données sont stockées dans **localStorage** (navigateur) :
- `ateliers-reservations-data` : Ateliers et places
- `reservations-list` : Liste des réservations

### Export
- **CSV** : Pour Excel/Google Sheets
- **JSON** : Pour sauvegarde ou intégration

---

## 📊 Les 16 Ateliers

### E&V Solo (Mercredis 14h30-16h)
| # | Atelier | Date |
|---|---------|------|
| 1 | Éveil Créatif | 15 Janvier |
| 2 | Éveil Sensoriel | 22 Janvier |
| 3 | Yoga & Relaxation | 29 Janvier |
| 4 | Gestion des Émotions | 5 Février |
| 5 | Activités Nature | 12 Février |
| 6 | Éveil Créatif | 19 Février |
| 7 | Éveil Sensoriel | 26 Février |
| 8 | Yoga & Relaxation | 5 Mars |

### E&V Duo (Samedis 10h-12h)
| # | Atelier | Date |
|---|---------|------|
| 9 | Éveil Créatif en Duo | 18 Janvier |
| 10 | Éveil Sensoriel en Duo | 25 Janvier |
| 11 | Yoga & Relaxation en Duo | 1er Février |
| 12 | Gestion des Émotions en Duo | 8 Février |
| 13 | Activités Nature en Duo | 15 Février |
| 14 | Éveil Créatif en Duo | 22 Février |
| 15 | Éveil Sensoriel en Duo | 1er Mars |
| 16 | Yoga & Relaxation en Duo | 8 Mars |

---

## ✅ Checklist de déploiement

- [ ] Tester la page de réservation
- [ ] Vérifier le formulaire complet
- [ ] Tester l'admin (connexion requise)
- [ ] Modifier les dates si nécessaire
- [ ] Activer EmailJS (optionnel)
- [ ] Ajouter le lien dans le menu du site

---

## 🔗 Liens rapides

- **Réservation publique** : `reserver-atelier.html`
- **Admin réservations** : `admin-reservations.html`
- **Admin général** : `admin.html`

---

*Système créé pour Éveil & Vous - Limoux*
