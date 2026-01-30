import PropTypes from "prop-types";

/**
 * ErrorBanner Component
 * Displays error messages to the user
 * @param {Object} props
 * @param {string} props.message - Error message to display
 */
const ErrorBanner = ({ message }) => {
  return (
    <div className="error" role="alert">
      <strong>⚠️ Error:</strong> {message}
    </div>
  );
};

ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorBanner;
