// backend/routes/examRoutes.js
// 🔒 SECURED EXAM ROUTES WITH AUTHENTICATION

import express from 'express';
import {
  startTest,
  submitExam,
  getQuestions,
  getStudentResults,
  getUserInfo,
  listScheduledTests,
  getPublicTestSeries
} from '../controllers/examController.js';

import { sendScoreReport } from '../controllers/examReportController.js';

import {
  verifyAuth,
  verifyTestAccess,
  requirePurchase
} from '../middlewares/auth.js';

// ✅ REMOVED: validateEmail and validateRollNumber don't exist in validation.js

const router = express.Router();

// ✅ PUBLIC: List all scheduled tests (for calendar display)
router.get('/list', listScheduledTests);

// ✅ PUBLIC: Get test series with pricing
router.get('/test-series', getPublicTestSeries);

// ✅ PUBLIC: Send score report email (NISER PYQ)
router.post('/send-report', sendScoreReport);

// ✅ PROTECTED: Get user info (requires authentication)
// Used by frontend to fetch user's purchased tests
router.post('/user-info', verifyAuth, getUserInfo);

// ✅ PROTECTED: Start exam / Login (verifies credentials, returns JWT)
// This is the "login" endpoint
router.post('/start', startTest);

// 🔒 PROTECTED: Get questions (requires auth + test purchase)
// CRITICAL: This was completely open before!
router.get('/questions', verifyAuth, verifyTestAccess, getQuestions);

// 🔒 PROTECTED: Submit exam (requires auth + test purchase)
router.post('/submit', verifyAuth, verifyTestAccess, submitExam);

// ✅ PROTECTED: Get student results (requires authentication)
router.get('/results', verifyAuth, getStudentResults);

// 🆕 NEW: Verify test access endpoint
// Frontend can call this before navigating to test page
router.get('/verify-access/:testId', verifyAuth, verifyTestAccess, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted',
    testId: req.testId,
    email: req.user.email,
    rollNumber: req.user.rollNumber
  });
});

// 🆕 NEW: Get user's purchased tests
// More reliable than /user-info
router.get('/my-tests', verifyAuth, (req, res) => {
  res.json({
    success: true,
    email: req.user.email,
    rollNumber: req.user.rollNumber,
    purchasedTests: req.user.purchasedTests
  });
});

export default router;
