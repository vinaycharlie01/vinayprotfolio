import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WorkExperience.css';

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
}

const WorkExperience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
      <h2 className="led-text">What I've Been Doing</h2>
      
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="experience-header clickable"
              onClick={() => toggleExpand(index)}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>
                  <span className="company-link">{exp.company}</span> {exp.title}
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
              <div className="experience-meta">
                <span className="period">{exp.period}</span>
                <span className="location">{exp.location}</span>
              </div>
            </motion.div>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.ul
                  className="experience-description"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {exp.description.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
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
