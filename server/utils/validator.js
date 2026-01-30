/**
 * Validates input data for website generation
 * @param {Object} data - Business information to validate
 * @param {string} data.name - Business name
 * @param {string} data.industry - Business industry
 * @param {string} data.audience - Target audience
 * @param {Array<string>} data.sections - Website sections
 * @throws {Error} - If validation fails
 */
export const validateInput = (data) => {
    // Check required fields
    if (!data || typeof data !== 'object') {
        throw new Error("Invalid input: data must be an object");
    }

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        throw new Error("Invalid input: Business name is required");
    }

    if (!data.industry || typeof data.industry !== 'string' || data.industry.trim().length === 0) {
        throw new Error("Invalid input: Industry is required");
    }

    if (!data.audience || typeof data.audience !== 'string' || data.audience.trim().length === 0) {
        throw new Error("Invalid input: Target audience is required");
    }

    if (!Array.isArray(data.sections)) {
        throw new Error("Invalid input: Sections must be an array");
    }

    // Validate string lengths to prevent abuse
    if (data.name.length > 100) {
        throw new Error("Invalid input: Business name is too long (max 100 characters)");
    }

    if (data.industry.length > 100) {
        throw new Error("Invalid input: Industry is too long (max 100 characters)");
    }

    if (data.audience.length > 200) {
        throw new Error("Invalid input: Target audience is too long (max 200 characters)");
    }

    if (data.color && data.color.length > 50) {
        throw new Error("Invalid input: Color theme is too long (max 50 characters)");
    }

    if (data.sections.length > 10) {
        throw new Error("Invalid input: Too many sections (max 10)");
    }
};
