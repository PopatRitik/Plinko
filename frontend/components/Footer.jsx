import React from 'react';
import '../src/App.css';
import logo from '../src/assets/logo.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <img 
        src={logo} 
        alt="Logo" 
        className="footer-logo"
      />
      <p>© {currentYear} plinko.com | All Rights Reserved.</p>
    </div>
  );
};
