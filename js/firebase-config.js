// Configuration Firebase pour Éveil & Vous
// ==========================================

// Import Firebase (version CDN compatible)
// Ces scripts doivent être chargés avant ce fichier dans le HTML

const firebaseConfig = {
    apiKey: "AIzaSyCw6cMaXCe8gqRYcRwuXT2gkzgDAcJLJp0",
    authDomain: "eveil-et-vous.firebaseapp.com",
    projectId: "eveil-et-vous",
    storageBucket: "eveil-et-vous.firebasestorage.app",
    messagingSenderId: "1095424492114",
    appId: "1:1095424492114:web:79a65370efab450ed6d58b",
    measurementId: "G-0Z3Z1X0VM6"
};

// Initialisation Firebase
let app, db;

function initFirebase() {
    if (typeof firebase !== 'undefined') {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('✅ Firebase initialisé avec succès');
        return true;
    } else {
        console.error('❌ Firebase SDK non chargé');
        return false;
    }
}

// ==========================================
// FONCTIONS ATELIERS
// ==========================================

// Récupérer tous les ateliers
async function getAteliers() {
    try {
        const snapshot = await db.collection('ateliers').get();
        const ateliers = {};
        snapshot.forEach(doc => {
            ateliers[doc.id] = doc.data();
        });
        return ateliers;
    } catch (error) {
        console.error('Erreur récupération ateliers:', error);
        return null;
    }
}

// Sauvegarder un atelier
async function saveAtelier(atelierId, data) {
    try {
        await db.collection('ateliers').doc(atelierId).set(data, { merge: true });
        console.log('✅ Atelier sauvegardé:', atelierId);
        return true;
    } catch (error) {
        console.error('Erreur sauvegarde atelier:', error);
        return false;
    }
}

// Sauvegarder tous les ateliers (initialisation)
async function saveAllAteliers(ateliers) {
    try {
        const batch = db.batch();
        for (const [id, data] of Object.entries(ateliers)) {
            const ref = db.collection('ateliers').doc(id);
            batch.set(ref, data);
        }
        await batch.commit();
        console.log('✅ Tous les ateliers sauvegardés');
        return true;
    } catch (error) {
        console.error('Erreur sauvegarde ateliers:', error);
        return false;
    }
}

// ==========================================
// FONCTIONS RÉSERVATIONS
// ==========================================

// Récupérer toutes les réservations
async function getReservations() {
    try {
        const snapshot = await db.collection('reservations').orderBy('dateReservation', 'desc').get();
        const reservations = [];
        snapshot.forEach(doc => {
            reservations.push({ id: doc.id, ...doc.data() });
        });
        return reservations;
    } catch (error) {
        console.error('Erreur récupération réservations:', error);
        return [];
    }
}

