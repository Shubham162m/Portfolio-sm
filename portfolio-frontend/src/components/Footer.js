// Footer component - displays copyright and social links
import React from 'react';
import './Footer.css';

// Your personal information
const YOUR_INFO = {
  name: "Modi Shubham",
  title: "B-Tech Student"
};

// Your social media links
const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smodi._20/",
  facebook: "https://www.facebook.com/shubham.modi.33483",
  linkedin: "https://www.linkedin.com/in/shubham-modi-ba1230363/",
  github: "https://github.com/Shubham162m"
};

function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Function to handle social link clicks
  function openSocialMedia(platform, url) {
    console.log(`Opening ${platform}: ${url}`);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">
            © {currentYear} {YOUR_INFO.name} | {YOUR_INFO.title}
          </p>
          <div className="social-links">
            <a 
              href={SOCIAL_LINKS.instagram}
              onClick={(e) => {
                e.preventDefault();
                openSocialMedia('Instagram', SOCIAL_LINKS.instagram);
              }}
              className="social-link instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a 
              href={SOCIAL_LINKS.facebook}
              onClick={(e) => {
                e.preventDefault();
                openSocialMedia('Facebook', SOCIAL_LINKS.facebook);
              }}
              className="social-link facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
               Facebook
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin}
              onClick={(e) => {
                e.preventDefault();
                openSocialMedia('LinkedIn', SOCIAL_LINKS.linkedin);
              }}
              className="social-link linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
               LinkedIn
            </a>
            <a 
              href={SOCIAL_LINKS.github}
              onClick={(e) => {
                e.preventDefault();
                openSocialMedia('GitHub', SOCIAL_LINKS.github);
              }}
              className="social-link github"
              target="_blank"
              rel="noopener noreferrer"
            >
               GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;