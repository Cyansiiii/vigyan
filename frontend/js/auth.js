// ============================================
// UNIFIED AUTH SYSTEM - Uses user-panel.js
// This file now ONLY handles login/logout logic
// User panel rendering is handled by user-panel.js
// ============================================

console.log('🔐 Auth.js loaded - Unified system');

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Auth: Checking login status...');
    initializeAuth();
});

function initializeAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userEmail = localStorage.getItem('userEmail');
    const userToken = localStorage.getItem('userToken'); // 🔒 FIX: Strict token only
    const purchasedTests = localStorage.getItem('purchasedTests');

    console.log('🔐 Auth state:', {
        isLoggedIn,
        userEmail,
        userToken,
        purchasedTests
    });

    // If user is logged in, trigger the unified user panel render
    if (isLoggedIn === 'true' && userEmail) {
        console.log('✅ User is logged in - Calling unified refreshUserDashboard()');

        // Ensure userRollNumber is synced (for backward compatibility)
        // 🔒 FIX: Do NOT use rollNumber as token fallback
        if (userToken && !localStorage.getItem('userRollNumber')) {
            // decipher roll number from token if possible, or just leave it blank
        }

        // Call the unified render function from user-panel.js
        if (window.refreshUserDashboard) {
            window.refreshUserDashboard();
        } else {
            console.error('❌ refreshUserDashboard not found - user-panel.js not loaded?');
        }
    } else {
        console.log('ℹ️ User not logged in');
    }
}

// Global logout function
window.handleLogout = function () {
    console.log('🚪 Logging out...');

    // Clear all user data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRollNumber');
    localStorage.removeItem('userName');
    localStorage.removeItem('purchasedTests');
    localStorage.removeItem('tempTestId');
    localStorage.removeItem('tempAmount');

    console.log('✅ Logged out successfully');

    // Redirect to homepage
    window.location.href = 'index.html';
}

// Legacy support - keep old function name for backward compatibility
window.triggerLogout = window.handleLogout;

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeAuth,
        handleLogout
    };
}