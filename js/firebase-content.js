// =====================================================
// FIREBASE CONTENT LOADER - SYSTÈME COMPLET
// Charge TOUT le contenu dynamique depuis Firebase
// =====================================================

(function() {
    // Réutiliser l'app Firebase déjà initialisée par firebase-config.js
    // Base de données
    let db;
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            // Fallback si firebase-config.js n'a pas été chargé
            firebase.initializeApp({
                apiKey: "AIzaSyCw6cMaXCe8gqRYcRwuXT2gkzgDAcJLJp0",
                authDomain: "eveil-et-vous.firebaseapp.com",
                projectId: "eveil-et-vous",
                storageBucket: "eveil-et-vous.firebasestorage.app",
                messagingSenderId: "1095424492114",
                appId: "1:1095424492114:web:79a65370efab450ed6d58b"
            });
        }
        db = firebase.firestore();
    }

    // Cache pour éviter les requêtes multiples
    const cache = {};

    // Charger une collection depuis Firebase
    async function loadContent(collection) {
        if (cache[collection]) return cache[collection];
        
        try {
            const doc = await db.collection('content').doc(collection).get();
            if (doc.exists) {
                cache[collection] = doc.data();
                return doc.data();
            }
        } catch (error) {
            console.log(`Firebase: ${collection} - utilisation du contenu par défaut`);
        }
        return null;
    }

    // =====================================================
    // FONCTIONS UTILITAIRES
    // =====================================================
    
    function setText(selector, value, isHTML = false) {
        document.querySelectorAll(selector).forEach(el => {
            if (value) {
                if (isHTML) {
                    el.innerHTML = value;
                } else {
                    el.textContent = value;
                }
            }
        });
    }

    function setAttr(selector, attr, value) {
        document.querySelectorAll(selector).forEach(el => {
            if (value) el.setAttribute(attr, value);
        });
    }

    // =====================================================
    // CHARGEMENT PAR PAGE
    // =====================================================

    // === FOOTER (toutes les pages) ===
    async function loadFooter() {
        const data = await loadContent('footer');
        if (!data) return;

        // Marque
        setText('.footer-brand', data.brand);
        setText('.footer-tagline', data.tagline);
        
        // Contact dans footer
        document.querySelectorAll('.footer-contact-info').forEach(el => {
            el.innerHTML = `${data.location || ''}<br>${data.email || ''}`;
        });

        // Réseaux sociaux
        setAttr('.footer-facebook', 'href', data.facebook);
        setAttr('.footer-instagram', 'href', data.instagram);

        // Copyright
        setText('.footer-copyright', data.copyright);
    }

    // === PAGE CONTACT ===
    async function loadContactPage() {
        const data = await loadContent('contact');
        if (!data) return;

        // Adresse
        setText('.contact-address', data.address, true);

        // Téléphone
        document.querySelectorAll('.contact-phone-link').forEach(el => {
            if (data.phone) {
                el.href = 'tel:' + data.phone.replace(/\s/g, '');
                el.textContent = data.phone;
            }
        });

        // Email
        document.querySelectorAll('.contact-email-link').forEach(el => {
            if (data.email) {
                el.href = 'mailto:' + data.email;
                el.textContent = data.email;
            }
        });

        // Horaires
        setText('.contact-hours', data.hours, true);

        // Réseaux sociaux
        setAttr('.social-facebook', 'href', data.facebook);
        setAttr('.social-instagram', 'href', data.instagram);

        console.log('✅ Page Contact chargée depuis Firebase');
    }

    // === PAGE À PROPOS ===
    async function loadAboutPage() {
        const data = await loadContent('about');
        if (!data) return;

        setText('.about-title', data.title);
        setText('.about-intro', data.intro, true);
        setText('.about-philosophy', data.philosophy, true);
        setText('.team-name', data.teamName);
        setText('.team-role', data.teamRole);
        setText('.team-bio', data.teamBio, true);

        console.log('✅ Page À Propos chargée depuis Firebase');
    }

    // === PAGE SÉJOURS ===
    async function loadSejoursPage() {
        const data = await loadContent('sejours');
        if (!data) return;

        setText('.sejours-title', data.title);
        setText('.sejours-intro', data.intro, true);
        setText('.tarif-adulte', data.tarifAdulte);
        setText('.tarif-enfant', data.tarifEnfant);
        setText('.tarifs-inclus', data.tarifsInclus, true);
        setText('.horaires-arrivee', data.horairesArrivee);
        setText('.horaires-depart', data.horairesDepart);

        console.log('✅ Page Séjours chargée depuis Firebase');
    }

    // === PAGE ACTIVITÉS ===
    async function loadActivitesPage() {
        // Charger les avis
        const homepage = await loadContent('homepage');
        if (homepage && homepage.reviews) {
            const reviewsContainer = document.querySelector('.reviews-grid, .reviews-container');
            if (reviewsContainer) {
                reviewsContainer.innerHTML = homepage.reviews.map(review => `
                    <div class="review-card">
                        <div class="review-stars">${'★'.repeat(review.stars || 5)}</div>
                        <p class="review-text">"${review.text}"</p>
                        <div class="review-author">${review.author}</div>
                    </div>
                `).join('');
            }
        }

        console.log('✅ Page Activités chargée depuis Firebase');
    }

    // === PAGE ACCUEIL - ATELIERS ===
    async function loadAteliersAccueil() {
        const data = await loadContent('ateliers');
        if (!data) return;

        // E&V Solo - Jour
        setText('.atelier-solo-jour', data.soloJour);
        // E&V Solo - Horaire
        setText('.atelier-solo-horaire', data.soloHoraire);
        
        // E&V Duo - Jour
        setText('.atelier-duo-jour', data.duoJour);
        // E&V Duo - Horaire
        setText('.atelier-duo-horaire', data.duoHoraire);

        console.log('✅ Dates ateliers chargées depuis Firebase');
    }

    // =====================================================
    // INITIALISATION
    // =====================================================

    document.addEventListener('DOMContentLoaded', async function() {
        if (!db) {
            console.log('⚠️ Firebase non disponible');
            return;
        }

        const path = window.location.pathname.toLowerCase();

        // Toujours charger le footer
        await loadFooter();

        // Charger le contenu spécifique à la page
        if (path.includes('contact')) {
            await loadContactPage();
        } else if (path.includes('about') || path.includes('a-propos')) {
            await loadAboutPage();
        } else if (path.includes('sejour') && !path.includes('reservation')) {
            await loadSejoursPage();
        } else if (path.includes('activite')) {
            await loadActivitesPage();
        } else if (path.includes('index') || path === '/' || path.endsWith('/')) {
            await loadAteliersAccueil();
        }
    });
})();
