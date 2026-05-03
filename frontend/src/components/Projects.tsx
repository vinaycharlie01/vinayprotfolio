import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  label: string;
}

const Projects: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const projects: Project[] = [
    {
      title: "Golang Code Generator",
      description: "A Go code designed to generate Go struct definitions from JSON input, simplifying the process of creating Go structs corresponding to JSON data structures.",
      technologies: ["Go", "JSON", "Mux"],
      highlights: [],
      label: "Code Gen"
    },
    {
      title: "Image Message Queuing System",
      description: "Developed a message queuing system that efficiently handles product data. This involves receiving product information via an API, storing it in a database, and then processing it by downloading and compressing product images.",
      technologies: ["Golang", "MongoDB", "Kafka"],
      highlights: [
        "Designed database schemas for Users and Products tables, handling complex data structures like image URLs and local paths"
      ],
      label: "Queue System"
    },
    {
      title: "K0s Cluster Shared Framework",
      description: "Designed and implemented a hexagonal (ports & adapters) architecture-based cluster automation library in Go.",
      technologies: ["Golang", "Kubernetes", "k0s", "k0sctl"],
      highlights: [
        "Abstracted Kubernetes cluster lifecycle operations (Apply, Reset, GetStatus, GetKubeconfig) via clean port interfaces",
        "Built a pluggable adapter over the k0sctl action layer to manage control-plane and worker nodes programmatically",
        "Implemented structured logging using slog for consistent orchestration observability",
        "Followed SOLID principles and dependency inversion to decouple business logic from orchestration tools"
      ],
      label: "Cluster Framework"
    },
    {
      title: "In-Memory Data Aggregation API",
      description: "Designed and implemented raw user-level data for an ad network.",
      technologies: ["Go", "MongoDB", "Docker", "Kafka", "Prometheus", "Grafana"],
      highlights: [
        "Managed in-memory data aggregation for billions of requests daily, optimizing for performance and scalability under high write loads",
        "Utilized concurrent processing techniques to ensure thread-safe data handling, calculating unique daily active users (DAU) alongside metrics like AdRequest, AdResponse, AdImpression, and AdClicks",
        "Integrated Kafka for reliable message queuing, utilizing a dead letter queue to handle processing failures and ensure no data loss",
        "Leveraged Prometheus and Grafana for monitoring system performance",
        "Conducted comprehensive test cases to validate correctness and performance under various load scenarios",
        "Developed a graceful shutdown mechanism to handle service termination without data loss"
      ],
      label: "Data API"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="led-text">Projects</h2>
      
      <div className="timeline">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="project-header clickable"
              onClick={() => toggleExpand(index)}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>
                  <span className="project-label-inline">{project.label}</span> {project.title}
                </h3>
                {expandedIndex !== index && (
                  <motion.button
                    key={`btn-${index}`}
                    className="expand-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(index);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      y: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <motion.span
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      View Details
                    </motion.span>
                  </motion.button>
                )}
              </div>
              <p className="project-description-preview">{project.description}</p>
            </motion.div>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="project-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="project-tech">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {project.highlights.length > 0 && (
                    <ul className="project-highlights">
                      {project.highlights.map((highlight, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


