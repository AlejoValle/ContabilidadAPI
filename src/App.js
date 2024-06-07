// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiarioMayor from './components/DiarioMayor';
import Home from './web/Home';
import LibroMayor from './components/LibroMayor';
import LibroEstadosFinancieros from './components/LibroEstadosFinancieros';
import RegistroAccionistas from './components/RegistroAccionistas';
import LibroCapital from './components/LibroCapital'; // Importa el nuevo componente
import ActaJuntaAccionistas from "./components/ActaJuntaAccionistas";
import LibroCompras from "./components/LibroCompras";
import LibroVentasContribuyente from './components/LibroVentasContribuyente'; // Importa el nuevo componente
import LibroVentasConsumidor from "./components/LibroVentasConsumidor";
import CapitalLibro from "./components/CapitalLibro";
import MobileMenu from "./components/MobileMenu";
import './App.css';

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
                <Route path="/ActaJuntaAccionistas" element={<ActaJuntaAccionistas />} />
                <Route path="/LibroCompras" element={<LibroCompras />} />
                <Route path="/LibroVentasContribuyente" element={<LibroVentasContribuyente />} /> {/* Agrega la nueva ruta */}
                <Route path="/LibroVentasConsumidor" element={<LibroVentasConsumidor />} />
                <Route path="/CapitalLibro" element={<CapitalLibro />} />
                <Route path="/Movil/*" element={<MobileMenu />} />
            </Routes>
        </Router>
    );
};

export default App;
