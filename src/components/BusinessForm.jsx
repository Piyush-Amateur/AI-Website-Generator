import { useState } from "react";
import PropTypes from "prop-types";

const SECTIONS_LIST = ["About", "Services", "Products", "Contact", "Testimonials"];
// const SECTIONS_LIST = ["About", "Services", "Products", "Contact", "Testimonials", "Gallery"];


/**
 * BusinessForm Component
 * Collects business information for website generation
 * @param {Object} props
 * @param {Function} props.onGenerate - Callback function when form is submitted
 * @param {boolean} props.loading - Loading state to disable form during generation
 */
const BusinessForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    audience: "",
    color: "",
    sections: [],
  });

  /**
   * Handles input field changes
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Toggles section selection
   * @param {string} section - Section name to toggle
   */
  const toggleSection = (section) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter((s) => s !== section)
        : [...prev.sections, section],
    }));
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="card">
      <h2>Business Details</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="business-name">
          Business Name <span style={{ color: 'var(--error-text)' }}>*</span>
        </label>
        <input
          id="business-name"
          name="name"
          type="text"
          autoComplete="organization"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Smart Genesis Solutions"
          disabled={loading}
        />

        <label htmlFor="industry">
          Industry <span style={{ color: 'var(--error-text)' }}>*</span>
        </label>
        <input
          id="industry"
          name="industry"
          type="text"
          autoComplete="organization-title"
          required
          value={formData.industry}
          onChange={handleChange}
          placeholder="e.g., IT Services & Digital Consulting"
          disabled={loading}
        />

        <label htmlFor="audience">
          Target Audience <span style={{ color: 'var(--error-text)' }}>*</span>
        </label>
        <input
          id="audience"
          name="audience"
          type="text"
          autoComplete="off"
          required
          value={formData.audience}
          onChange={handleChange}
          placeholder="e.g., Small and medium-sized businesses"
          disabled={loading}
        />

        <label htmlFor="color">
          Preferred Color Theme
        </label>
        <input
          id="color"
          name="color"
          type="text"
          autoComplete="off"
          value={formData.color}
          placeholder="e.g., Blue and White, Modern Purple"
          onChange={handleChange}
          disabled={loading}
        />

        <label style={{ marginTop: 'var(--spacing-lg)' }}>
          Website Sections
        </label>
        <div className="tags" role="group" aria-label="Website sections">
          {SECTIONS_LIST.map((section) => (
            <button
              key={section}
              type="button"
              className={formData.sections.includes(section) ? "tag active" : "tag"}
              onClick={() => toggleSection(section)}
              aria-pressed={formData.sections.includes(section)}
              disabled={loading}
            >
              {section}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          <span>{loading ? "Generating..." : "🚀 Generate Website"}</span>
        </button>
      </form>
    </div>
  );
};

BusinessForm.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default BusinessForm;
