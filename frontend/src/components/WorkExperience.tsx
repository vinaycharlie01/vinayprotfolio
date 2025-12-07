import React from 'react';
import './WorkExperience.css';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const WorkExperience: React.FC = () => {
  const experiences: Experience[] = [
    {
      title: "Software Developer",
      company: "IBM | Instana",
      period: "Nov 2024 - Present",
      location: "Kochi, India",
      description: [
        "Developed and maintained a self-hosted CLI tool (stanctl) in Golang to automate Instana deployment",
        "Designed and maintained a Kubernetes Operator in Golang to automate deployment and lifecycle management",
        "Added support for automatically creating VPCs on IBM Cloud and provisioning Kubernetes clusters",
        "Contributed to open-source CoreDNS Helm chart, improving flexibility and test coverage",
        "Designed and tested infrastructure workflows deployed across IBM Cloud and GCP"
      ]
    },
    {
      title: "Software Engineer",
      company: "MSYS Technology | Client: HPE",
      period: "April 2022 - Nov 2024",
      location: "Bangalore, India",
      description: [
        "Developed wellness application for HPE clients using event-driven architecture",
        "Implemented microservices in Golang using goroutines, channels, and RESTful APIs",
        "Developed plugins to handle different events with shared object files",
        "Utilized Docker for containerization and Jenkins for CI/CD pipelines",
        "Used Kafka for real-time data processing and Elasticsearch for log management"
      ]
    }
  ];

  return (
    <section id="work" className="work-section">
      <h2>What I've Been Doing</h2>
      <p className="work-subtitle">Dates use the Holocene Calendar — the Human Era</p>
      
      <div className="timeline">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div className="experience-header">
              <h3>
                <span className="company-link">{exp.company}</span> {exp.title}
              </h3>
              <div className="experience-meta">
                <span className="period">{exp.period}</span>
                <span className="location">{exp.location}</span>
              </div>
            </div>
            <ul className="experience-description">
              {exp.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="education">
        <h3>
          <span className="company-link">AMC Engineering College</span> Bachelor of Engineering (B.E)
        </h3>
        <div className="experience-meta">
          <span className="period">2017 - 2021</span>
          <span className="location">Bangalore, India — Electrical and Electronics Engineering</span>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;

// Made with Bob
