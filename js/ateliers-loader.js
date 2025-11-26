// ateliers-loader.js
// Charge dynamiquement les ateliers depuis le fichier JSON

// Couleurs par thème
const themeColors = {
    creative: { border: 'var(--corail)', gradient: 'linear-gradient(135deg, var(--corail), #FF9A76)' },
    sensory: { border: 'var(--turquoise)', gradient: 'linear-gradient(135deg, var(--turquoise), #7ECFC0)' },
    yoga: { border: 'var(--lavande)', gradient: 'linear-gradient(135deg, var(--lavande), #B593D6)' },
    emotion: { border: 'var(--rose)', gradient: 'linear-gradient(135deg, var(--rose), #EA8FA3)' },
    nature: { border: 'var(--vert)', gradient: 'linear-gradient(135deg, var(--vert), #9FD99F)' }
};

// Fonction pour créer une carte d'atelier
function createWorkshopCard(atelier, type) {
    const borderColor = type === 'solo' ? 
        (atelier.theme === 'creative' ? 'var(--corail)' : 
         atelier.theme === 'sensory' ? 'var(--turquoise)' :
         atelier.theme === 'yoga' ? 'var(--lavande)' :
         atelier.theme === 'emotion' ? 'var(--rose)' : 'var(--vert)') :
        'var(--turquoise)';
    
    const buttonGradient = type === 'solo' ?
        (atelier.theme === 'creative' ? 'linear-gradient(135deg, var(--corail), #FF9A76)' :
         atelier.theme === 'sensory' ? 'linear-gradient(135deg, var(--turquoise), #7ECFC0)' :
         atelier.theme === 'yoga' ? 'linear-gradient(135deg, var(--lavande), #B593D6)' :
         atelier.theme === 'emotion' ? 'linear-gradient(135deg, var(--rose), #EA8FA3)' :
         'linear-gradient(135deg, var(--vert), #9FD99F)') :
        'linear-gradient(135deg, var(--turquoise), var(--bleu))';
    
    const placesText = type === 'solo' ? 'places' : 'duos';
    const buttonText = type === 'solo' ? 'Réserver ma place' : 'Réserver notre place';
    
    // Gestion de l'affichage : image OU emoji
    const visualElement = atelier.image ? 
        `<img src="${atelier.image}" alt="${atelier.titre}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 15px;">` :
        `<div style="font-size: 3rem; margin-bottom: 15px;">${atelier.emoji}</div>`;
    
    return `
        <div class="workshop-card" data-theme="${atelier.theme}" style="background: white; border-radius: 25px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); border-top: 5px solid ${borderColor}; transition: transform 0.3s, box-shadow 0.3s; cursor: pointer;">
            ${visualElement}
            <h4 style="font-size: 1.4rem; color: #1A1A2E; margin-bottom: 10px;">${atelier.titre}</h4>
            <p style="color: #FF8C42; font-weight: 600; font-size: 1.1rem; margin-bottom: 8px;">📅 ${atelier.date}</p>
            <p style="color: #666; font-size: 0.95rem; margin-bottom: 15px;">⏰ ${atelier.heure}</p>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px; min-height: 60px;">
                ${atelier.description}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span style="color: #1A1A2E; font-weight: 700; font-size: 1.15rem;">${atelier.prix}</span>
                <span style="background: rgba(107, 207, 127, 0.15); color: #059669; padding: 5px 12px; border-radius: 15px; font-size: 0.85rem; font-weight: 600;">${atelier.places} ${placesText}</span>
            </div>
            <button onclick="openBookingModal('${type === 'solo' ? 'E&V Solo' : 'E&V Duo'} - ${atelier.titre.replace(/'/g, "\\'")}', '${atelier.date} - ${atelier.heure}')" style="width: 100%; background: ${buttonGradient}; color: white; border: none; padding: 15px; border-radius: 15px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: transform 0.2s;">
                ${buttonText}
            </button>
        </div>
    `;
}

// Charger et afficher les ateliers
async function loadWorkshops() {
    try {
        const response = await fetch('data/ateliers-data.json');
        
        if (!response.ok) {
            throw new Error('Fichier de données introuvable');
        }
        
        const data = await response.json();
        
        // Afficher les ateliers Solo
        const soloGrid = document.getElementById('ateliers-solo-grid');
        if (soloGrid && data.ateliersSolo) {
            soloGrid.innerHTML = data.ateliersSolo.map(atelier => 
                createWorkshopCard(atelier, 'solo')
            ).join('');
        }
        
        // Afficher les ateliers Duo
        const duoGrid = document.getElementById('ateliers-duo-grid');
        if (duoGrid && data.ateliersDuo) {
            duoGrid.innerHTML = data.ateliersDuo.map(atelier => 
                createWorkshopCard(atelier, 'duo')
            ).join('');
        }
        
        // Réappliquer les animations hover
        document.querySelectorAll('.workshop-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 20px 60px rgba(0,0,0,0.15)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08)';
            });
        });
        
        console.log('✅ Ateliers chargés avec succès:', data);
        
    } catch (error) {
        console.error('❌ Erreur lors du chargement des ateliers:', error);
        
        // Afficher un message d'erreur à l'utilisateur
        const soloGrid = document.getElementById('ateliers-solo-grid');
        const duoGrid = document.getElementById('ateliers-duo-grid');
        
        const errorMessage = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: rgba(255,107,107,0.1); border-radius: 20px; border: 2px solid #FF6B6B;">
                <h3 style="color: #FF6B6B; margin-bottom: 10px;">⚠️ Impossible de charger les ateliers</h3>
                <p style="color: #666;">Les cartes d'ateliers ne peuvent pas être affichées pour le moment.</p>
            </div>
        `;
        
        if (soloGrid) soloGrid.innerHTML = errorMessage;
        if (duoGrid) duoGrid.innerHTML = errorMessage;
    }
}

// Charger les ateliers au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWorkshops);
} else {
    loadWorkshops();
}
