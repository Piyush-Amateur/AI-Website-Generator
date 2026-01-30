import PropTypes from "prop-types";

/**
 * Loader Component
 * Displays loading animation and status messages during website generation
 */
const Loader = () => {
  return (
    <div className="card loader-container">
      <div className="loader-spinner" role="status" aria-label="Loading"></div>
      <p className="loader-text">Generating Your Website...</p>
      <p className="loader-subtext">
        Our AI is crafting a beautiful, professional website tailored to your business
      </p>
      <p className="loader-subtext" style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.75rem' }}>
        This may take 10-30 seconds
      </p>
    </div>
  );
};

export default Loader;
