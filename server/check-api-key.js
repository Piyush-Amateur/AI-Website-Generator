import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

async function listAvailableModels() {
    console.log("Checking Google AI Studio API Key...\n");
    console.log("API Key:", apiKey?.substring(0, 20) + "...\n");

    try {
        // Try to list available models using REST API
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

        console.log("Fetching available models from Google AI...\n");

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API Key Error:");
            console.error("Status:", response.status);
            console.error("Error:", JSON.stringify(data, null, 2));

            if (response.status === 400) {
                console.log("\n⚠️  Your API key appears to be invalid or expired.");
                console.log("Please generate a new API key at: https://aistudio.google.com/app/apikey");
            }
            return;
        }

        console.log("✅ API Key is valid!\n");
        console.log("Available models:\n");

        if (data.models && data.models.length > 0) {
            data.models.forEach(model => {
                const supportsGenerate = model.supportedGenerationMethods?.includes('generateContent');
                const status = supportsGenerate ? '✅' : '❌';
                console.log(`${status} ${model.name}`);
                if (supportsGenerate) {
                    console.log(`   Display Name: ${model.displayName}`);
                    console.log(`   Description: ${model.description?.substring(0, 80)}...`);
                }
            });
        } else {
            console.log("No models found for this API key.");
        }

    } catch (error) {
        console.error("❌ Error checking API key:", error.message);
    }
}

listAvailableModels();
