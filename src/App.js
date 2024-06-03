// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiarioMayor from './components/DiarioMayor';
import Home from './components/Home'; // Suponiendo que tienes un componente Home
import LibroMayor from './components/LibroMayor'; // Importar el componente LibroMayor
import LibroEstadosFinancieros from "./components/LibroEstadosFinancieros";
import RegistroAccionistas  from "./components/RegistroAccionistas";
const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DiarioMayor" element={<DiarioMayor />} />
            <Route path="/LibroMayor" element={<LibroMayor />} /> // Agregar la ruta para el componente LibroMayor
            <Route path="/LibroEstadosFinancieros" element={<LibroEstadosFinancieros />} />
            <Route path="/RegistroAccionistas" element={<RegistroAccionistas />} />
        </Routes>
      </Router>
  );
};

export default App;