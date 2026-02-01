/**
 * Admin API Service - Complete Backend Integration with JWT
 * Backend: Railway (https://vigyan-production.up.railway.app)
 * Updated: 2026-01-31 - JWT Authorization Headers
 */
console.log('🚀 AdminAPI Service with JWT Loading...');

const AdminAPI = {
    // 🚀 PRODUCTION Railway Backend URL
    get baseURL() {
        // Use global configuration or fallback to local
        if (window.APP_CONFIG && window.APP_CONFIG.API_BASE_URL) {
            return window.APP_CONFIG.API_BASE_URL;
        }
        if (window.API_BASE_URL) {
            return window.API_BASE_URL;
        }

        // Fallback (should not happen if config.js is loaded)
        return 'https://vigyan-production.up.railway.app';
    },

    // ✅ NEW: Get JWT token from sessionStorage
    getAuthToken() {
        try {
            const authData = sessionStorage.getItem('adminAuth');
            if (!authData) {
                console.warn('⚠️ No auth data in sessionStorage');
                return null;
            }

            const auth = JSON.parse(authData);
            if (!auth.token) {
                console.warn('⚠️ No token in auth data');
                return null;
            }

            return auth.token;
        } catch (error) {
            console.error('❌ Error getting auth token:', error);
            return null;
        }
    },

    // ✅ UPDATED: Helper method for API calls with JWT
    async request(endpoint, options = {}) {
        let token = this.getAuthToken();
        if (token) token = token.trim();

        const defaultHeaders = {
            // Only set Content-Type if we have a body (JSON)
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            // ✅ ADD JWT Authorization header
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        const defaultOptions = {
            headers: defaultHeaders
        };

        try {
            const fullURL = `${this.baseURL}${endpoint}`;
            console.log(`🔗 API Request: ${fullURL}`);
            if (token) {
                console.log(`🔑 Adding Authorization header (Length: ${token.length})`);
            } else {
                console.warn('⚠️ No token available for request');
            }

            const response = await fetch(fullURL, {
                ...defaultOptions,
                ...options,
                headers: { ...defaultOptions.headers, ...options.headers }
            });

            console.log(`📊 Response Status: ${response.status} ${response.statusText}`);

            if (!response.ok) {
                // ✅ GLOBAL 401 HANDLER: Redirect to login if unauthorized
                if (response.status === 401) {
                    console.warn('⚠️ Session expired or invalid token. Redirecting to login...');
                    sessionStorage.removeItem('adminAuth');
                    window.location.href = 'admin-login.html';
                    throw new Error('Unauthorized - Redirecting to login');
                }

                const errorText = await response.text();
                console.error('❌ Response Error:', errorText);
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('✅ API Response:', data);
            return data;
        } catch (error) {
            console.error('❌ API Error:', error.message);
            console.error('   Endpoint:', endpoint);
            console.error('   Base URL:', this.baseURL);
            console.error('   Full Error:', error);
            throw error;
        }
    },

    // ==================== DASHBOARD ====================
    async getDashboardStats() {
        return await this.request('/api/admin/dashboard/stats');
    },

    async getPerformanceData(period = '7d') {
        return await this.request(`/api/admin/dashboard/performance?period=${period}`);
    },

    async getUpcomingTests() {
        return await this.request('/api/admin/dashboard/upcoming-tests');
    },

    async getRecentActivity() {
        return await this.request('/api/admin/dashboard/recent-activity');
    },

    // ==================== ADMIN PROFILE ====================
    async getAdminProfile() {
        return await this.request('/api/admin/profile');
    },

    async updateAdminProfile(profileData) {
        return await this.request('/api/admin/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    },

    async changePassword(passwordData) {
        return await this.request('/api/admin/profile/password', {
            method: 'POST',
            body: JSON.stringify(passwordData)
        });
    },

    // ==================== NOTIFICATIONS ====================
    async getNotifications() {
        return await this.request('/api/admin/dashboard/notifications');
    },

    async getNotificationsCount() {
        return await this.request('/api/admin/dashboard/notifications/count');
    },

    async markNotificationRead(notificationId) {
        return await this.request(`/api/admin/dashboard/notifications/${notificationId}/read`, {
            method: 'POST'
        });
    },

    async markAllNotificationsRead() {
        return await this.request('/api/admin/dashboard/notifications/mark-all-read', {
            method: 'POST'
        });
    },

    // ==================== TESTS ====================
    async createTest(testData) {
        return await this.request('/api/admin/tests', {
            method: 'POST',
            body: JSON.stringify(testData)
        });
    },

    async getTests(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/api/admin/tests?${params}`);
    },

    async getTest(testId) {
        return await this.request(`/api/admin/tests/${testId}`);
    },

    async updateTest(testId, testData) {
        return await this.request(`/api/admin/tests/${testId}`, {
            method: 'PUT',
            body: JSON.stringify(testData)
        });
    },

    async deleteTest(testId) {
        return await this.request(`/api/admin/tests/${testId}`, {
            method: 'DELETE'
        });
    },

    // ==================== SCHEDULED TESTS ====================
    async getScheduledTests() {
        return await this.request('/api/admin/scheduled-tests');
    },

    async scheduleTest(scheduleData) {
        return await this.request('/api/admin/scheduled-tests', {
            method: 'POST',
            body: JSON.stringify(scheduleData)
        });
    },

    async updateScheduledTest(scheduleId, scheduleData) {
        return await this.request(`/api/admin/scheduled-tests/${scheduleId}`, {
            method: 'PUT',
            body: JSON.stringify(scheduleData)
        });
    },

    async deleteScheduledTest(scheduleId) {
        return await this.request(`/api/admin/scheduled-tests/${scheduleId}`, {
            method: 'DELETE'
        });
    },

    // ==================== PAST TESTS ====================
    async getPastTests() {
        return await this.request('/api/admin/past-tests');
    },

    async archivePastTest(testId) {
        return await this.request(`/api/admin/past-tests/${testId}/archive`, {
            method: 'POST'
        });
    },

    // ==================== QUESTIONS ====================
    async addQuestion(questionData) {
        return await this.request('/api/admin/questions', {
            method: 'POST',
            body: JSON.stringify(questionData)
        });
    },

    async getQuestions(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/api/admin/questions?${params}`);
    },

    async getQuestion(questionId) {
        return await this.request(`/api/admin/questions/${questionId}`);
    },

    async updateQuestion(questionId, questionData) {
        return await this.request(`/api/admin/questions/${questionId}`, {
            method: 'PUT',
            body: JSON.stringify(questionData)
        });
    },

    async deleteQuestion(questionId) {
        return await this.request(`/api/admin/questions/${questionId}`, {
            method: 'DELETE'
        });
    },

    // ==================== STUDENTS ====================
    async addStudent(studentData) {
        return await this.request('/api/admin/students', {
            method: 'POST',
            body: JSON.stringify(studentData)
        });
    },

    async getStudents(search = '') {
        return await this.request(`/api/admin/students?search=${encodeURIComponent(search)}`);
    },

    async getStudent(studentId) {
        return await this.request(`/api/admin/students/${studentId}`);
    },

    async updateStudent(studentId, studentData) {
        return await this.request(`/api/admin/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify(studentData)
        });
    },

    async deleteStudent(studentId) {
        return await this.request(`/api/admin/students/${studentId}`, {
            method: 'DELETE'
        });
    },

    // ==================== TRANSACTIONS ====================
    async getTransactions(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/api/admin/transactions?${params}`);
    },

    async getTransaction(transactionId) {
        return await this.request(`/api/admin/transactions/${transactionId}`);
    },

    // ==================== RESULTS ====================
    async getResults(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/api/admin/results?${params}`);
    },

    async getResult(resultId) {
        return await this.request(`/api/admin/results/${resultId}`);
    },

    async getStudentResults(studentId) {
        return await this.request(`/api/admin/students/${studentId}/results`);
    },

    // ==================== FILE UPLOADS ====================
    async uploadPDF(file, metadata) {
        const token = this.getAuthToken();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));

        return await this.request('/api/admin/upload/pdf', {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type, let browser set it for FormData
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    },

    async uploadImage(file, metadata) {
        const token = this.getAuthToken();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('metadata', JSON.stringify(metadata));

        return await this.request('/api/admin/upload/image', {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type, let browser set it for FormData
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    },

    // ==================== SPECIFIC PDF MODULE ENDPOINTS ====================
    async uploadPdf(formData) {
        const token = this.getAuthToken();
        return await this.request('/api/pdf/upload', {
            method: 'POST',
            body: formData,
            headers: {
                // Don't set Content-Type, let browser set it for FormData
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        });
    },

    async getPdfHistory() {
        return await this.request('/api/pdf/history');
    },

    async deletePdf(uploadId) {
        return await this.request(`/api/pdf/delete/${uploadId}`, {
            method: 'DELETE'
        });
    },

    // ==================== QUESTION IMAGE LINKING ====================
    async uploadQuestionImage(questionId, linkData) {
        return await this.request(`/api/admin/questions/${questionId}/image`, {
            method: 'POST',
            body: JSON.stringify(linkData)
        });
    },

    // ==================== HEALTH CHECK ====================
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`);
            return response.ok;
        } catch (error) {
            console.error('❌ Backend health check failed:', error);
            return false;
        }
    }
};

// Make it globally available
window.AdminAPI = AdminAPI;

// Log the backend URL being used
console.log('✅ Admin API Service initialized with JWT authentication');
console.log('🔗 Backend URL:', AdminAPI.baseURL);
console.log('🌍 Environment:', window.location.hostname === 'localhost' ? 'Local' : 'Production');

// Check backend health on load
AdminAPI.checkHealth().then(healthy => {
    if (healthy) {
        console.log('✅ Backend is healthy and reachable');
    } else {
        console.warn('⚠️ Backend health check failed - server may be starting up');
    }
});