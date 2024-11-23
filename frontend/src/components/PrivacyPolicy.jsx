import React from 'react';

const PrivacyPolicy = () => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
    color: '#333333',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#4CAF50', // Green color for the title
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    marginTop: '20px',
    color: '#4CAF50', // Green color for section titles
  };

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '10px',
  };

  const ulStyle = {
    listStyleType: 'disc',
    marginLeft: '20px',
  };

  const linkStyle = {
    color: '#4CAF50', // Green color for links
    textDecoration: 'none',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Privacy Policy</h1>
      <p style={textStyle}>Last updated: November 2024</p>

      <section>
        <h2 style={sectionTitleStyle}>Introduction</h2>
        <p style={textStyle}>
          Welcome to Xplore! Your privacy is important to us. This Privacy Policy explains how we collect, use,
          and protect your information when you use our services. By using our website and booking tours, you agree
          to the practices outlined in this policy.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Information We Collect</h2>
        <p style={textStyle}>We collect personal information when you use our services, including:</p>
        <ul style={ulStyle}>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and payment information</li>
          <li>Tour preferences</li>
          <li>Location data</li>
        </ul>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>How We Use Your Information</h2>
        <p style={textStyle}>The information we collect is used to:</p>
        <ul style={ulStyle}>
          <li>Process bookings and reservations</li>
          <li>Provide customer support</li>
          <li>Send promotional emails and updates about your bookings</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>How We Protect Your Information</h2>
        <p style={textStyle}>
          We implement a variety of security measures to ensure the safety of your personal information. This includes
          encryption, secure servers, and regular security audits. However, no method of data transmission over the
          internet is completely secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Sharing Your Information</h2>
        <p style={textStyle}>
          We do not sell or rent your personal information to third parties. We may share information with trusted
          partners and service providers to help us operate our business, such as payment processors, email services,
          or customer support.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Your Rights</h2>
        <p style={textStyle}>You have the right to:</p>
        <ul style={ulStyle}>
          <li>Access your personal data</li>
          <li>Request corrections to inaccurate data</li>
          <li>Delete your account or personal information</li>
          <li>Opt out of marketing communications</li>
        </ul>
        <p style={textStyle}>
          To exercise any of these rights, please contact us at <a href="mailto:support@xplore.com" style={linkStyle}>support@xplore.com</a>.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Cookies and Tracking Technologies</h2>
        <p style={textStyle}>
          We use cookies to enhance your experience on our website. Cookies are small text files stored on your device
          that help us analyze web traffic and improve the website's functionality. You can disable cookies through your
          browser settings, but this may affect your experience on our site.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Third-Party Links</h2>
        <p style={textStyle}>
          Our website may contain links to third-party websites. We are not responsible for the privacy practices or
          content of these external sites. We encourage you to review their privacy policies before providing any
          personal information.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Changes to This Privacy Policy</h2>
        <p style={textStyle}>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated
          date. We recommend reviewing this page periodically to stay informed about how we protect your information.
        </p>
      </section>

      <section>
        <h2 style={sectionTitleStyle}>Contact Us</h2>
        <p style={textStyle}>
          If you have any questions about this Privacy Policy or our practices, please contact us at:
        </p>
        <p style={textStyle}>
          Email: <a href="mailto:support@xplore.com" style={linkStyle}>support@xplore.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
