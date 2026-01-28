// ===== ADMIN SYSTEM =====

// Authentication Credentials
const AUTH_CREDENTIALS = {
    username: 'nova',
    password: 'Nov123@@@'
};

// Session Management
const SessionManager = {
    SESSION_KEY: 'novacoeur_admin_session',
    SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    
    startSession: function() {
        const session = {
            token: this.generateToken(),
            startTime: Date.now(),
            expiresAt: Date.now() + this.SESSION_TIMEOUT
        };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        return session;
    },
    
    generateToken: function() {
        return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now();
    },
    
    isValidSession: function() {
        const session = localStorage.getItem(this.SESSION_KEY);
        if (!session) return false;
        
        try {
            const parsed = JSON.parse(session);
            return parsed.expiresAt > Date.now();
        } catch (e) {
            return false;
        }
    },
    
    endSession: function() {
        localStorage.removeItem(this.SESSION_KEY);
    }
};

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('[NOVACOEUR] Page chargée - Vérification de session...');
    
    const loginModal = document.getElementById('login-modal');
    const adminInterface = document.getElementById('admin-interface');
    
    if (!loginModal || !adminInterface) {
        console.error('[NOVACOEUR] Éléments login-modal ou admin-interface manquants!');
        return;
    }
    
    if (SessionManager.isValidSession()) {
        // User is authenticated
        console.log('[NOVACOEUR] Session valide - Affichage interface admin');
        loginModal.style.display = 'none';
        adminInterface.style.display = 'block';
        initializeAdminInterface();
    } else {
        // User needs to login
        console.log('[NOVACOEUR] Pas de session - Affichage login');
        loginModal.style.display = 'flex';
        adminInterface.style.display = 'none';
        setupLoginForm();
    }
});

// Setup login form
function setupLoginForm() {
    const form = document.getElementById('login-form');
    const errorDiv = document.getElementById('login-error');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
            // Credentials are correct
            SessionManager.startSession();
            errorDiv.style.display = 'none';
            
            // Hide login modal and show admin interface
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('admin-interface').style.display = 'block';
            
            // Initialize admin interface
            initializeAdminInterface();
        } else {
            // Credentials are incorrect
            errorDiv.textContent = '❌ Pseudo ou mot de passe incorrect';
            errorDiv.style.display = 'block';
            document.getElementById('password').value = '';
        }
    });
}

// Initialize admin interface
function initializeAdminInterface() {
    console.log('[NOVACOEUR] Initialisation interface admin');
    try {
        updateDashboard();
        console.log('[NOVACOEUR] ✓ Dashboard mis à jour');
    } catch (e) {
        console.error('[NOVACOEUR] Erreur dashboard:', e);
    }
    
    try {
        setupTabNavigation();
        console.log('[NOVACOEUR] ✓ Navigation onglets activée');
    } catch (e) {
        console.error('[NOVACOEUR] Erreur navigation:', e);
    }
    
    try {
        setupFormHandlers();
        console.log('[NOVACOEUR] ✓ Formulaires initialisés');
    } catch (e) {
        console.error('[NOVACOEUR] Erreur formulaires:', e);
    }
    
    try {
        setupLogout();
        console.log('[NOVACOEUR] ✓ Logout configuré');
    } catch (e) {
        console.error('[NOVACOEUR] Erreur logout:', e);
    }
    
    console.log('[NOVACOEUR] ✓ Interface admin prête');
}

// Data Store
const DataStore = {
    pages: JSON.parse(localStorage.getItem('lovePages')) || [],
    
    savePage: function(pageData) {
        const newPage = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...pageData
        };
        this.pages.push(newPage);
        localStorage.setItem('lovePages', JSON.stringify(this.pages));
        return newPage;
    },

    getPage: function(id) {
        return this.pages.find(p => p.id == id);
    },

    updatePage: function(id, data) {
        const index = this.pages.findIndex(p => p.id == id);
        if (index !== -1) {
            this.pages[index] = { ...this.pages[index], ...data };
            localStorage.setItem('lovePages', JSON.stringify(this.pages));
        }
    },

    deletePage: function(id) {
        this.pages = this.pages.filter(p => p.id !== id);
        localStorage.setItem('lovePages', JSON.stringify(this.pages));
    },

    getAllPages: function() {
        return this.pages;
    },

    getPagesByOffer: function(offer) {
        return this.pages.filter(p => p.offerType == offer).length;
    }
};

