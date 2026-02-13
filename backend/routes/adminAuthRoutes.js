/**
 * Admin Authentication Routes
 * Created: 2026-01-26
 * Purpose: Handle admin login and session management
 * Routes: /api/admin/auth/*
 */

import express from 'express';
import bcrypt from 'bcryptjs';
import { generateAdminToken } from '../middlewares/adminAuth.js';

const router = express.Router();

// Admin credentials from environment
const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'admin',
    // Password: 'admin' (hash generated 2026-01-31 - VERIFIED WORKING)
    passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$10$tR0NcafoV27x3Vj8WVQNFuWRFiX03UEKhZ7RHjuqm4VbHHnxMh.Ye'
};

console.log('🔐 Admin Auth routes loaded');
// ✅ SECURITY FIX: Removed password logging

/**
 * POST /api/admin/auth/login
 * Admin login endpoint
 */
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('🔐 Admin login attempt:', { username, timestamp: new Date().toISOString() });

        // Validation
        if (!username || !password) {
            console.warn('❌ Login failed: Missing credentials');
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }

        // Check username
        if (username !== ADMIN_CREDENTIALS.username) {
            console.warn('❌ Login failed: Invalid username:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, ADMIN_CREDENTIALS.passwordHash);

        if (!isPasswordValid) {
            console.warn('❌ Login failed: Invalid password for user:', username);
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
            });
        }

        // Successful login
        console.log('✅ Admin login successful:', username);

        // ✅ SECURITY FIX: Generate JWT token
        const adminToken = generateAdminToken(username);

        // Set HTTP-only cookie (cross-origin enabled)
        // ⚠️ TEMPORARY: sameSite: 'none' for cross-domain auth
        // TODO: Move to api.vigyanprep.com subdomain and change to 'lax'
        // 🔐 SECURITY TRADE-OFF: SameSite=None required for cross-domain auth (Hostinger -> Railway)
        // Must move to a unified domain (e.g. api.vigyanprep.com) to enable SameSite=Lax.
        res.cookie('admin_token', adminToken, {
            httpOnly: true,
            secure: true, // Specific requirement for SameSite=None
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: adminToken, // Send token for Authorization header option
            data: {
                username: username,
                role: 'admin',
                loginTime: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('❌ Admin login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
});

/**
 * POST /api/admin/auth/validate-session
 * Validate if admin session is still active
 */
router.post('/validate-session', (req, res) => {
    try {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username required'
            });
        }

        console.log('🔍 Session validation for:', username);

        // In a real app, check session in database/Redis
        // For now, just validate username exists
        if (username === ADMIN_CREDENTIALS.username) {
            return res.status(200).json({
                success: true,
                message: 'Session valid',
                data: {
                    username: username,
                    sessionActive: true
                }
            });
        }

        return res.status(401).json({
            success: false,
            message: 'Invalid session'
        });

    } catch (error) {
        console.error('❌ Session validation error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

/**
 * POST /api/admin/auth/logout
 * Handle admin logout
 */
router.post('/logout', (req, res) => {
    try {
        const { username } = req.body;

        console.log('🚪 Admin logout:', username || 'unknown');

        // In a real app, clear session from database/Redis

        return res.status(200).json({
            success: true,
            message: 'Logout successful'
        });

    } catch (error) {
        console.error('❌ Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ✅ SECURITY FIX: /generate-hash endpoint removed
// This was a critical security vulnerability - public password hash generator
// To generate a new password hash, use bcrypt locally:
// node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(h => console.log(h));"

// ✅ SECURITY FIX: /test endpoint removed
// This was a CRITICAL security vulnerability - exposed admin credentials publicly

export default router;