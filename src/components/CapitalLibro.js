// src/components/CapitalLibro.js
import React from 'react';
import libroCapitalImage from './images/Aumento capital.png';
import './CapitalLibro.css';

const CapitalLibro = () => {
    const libroPdf = './pdfs/Aumento_y_Disminucion.pdf';

    return (
        <div className="capital-libro-container">
            <h1>Libro Capital</h1>
            <div className="libro-image-container">
                <img src={libroCapitalImage} alt="Imagen del Libro Capital" className="libro-image" />
                <div className="download-button-container">
                    <a href={libroPdf} download className="download-button">
                        Descargar PDF
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CapitalLibro;
