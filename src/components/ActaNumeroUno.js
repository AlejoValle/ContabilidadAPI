// src/components/ActaNumeroUno.js
import React from 'react';

const ActaNumeroUno = ({ formData, handleInputChange, generatePDF }) => {
    return (
        <div>
            <h2>Acta Número Uno</h2>
            <div className="acta-junta-form">
                <div className="input-container">
                    <label>Ubicación de la empresa:</label>
                    <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Hora de la reunión:</label>
                    <input type="text" name="hora" value={formData.hora} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Día de la reunión:</label>
                    <input type="text" name="dia" value={formData.dia} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Mes de la reunión:</label>
                    <select name="mes" value={formData.mes} onChange={handleInputChange}>
                        <option value="">Seleccione Mes</option>
                        {[
                            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                        ].map((mes, index) => (
                            <option key={index} value={mes}>{mes}</option>
                        ))}
                    </select>
                </div>
                <div className="input-container">
                    <label>Año de la reunión:</label>
                    <input type="text" name="año" value={formData.año} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Acciones representadas por SOCIO 1:</label>
                    <input type="text" name="accionesSocio1" value={formData.accionesSocio1} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Acciones representadas por SOCIO 2:</label>
                    <input type="text" name="accionesSocio2" value={formData.accionesSocio2} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Año de la memoria de labores:</label>
                    <input type="text" name="memoriaAño" value={formData.memoriaAño} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Año de los estados financieros:</label>
                    <input type="text" name="estadosFinancierosAño" value={formData.estadosFinancierosAño} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Año del nombramiento del auditor:</label>
                    <input type="text" name="nombramientoAuditorAño" value={formData.nombramientoAuditorAño} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Domicilio del auditor:</label>
                    <input type="text" name="domicilioAuditor" value={formData.domicilioAuditor} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de Documento Único de Identidad del auditor:</label>
                    <input type="text" name="documentoIdentidadAuditor" value={formData.documentoIdentidadAuditor} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de Identificación Tributaria del auditor:</label>
                    <input type="text" name="identificacionTributariaAuditor" value={formData.identificacionTributariaAuditor} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de inscripción del auditor:</label>
                    <input type="text" name="inscripcionAuditor" value={formData.inscripcionAuditor} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Honorarios del auditor:</label>
                    <input type="text" name="honorariosAuditor" value={formData.honorariosAuditor} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Nombre del auditor suplente:</label>
                    <input type="text" name="auditorSuplente" value={formData.auditorSuplente} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de Documento Único de Identidad del auditor suplente:</label>
                    <input type="text" name="documentoIdentidadAuditorSuplente" value={formData.documentoIdentidadAuditorSuplente} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de Identificación Tributaria del auditor suplente:</label>
                    <input type="text" name="identificacionTributariaAuditorSuplente" value={formData.identificacionTributariaAuditorSuplente} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Número de inscripción del auditor suplente:</label>
                    <input type="text" name="inscripcionAuditorSuplente" value={formData.inscripcionAuditorSuplente} onChange={handleInputChange} />
                </div>
                <button onClick={generatePDF}>Generar PDF</button>
            </div>
        </div>
    );
};

export default ActaNumeroUno;
