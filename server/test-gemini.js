import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModels() {
    const modelsToTry = [
        "models/gemini-2.5-flash",
        "models/gemini-2.5-pro",
        "models/gemini-2.0-flash",
        "models/gemini-flash-latest",
        "models/gemini-pro-latest"
    ];

    console.log("Testing Gemini API with correct model names...\n");

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing model: ${modelName}`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello in one word");
            const response = await result.response;
            const text = response.text();
            console.log(`✅ SUCCESS with ${modelName}!`);
            console.log(`   Response: ${text}\n`);
            break; // Stop after first success
        } catch (error) {
            console.log(`❌ FAILED with ${modelName}`);
            console.log(`   Error: ${error.message}\n`);
        }
    }
}

testModels();
