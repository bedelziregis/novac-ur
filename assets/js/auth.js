// ===== SYSTÈME D'AUTHENTIFICATION ADMIN =====

// Identifiants par défaut (à modifier en production)
const ADMIN_CREDENTIALS = {
    username: 'nova',
    password: 'Nov123@@@'
};

// Session key
const SESSION_KEY = 'novacoeur_admin_session';

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

// Check if user is authenticated
function checkAuthentication() {
    const session = localStorage.getItem(SESSION_KEY);
    const loginModal = document.getElementById('login-modal');
    const adminInterface = document.getElementById('admin-interface');

    if (session && session === 'authenticated') {
        // User is logged in
        if (loginModal) loginModal.style.display = 'none';
        if (adminInterface) adminInterface.style.display = 'flex';
    } else {
        // User is not logged in
        if (loginModal) loginModal.style.display = 'flex';
        if (adminInterface) adminInterface.style.display = 'none';
    }
}

// Handle login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

// Login handler
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && 
        password === ADMIN_CREDENTIALS.password) {
        
        // Set session
        localStorage.setItem(SESSION_KEY, 'authenticated');
        
        // Set timestamp (optional)
        localStorage.setItem(SESSION_KEY + '_timestamp', new Date().toISOString());
        
        // Clear form
        document.getElementById('login-form').reset();
        
        // Show admin interface
        document.getElementById('login-modal').style.display = 'none';
        document.getElementById('admin-interface').style.display = 'flex';
        
        // Hide error
        if (errorDiv) errorDiv.style.display = 'none';
        
        // Log success
        console.log('✅ Connexion réussie');
        
    } else {
        // Show error
        if (errorDiv) {
            errorDiv.textContent = '❌ Identifiant ou mot de passe incorrect';
            errorDiv.style.display = 'block';
        }
        
        // Log failed attempt
        console.warn('⚠️ Tentative de connexion échouée');
    }
}

// Logout handler
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });
}

// Logout function
function handleLogout() {
    // Clear session
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY + '_timestamp');
    
    // Clear form
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.reset();
    
    // Show login modal
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('admin-interface').style.display = 'none';
    
    // Clear focus
    document.getElementById('username').focus();
    
    console.log('✅ Déconnecté avec succès');
}

// Session timeout (optional - 24 hours)
function checkSessionExpiry() {
    const timestamp = localStorage.getItem(SESSION_KEY + '_timestamp');
    if (!timestamp) return;
    
    const loginTime = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - loginTime) / (1000 * 60 * 60);
    
    // Logout after 24 hours
    if (diffInHours > 24) {
        handleLogout();
        alert('Votre session a expiré. Veuillez vous reconnecter.');
    }
}

// Check session expiry every minute
setInterval(checkSessionExpiry, 60000);

// Prevent direct access to admin page
window.addEventListener('load', () => {
    checkAuthentication();
});

// Export for other scripts
window.AdminAuth = {
    isAuthenticated: () => localStorage.getItem(SESSION_KEY) === 'authenticated',
    logout: handleLogout,
    checkSession: checkAuthentication
};
