import React from 'react';
import './FindMe.css';

const FindMe: React.FC = () => {
  const links = [
    {
      name: "GitHub",
      url: "https://www.github.com/vinaycharlie01",
      description: "code repositories and open source contributions"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/vinaycharlie01",
      description: "professional network and career updates"
    },
    {
      name: "Email",
      url: "mailto:vinikshatriyas@gmail.com",
      description: "for me? Direct communication"
    },
    {
      name: "Phone",
      url: "tel:+919380862951",
      description: "(+91) 9380862951"
    }
  ];

  return (
    <section id="contact" className="findme-section">
      <h2>Find Me</h2>
      
      <div className="links-container">
        {links.map((link, index) => (
          <div key={index} className="link-item">
            <span className="link-bullet">»</span>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="link-name">
              {link.name}
            </a>
            <span className="link-separator">—</span>
            <span className="link-description">{link.description}</span>
          </div>
        ))}
      </div>

      <div className="certifications">
        <h3>Certifications</h3>
        <div className="cert-list">
          <div className="cert-item">
            <span className="link-bullet">»</span>
            <span className="cert-name">HackerRank</span>
            <span className="link-separator">—</span>
            <span className="cert-description">Python Basic, SQL Basic</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindMe;

// Made with Bob
