import React, { useEffect, useRef } from 'react';
import './WorldMap.css';

const WorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placesVisited = [
    "India", "Singapore", "United States", "United Kingdom", 
    "Netherlands", "Germany", "France", "Switzerland"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 400;
        drawMap();
      }
    };

    const drawMap = () => {
      // Clear canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw simplified world map representation
      // This is a simplified version - you can enhance with actual map data
      
      // Draw continents as simplified shapes
      const continents = [
        // Asia (India region highlighted)
        { x: canvas.width * 0.65, y: canvas.height * 0.45, width: 150, height: 100, visited: true },
        // Europe
        { x: canvas.width * 0.48, y: canvas.height * 0.3, width: 80, height: 60, visited: true },
        // North America
        { x: canvas.width * 0.2, y: canvas.height * 0.3, width: 120, height: 100, visited: true },
        // South America
        { x: canvas.width * 0.25, y: canvas.height * 0.6, width: 60, height: 80, visited: false },
        // Africa
        { x: canvas.width * 0.48, y: canvas.height * 0.55, width: 70, height: 90, visited: false },
        // Australia
        { x: canvas.width * 0.75, y: canvas.height * 0.7, width: 60, height: 50, visited: false },
      ];

      continents.forEach(continent => {
        ctx.fillStyle = continent.visited ? '#8b5cf6' : '#666666';
        ctx.globalAlpha = 0.6;
        ctx.fillRect(continent.x, continent.y, continent.width, continent.height);
        ctx.globalAlpha = 1;
      });

      // Add some decorative dots for cities
      const cities = [
        { x: canvas.width * 0.68, y: canvas.height * 0.5, visited: true }, // India
        { x: canvas.width * 0.52, y: canvas.height * 0.35, visited: true }, // Europe
        { x: canvas.width * 0.22, y: canvas.height * 0.4, visited: true }, // US
      ];

      cities.forEach(city => {
        ctx.beginPath();
        ctx.arc(city.x, city.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = city.visited ? '#a78bfa' : '#999999';
        ctx.fill();
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="worldmap-section">
      <h2>Places I've Been</h2>
      <div className="map-container">
        <canvas ref={canvasRef} className="world-canvas"></canvas>
      </div>
      <div className="places-list">
        <p className="places-note">
          <strong>bold:</strong> places I've been based out of.
        </p>
        <div className="places-grid">
          {placesVisited.map((place, index) => (
            <div key={index} className="place-item">
              <span className="place-bullet">»</span>
              <span className={index < 3 ? "place-name bold" : "place-name"}>{place}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldMap;

// Made with Bob