// Tab Navigation
function setupTabNavigation() {
    console.log('[NOVACOEUR] Configuration navigation onglets');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuItems.length === 0) {
        console.warn('[NOVACOEUR] Aucun menu-item trouvé!');
        return;
    }
    
    console.log(`[NOVACOEUR] ${menuItems.length} menu items trouvés`);
    
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            
            if (!tab) {
                console.error('[NOVACOEUR] data-tab manquant sur item');
                return;
            }
            
            console.log(`[NOVACOEUR] Affichage tab: ${tab}`);
            
            // Remove active from all menu items and tabs
            document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            
            // Add active to current item and tab
            item.classList.add('active');
            const tabElement = document.getElementById(tab);
            if (tabElement) {
                tabElement.classList.add('active');
                console.log(`[NOVACOEUR] ✓ Tab ${tab} activé`);
                
                // Load pages when switching to manage-pages tab
                if (tab === 'manage-pages') {
                    console.log('[NOVACOEUR] Chargement des pages (onglet manage-pages)');
                    loadManagedPages();
                }
            } else {
                console.error(`[NOVACOEUR] Tab #${tab} non trouvé!`);
            }
        });
    });
}

// Dashboard Update
function updateDashboard() {
    const totalElement = document.getElementById('total-pages');
    const offer1Element = document.getElementById('count-offer-1');
    const offer2Element = document.getElementById('count-offer-2');
    const offer3Element = document.getElementById('count-offer-3');
    
    if (!totalElement || !offer1Element || !offer2Element || !offer3Element) {
        console.warn('[NOVACOEUR] Éléments dashboard manquants');
        return;
    }
    
    totalElement.textContent = DataStore.pages.length;
    offer1Element.textContent = DataStore.getPagesByOffer(1);
    offer2Element.textContent = DataStore.getPagesByOffer(2);
    offer3Element.textContent = DataStore.getPagesByOffer(3);
    console.log('[NOVACOEUR] ✓ Dashboard mis à jour');
}

// Quick action button
function setupFormHandlers() {
    console.log('[NOVACOEUR] Initialisation des gestionnaires de formulaire');
    
    // Setup quick button if it exists
    const quickBtn = document.getElementById('new-page-quick');
    if (quickBtn) {
        quickBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newPageTab = document.querySelector('[data-tab="new-page"]');
            if (newPageTab) {
                newPageTab.click();
                console.log('[NOVACOEUR] Nouveau page cliqué');
            }
        });
        console.log('[NOVACOEUR] ✓ Bouton rapide configuré');
    } else {
        console.warn('[NOVACOEUR] Bouton new-page-quick non trouvé');
    }
    
    // Setup page form
    setupPageForm();
}

// ===== FORM HANDLING =====

const offerConfig = {
    1: { photos: 5, videos: 0, music: false },
    2: { photos: 15, videos: 1, music: true },
    3: { photos: 20, videos: 3, music: true }
};

function setupPageForm() {
    console.log('[NOVACOEUR] Initialisation formulaire nouvelle page');
    
    const form = document.getElementById('form-new-page');
    if (!form) {
        console.warn('[NOVACOEUR] Formulaire form-new-page non trouvé!');
        return;
    }
    
    console.log('[NOVACOEUR] ✓ Formulaire trouvé');
    
    // Disable HTML5 validation and handle manually
    form.setAttribute('novalidate', 'novalidate');
    
    const offerType = document.getElementById('offer-type');
    if (!offerType) {
        console.warn('[NOVACOEUR] Select offer-type non trouvé!');
        return;
    }

    console.log('[NOVACOEUR] ✓ Éléments formulaire trouvés');

    // Update form based on offer type
    offerType.addEventListener('change', (e) => {
        const offer = offerType.value;
        console.log(`[NOVACOEUR] Offre sélectionnée: ${offer}`);
        
        if (offer) {
            const config = offerConfig[offer];
            const videosSection = document.getElementById('videos-section');
            const musicSection = document.getElementById('music-section');
            
            if (videosSection) videosSection.style.display = config.videos > 0 ? 'block' : 'none';
            if (musicSection) musicSection.style.display = config.music ? 'block' : 'none';
            
            console.log(`[NOVACOEUR] ✓ Sections mises à jour pour offre ${offer}`);
        }
    });

    // Form Submit with manual validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('[NOVACOEUR] Soumission formulaire');
        
        const clientName = document.getElementById('client-name');
        const clientEmail = document.getElementById('client-email');
        const message = document.getElementById('message');
        
        // Manual validation
        if (!clientName || !clientName.value.trim()) {
            alert('Veuillez entrer le nom du client');
            if (clientName) clientName.focus();
            return;
        }
        
        if (!clientEmail || !clientEmail.value.trim()) {
            alert('Veuillez entrer l\'email du client');
            if (clientEmail) clientEmail.focus();
            return;
        }
        
        if (!offerType || !offerType.value) {
            alert('Veuillez sélectionner une offre');
            if (offerType) offerType.focus();
            return;
        }
        
        if (!message || !message.value.trim()) {
            alert('Veuillez entrer un message');
            if (message) message.focus();
            return;
        }
        
        // All validations passed
        console.log('[NOVACOEUR] ✓ Tous les champs validés');
        alert('✓ Formulaire validé avec succès!\n\nFonction de création en cours de développement');
    });
    
    console.log('[NOVACOEUR] ✓ Formulaire initialisé');
}

