import crypto from "crypto";
import razorpayInstance from "../config/razorpay.js";
import { StudentPayment } from "../models/StudentPayment.js";
import { PurchasedTest } from "../models/PurchasedTest.js";
import { PaymentTransaction } from "../models/PaymentTransaction.js";
import Student from "../models/Student.js";
import { TestSeries } from "../models/TestSeries.js"; // 🔒 NEW: Import TestSeries model
import { EmailLog } from "../models/EmailLog.js"; // 🔒 NEW: Import EmailLog model
import mongoose from "mongoose";
import { getEnrollmentEmailHtml } from "../utils/emailTemplates.js";
import { generateAuthToken } from '../middlewares/auth.js';

// 🚀 NEW: PHP Email Gateway Configuration
const gatewayUrl = process.env.EMAIL_GATEWAY_URL;
const gatewaySecret = process.env.EMAIL_GATEWAY_SECRET;

/**
 * 📧 Send email via secure PHP gateway on Hostinger
 */
async function sendGatewayEmail(payload, attempts = 0) {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const body = JSON.stringify({ ...payload, timestamp });

    // Compute HMAC signature for gateway validation
    const signature = crypto
      .createHmac('sha256', gatewaySecret)
      .update(body)
      .digest('hex');

    console.log(`📡 Sending email to gateway: ${payload.to} (${payload.paymentId})`);

    const response = await fetch(gatewayUrl, {
      method: 'POST',
      headers: {
        'X-Vigyan-Timestamp': timestamp.toString(),
        'X-Vigyan-Signature': signature,
        'Content-Type': 'application/json'
      },
      body
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.error || `Gateway returned ${response.status}`);
    }

    return { success: true, result };
  } catch (error) {
    if (attempts < 2) {
      const delay = Math.pow(2, attempts + 1) * 1000;
      console.warn(`⚠️ Gateway attempt ${attempts + 1} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return sendGatewayEmail(payload, attempts + 1);
    }
    console.error('❌ Gateway Email Final Failure:', error.message);
    return { success: false, error: error.message };
  }
}

// Helper function to safely extract first name from email
const extractFirstName = (email) => {
  try {
    if (!email || typeof email !== 'string') return 'User';

    const emailParts = email.split('@');
    if (emailParts.length < 2) return 'User';

    const username = emailParts[0];
    const nameParts = username.split('.');
    const firstName = nameParts[0] || 'User';

    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  } catch (error) {
    console.error('Error extracting first name:', error.message);
    return 'User';
  }
};

// 🆕 Database Health Check
const checkDatabaseConnection = async () => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    console.log(`🔍 Database Status: ${isConnected ? '✅ CONNECTED' : '❌ DISCONNECTED'}`);

    if (!isConnected) {
      console.error('❌ MongoDB is NOT connected! Cannot save student records.');
      console.error('   Connection state:', mongoose.connection.readyState);
      console.error('   0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting');
      return false;
    }
    return true;
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    return false;
  }
};

// 1. GET API KEY
// ✅ SECURITY FIX: Only expose PUBLIC key ID, never secret
export const getApiKey = (req, res) => {
  // Only return the public key ID
  // The secret key should NEVER be exposed to frontend
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;

  res.status(200).json({
    key: keyId  // Frontend expects 'key' property
  });
};

// 2. 🔒 SECURITY-ENHANCED CHECKOUT - PRICE FROM DATABASE ONLY
export const checkout = async (req, res) => {
  console.log('🔵 ========== CHECKOUT ENDPOINT CALLED ==========');
  console.log('📦 Request body:', JSON.stringify(req.body, null, 2));

  try {
    // CHECK 1: Is Razorpay configured?
    console.log('🔍 Check 1: Razorpay instance exists?', razorpayInstance ? '✅ YES' : '❌ NO');

    if (!razorpayInstance) {
      console.error('❌ CRITICAL: Razorpay instance is NULL!');
      return res.status(500).json({
        success: false,
        message: "Payment gateway not configured. Missing Razorpay credentials."
      });
    }

    // 🔒 SECURITY: Only accept testId and email from frontend
    // Amount will be fetched from DATABASE, not from frontend!
    const { testId, email } = req.body;

    console.log('🔍 Check 2: Request validation');
    console.log('   TestId:', testId, typeof testId);
    console.log('   Email:', email, typeof email);

    // Validate testId
    if (!testId || typeof testId !== 'string' || testId.trim().length === 0) {
      console.error('❌ Invalid testId:', testId);
      return res.status(400).json({
        success: false,
        message: "Valid testId is required"
      });
    }

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.error('❌ Invalid email:', email);
      return res.status(400).json({
        success: false,
        message: "Valid email is required"
      });
    }

    console.log('✅ Request validation passed');

    // 🔒 SECURITY CRITICAL: Fetch price from database
    console.log(`🔍 Fetching price for test '${testId}' from DATABASE...`);

    const testSeries = await TestSeries.findOne({
      testId: testId.toLowerCase().trim(),
      isActive: true
    });

    if (!testSeries) {
      console.error(`❌ Test series '${testId}' not found in database`);
      return res.status(404).json({
        success: false,
        message: `Test series '${testId}' not found or is not available`
      });
    }

    const priceInRupees = testSeries.price;
    const priceInPaise = priceInRupees * 100;

    console.log('✅ Price fetched from database:');
    console.log(`   Test: ${testSeries.name}`);
    console.log(`   Price: ₹${priceInRupees}`);
    console.log(`   Razorpay amount (paise): ${priceInPaise}`);
    console.log('🔒 SECURITY: Frontend cannot override this price');

    // CHECK 3: Create Razorpay order with DATABASE price
    console.log('🔍 Check 3: Creating Razorpay order...');
    const options = {
      amount: priceInPaise, // 🔒 Price from DATABASE only!
      currency: "INR",
      receipt: `receipt_${Date.now()}_${testId}`,
      notes: {
        email: email,
        testId: testId,
        testName: testSeries.name,
        priceInRupees: priceInRupees
      }
    };

    console.log('📤 Sending to Razorpay:', JSON.stringify(options, null, 2));

    const order = await razorpayInstance.orders.create(options);

    console.log('✅ Razorpay order created successfully!');
    console.log('   Order ID:', order.id);
    console.log('   Amount (paise):', order.amount);
    console.log('   Amount (rupees): ₹' + (order.amount / 100));
    console.log('   Currency:', order.currency);

    // CHECK 4: Prepare response
    const responseData = {
      success: true,
      orderId: order.id,
      amount: order.amount, // in paise
      amountInRupees: priceInRupees, // for display
      currency: order.currency,
      testName: testSeries.name,
      key: process.env.RAZORPAY_API_KEY
    };

    console.log('📤 Sending response:', JSON.stringify(responseData, null, 2));
    console.log('🔵 ========== CHECKOUT SUCCESS ==========');

    res.status(200).json(responseData);

  } catch (error) {
    console.error('🔴 ========== CHECKOUT ERROR ==========');
    console.error('❌ Error name:', error.name);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);

    // Check if it's a Razorpay API error
    if (error.error) {
      console.error('❌ Razorpay API error details:', JSON.stringify(error.error, null, 2));
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error',
      debug: {
        errorName: error.name,
        errorMessage: error.message,
        razorpayError: error.error || null
      }
    });
  }
};

// 3. 🔧 FIXED PAYMENT VERIFICATION WITH JWT TOKEN GENERATION
// (Rest of the file remains the same as before)
export const paymentVerification = async (req, res) => {
  console.log("🔹 ========== PAYMENT VERIFICATION STARTED ==========");
  console.log("📦 Request Body:", JSON.stringify(req.body, null, 2));
  console.log("⏰ Timestamp:", new Date().toISOString());

  // 🆕 STEP 1: Check database connection FIRST
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    console.error('❌ CRITICAL: Database not connected! Cannot process payment.');
    return res.status(500).json({
      success: false,
      message: "Database connection error. Please contact support.",
      debug: {
        databaseConnected: false,
        connectionState: mongoose.connection.readyState
      }
    });
  }

  // Start a session for transaction support
  let session = null;

  try {
    if (!razorpayInstance) {
      console.error('❌ Razorpay instance not configured for payment verification');
      return res.status(500).json({
        success: false,
        message: "Payment gateway not configured"
      });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, testId, amount, fullName } = req.body;

    console.log(`🔹 Email: ${email}`);
    console.log(`🔹 TestId: ${testId}`);
    console.log(`🔹 Amount: ${amount}`);
    console.log(`🔹 FullName: ${fullName}`);

    // Validate required fields
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.log("❌ Invalid or missing email!");
      return res.status(400).json({ success: false, message: "Valid email is required" });
    }

    // ✅ NEW: Validate fullName
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2 || fullName.trim().length > 50) {
      console.log("❌ Invalid or missing fullName!");
      return res.status(400).json({ success: false, message: "Valid full name is required (2-50 characters)" });
    }

    if (!testId || typeof testId !== 'string') {
      console.log("❌ TestId is missing or invalid!");
      return res.status(400).json({ success: false, message: "Valid TestId is required" });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.log("❌ Missing payment verification parameters!");
      return res.status(400).json({ success: false, message: "Missing payment verification data" });
    }

    // 🆕 STEP 2: Verify Razorpay signature
    console.log("🔐 Verifying payment signature...");
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Invalid payment signature!");
      return res.status(400).json({ success: false, message: "Invalid Payment Signature" });
    }

    console.log("✅ Payment signature verified!");

    // 🆕 STEP 3: Start MongoDB session for atomic operations
    session = await mongoose.startSession();
    session.startTransaction();
    console.log("🔄 Database transaction started");

    const normalizedEmail = email.toLowerCase().trim();

    let existingStudent = await StudentPayment.findOne({ email: normalizedEmail }).session(session);

    let rollNumber;
    let isNewStudent = false;
    let purchasedTests = [];
    let emailWarning = null;

    if (existingStudent) {
      // EXISTING STUDENT
      rollNumber = existingStudent.roll_number;
      console.log(`👤 Existing student found: ${normalizedEmail}, Roll: ${rollNumber}`);

      const existingPurchase = await PurchasedTest.findOne({
        email: normalizedEmail,
        test_id: testId
      }).session(session);

      if (existingPurchase) {
        console.log(`⚠️ Student already purchased ${testId}`);
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: "You have already purchased this test"
        });
      }

      // 🆕 Create purchased test record
      const newPurchase = await PurchasedTest.create([{
        email: normalizedEmail,
        test_id: testId,
        purchased_at: new Date()
      }], { session });
      console.log("✅ Purchase record created:", newPurchase[0]._id);

      // 🆕 Create transaction record
      const newTransaction = await PaymentTransaction.create([{
        email: normalizedEmail,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        test_id: testId,
        amount: amount || 199,
        status: 'paid',
        created_at: new Date()
      }], { session });
      console.log("✅ Transaction record created:", newTransaction[0]._id);

      const tests = await PurchasedTest.find({ email: normalizedEmail }).session(session);
      purchasedTests = tests.map(t => t.test_id);

      console.log(`✅ Updated existing student: ${normalizedEmail}, Tests: ${purchasedTests.join(', ')}`);

    } else {
      // 🆕 NEW STUDENT - Generate roll number with retry logic
      console.log("🆕 NEW STUDENT REGISTRATION STARTING...");

      let rollCreated = false;
      let attempts = 0;
      const maxAttempts = 5;

      while (!rollCreated && attempts < maxAttempts) {
        attempts++;
        rollNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
        console.log(`🎲 Generated Roll Number Attempt ${attempts}: ${rollNumber}`);

        try {
          // Check if roll number already exists
          const duplicateRoll = await StudentPayment.findOne({ roll_number: rollNumber }).session(session);

          if (duplicateRoll) {
            console.warn(`⚠️ Roll number ${rollNumber} already exists, retrying...`);
            continue;
          }

          // 🆕 CREATE STUDENT RECORD WITH EXPLICIT ERROR HANDLING
          console.log("💾 CREATING STUDENT RECORD IN DATABASE...");
          console.log("   Email:", normalizedEmail);
          console.log("   Roll:", rollNumber);
          console.log("   Session:", session ? "Active" : "None");

          const newStudent = await StudentPayment.create([{
            email: normalizedEmail,
            roll_number: rollNumber,
            created_at: new Date()
          }], { session });

          console.log("✅ STUDENT RECORD CREATED SUCCESSFULLY!");
          console.log("   ID:", newStudent[0]._id);
          console.log("   Email:", newStudent[0].email);
          console.log("   Roll:", newStudent[0].roll_number);

          rollCreated = true;
          isNewStudent = true;

        } catch (rollError) {
          console.error(`❌ Error creating student record (attempt ${attempts}):`, rollError.message);
          if (attempts >= maxAttempts) {
            throw new Error(`Failed to create student record after ${maxAttempts} attempts: ${rollError.message}`);
          }
        }
      }

      if (!rollCreated) {
        throw new Error("Failed to generate unique roll number");
      }

      // 🆕 Create purchased test record
      console.log("💾 Creating purchased test record...");
      const newPurchase = await PurchasedTest.create([{
        email: normalizedEmail,
        test_id: testId,
        purchased_at: new Date()
      }], { session });
      console.log("✅ Purchase record created:", newPurchase[0]._id);

      // 🆕 Create transaction record
      console.log("💾 Creating transaction record...");
      const newTransaction = await PaymentTransaction.create([{
        email: normalizedEmail,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        test_id: testId,
        amount: amount || 199,
        status: 'paid',
        created_at: new Date()
      }], { session });
      console.log("✅ Transaction record created:", newTransaction[0]._id);

      purchasedTests = [testId];

      console.log(`✅ NEW STUDENT CREATED SUCCESSFULLY: ${normalizedEmail}, Roll: ${rollNumber}`);

    }

    // 🆕 SYNC WITH DASHBOARD STUDENT MODEL
    // This happens for both new and existing students to keep the dashboard accurate
    console.log("🔄 Syncing with Dashboard Student Model...");
    try {
      await Student.findOneAndUpdate(
        { email: normalizedEmail },
        {
          email: normalizedEmail,
          rollNumber: rollNumber,
          fullName: fullName.trim(),
          course: testId.toUpperCase(), // 🎓 FIX: Set the course name correctly (ISI, NEST, etc.)
          lastLoginAt: new Date()
        },
        { upsert: true, new: true, session }
      );
      console.log(`✅ Dashboard Student record synced. Name: ${fullName.trim()}, Course: ${testId.toUpperCase()}`);
    } catch (syncError) {
      console.error("❌ Error syncing Dashboard Student record:", syncError.message);
    }

    // 🆕 STEP 4: Commit transaction to database
    console.log("💾 COMMITTING ALL CHANGES TO DATABASE...");
    await session.commitTransaction();
    console.log("✅ DATABASE TRANSACTION COMMITTED SUCCESSFULLY!");

    console.log("✅ VERIFIED: Student record exists in database (Immediate Verification)");

    // 📧 SEND EMAIL VIA SECURE PHP GATEWAY
    console.log("📧 Initiating secure email delivery via Hostinger Gateway...");

    if (gatewayUrl && gatewaySecret) {
      const testSeriesName = testId.toUpperCase();
      const emailHtml = getEnrollmentEmailHtml(fullName.trim(), rollNumber, testSeriesName);

      const payload = {
        to: normalizedEmail,
        subject: `✅ Registration Confirmed - ${testSeriesName} Test Series`,
        html: emailHtml,
        paymentId: razorpay_payment_id
      };

      try {
        // Idempotency: Check if email already sent for this payment
        const existingLog = await EmailLog.findOne({
          paymentId: razorpay_payment_id,
          type: 'PAYMENT_CONFIRMATION',
          status: 'sent'
        });

        if (existingLog) {
          console.log(`⏭️ Email already sent for payment ${razorpay_payment_id}. Skipping.`);
          emailWarning = null;
        } else {
          // Fire-and-forget delivery to avoid blocking the critical payment response
          // Internal retries and logging will still occur in the background
          sendGatewayEmail(payload)
            .then(async (deliveryResult) => {
              await EmailLog.findOneAndUpdate(
                { paymentId: razorpay_payment_id, type: 'PAYMENT_CONFIRMATION' },
                {
                  email: normalizedEmail,
                  type: 'PAYMENT_CONFIRMATION',
                  testId,
                  rollNumber,
                  paymentId: razorpay_payment_id,
                  status: deliveryResult.success ? 'sent' : 'failed',
                  error: deliveryResult.error || null,
                  $inc: { attempts: 1 },
                  sentAt: deliveryResult.success ? new Date() : undefined
                },
                { upsert: true }
              );
              console.log(`✅ Background email processed for ${razorpay_payment_id}: ${deliveryResult.success ? 'SENT' : 'FAILED'}`);
            })
            .catch(err => console.error(`❌ Background email crash for ${razorpay_payment_id}:`, err.message));

          emailWarning = null;
        }
      } catch (logOrGatewayErr) {
        console.error("❌ Email Delivery/Logging Error:", logOrGatewayErr.message);
        emailWarning = "Email delivery encountered a system error.";
      }
    } else {
      console.warn('⚠️ Email Gateway not configured correctly');
      emailWarning = "Email notifications are temporarily unavailable";
    }

    // 🔐 GENERATE JWT TOKEN FOR AUTHENTICATION
    console.log("🔐 Generating JWT authentication token...");

    const authToken = generateAuthToken(
      normalizedEmail,
      rollNumber,
      purchasedTests
    );

    // Set HTTP-only cookie (secure for cross-site auth)
    res.cookie('auth_token', authToken, {
      httpOnly: true,  // Cannot be accessed by JavaScript (XSS protection)
      secure: true,    // Required for SameSite=None
      sameSite: 'none', // Allow cross-origin compatibility (Hostinger -> Railway)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/' // Available across entire site
    });

    console.log("✅ JWT token generated and set in cookie");
    console.log("✅ Sending success response to frontend...");

    const responseData = {
      success: true,
      rollNumber: rollNumber,
      isNewStudent: isNewStudent,
      purchasedTests: purchasedTests,
      authToken: authToken, // Send token in response too (fallback)
      message: isNewStudent
        ? "Payment successful! Your Roll Number has been sent to your email."
        : "Payment successful! Test added to your account.",
      emailSent: !emailWarning,
      emailWarning: emailWarning
    };

    console.log("🔹 ========== PAYMENT VERIFICATION SUCCESS ==========");
    console.log("📊 Final Response:", JSON.stringify(responseData, null, 2));
    res.status(200).json(responseData);

  } catch (error) {
    console.error("🔴 ========== PAYMENT VERIFICATION ERROR ==========");
    console.error("❌ Error:", error.message);
    console.error("❌ Stack:", error.stack);

    // 🆕 Rollback transaction on error
    if (session) {
      try {
        await session.abortTransaction();
        console.log("🔄 Database transaction rolled back");
      } catch (abortError) {
        console.error("❌ Error aborting transaction:", abortError.message);
      }
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
      debug: {
        errorName: error.name,
        errorMessage: error.message,
        databaseConnected: mongoose.connection.readyState === 1
      }
    });
  } finally {
    // 🆕 Always end session
    if (session) {
      session.endSession();
      console.log("🔄 Database session ended");
    }
  }
};
