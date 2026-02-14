/**
 * One-time Migration Script
 * Targets: MongoDB Questions Collection
 * Purpose: Mark all existing questions as 'approved' to prevent downtime with the new filter.
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuestionModel from './backend/schemas/QuestionSchema.js';

const MONGODB_URI = "mongodb+srv://harsh:Buddy700@cluster0.jtele7g.mongodb.net/vigyanprep?retryWrites=true&w=majority&appName=Cluster0";

const migrate = async () => {
    try {
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        console.log('🔄 Updating questions with status: approved...');
        const result = await QuestionModel.updateMany(
            { status: { $exists: false } },
            {
                $set: {
                    status: 'approved',
                    questionType: 'MCQ', // Existing questions are all MCQ
                    approvedAt: new Date()
                }
            }
        );

        console.log(`✅ Migration complete. ${result.modifiedCount} questions updated.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrate();
