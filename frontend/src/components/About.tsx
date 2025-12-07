import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <h2>Hey, I'm Vinaykumar</h2>
      <div className="about-content">
        <p className="intro">
          I am...
        </p>
        <p className="description">
          An experienced Golang Developer with over 3.5 years of experience in building scalable backend systems, 
          Kubernetes Operators, and self-hosted automation CLI tools. Proficient in Go, Kubernetes, Helm, Docker, 
          and event-driven microservices. If you're interested in collaboration or just want to chat about tech, 
          <a href="#contact"> contact for details</a>.
        </p>
      </div>

      <div className="about-content">
        <h2>Around the Internet</h2>
        <p className="description">
          This site is the center of my online presence, the <a href="#projects">projects section</a> contains 
          write ups of experiments with cloud native tech and microservices. Occasionally, I may appear in{' '}
          <span className="highlight">Go (programming language)</span> related projects.
        </p>
      </div>

      <div className="about-content">
        <h2>Work</h2>
        <p className="description">
          For work, I prod at clouds with Go and way too much bash + yaml. Observability, in its various forms, 
          are my primary interest area (maintaining black boxes is too painful). Software Supply Chain Security 
          comes second (got to find something interesting when working on all those CI/CD pipelines).
        </p>
      </div>
    </section>
  );
};

export default About;

// Made with Bob
