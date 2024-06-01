// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiarioMayor from './components/DiarioMayor';
import Home from './components/Home'; // Suponiendo que tienes un componente Home

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DiarioMayor" element={<DiarioMayor />} />
        </Routes>
      </Router>
  );
};

export default App;
