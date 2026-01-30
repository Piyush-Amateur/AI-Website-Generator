import { useEffect, useState } from "react";
import BusinessForm from "./components/BusinessForm";
import PreviewWindow from "./components/PreviewWindow";
import Loader from "./components/Loader";
import ErrorBanner from "./components/ErrorBanner";
import { generateWebsite } from "./services/api";
import { generateMockWebsite } from "./services/mockGenerator";

function App() {
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [demoMode, setDemoMode] = useState(
    localStorage.getItem("demoMode") === "true"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("demoMode", demoMode.toString());
  }, [demoMode]);

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError("");
    setGeneratedCode("");

    // If demo mode is enabled, use mock generator directly
    if (demoMode) {
      setTimeout(() => {
        const mockCode = generateMockWebsite(formData);
        console.log('Generated Mock Code (Demo Mode)');
        setGeneratedCode(mockCode);
        setLoading(false);
      }, 1500); // Simulate processing time
      return;
    }

    // Try AI mode
    try {
      const response = await generateWebsite(formData);
      console.log('Generated Code (AI Mode):', response.code);
      setGeneratedCode(response.code);
      setLoading(false);
    } catch (err) {
      console.error("Generation error:", err);

      // Check if it's an API-related issue (credits, connection, timeout, server error)
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Unable to generate website. Please try again.";

      const isAPIIssue =
        // Credit/billing issues
        errorMessage.toLowerCase().includes('quota') ||
        errorMessage.toLowerCase().includes('billing') ||
        errorMessage.toLowerCase().includes('insufficient') ||
        errorMessage.toLowerCase().includes('credit') ||
        // Connection issues
        errorMessage.toLowerCase().includes('connection') ||
        errorMessage.toLowerCase().includes('timeout') ||
        errorMessage.toLowerCase().includes('network') ||
        // HTTP status codes
        err.response?.status === 429 ||  // Rate limit
        err.response?.status === 403 ||  // Forbidden
        err.response?.status === 500 ||  // Server error
        err.response?.status === 502 ||  // Bad gateway
        err.response?.status === 503;    // Service unavailable

      if (isAPIIssue) {
        // Automatically fall back to demo mode
        setError("⚠️ OpenAI API unavailable (connection/credits issue). Showing demo preview instead.");
        console.log('Falling back to demo mode due to API issue...');

        setTimeout(() => {
          const mockCode = generateMockWebsite(formData);
          console.log('Generated Mock Code (Fallback)');
          setGeneratedCode(mockCode);
          setLoading(false);
        }, 1500); // Simulate processing time
      } else {
        // Other errors
        setError(errorMessage);
        setLoading(false);
      }
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="header-title">
              <span className="gradient-text">Smart Genesis</span>
            </h1>
            <p className="subtitle">AI-Powered Website Generator (Auto-fallback to Demo Mode)</p>
          </div>

          <div className="header-controls">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>

        {/* Mode Toggle Banner */}
        <div className="mode-banner">
          <div className="mode-info">
            <div className="mode-status">
              <span className={`status-indicator ${demoMode ? 'demo' : 'ai'}`}>
                {demoMode ? '🎭' : '🤖'}
              </span>
              <div className="mode-text">
                <span className="mode-label">
                  {demoMode ? 'DEMO MODE' : 'AI MODE'}
                </span>
                <span className="mode-description">
                  {demoMode
                    ? 'Using mock templates - instant preview, no API costs'
                    : 'Using OpenAI GPT - real AI generation, requires API credits'}
                </span>
              </div>
            </div>
          </div>

          <button
            className={`mode-toggle-btn ${demoMode ? 'demo-active' : 'ai-active'}`}
            onClick={() => setDemoMode(!demoMode)}
            aria-label="Toggle generation mode"
          >
            <span className="toggle-icon">{demoMode ? '🤖' : '🎭'}</span>
            <span className="toggle-text">
              Switch to {demoMode ? 'AI Mode' : 'Demo Mode'}
            </span>
          </button>
        </div>
      </header>

      <div className="grid">
        <BusinessForm onGenerate={handleGenerate} loading={loading} />
        <div className="right-panel">
          {loading && <Loader />}
          {error && <ErrorBanner message={error} />}
          {generatedCode && <PreviewWindow code={generatedCode} />}
        </div>
      </div>
    </div>
  );
}

export default App;
