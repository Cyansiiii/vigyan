// Use project's own env loader and db connection logic
import '../backend/config/env.js';
import { connectDB } from '../backend/config/mongodb.js';
import { TestSeries } from '../backend/models/TestSeries.js';
import mongoose from 'mongoose';

const seedTestSeries = async () => {
    // connectDB already handles logging and connection logic
    const isConnected = await connectDB();
    if (!isConnected) {
        console.error('❌ Failed to connect to MongoDB. Exiting.');
        process.exit(1);
    }

    const testProduct = {
        testId: 'test-iat-2024',
        name: 'IAT 2024 Mock Test Series',
        price: 1, // Using 1 for testing as requested
        description: 'Comprehensive mock test series for IAT 2024.',
        isActive: true
    };

    try {
        // Upsert: Update if exists, Insert if not
        const result = await TestSeries.findOneAndUpdate(
            { testId: testProduct.testId },
            testProduct,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        console.log('✅ Test Series Seeded Successfully:', result);
    } catch (error) {
        console.error('❌ Error Seeding Test Series:', error);
    } finally {
        await mongoose.connection.close();
        console.log('DB Connection Closed');
        process.exit(0);
    }
};

seedTestSeries();
