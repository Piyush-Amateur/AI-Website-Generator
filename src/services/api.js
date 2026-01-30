import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/generate";

// Configure axios defaults
axios.defaults.timeout = 60000; // 60 seconds timeout for AI generation

/**
 * Generates a website using the OpenAI API through the backend
 * @param {Object} data - Business information for website generation
 * @param {string} data.name - Business name
 * @param {string} data.industry - Business industry
 * @param {string} data.audience - Target audience
 * @param {string} data.color - Preferred color theme
 * @param {Array<string>} data.sections - Website sections to include
 * @returns {Promise<Object>} - Response containing generated code
 * @throws {Error} - If the API request fails
 */
export const generateWebsite = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    // Re-throw with more context
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data?.error || 'Server error occurred');
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};
