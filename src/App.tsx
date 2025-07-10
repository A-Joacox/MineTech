import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Technologies from './pages/Technologies';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
