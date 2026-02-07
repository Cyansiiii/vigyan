/**
 * Admin Session Manager
 * Created: 2026-01-26
 * Purpose: Handle admin authentication, activity tracking, and auto-logout
 * 
 * Features:
 * - Check if admin is logged in on page load
 * - 60-minute inactivity timeout
 * - Activity detection (mouse, keyboard, scroll)
 * - Auto-logout with warning
 * - Session refresh on activity
 */

(function () {
    'use strict';

    console.log('🔐 Session Manager Initialized');

    // Configuration
    const SESSION_TIMEOUT = 60 * 60 * 1000; // 60 minutes in milliseconds
    const WARNING_TIME = 5 * 60 * 1000;     // Show warning 5 minutes before logout
    const CHECK_INTERVAL = 30 * 1000;        // Check session every 30 seconds

    let lastActivityTime = Date.now();
    let sessionCheckInterval;
    let warningShown = false;

    /**
     * Check if user is authenticated
     */
    function isAuthenticated() {
        return sessionStorage.getItem('adminAuth') === 'true';
    }

    /**
     * Get login time
     */
    function getLoginTime() {
        return parseInt(sessionStorage.getItem('loginTime')) || Date.now();
    }

    /**
     * Update last activity time
     */
    function updateActivity() {
        lastActivityTime = Date.now();
        sessionStorage.setItem('lastActivity', lastActivityTime.toString());

        // Hide warning if shown
        if (warningShown) {
            hideWarning();
        }

        console.log('👆 Activity detected - session refreshed');
    }

    /**
     * Check session validity
     */
    function checkSession() {
        if (!isAuthenticated()) {
            console.warn('⚠️ Not authenticated - redirecting to login');
            redirectToLogin();
            return;
        }

        const now = Date.now();
        const timeSinceActivity = now - lastActivityTime;
        const timeUntilLogout = SESSION_TIMEOUT - timeSinceActivity;

        console.log(`⏱️ Time since activity: ${Math.floor(timeSinceActivity / 1000)}s`);
        console.log(`⏱️ Time until logout: ${Math.floor(timeUntilLogout / 1000)}s`);

        // Show warning if approaching timeout
        if (timeUntilLogout <= WARNING_TIME && !warningShown) {
            showWarning(Math.floor(timeUntilLogout / 1000));
        }

        // Logout if timeout reached
        if (timeSinceActivity >= SESSION_TIMEOUT) {
            console.warn('⏰ Session timeout - logging out');
            logout('Session expired due to inactivity');
        }
    }

    /**
     * Show timeout warning
     */
    function showWarning(secondsRemaining) {
        warningShown = true;

        const warningDiv = document.createElement('div');
        warningDiv.id = 'session-warning';
        warningDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #fef3c7;
            border: 2px solid #f59e0b;
            color: #92400e;
            padding: 20px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 100000;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
        `;

        warningDiv.innerHTML = `
            <div style="display: flex; align-items: start; gap: 12px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 24px; color: #f59e0b;"></i>
                <div>
                    <h4 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">Session Timeout Warning</h4>
                    <p style="margin: 0 0 12px 0; font-size: 14px;">You will be logged out in <strong id="countdown">${Math.floor(secondsRemaining / 60)} minutes</strong> due to inactivity.</p>
                    <button onclick="window.SessionManager.dismissWarning()" style="
                        background: #f59e0b;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                    ">I'm Still Here</button>
                </div>
            </div>
        `;

        document.body.appendChild(warningDiv);

        // Update countdown every second
        const countdownInterval = setInterval(() => {
            const timeLeft = SESSION_TIMEOUT - (Date.now() - lastActivityTime);
            if (timeLeft <= 0 || !warningShown) {
                clearInterval(countdownInterval);
                return;
            }
            const minutesLeft = Math.floor(timeLeft / 60000);
            const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
            const countdownEl = document.getElementById('countdown');
            if (countdownEl) {
                countdownEl.textContent = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    /**
     * Hide warning
     */
    function hideWarning() {
        warningShown = false;
        const warning = document.getElementById('session-warning');
        if (warning) {
            warning.remove();
        }
    }

    /**
     * Dismiss warning and update activity
     */
    function dismissWarning() {
        updateActivity();
        hideWarning();
    }

    /**
     * Logout user
     */
    function logout(reason = 'Logout') {
        console.log('🚪 Logging out:', reason);

        // Clear session data
        sessionStorage.removeItem('adminAuth');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('loginTime');
        sessionStorage.removeItem('lastActivity');

        // Clear interval
        if (sessionCheckInterval) {
            clearInterval(sessionCheckInterval);
        }

        // Redirect to login with message
        sessionStorage.setItem('logoutReason', reason);
        redirectToLogin();
    }

    /**
     * Redirect to login page
     */
    function redirectToLogin() {
        window.location.href = 'admin-login.html';
    }

    /**
     * Initialize session manager
     */
    function init() {
        // Check authentication on page load
        if (!isAuthenticated()) {
            console.warn('❌ Not authenticated - redirecting to login');
            redirectToLogin();
            return;
        }

        console.log('✅ Authenticated - initializing session');

        // Get last activity from session or use current time
        const storedActivity = sessionStorage.getItem('lastActivity');
        if (storedActivity) {
            lastActivityTime = parseInt(storedActivity);
        } else {
            lastActivityTime = Date.now();
            sessionStorage.setItem('lastActivity', lastActivityTime.toString());
        }

        // Set up activity listeners
        const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        activityEvents.forEach(event => {
            document.addEventListener(event, updateActivity, { passive: true });
        });

        // Start session check interval
        sessionCheckInterval = setInterval(checkSession, CHECK_INTERVAL);

        // Initial session check
        checkSession();

        // Display admin info
        const username = sessionStorage.getItem('adminUsername');
        if (username) {
            const adminNameEl = document.querySelector('.admin-name');
            if (adminNameEl) {
                adminNameEl.textContent = username;
            }
        }

        console.log('🎯 Session manager ready');
        console.log(`⏱️ Session timeout: ${SESSION_TIMEOUT / 60000} minutes`);
    }

    // Expose methods to window for external access
    window.SessionManager = {
        init,
        updateActivity,
        checkSession,
        dismissWarning,
        logout,
        isAuthenticated
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);