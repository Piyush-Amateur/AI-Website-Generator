/**
 * Generates a mock website for demonstration purposes
 * This is used when OpenAI API is not available or for testing
 * @param {Object} data - Business information
 * @returns {string} - Generated React code
 */
export const generateMockWebsite = (data) => {
  const { name, industry, audience, color, sections } = data;

  // Determine colors based on input
  const primaryColor = color?.toLowerCase().includes('blue') ? '#4F46E5' :
    color?.toLowerCase().includes('purple') ? '#9333EA' :
      color?.toLowerCase().includes('green') ? '#10B981' :
        color?.toLowerCase().includes('red') ? '#EF4444' :
          '#4F46E5';

  const accentColor = color?.toLowerCase().includes('blue') ? '#818CF8' :
    color?.toLowerCase().includes('purple') ? '#C084FC' :
      color?.toLowerCase().includes('green') ? '#34D399' :
        color?.toLowerCase().includes('red') ? '#F87171' :
          '#818CF8';

  return `function App() {
  const h = React.createElement;
  
  const primaryColor = '${primaryColor}';
  const accentColor = '${accentColor}';
  
  const headerStyle = {
    background: 'linear-gradient(135deg, ' + primaryColor + ' 0%, ' + accentColor + ' 100%)',
    padding: '80px 20px',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };
  
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };
  
  const sectionStyle = {
    padding: '60px 20px',
    margin: '40px 0'
  };
  
  const cardStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    margin: '20px 0'
  };
  
  const buttonStyle = {
    background: primaryColor,
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px'
  };
  
  const footerStyle = {
    background: '#1a1a1a',
    color: 'white',
    padding: '40px 20px',
    textAlign: 'center',
    marginTop: '60px'
  };

  return h('div', { style: { fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f8f9fa' } },
    h('header', { style: headerStyle },
      h('div', { style: containerStyle },
        h('h1', { style: { fontSize: '48px', margin: '0 0 16px 0', fontWeight: 'bold' } }, '${name}'),
        h('p', { style: { fontSize: '20px', opacity: 0.95, margin: '0' } }, 'Professional ${industry} Services'),
        h('button', { style: buttonStyle }, 'Get Started')
      )
    ),
    
    h('main', { style: containerStyle },
      ${sections.includes('About') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px' } }, 'About Us'),
        h('div', { style: cardStyle },
          h('p', { style: { fontSize: '18px', lineHeight: '1.8', color: '#4a5568' } }, 
            'Welcome to ${name}! We are a leading provider of ${industry} solutions, dedicated to serving ${audience}. Our team of experts brings years of experience and innovation to help you achieve your goals.'
          )
        )
      ),` : ''}
      
      ${sections.includes('Services') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' } }, 'Our Services'),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' } },
          h('div', { style: cardStyle },
            h('h3', { style: { color: primaryColor, fontSize: '24px', marginBottom: '12px' } }, '🎯 Consulting'),
            h('p', { style: { color: '#4a5568', lineHeight: '1.6' } }, 'Expert guidance tailored to your business needs in ${industry}.')
          ),
          h('div', { style: cardStyle },
            h('h3', { style: { color: primaryColor, fontSize: '24px', marginBottom: '12px' } }, '⚡ Implementation'),
            h('p', { style: { color: '#4a5568', lineHeight: '1.6' } }, 'Seamless integration and deployment of cutting-edge solutions.')
          ),
          h('div', { style: cardStyle },
            h('h3', { style: { color: primaryColor, fontSize: '24px', marginBottom: '12px' } }, '🛠️ Support'),
            h('p', { style: { color: '#4a5568', lineHeight: '1.6' } }, '24/7 dedicated support to keep your operations running smoothly.')
          )
        )
      ),` : ''}
      
      ${sections.includes('Products') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' } }, 'Our Products'),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' } },
          h('div', { style: cardStyle },
            h('h3', { style: { color: primaryColor, fontSize: '22px' } }, 'Premium Package'),
            h('p', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '16px 0' } }, '$99/mo'),
            h('ul', { style: { listStyle: 'none', padding: 0, color: '#4a5568' } },
              h('li', { style: { padding: '8px 0' } }, '✓ Full access to all features'),
              h('li', { style: { padding: '8px 0' } }, '✓ Priority support'),
              h('li', { style: { padding: '8px 0' } }, '✓ Advanced analytics')
            ),
            h('button', { style: buttonStyle }, 'Choose Plan')
          ),
          h('div', { style: cardStyle },
            h('h3', { style: { color: primaryColor, fontSize: '22px' } }, 'Enterprise'),
            h('p', { style: { fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '16px 0' } }, 'Custom'),
            h('ul', { style: { listStyle: 'none', padding: 0, color: '#4a5568' } },
              h('li', { style: { padding: '8px 0' } }, '✓ Everything in Premium'),
              h('li', { style: { padding: '8px 0' } }, '✓ Dedicated account manager'),
              h('li', { style: { padding: '8px 0' } }, '✓ Custom integrations')
            ),
            h('button', { style: buttonStyle }, 'Contact Sales')
          )
        )
      ),` : ''}
      
      ${sections.includes('Testimonials') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' } }, 'What Our Clients Say'),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' } },
          h('div', { style: { ...cardStyle, borderLeft: '4px solid ' + primaryColor } },
            h('p', { style: { fontSize: '16px', fontStyle: 'italic', color: '#4a5568', marginBottom: '16px' } }, 
              '"${name} transformed our business. Their expertise in ${industry} is unmatched!"'
            ),
            h('p', { style: { fontWeight: 'bold', color: '#1a1a1a' } }, '- Sarah Johnson, CEO')
          ),
          h('div', { style: { ...cardStyle, borderLeft: '4px solid ' + primaryColor } },
            h('p', { style: { fontSize: '16px', fontStyle: 'italic', color: '#4a5568', marginBottom: '16px' } }, 
              '"Outstanding service and results. Highly recommend to anyone in ${industry}."'
            ),
            h('p', { style: { fontWeight: 'bold', color: '#1a1a1a' } }, '- Michael Chen, Director')
          )
        )
      ),` : ''}
      
      ${sections.includes('Gallery') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' } }, 'Gallery'),
        h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' } },
          h('div', { style: { ...cardStyle, height: '200px', background: 'linear-gradient(135deg, ' + primaryColor + ', ' + accentColor + ')', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' } }, '📸 Project 1'),
          h('div', { style: { ...cardStyle, height: '200px', background: 'linear-gradient(135deg, ' + accentColor + ', ' + primaryColor + ')', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' } }, '📸 Project 2'),
          h('div', { style: { ...cardStyle, height: '200px', background: 'linear-gradient(135deg, ' + primaryColor + ', ' + accentColor + ')', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px' } }, '📸 Project 3')
        )
      ),` : ''}
      
      ${sections.includes('Contact') ? `
      h('section', { style: sectionStyle },
        h('h2', { style: { fontSize: '36px', color: '#1a1a1a', marginBottom: '20px', textAlign: 'center' } }, 'Contact Us'),
        h('div', { style: { ...cardStyle, maxWidth: '600px', margin: '0 auto' } },
          h('div', { style: { marginBottom: '20px' } },
            h('p', { style: { fontSize: '18px', color: '#4a5568', marginBottom: '12px' } }, '📧 Email: contact@${name.toLowerCase().replace(/\\s+/g, '')}.com'),
            h('p', { style: { fontSize: '18px', color: '#4a5568', marginBottom: '12px' } }, '📱 Phone: +1 (555) 123-4567'),
            h('p', { style: { fontSize: '18px', color: '#4a5568', marginBottom: '12px' } }, '📍 Address: 123 Business St, City, State 12345')
          ),
          h('button', { style: { ...buttonStyle, width: '100%' } }, 'Send Message')
        )
      )` : ''}
    ),
    
    h('footer', { style: footerStyle },
      h('div', { style: containerStyle },
        h('p', { style: { margin: '0', fontSize: '16px' } }, '© 2024 ${name}. All rights reserved.'),
        h('p', { style: { margin: '10px 0 0 0', fontSize: '14px', opacity: 0.8 } }, 'Serving ${audience} with excellence')
      )
    )
  );
}`;
};
