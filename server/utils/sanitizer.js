/**
 * Sanitizes AI-generated code by removing potentially harmful or unnecessary patterns
 * @param {string} code - Raw code from AI
 * @returns {string} - Sanitized code safe for execution in iframe
 */
export const sanitizeCode = (code) => {
    if (!code || typeof code !== 'string') {
        throw new Error("Invalid code: must be a non-empty string");
    }

    let cleaned = code;

    // Remove markdown code blocks (```javascript, ```jsx, ```js, etc.)
    cleaned = cleaned.replace(/```[\w]*\n?/g, "");
    cleaned = cleaned.replace(/```\n?$/g, "");

    // Remove any import statements (we use CDN imports in the iframe)
    cleaned = cleaned.replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, "");

    // Remove require statements
    cleaned = cleaned.replace(/const\s+\w+\s*=\s*require\s*\(.*?\);?\s*/g, "");
    cleaned = cleaned.replace(/require\s*\(.*?\)/g, "");

    // Remove export statements (we handle rendering in the iframe)
    cleaned = cleaned.replace(/export\s+default\s+/g, "");
    cleaned = cleaned.replace(/export\s+\{.*?\};?\s*/g, "");

    // Remove potentially dangerous code patterns
    cleaned = cleaned.replace(/eval\s*\(/g, "");
    cleaned = cleaned.replace(/Function\s*\(/g, "");

    // Remove storage access (security measure)
    cleaned = cleaned.replace(/localStorage\./g, "");
    cleaned = cleaned.replace(/sessionStorage\./g, "");

    // Remove fetch/XMLHttpRequest (prevent external requests from generated code)
    cleaned = cleaned.replace(/fetch\s*\(/g, "");
    cleaned = cleaned.replace(/XMLHttpRequest/g, "");

    // Trim whitespace
    cleaned = cleaned.trim();

    // Validate that we still have code after sanitization
    if (cleaned.length < 50) {
        throw new Error("Sanitized code is too short - generation may have failed");
    }

    return cleaned;
};
