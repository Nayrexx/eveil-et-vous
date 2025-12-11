// =====================================================
// FIREBASE CONTENT LOADER
// Charge le contenu dynamique depuis Firebase Firestore
// =====================================================

// Configuration Firebase (même que admin et index.html)
const firebaseConfigContent = {
    apiKey: "AIzaSyCw6cMaXCe8gqRYcRwuXT2gkzgDAcJLJp0",
    authDomain: "eveil-et-vous.firebaseapp.com",
    projectId: "eveil-et-vous",
    storageBucket: "eveil-et-vous.firebasestorage.app",
    messagingSenderId: "1059815739498",
    appId: "1:1059815739498:web:0ad0c624266a46521c33f9"
};

// Initialiser Firebase si pas déjà fait
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfigContent);
}

// Base de données
let dbContent;
if (typeof firebase !== 'undefined') {
    dbContent = firebase.firestore();
}

// Cache pour éviter les requêtes multiples
let contentCache = {};

// Charger le contenu d'une collection
async function loadFirebaseContent(collection) {
    if (contentCache[collection]) {
        return contentCache[collection];
    }
    
    try {
        const doc = await dbContent.collection('content').doc(collection).get();
        if (doc.exists) {
            contentCache[collection] = doc.data();
            return doc.data();
        }
    } catch (error) {
        console.log('Firebase non disponible, utilisation du contenu par défaut');
    }
    return null;
}

// Charger le contenu de la page contact
async function loadContactContent() {
    const contact = await loadFirebaseContent('contact');
    if (contact) {
        // Liens téléphone
        document.querySelectorAll('.contact-phone-link').forEach(el => {
            if (contact.phone) {
                el.href = 'tel:' + contact.phone.replace(/\s/g, '');
                el.textContent = contact.phone;
            }
        });
        
        // Liens email
        document.querySelectorAll('.contact-email-link').forEach(el => {
            if (contact.email) {
                el.href = 'mailto:' + contact.email;
                el.textContent = contact.email;
            }
        });
        
        // Réseaux sociaux
        document.querySelectorAll('.social-facebook').forEach(el => {
            if (contact.facebook) el.href = contact.facebook;
        });
        document.querySelectorAll('.social-instagram').forEach(el => {
            if (contact.instagram) el.href = contact.instagram;
        });
        
        console.log('✅ Contenu contact chargé depuis Firebase');
    }
}

// =====================================================
// INITIALISATION AUTOMATIQUE
// =====================================================

document.addEventListener('DOMContentLoaded', async function() {
    // Détecter la page actuelle et charger le contenu approprié
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('contact')) {
        await loadContactContent();
    }
});