// Ajouter une réservation
async function addReservation(reservation) {
    try {
        const docRef = await db.collection('reservations').add({
            ...reservation,
            dateReservation: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Réservation ajoutée:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Erreur ajout réservation:', error);
        return null;
    }
}

// Supprimer une réservation
async function deleteReservation(reservationId) {
    try {
        await db.collection('reservations').doc(reservationId).delete();
        console.log('✅ Réservation supprimée:', reservationId);
        return true;
    } catch (error) {
        console.error('Erreur suppression réservation:', error);
        return false;
    }
}

// ==========================================
// FONCTIONS LISTE D'ATTENTE
// ==========================================

// Récupérer la liste d'attente
async function getWaitlist() {
    try {
        const snapshot = await db.collection('waitlist').orderBy('dateInscription', 'desc').get();
        const waitlist = [];
        snapshot.forEach(doc => {
            waitlist.push({ id: doc.id, ...doc.data() });
        });
        return waitlist;
    } catch (error) {
        console.error('Erreur récupération liste d\'attente:', error);
        return [];
    }
}

// Ajouter à la liste d'attente
async function addToWaitlist(entry) {
    try {
        const docRef = await db.collection('waitlist').add({
            ...entry,
            dateInscription: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Ajouté à la liste d\'attente:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Erreur ajout liste d\'attente:', error);
        return null;
    }
}

// Supprimer de la liste d'attente
async function removeFromWaitlist(entryId) {
    try {
        await db.collection('waitlist').doc(entryId).delete();
        console.log('✅ Retiré de la liste d\'attente:', entryId);
        return true;
    } catch (error) {
        console.error('Erreur suppression liste d\'attente:', error);
        return false;
    }
}

// ==========================================
// FONCTIONS RAPPELS SMS
// ==========================================

// Récupérer les rappels SMS
async function getSmsReminders() {
    try {
        const snapshot = await db.collection('sms-reminders').get();
        const reminders = [];
        snapshot.forEach(doc => {
            reminders.push({ id: doc.id, ...doc.data() });
        });
        return reminders;
    } catch (error) {
        console.error('Erreur récupération rappels SMS:', error);
        return [];
    }
}

// Ajouter un rappel SMS
async function addSmsReminder(reminder) {
    try {
        const docRef = await db.collection('sms-reminders').add({
            ...reminder,
            dateCreation: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Rappel SMS ajouté:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Erreur ajout rappel SMS:', error);
        return null;
    }
}

// ==========================================
// MIGRATION DEPUIS LOCALSTORAGE
// ==========================================

async function migrateFromLocalStorage() {
    console.log('🔄 Début migration depuis localStorage...');
    
    // Migrer les ateliers
    const localAteliers = localStorage.getItem('ateliers-reservations-data');
    if (localAteliers) {
        try {
            const ateliers = JSON.parse(localAteliers);
            await saveAllAteliers(ateliers);
            console.log('✅ Ateliers migrés');
        } catch (e) {
            console.error('Erreur migration ateliers:', e);
        }
    }
    
    // Migrer les réservations
    const localReservations = localStorage.getItem('reservations-list');
    if (localReservations) {
        try {
            const reservations = JSON.parse(localReservations);
            for (const res of reservations) {
                await db.collection('reservations').add({
                    ...res,
                    dateReservation: new Date(res.dateReservation)
                });
            }
            console.log('✅ Réservations migrées');
        } catch (e) {
            console.error('Erreur migration réservations:', e);
        }
    }
    
    // Migrer la liste d'attente
    const localWaitlist = localStorage.getItem('waitlist-data');
    if (localWaitlist) {
        try {
            const waitlist = JSON.parse(localWaitlist);
            for (const entry of waitlist) {
                await db.collection('waitlist').add({
                    ...entry,
                    dateInscription: new Date(entry.dateInscription)
                });
            }
            console.log('✅ Liste d\'attente migrée');
        } catch (e) {
            console.error('Erreur migration liste d\'attente:', e);
        }
    }
    
    console.log('✅ Migration terminée !');
    return true;
}

// Vérifier si la migration est nécessaire
async function checkAndMigrate() {
    try {
        const snapshot = await db.collection('ateliers').limit(1).get();
        if (snapshot.empty) {
            console.log('📦 Base de données vide, migration nécessaire...');
            return await migrateFromLocalStorage();
        } else {
            console.log('✅ Données Firebase existantes');
            return false;
        }
    } catch (error) {
        console.error('Erreur vérification migration:', error);
        return false;
    }
}

// Exporter les fonctions pour utilisation globale
window.FirebaseDB = {
    init: initFirebase,
    // Ateliers
    getAteliers,
    saveAtelier,
    saveAllAteliers,
    // Réservations
    getReservations,
    addReservation,
    deleteReservation,
    // Liste d'attente
    getWaitlist,
    addToWaitlist,
    removeFromWaitlist,
    // SMS
    getSmsReminders,
    addSmsReminder,
    // Migration
    migrateFromLocalStorage,
    checkAndMigrate
};

console.log('📦 Firebase config chargé - utilisez FirebaseDB.init() pour initialiser');
