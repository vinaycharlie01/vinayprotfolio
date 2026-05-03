import React from 'react';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="led-text">Hey, I'm Vinaykumar</h2>
      <div className="about-content">
        <p className="description ">
          Backend Engineer with 4+ years of experience building scalable and high-performance microservices using Golang.
          Strong understanding of distributed systems, concurrency, and REST API development. Experienced in working with Kubernetes, Docker, Kafka, Redis, MongoDB, PostgreSQL.
          Hands-on experience with cloud platforms (AWS, GCP, IBM Cloud) and CI/CD pipelines. If you're interested in collaboration or just want to chat about tech,{' '}
          <a href="#contact">contact for details</a>.
        </p>
      </div>

      <div className="about-content">
        <h2 className="led-text">Around the Internet</h2>
        <p className="description">
          This site is the center of my online presence. The <a href="#projects">projects section</a> contains
          write-ups of experiments with cloud native tech and microservices. I primarily work on{' '}
          <span className="highlight">Go</span> projects.
        </p>
      </div>

      <div className="about-content">
        <h2 className="led-text">Work</h2>
        <p className="description">
          I build scalable backend systems and automation tools using Go.
          My expertise includes developing Kubernetes Operators, CLI tools, and microservices architectures.
          Skilled in building reliable, event-driven systems with proper monitoring using Instana, Prometheus, Grafana, and ELK Stack.
          I work with Docker, Kubernetes, Helm, and CI/CD pipelines across cloud platforms (IBM Cloud, GCP, AWS).
        </p>
      </div>
    </section>
  );
};

export default About;


