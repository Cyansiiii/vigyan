import { GoogleGenerativeAI } from "@google/generative-ai";
import Doubt from '../schemas/DoubtSchema.js';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const askDoubt = async (req, res) => {
    try {
        const { questionText, handwritingStyle, email } = req.body;

        if (!questionText || !email) {
            return res.status(400).json({ success: false, error: 'Question and email are required' });
        }

        // 1. Generate Answer via Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are an expert tutor at Vigyan.prep, a premier research institute preparation platform for IISER (IAT), NISER (NEST), and ISI/CMI.
            Your tone is friendly, encouraging, and academic.
            
            Instruction:
            - Provide a detailed step-by-step solution.
            - Use LaTeX for mathematical formulas (e.g., $x^2$).
            - If the question is advanced or involves complex diagrams (like Organic Chemistry mechanisms or 3D Calculus), START your response with the tag [COMPLEX].
            
            Student Question: "${questionText}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let answer = response.text();

        // 2. Check for complexity
        const isComplex = answer.startsWith('[COMPLEX]');
        if (isComplex) {
            answer = answer.replace('[COMPLEX]', '').trim();
        }

        // 3. Save to Database
        const newDoubt = new Doubt({
            studentEmail: email,
            questionText,
            answer,
            handwritingStyle: handwritingStyle || 'neat',
            isComplex
        });

        await newDoubt.save();

        res.status(200).json({
            success: true,
            answer,
            isComplex,
            id: newDoubt._id
        });

    } catch (error) {
        console.error('❌ Error in askDoubt:', error);
        res.status(500).json({ success: false, error: 'Failed to get answer from AI' });
    }
};

export const getDoubtHistory = async (req, res) => {
    try {
        const { email } = req.params;
        const history = await Doubt.find({ studentEmail: email }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, history });
    } catch (error) {
        console.error('❌ Error in getDoubtHistory:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch history' });
    }
};

export const deleteDoubt = async (req, res) => {
    try {
        const { id } = req.params;
        await Doubt.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Doubt deleted' });
    } catch (error) {
        console.error('❌ Error in deleteDoubt:', error);
        res.status(500).json({ success: false, error: 'Failed to delete doubt' });
    }
};
