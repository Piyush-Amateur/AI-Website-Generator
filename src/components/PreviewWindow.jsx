import { useState, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * PreviewWindow Component
 * Renders generated website code in an isolated iframe
 * @param {Object} props
 * @param {string} props.code - Generated React code to preview
 */
const PreviewWindow = ({ code }) => {
  const [error, setError] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Reset error and force iframe reload when code changes
    setError(null);
    setKey(prev => prev + 1);
  }, [code]);

  if (!code) {
    return (
      <div className="card preview-card">
        <h2>Live Preview</h2>
        <div style={{
          width: '100%',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--text-muted)',
          fontSize: '1rem',
          background: 'var(--bg-primary)'
        }}>
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
            <p style={{ fontSize: '64px', margin: '0 0 1rem 0' }}>🎨</p>
            <p style={{ margin: 0, fontWeight: 600 }}>Your generated website will appear here</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Fill in the business details and click Generate Website
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Clean up the code - remove markdown code blocks if present
  let cleanCode = code.trim();

  // Remove markdown code blocks
  if (cleanCode.startsWith('```')) {
    cleanCode = cleanCode.replace(/```(?:javascript|js)?\n?/g, '').replace(/```\n?$/g, '');
  }

  // Build the HTML document for the iframe
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Preview</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        * {
          box-sizing: border-box;
        }
        #root {
          min-height: 100vh;
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      
      <!-- Load React from CDN -->
      <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      
      <script>
        try {
          // Generated code
          ${cleanCode}
          
          // Render the app
          const root = ReactDOM.createRoot(document.getElementById("root"));
          root.render(React.createElement(App));
        } catch (error) {
          // Display error in a user-friendly way
          document.body.innerHTML = \`
            <div style="
              padding: 2rem; 
              color: #dc2626; 
              font-family: 'Courier New', monospace; 
              background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); 
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                background: white; 
                padding: 2rem; 
                border-radius: 12px; 
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                max-width: 600px;
              ">
                <h3 style="margin: 0 0 1rem 0; color: #991b1b;">⚠️ Preview Error</h3>
                <pre style="
                  background: #fef2f2; 
                  padding: 1rem; 
                  border-radius: 8px; 
                  overflow: auto;
                  border-left: 4px solid #dc2626;
                  margin: 1rem 0;
                  font-size: 0.875rem;
                ">\${error.message}</pre>
                <p style="margin: 1rem 0 0 0; font-size: 0.875rem; color: #6b7280; font-family: system-ui;">
                  The AI-generated code encountered an error. Try generating again with different inputs.
                </p>
              </div>
            </div>
          \`;
          console.error('Preview render error:', error);
        }
      </script>
    </body>
  </html>
  `;

  return (
    <div className="card preview-card">
      <h2>Live Preview</h2>
      {error && (
        <div style={{
          padding: 'var(--spacing-md)',
          background: 'var(--error-bg)',
          color: 'var(--error-text)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-md)',
          fontSize: '0.875rem',
          border: '2px solid var(--error-border)'
        }}>
          <strong>⚠️ Preview Error:</strong> {error}
        </div>
      )}
      <iframe
        key={key}
        title="Website Preview"
        sandbox="allow-scripts"
        srcDoc={html}
        style={{
          width: '100%',
          height: '500px',
          border: '2px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          background: 'white',
          boxShadow: 'var(--shadow-lg)',
        }}
        onError={() => setError('Failed to load preview')}
      />
    </div>
  );
};

PreviewWindow.propTypes = {
  code: PropTypes.string,
};

export default PreviewWindow;
