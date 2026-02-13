import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://harshanand:harsha700@cluster0.zdy0b.mongodb.app/vigyan";

const QuestionSchema = new mongoose.Schema({
    testId: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    section: String
}, { collection: 'questions' });

const Question = mongoose.model('Question', QuestionSchema);

async function checkData() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const questions = await Question.find({ testId: 'nest' }).limit(5);
        console.log(`Found ${questions.length} questions for testId "nest"`);

        questions.forEach((q, i) => {
            console.log(`--- Question ${i + 1} ---`);
            console.log(`ID: ${q._id}`);
            console.log(`Text: ${q.questionText.substring(0, 50)}...`);
            console.log(`Options Type: ${typeof q.options}`);
            console.log(`Options IsArray: ${Array.isArray(q.options)}`);
            console.log(`Options Length: ${q.options ? q.options.length : 'N/A'}`);
            console.log(`Raw Options:`, JSON.stringify(q.options));
        });

        const iatQuestions = await Question.find({ testId: 'iat' }).limit(1);
        if (iatQuestions.length > 0) {
            console.log('\n--- Sample IAT Question ---');
            console.log(`Raw Options:`, JSON.stringify(iatQuestions[0].options));
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkData();
