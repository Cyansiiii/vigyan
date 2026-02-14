import mongoose from 'mongoose';
import dotenv from 'dotenv';
import QuestionModel from './backend/schemas/QuestionSchema.js';

dotenv.config({ path: './backend/.env' });

const MONGODB_URI = process.env.MONGODB_URI;

const migrate = async () => {
    try {
        if (!MONGODB_URI) throw new Error('MONGODB_URI missing in .env');

        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected.');

        // 1. Initial status/type stamp for all questions
        console.log('🔄 Stamp: status=approved, questionType=MCQ for all legacy questions...');
        await QuestionModel.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'approved', questionType: 'MCQ', approvedAt: new Date() } }
        );

        // 2. Map correctOptionIndex for all approved MCQ questions missing it
        console.log('🔄 Mapping correctOptionIndex (A->0, B->1...) for MCQs...');
        const mcqs = await QuestionModel.find({
            questionType: 'MCQ',
            correctOptionIndex: { $exists: false },
            correctAnswer: { $exists: true }
        });

        console.log(`📊 Found ${mcqs.length} questions to map.`);
        const mapping = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

        const bulkOps = [];
        for (const q of mcqs) {
            const index = mapping[q.correctAnswer.toUpperCase()];
            if (index !== undefined) {
                bulkOps.push({
                    updateOne: {
                        filter: { _id: q._id },
                        update: { $set: { correctOptionIndex: index } }
                    }
                });
            }
        }

        if (bulkOps.length > 0) {
            const bulkResult = await QuestionModel.bulkWrite(bulkOps);
            console.log(`✅ Mapping complete. ${bulkResult.modifiedCount} indices updated.`);
        } else {
            console.log('✅ No questions needed mapping.');
        }
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
};

migrate();
