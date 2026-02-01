import '../backend/config/env.js';
import { connectDB } from '../backend/config/mongodb.js';
import { StudentPayment } from '../backend/models/StudentPayment.js';
import { PurchasedTest } from '../backend/models/PurchasedTest.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const createStudentToken = async () => {
    // Connect to DB
    const isConnected = await connectDB();
    if (!isConnected) {
        console.error('❌ Failed to connect to MongoDB');
        process.exit(1);
    }

    const testStudent = {
        email: 'student@test.com',
        roll_number: 'TEST-STD-2024',
        created_at: new Date(),
        updated_at: new Date()
    };

    const purchasedTest = {
        email: 'student@test.com',
        test_id: 'test-iat-2024',
        purchase_date: new Date(),
        amount: 1,
        transaction_id: 'TEST_TXN_12345',
        status: 'completed'
    };

    try {
        // Upsert student record
        const student = await StudentPayment.findOneAndUpdate(
            { email: testStudent.email },
            testStudent,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log('✅ Student Record Ready:', student.email);

        // Upsert purchased test record
        await PurchasedTest.findOneAndUpdate(
            { email: purchasedTest.email, test_id: purchasedTest.test_id },
            purchasedTest,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log('✅ Purchased Test Record Ready:', purchasedTest.test_id);

        // Generate JWT
        // Payload matches what verifyAuth middleware expects
        const payload = {
            email: student.email,
            id: student._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        console.log('\n' + '='.repeat(50));
        console.log('🔑 GENERATED STUDENT TOKEN');
        console.log('='.repeat(50));
        console.log(token);
        console.log('='.repeat(50) + '\n');

    } catch (error) {
        console.error('❌ Error creating student token:', error);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

createStudentToken();
