import React from 'react';
import Base from './Base';

const ContactUs = () => {
  const containerStyle = {
  
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  };

  const cardStyle = {
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    transition: 'transform 0.3s, box-shadow 0.3s'
  };

  const cardHoverStyle = {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
  };

  const phoneIconStyle = {
    color: '#4caf50',
    fontSize: '5rem',
    marginBottom: '20px'
  };

  const buttonStyle = {
    color: '#ffffff', // Text color
    backgroundColor: '#007bff', // Button background color
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    textDecoration: 'none', // Remove underline
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s', // Smooth transition
    outline: 'none', // Remove default focus outline
    display: 'inline-block',
    fontSize: '16px'
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)'
  };

  const handleButtonClick = () => {
    // Handle button click event
  };

  return (
    <Base>
      <div style={containerStyle}>
        <div
          className="card"
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = cardHoverStyle.transform;
            e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = cardStyle.boxShadow;
          }}
        >
          <div className="card-body">
            <div style={phoneIconStyle}>
              <i className="fas fa-phone-square-alt"></i>
            </div>

            <h3 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>24*7 Service</h3>
            <h4 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Help Line Number</h4>
            <h5 style={{ marginBottom: '20px', fontSize: '1rem' }}>+91 12345 67890</h5>
            <a
              href="/"
              style={buttonStyle}
              onClick={handleButtonClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor;
                e.currentTarget.style.transform = buttonHoverStyle.transform;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ContactUs;
