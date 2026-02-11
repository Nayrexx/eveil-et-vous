// =====================================================
// FIREBASE AUTH - Authentification Admin
// =====================================================

// Réutiliser l'app Firebase déjà initialisée par firebase-config.js
// (ne PAS re-déclarer de config ni appeler initializeApp ici)

// Vérifier l'authentification admin
function checkAdminAuth() {
    return new Promise((resolve, reject) => {
        if (typeof firebase === 'undefined') {
            console.error('Firebase non chargé');
            window.location.href = 'admin-login.html';
            reject('Firebase non chargé');
            return;
        }
        
        const auth = firebase.auth();
        
        // Écouter l'état d'authentification
        auth.onAuthStateChanged(user => {
            if (user) {
                // Utilisateur connecté
                console.log('✅ Admin connecté:', user.email);
                resolve(user);
            } else {
                // Non connecté, rediriger vers login
                console.log('❌ Non authentifié, redirection...');
                window.location.href = 'admin-login.html';
                reject('Non authentifié');
            }
        });
    });
}

// Déconnexion
function logoutAdmin() {
    if (typeof firebase !== 'undefined') {
        firebase.auth().signOut().then(() => {
            alert('✅ Déconnexion réussie !');
            window.location.href = 'index.html';
        }).catch(error => {
            console.error('Erreur déconnexion:', error);
            alert('Erreur lors de la déconnexion');
        });
    }
}

// Obtenir l'email de l'admin connecté
function getAdminEmail() {
    const user = firebase.auth().currentUser;
    return user ? user.email : 'Admin';
}

// Export global
window.checkAdminAuth = checkAdminAuth;
window.logoutAdmin = logoutAdmin;
window.getAdminEmail = getAdminEmail;
