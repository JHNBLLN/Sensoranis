import React from "react";
import "./css/Footer.css";
import Weblogo from "../assets/websitelogo/website-logo.png";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <img src={Weblogo} alt="Logo" className="footer-logo" />
          <h2>Sensoranis</h2>
          <p>1234 Street, City, Country</p>
          <p>
            <a href="mailto:email@example.com">Sensoranis@example.com</a>
          </p>
          <p>
            <a href="tel:+1234567890">+123 456 7890</a>
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Notice</a>
          <a href="/">Shipping Policy</a>
          <a href="/">Refund Policy</a>
          <a href="/">Contact Us</a>
        </div>

        <div className="footer-right">
          <ul className="social-icons">
            <li>
              <a
                href="https://www.facebook.com/photo/?fbid=568628912043138&set=a.101235825449118"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
