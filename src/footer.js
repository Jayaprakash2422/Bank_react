// Footer.js
import React from 'react';
import './Footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} JAYAPRAKASH MSC.CS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
