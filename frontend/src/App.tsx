import React from 'react';
import './App.css';
import Header from './components/Header';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import FindMe from './components/FindMe';
import WorldMap from './components/WorldMap';

function App() {
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
