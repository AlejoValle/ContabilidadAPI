import React, { useState } from 'react';
import './ActaJuntaAccionistas.css';

const pdfOptions = [
    { label: 'Acta Número Uno', url: '/pdfs/Acta Numero Uno.pdf' },
    { label: 'Acta Número X', url: '/pdfs/Acta Numero x.pdf' }, // Asume que tienes un ActaX.pdf
    { label: 'Desarrollo de la Agenda', url: '/pdfs/DESARROLLO DE LA AGENDA.pdf' },
    { label: 'Desarrollo de la Agenda Final', url: '/pdfs/DESARROLLO DE LA AGENDA FINAL.pdf' }
];

const ActaJuntaAccionistas = () => {
    const [selectedPdf, setSelectedPdf] = useState(pdfOptions[0]);

    const handlePdfChange = (e) => {
        const selected = pdfOptions.find(option => option.label === e.target.value);
        setSelectedPdf(selected);
    };

    return (
        <div className="acta-junta-container">
            <h1>Acta Junta de Accionistas</h1>
            <h3>Selecciona un acta para visualizar:</h3>
            <div className="selector-container">
                <label htmlFor="pdf-selector">Selecciona un PDF:</label>
                <select id="pdf-selector" onChange={handlePdfChange}>
                    {pdfOptions.map((option, index) => (
                        <option key={index} value={option.label}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="pdf-container">
                <iframe src={selectedPdf.url} width="100%" height="600px" title={selectedPdf.label}></iframe>
            </div>
            <a href={selectedPdf.url} download={selectedPdf.label} className="download-button">
                Descargar PDF
            </a>
        </div>
    );
};

export default ActaJuntaAccionistas;
