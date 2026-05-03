import React from 'react';
import '../styles/WorldMap.css';
import worldMapImage from '../images/image.png';

const WorldMap: React.FC = () => {
  const locations = [
    { name: "Kochi, India", current: true },
    { name: "Bangalore, India", based: true },
  ];

  return (
    <section className="worldmap-section">
      <h2 className="led-text">Places I've Been</h2>
      <div className="map-container">
        <div className="world-map">
          <img
            src={worldMapImage}
            alt="World Map"
            className="map-image"
          />
        </div>
      </div>
      
      <div className="places-list">
        <div className="places-grid">
          {locations.map((location, index) => (
            <div key={index} className="place-item">
              <span className="place-bullet">»</span>
              <span className={`place-name ${location.current ? 'current' : location.based ? 'based' : ''}`}>
                {location.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldMap;

// Made with Bob
