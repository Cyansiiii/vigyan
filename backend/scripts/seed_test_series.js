import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env');
    process.exit(1);
}

// Define TestSeries Schema (Copy from backend/models/TestSeries.js)
const testSeriesSchema = new mongoose.Schema({
    testId: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: {
        type: Number,
        required: true,
        min: [1, 'Price must be at least ₹1'],
        max: [99999, 'Price cannot exceed ₹99,999'],
        validate: { validator: Number.isInteger, message: 'Price must be a whole number' }
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const TestSeries = mongoose.model('TestSeries', testSeriesSchema);

async function seedData() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        const testId = 'test-iat-2024';

        console.log(`🔍 Checking if test '${testId}' exists...`);
        const existing = await TestSeries.findOne({ testId });

        if (existing) {
            console.log(`⚠️ Test '${testId}' already exists. Updating...`);
            existing.price = 199;
            existing.isActive = true;
            existing.name = 'IAT Mock Test Series 2024';
            await existing.save();
            console.log('✅ Test updated.');
        } else {
            console.log(`🌱 Creating new test '${testId}'...`);
            await TestSeries.create({
                testId: testId,
                name: 'IAT Mock Test Series 2024',
                description: 'Comprehensive mock test series for IAT 2024 preparation.',
                price: 199,
                isActive: true
            });
            console.log('✅ Test created successfully.');
        }

        // Verify it exists
        const verify = await TestSeries.findOne({ testId });
        console.log('📋 Verified Test Data:', verify);

    } catch (error) {
        console.error('❌ Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('👋 Disconnected.');
        process.exit(0);
    }
}

seedData();
