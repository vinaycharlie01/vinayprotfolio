import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="led-text">Hey, I'm Vinaykumar</h2>
      <div className="about-content">
        <p className="intro">
          I am...
        </p>
        <p className="description">
          <span className="bullet">»</span> An experienced Golang Developer with over 3.5 years of experience in building scalable backend systems,
          Kubernetes Operators, and self-hosted automation CLI tools. Proficient in Go, Kubernetes, Helm, Docker,
          and event-driven microservices. If you're interested in collaboration or just want to chat about tech,{' '}
          <a href="#contact">contact for details</a>.
        </p>
      </div>

      <div className="about-content">
        <h2 className="led-text">Around the Internet</h2>
        <p className="description">
          <span className="bullet">»</span> This site is the center of my online presence. The <a href="#projects">projects section</a> contains
          write-ups of experiments with cloud native tech and microservices. I primarily work on{' '}
          <span className="highlight">Go</span> projects.
        </p>
      </div>

      <div className="about-content">
        <h2 className="led-text">Work</h2>
        <p className="description">
          <span className="bullet">»</span> I build scalable backend systems and automation tools using Go.
          My expertise includes developing Kubernetes Operators, CLI tools, and microservices architectures.
          I work with Docker, Kubernetes, Helm, and CI/CD pipelines across cloud platforms (IBM Cloud, GCP, AWS).
          Just a Gopher trying to make sense of the cloud, one goroutine at a time.
        </p>
      </div>
    </section>
  );
};

export default About;

// Made with Bob
