/**
 * Builds a comprehensive prompt for OpenAI to generate React website code
 * @param {Object} data - Business information for website generation
 * @param {string} data.name - Business name
 * @param {string} data.industry - Business industry
 * @param {string} data.audience - Target audience
 * @param {string} data.color - Preferred color theme
 * @param {Array<string>} data.sections - Website sections to include
 * @returns {string} - Formatted prompt for OpenAI
 */
export const buildPrompt = (data) => {
  const sectionsText = data.sections.length > 0
    ? data.sections.join(", ")
    : "About, Services, Contact";

  const colorTheme = data.color || "modern blue gradient";

  return `
Generate a COMPLETE, PRODUCTION-READY React website for the following business:

BUSINESS INFORMATION:
- Business Name: ${data.name}
- Industry: ${data.industry}
- Target Audience: ${data.audience}
- Color Theme: ${colorTheme}
- Required Sections: ${sectionsText}

CRITICAL REQUIREMENTS:
1. Use ONLY React.createElement() syntax - ABSOLUTELY NO JSX
2. Use shorthand: const h = React.createElement;
3. Function name must be: App
4. Use inline styles with modern, professional design
5. NO import/export/require statements
6. NO markdown code blocks or backticks
7. NO comments or explanations
8. Return ONLY executable JavaScript code
9. Include ALL requested sections: ${sectionsText}
10. Make it visually stunning with gradients, shadows, and modern aesthetics

DESIGN GUIDELINES:
- Use modern color schemes with gradients
- Add subtle shadows and hover effects
- Ensure responsive design principles
- Use professional typography
- Include smooth transitions
- Make it visually appealing and premium-looking

CODE STRUCTURE EXAMPLE:
function App() {
  const h = React.createElement;
  
  const primaryColor = '${colorTheme.includes('blue') ? '#4F46E5' : '#667eea'}';
  const accentColor = '${colorTheme.includes('blue') ? '#818CF8' : '#764ba2'}';
  
  const headerStyle = {
    background: 'linear-gradient(135deg, ' + primaryColor + ' 0%, ' + accentColor + ' 100%)',
    padding: '80px 20px',
    textAlign: 'center',
    color: 'white'
  };
  
  return h('div', { style: { fontFamily: 'system-ui, -apple-system, sans-serif' } },
    h('header', { style: headerStyle },
      h('h1', { style: { fontSize: '48px', margin: '0 0 16px 0' } }, '${data.name}'),
      h('p', { style: { fontSize: '20px', opacity: 0.9 } }, 'Professional ${data.industry} Services')
    ),
    h('main', null,
      // Include sections here: ${sectionsText}
    ),
    h('footer', { style: { background: '#1a1a1a', color: 'white', padding: '40px 20px', textAlign: 'center' } },
      h('p', null, '© 2024 ${data.name}. All rights reserved.')
    )
  );
}

Generate the complete App function now with ALL sections (${sectionsText}). Make it professional and visually stunning:
`;
};
