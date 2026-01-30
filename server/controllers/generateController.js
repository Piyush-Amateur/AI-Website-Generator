import { buildPrompt } from "../utils/promptBuilder.js";
import { sanitizeCode } from "../utils/sanitizer.js";
import { validateInput } from "../utils/validator.js";
import { callOpenAI } from "../services/openaiService.js";

/**
 * Controller for website generation endpoint
 * Validates input, builds prompt, calls OpenAI, and returns sanitized code
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const generateWebsite = async (req, res) => {
    try {
        const data = req.body;

        // Validate input data
        validateInput(data);

        // Build the prompt for OpenAI
        const prompt = buildPrompt(data);

        // Call OpenAI API
        const aiResponse = await callOpenAI(prompt);

        // Sanitize the generated code
        const cleanCode = sanitizeCode(aiResponse);

        // Return successful response
        res.status(200).json({
            code: cleanCode,
            message: "Website generated successfully"
        });
    } catch (error) {
        console.error("Generation Error:", error.message);

        // Return appropriate error response
        const statusCode = error.message.includes("Invalid") ? 400 : 500;
        res.status(statusCode).json({
            error: error.message || "Failed to generate website"
        });
    }
};
