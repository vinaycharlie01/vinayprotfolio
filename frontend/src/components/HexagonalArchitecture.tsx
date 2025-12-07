import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './HexagonalArchitecture.css';

const HexagonalArchitecture: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animate boxes on mount
    const boxes = containerRef.current.querySelectorAll('.flow-box');
    gsap.fromTo(
      boxes,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      }
    );

    // Animate arrows
    const arrows = containerRef.current.querySelectorAll('.flow-arrow-line');
    gsap.fromTo(
      arrows,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power2.out'
      }
    );

    // Animate data packets flowing through
    const animateDataFlow = () => {
      const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
      
      // Flow through each stage
      for (let i = 0; i < 4; i++) {
        timeline.to(`.data-packet-${i}`, {
          x: '100%',
          opacity: 1,
          duration: 0.8,
          ease: 'power1.inOut'
        }, i * 0.9);
        
        timeline.to(`.data-packet-${i}`, {
          opacity: 0,
          duration: 0.2
        }, i * 0.9 + 0.8);
        
        timeline.set(`.data-packet-${i}`, { x: '0%' });
      }

      return timeline;
    };

    const flowTimeline = animateDataFlow();

    // Pulse animation on boxes
    gsap.to(boxes, {
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true
      }
    });

    return () => {
      flowTimeline.kill();
    };
  }, []);

  const layers = [
    { name: 'Client/API', icon: '🌐', description: 'HTTP Request', color: '#8b5cf6' },
    { name: 'Application Layer', icon: '⚙️', description: 'Business Logic', color: '#a78bfa' },
    { name: 'Domain Layer', icon: '💎', description: 'Core Entities', color: '#c4b5fd' },
    { name: 'Infrastructure', icon: '🗄️', description: 'Database/External', color: '#ddd6fe' }
  ];

  return (
    <section id="architecture" className="architecture-section">
      <h2 className="led-text">Hexagonal Architecture</h2>
      <p className="architecture-subtitle">Data Flow Through Clean Architecture Layers</p>
      
      <div className="flow-diagram-container" ref={containerRef}>
        <div className="flow-diagram">
          {layers.map((layer, index) => (
            <React.Fragment key={index}>
              {/* Flow Box */}
              <div className="flow-box" style={{ '--box-color': layer.color } as React.CSSProperties}>
                <div className="flow-box-icon">{layer.icon}</div>
                <div className="flow-box-content">
                  <h3>{layer.name}</h3>
                  <p>{layer.description}</p>
                </div>
                <div className="flow-box-glow"></div>
              </div>

              {/* Arrow between boxes (except after last box) */}
              {index < layers.length - 1 && (
                <div className="flow-arrow">
                  <div className="flow-arrow-line">
                    <div className={`data-packet data-packet-${index}`}></div>
                  </div>
                  <div className="flow-arrow-head">▶</div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Return flow indicator */}
        <div className="return-flow">
          <div className="return-arrow">◀</div>
          <div className="return-label">Response Flow</div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="architecture-benefits">
        <div className="benefit-card">
          <div className="benefit-icon">🔄</div>
          <h4>Maintainable</h4>
          <p>Clear separation of concerns makes code easy to understand and modify</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🧪</div>
          <h4>Testable</h4>
          <p>Each layer can be tested independently with mocked dependencies</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">🔌</div>
          <h4>Flexible</h4>
          <p>Swap database or external services without changing business logic</p>
        </div>
        <div className="benefit-card">
          <div className="benefit-icon">📈</div>
          <h4>Scalable</h4>
          <p>Scale individual layers independently based on load requirements</p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="tech-details">
        <h3>Implementation Example</h3>
        <div className="tech-stack">
          <div className="tech-item">
            <span className="tech-label">API Layer:</span>
            <span className="tech-value">REST/GraphQL, HTTP Handlers</span>
          </div>
          <div className="tech-item">
            <span className="tech-label">Application:</span>
            <span className="tech-value">Use Cases, Services, DTOs</span>
          </div>
          <div className="tech-item">
            <span className="tech-label">Domain:</span>
            <span className="tech-value">Entities, Value Objects, Interfaces</span>
          </div>
          <div className="tech-item">
            <span className="tech-label">Infrastructure:</span>
            <span className="tech-value">MongoDB, PostgreSQL, Redis, Kafka</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexagonalArchitecture;

// Made with Bob
