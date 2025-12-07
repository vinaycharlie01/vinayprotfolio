import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  const firstName = "VINAYKUMAR";
  const lastName = "V A";

  return (
    <header className="header">
      <div className="name-container">
        <div className="first-name">
          {firstName.split('').map((letter, index) => (
            <span 
              key={index} 
              className="letter"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="last-name">
          {lastName.split('').map((letter, index) => (
            <span 
              key={index} 
              className="letter"
              style={{ animationDelay: `${(firstName.length + index) * 0.1}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

// Made with Bob