// Load Managed Pages
function loadManagedPages() {
    console.log('[NOVACOEUR] Chargement des pages gérées');
    
    const pagesList = document.getElementById('pages-list');
    if (!pagesList) {
        console.warn('[NOVACOEUR] Element pages-list non trouvé!');
        return;
    }
    
    const pages = DataStore.getAllPages();
    console.log(`[NOVACOEUR] ${pages.length} pages trouvées`);
    
    if (pages.length === 0) {
        pagesList.innerHTML = '<p class="no-data">Aucune page créée pour le moment</p>';
        console.log('[NOVACOEUR] ✓ Aucune page - affichage message');
        return;
    }
    
    pagesList.innerHTML = pages.map(page => {
        const offerNames = {
            1: 'Éclat Simple',
            2: 'Émotion Complète',
            3: 'Infini Amoureux'
        };
        
        const date = new Date(page.createdAt).toLocaleDateString('fr-FR');
        const pageUrl = `love-page.html?id=${page.id}`;
        
        return `
            <div class="page-card">
                <div class="page-header">
                    <div>
                        <h3>${page.clientName}</h3>
                        <p class="page-date">Créée le ${date}</p>
                    </div>
                    <span class="offer-badge">${offerNames[page.offerType]}</span>
                </div>
                <div class="page-details">
                    <p><strong>Email:</strong> ${page.clientEmail}</p>
                    <p><strong>Photos:</strong> ${page.photos.length}</p>
                    <p><strong>Vidéos:</strong> ${page.videos.length}</p>
                </div>
                <div class="page-actions">
                    <button class="btn btn-small btn-info" onclick="window.open('${pageUrl}')">
                        <i class="fas fa-eye"></i> Voir
                    </button>
                    <button class="btn btn-small btn-secondary" onclick="editPage(${page.id})">
                        <i class="fas fa-edit"></i> Modifier
                    </button>
                    <button class="btn btn-small btn-danger" onclick="deletePage(${page.id})">
                        <i class="fas fa-trash"></i> Supprimer
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    console.log('[NOVACOEUR] ✓ Pages chargées et affichées');
}

// Delete Page
function deletePage(id) {
    console.log(`[NOVACOEUR] Suppression page ${id}`);
    
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page?')) {
        try {
            DataStore.deletePage(id);
            console.log(`[NOVACOEUR] ✓ Page ${id} supprimée de la DB`);
            
            updateDashboard();
            loadManagedPages();
            
            alert('Page supprimée avec succès');
            console.log('[NOVACOEUR] ✓ Interface mise à jour après suppression');
        } catch (err) {
            console.error('[NOVACOEUR] Erreur suppression:', err);
            alert('Erreur lors de la suppression');
        }
    }
}

// Edit Page (placeholder)
function editPage(id) {
    console.log(`[NOVACOEUR] Édition page ${id}`);
    
    const page = DataStore.getPage(id);
    if (page) {
        console.log('[NOVACOEUR] ✓ Page trouvée:', page);
        alert('Fonction de modification en cours de développement');
    } else {
        console.warn(`[NOVACOEUR] Page ${id} non trouvée`);
    }
}

// Logout
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) {
        console.warn('[NOVACOEUR] Bouton logout non trouvé!');
        return;
    }
    
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('[NOVACOEUR] Déconnexion');
        
        SessionManager.endSession();
        console.log('[NOVACOEUR] ✓ Session terminée');
        
        const loginModal = document.getElementById('login-modal');
        const adminInterface = document.getElementById('admin-interface');
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        
        if (loginModal) loginModal.style.display = 'flex';
        if (adminInterface) adminInterface.style.display = 'none';
        if (loginForm) loginForm.reset();
        if (loginError) loginError.style.display = 'none';
        
        console.log('[NOVACOEUR] ✓ Interface réinitialisée pour connexion');
    });
    
    console.log('[NOVACOEUR] ✓ Logout handler configuré');
}
