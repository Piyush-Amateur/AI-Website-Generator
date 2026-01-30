import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Calls OpenAI API to generate website code based on the provided prompt
 * @param {string} prompt - The formatted prompt for website generation
 * @returns {Promise<string>} - Generated code from OpenAI
 * @throws {Error} - If API call fails
 */
export const callOpenAI = async (prompt) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Using GPT-4o-mini for cost-effectiveness and speed
            messages: [
                {
                    role: "system",
                    content: "You are an expert React developer who creates clean, modern, and professional website code. You always follow instructions precisely and generate production-ready code."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 4000,
        });

        const generatedCode = completion.choices[0]?.message?.content;

        if (!generatedCode) {
            throw new Error("No code generated from OpenAI");
        }

        return generatedCode;
    } catch (error) {
        console.error("OpenAI API Error:", error);

        // Handle rate limit errors
        if (error.status === 429) {
            throw new Error("OpenAI API rate limit exceeded. Please wait a moment and try again.");
        }

        // Handle authentication errors
        if (error.status === 401) {
            throw new Error("Invalid OpenAI API key. Please check your configuration.");
        }

        // Handle quota/billing errors
        if (error.status === 403) {
            throw new Error("OpenAI API access denied. Please check your account status and billing.");
        }

        // Handle other errors
        throw new Error(`OpenAI API Error: ${error.message || "Unknown error occurred"}`);
    }
};