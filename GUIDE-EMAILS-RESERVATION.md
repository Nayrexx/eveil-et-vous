# 📧 Guide Configuration Emails - Réservations Ateliers

## 🎯 Objectif

Envoyer automatiquement :
1. **Email de confirmation** au parent qui réserve
2. **Email de notification** à Éveil & Vous

---

## 🚀 Étapes de configuration (10 minutes)

### 1. Créer un compte EmailJS (gratuit)

1. Allez sur **https://www.emailjs.com/**
2. Cliquez sur **"Sign Up Free"**
3. Créez votre compte (email + mot de passe)

> 💡 **Plan gratuit** : 200 emails/mois (suffisant pour démarrer)

---

### 2. Créer un Service Email

1. Dans le dashboard, cliquez sur **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez **Gmail** (le plus simple) ou **Outlook**
4. Connectez votre compte email
5. Nommez le service : `service_eveil`
6. Cliquez **"Create Service"**

---

### 3. Créer le Template "Confirmation Client"

1. Allez dans **"Email Templates"**
2. Cliquez **"Create New Template"**
3. Nommez-le : `template_confirmation`

**Contenu du template :**

```
Sujet: ✅ Confirmation de réservation - Éveil & Vous

Bonjour {{to_name}},

Votre réservation est confirmée ! 🎉

📋 DÉTAILS DE VOTRE RÉSERVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 Atelier : {{atelier_titre}}
📅 Date : {{atelier_date}}
⏰ Horaire : {{atelier_heure}}
👶 Enfant : {{enfant_prenom}} ({{enfant_age}} ans)
📝 Formule : {{atelier_type}}
🔢 N° de réservation : #{{numero_reservation}}

💰 PAIEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Montant : {{prix}}
Le paiement s'effectue sur place le jour de l'atelier.

📍 LIEU
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Éveil & Vous
Limoux, Aude

⚠️ IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
En cas d'empêchement, merci de nous prévenir au moins 48h à l'avance.

À très bientôt !
L'équipe Éveil & Vous 🌟

---
Cet email a été envoyé automatiquement suite à votre réservation.
```

4. Cliquez **"Save"**

---

### 4. Créer le Template "Notification Admin"

1. Créez un nouveau template : `template_admin`

**Contenu du template :**

```
Sujet: 🔔 Nouvelle réservation - {{atelier_titre}}

NOUVELLE RÉSERVATION REÇUE ! 🎉

📋 ATELIER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 {{atelier_titre}}
📅 {{atelier_date}}
⏰ {{atelier_heure}}
📝 Type : {{atelier_type}}

👤 PARENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom : {{parent_nom}}
Email : {{parent_email}}
Téléphone : {{parent_tel}}

👶 ENFANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prénom : {{enfant_prenom}}
Âge : {{enfant_age}} ans
Parent participant (Duo) : {{parent_participant}}

💬 MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{message}}

📊 INFOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
N° Réservation : #{{numero_reservation}}
Date : {{date_reservation}}

---
Connectez-vous à l'admin pour gérer cette réservation.
```

2. **Destinataire (To Email)** : Mettez `{{to_email}}` ou directement `contact@eveiletvouss.fr`

3. Cliquez **"Save"**

---

### 5. Récupérer vos identifiants

Dans le dashboard EmailJS, récupérez :

| Élément | Où le trouver | Exemple |
|---------|---------------|---------|
| **User ID (Public Key)** | Account → API Keys | `abc123xyz` |
| **Service ID** | Email Services | `service_eveil` |
| **Template ID Client** | Email Templates | `template_confirmation` |
| **Template ID Admin** | Email Templates | `template_admin` |

---

### 6. Configurer dans le code

Ouvrez `reserver-atelier.html` et trouvez cette section (ligne ~1090) :

```javascript
const EMAILJS_ENABLED = false; // Mettre à true pour activer
const EMAILJS_USER_ID = 'VOTRE_USER_ID'; // Votre Public Key EmailJS
const EMAILJS_SERVICE_ID = 'service_eveil'; // Votre Service ID
const TEMPLATE_CLIENT = 'template_confirmation'; // Template pour le client
const TEMPLATE_ADMIN = 'template_admin'; // Template pour l'admin
const ADMIN_EMAIL = 'contact@eveiletvouss.fr'; // Email de l'entreprise
```

**Remplacez par vos valeurs :**

```javascript
const EMAILJS_ENABLED = true; // ACTIVÉ !
const EMAILJS_USER_ID = 'votre_public_key_ici';
const EMAILJS_SERVICE_ID = 'service_eveil';
const TEMPLATE_CLIENT = 'template_confirmation';
const TEMPLATE_ADMIN = 'template_admin';
const ADMIN_EMAIL = 'contact@eveiletvouss.fr';
```

---

## ✅ Test

1. Faites une réservation test
2. Vérifiez que vous recevez :
   - L'email de confirmation (boîte du parent)
   - L'email de notification (votre boîte admin)

---

## 📊 Variables disponibles dans les templates

| Variable | Description |
|----------|-------------|
| `{{to_email}}` | Email du destinataire |
| `{{to_name}}` | Nom du parent |
| `{{parent_nom}}` | Nom du parent |
| `{{parent_email}}` | Email du parent |
| `{{parent_tel}}` | Téléphone |
| `{{enfant_prenom}}` | Prénom de l'enfant |
| `{{enfant_age}}` | Âge de l'enfant |
| `{{atelier_titre}}` | Nom de l'atelier |
| `{{atelier_date}}` | Date de l'atelier |
| `{{atelier_heure}}` | Horaire |
| `{{atelier_type}}` | Solo ou Duo |
| `{{parent_participant}}` | Parent pour Duo |
| `{{numero_reservation}}` | N° unique |
| `{{date_reservation}}` | Date de réservation |
| `{{message}}` | Message du parent |
| `{{prix}}` | Prix affiché |

---

## 💡 Astuces

### Personnaliser le design des emails
Dans EmailJS, vous pouvez utiliser du HTML pour un design plus joli :

```html
<div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
  <div style="background: linear-gradient(135deg, #FF8C42, #4ECDC4); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0;">Éveil & Vous</h1>
  </div>
  <div style="padding: 30px; background: #f9f9f9;">
    <h2>Bonjour {{to_name}} ! 🎉</h2>
    <p>Votre réservation est confirmée.</p>
    <!-- ... -->
  </div>
</div>
```

### Limites du plan gratuit
- 200 emails/mois
- 2 templates
- 1 service email

Pour plus : Plans payants à partir de 9$/mois

---

## ❓ FAQ

**Q: Les emails arrivent dans les spams ?**
> Ajoutez `noreply@emailjs.com` aux contacts autorisés, ou utilisez un domaine vérifié.

**Q: Puis-je tester sans envoyer de vrais emails ?**
> Oui, laissez `EMAILJS_ENABLED = false` pour le mode simulation.

**Q: Que se passe-t-il si l'email échoue ?**
> La réservation est quand même enregistrée. L'erreur est loggée dans la console.

---

## 🔗 Ressources

- **EmailJS** : https://www.emailjs.com/
- **Documentation** : https://www.emailjs.com/docs/
- **Templates exemples** : https://www.emailjs.com/docs/examples/

---

*Guide créé pour Éveil & Vous - Limoux*
