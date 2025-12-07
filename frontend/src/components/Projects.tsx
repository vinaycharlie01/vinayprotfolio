import React from 'react';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Golang Code Generator for Creating Struct from JSON",
      description: "A Go code designed to generate Go struct definitions from JSON input, simplifying the process of creating Go structs corresponding to JSON data structures.",
      technologies: ["Go", "JSON", "Mux"],
      highlights: []
    },
    {
      title: "Image Message Queuing System",
      description: "A message queuing system that efficiently handles product data, receiving product information via API, storing it in a database, and processing by downloading and compressing product images.",
      technologies: ["Golang", "MongoDB", "Kafka"],
      highlights: [
        "Designed database schemas for Users and Products tables",
        "Handled complex data structures like image URLs and local paths"
      ]
    },
    {
      title: "In-Memory Data Aggregation API",
      description: "Designed and implemented raw user-level data for an ad network with in-memory data aggregation for billions of requests daily.",
      technologies: ["Go", "MongoDB", "Docker", "Kafka", "Prometheus", "Grafana"],
      highlights: [
        "Managed in-memory data aggregation optimizing for performance and scalability",
        "Utilized concurrent processing for thread-safe data handling",
        "Calculated unique daily active users (DAU) with metrics like AdRequest, AdResponse, AdImpression, and AdClicks",
        "Integrated Kafka with dead letter queue for reliable message processing",
        "Leveraged Prometheus and Grafana for monitoring system performance",
        "Developed graceful shutdown mechanism to prevent data loss"
      ]
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>Projects</h2>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech}</span>
              ))}
            </div>

            {project.highlights.length > 0 && (
              <ul className="project-highlights">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

// Made with Bob
