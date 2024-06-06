import React, { useState } from 'react';
import actaNumeroUnoImage from './images/Acta Numero Uno.png';
import desarrolloAgendaFinalImage from './images/DESARROLLO DE LA AGENDA FINAL.png';
import desarrolloAgendaImage from './images/DESARROLLO DE LA AGENDA.png';
import actaXImage from './images/Acta Numero x.png';
import './ActaJuntaAccionistas.css';

const ActaJuntaAccionistas = () => {
    const [selectedActa, setSelectedActa] = useState('');

    const handleActaChange = (event) => {
        setSelectedActa(event.target.value);
    };

    const getActaImage = () => {
        switch (selectedActa) {
            case 'ActaNumeroUno':
                return actaNumeroUnoImage;
            case 'DesarrolloAgendaFinal':
                return desarrolloAgendaFinalImage;
            case 'DesarrolloAgenda':
                return desarrolloAgendaImage;
            case 'ActaX':
                return actaXImage;
            default:
                return null;
        }
    };

    const getActaPdf = () => {
        switch (selectedActa) {
            case 'ActaNumeroUno':
                return './pdfs/Acta Numero Uno.pdf';
            case 'DesarrolloAgendaFinal':
                return './pdfs/DESARROLLO DE LA AGENDA FINAL.pdf';
            case 'DesarrolloAgenda':
                return './pdfs/DESARROLLO DE LA AGENDA.pdf';
            case 'ActaX':
                return './pdfs/Acta Numero x.pdf';
            default:
                return null;
        }
    };

    return (
        <div className="acta-junta-container">
            <h1>Acta Junta de Accionistas</h1>
            <select value={selectedActa} onChange={handleActaChange}>
                <option value="">Seleccione Acta</option>
                <option value="ActaNumeroUno">Acta Número Uno</option>
                <option value="DesarrolloAgendaFinal">Desarrollo de la Agenda Final</option>
                <option value="DesarrolloAgenda">Desarrollo de la Agenda</option>
                <option value="ActaX">Acta Número X</option>
            </select>
            {selectedActa && (
                <div className="acta-image-container">
                    <img src={getActaImage()} alt={`Imagen de ${selectedActa}`} className="acta-image" />
                    <div className="download-button-container">
                        <a href={getActaPdf()} download className="download-button">
                            Descargar PDF
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActaJuntaAccionistas;
