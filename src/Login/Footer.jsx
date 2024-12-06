import React from 'react';
import {InstagramOutlined } from '@ant-design/icons';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <ul className="footer-links">
                    <li><a href="#about" className="footer-link">About</a></li>
                    <li><a href="#help" className="footer-link">Help Center</a></li>
                    <li><a href="#privacy" className="footer-link">Privacy Policy</a></li>
                    <li><a href="#terms" className="footer-link">Terms of Service</a></li>
                    <li><a href="#contact" className="footer-link">Contact Us</a></li>
                </ul>
                <p className="footer-text">© 2023 myLOCKER, Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
