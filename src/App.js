// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiarioMayor from './components/DiarioMayor';
import Home from './components/Home';
import LibroMayor from './components/LibroMayor';
import LibroEstadosFinancieros from './components/LibroEstadosFinancieros';
import RegistroAccionistas from './components/RegistroAccionistas';
import LibroCapital from './components/LibroCapital'; // Importa el nuevo componente

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/DiarioMayor" element={<DiarioMayor />} />
                <Route path="/LibroMayor" element={<LibroMayor />} />
                <Route path="/LibroEstadosFinancieros" element={<LibroEstadosFinancieros />} />
                <Route path="/RegistroAccionistas" element={<RegistroAccionistas />} />
                <Route path="/LibroCapital" element={<LibroCapital />} /> {/* Agrega la nueva ruta */}
            </Routes>
        </Router>
    );
};

export default App;
