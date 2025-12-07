import React, { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  label: string;
  gridSpan?: string;
}

const MOBILE_BREAKPOINT = 768;
const DEFAULT_GLOW_COLOR = '139, 92, 246'; // Purple color matching your theme

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

interface ProjectCardProps {
  project: Project;
  index: number;
  isMobile: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: 8 }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, DEFAULT_GLOW_COLOR)
    );
    particlesInitialized.current = true;
  }, []);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, idx) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        });

        gsap.to(clone, {
          opacity: 0.4,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        });
      }, idx * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (isMobile || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      gsap.to(element, {
        rotateX: 3,
        rotateY: 3,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.1,
        ease: 'power2.out',
        transformPerspective: 1000
      });

      const magnetX = (x - centerX) * 0.03;
      const magnetY = (y - centerY) * 0.03;

      gsap.to(element, {
        x: magnetX,
        y: magnetY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${DEFAULT_GLOW_COLOR}, 0.4) 0%, rgba(${DEFAULT_GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, isMobile]);

  return (
    <div
      ref={cardRef}
      className={`project-card ${project.gridSpan || ''}`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="project-card__header">
        <span className="project-label">{project.label}</span>
      </div>

      <div className="project-card__content">
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
    </div>
  );
};

const Projects: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects: Project[] = [
    {
      title: "Golang Code Generator",
      description: "A Go code designed to generate Go struct definitions from JSON input, simplifying the process of creating Go structs corresponding to JSON data structures.",
      technologies: ["Go", "JSON", "Mux"],
      highlights: [],
      label: "Code Gen",
      gridSpan: "project-card--small"
    },
    {
      title: "Image Message Queuing System",
      description: "A message queuing system that efficiently handles product data, receiving product information via API, storing it in a database, and processing by downloading and compressing product images.",
      technologies: ["Golang", "MongoDB", "Kafka"],
      highlights: [
        "Designed database schemas for Users and Products tables",
        "Handled complex data structures like image URLs and local paths"
      ],
      label: "Queue System",
      gridSpan: "project-card--medium"
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
      ],
      label: "Data API",
      gridSpan: "project-card--large"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <h2 className="led-text">Projects</h2>
      
      <div className="projects-grid bento-grid" ref={gridRef}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;

// Made with Bob
