import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import FindMe from './components/FindMe';
import WorldMap from './components/WorldMap';

function App() {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = 'global-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      document.body.appendChild(ripple);

      // Animate the ripple
      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 2.5,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      );
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <About />
        <WorkExperience />
        <Projects />
        <FindMe />
        <WorldMap />
      </main>
      <footer className="footer">
        <div className="footer-links">
          <a href="#about">me</a>
          <span> | </span>
          <a href="#work">work</a>
          <span> | </span>
          <a href="#projects">projects</a>
          <span> | </span>
          <a href="#contact">contact</a>
        </div>
      </footer>
    </div>
  );
}

export default App;

// Made with Bob
