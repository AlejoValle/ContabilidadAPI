import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { addRegistroCapital, getRegistrosCapital, deleteRegistroCapital } from '../indexedDB';
import './LibroCapital.css';

const LibroCapital = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        id: '',
        numeroRegistro: '',
        dia: '',
        mes: '',
        año: '',
        hora: '',
        accion: '',
        cantidad: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosCapital();
            setRegistros(data);
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoRegistro((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registroConId = { ...nuevoRegistro, id: new Date().getTime() };
        try {
            await addRegistroCapital(registroConId);
            setRegistros((prev) => [...prev, registroConId]);
            setNuevoRegistro({
                id: '',
                numeroRegistro: '',
                dia: '',
                mes: '',
                año: '',
                hora: '',
                accion: '',
                cantidad: ''
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const generatePDF = (registro) => {
        const doc = new jsPDF();

        // Establecer fuente y tamaño
        doc.setFont('helvetica');
        doc.setFontSize(12);

        // Posicionamiento de textos
        let yOffset = 20;

        doc.text(`REGISTRO No. ${registro.numeroRegistro}`, 20, yOffset);
        yOffset += 10;

        doc.text(`De acuerdo a Junta General Ordinaria y Extraordinaria, celebrada el dia ${registro.dia} de ${registro.mes} de dos mil ${registro.año} a las ${registro.hora} horas; se acordó:`, 20, yOffset, { maxWidth: 170 });
        yOffset += 20;

        doc.text(`Puntos De Carácter Extraordinario:`, 20, yOffset);
        yOffset += 10;

        const puntoUno = `Punto Uno: Por decisión unánime de la representación de los socios aprueban el ${registro.accion} de capital por capitalización de utilidades que corresponden al ejercicio 2013, por la cantidad de ${registro.cantidad} DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA ascendiendo el capital social de la sociedad a la cantidad de ${registro.cantidad} DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA.`;
        doc.text(puntoUno, 20, yOffset, { maxWidth: 170 });
        yOffset += 30;  // Ajustar según sea necesario para evitar superposición

        const puntoDos = `Punto Dos: Por el ${registro.accion} de capital antes citado, modificar la cláusula QUINTA del pacto social vigente.`;
        doc.text(puntoDos, 20, yOffset, { maxWidth: 170 });
        yOffset += 20;

        // Agregar firmas
        doc.text(`PRESIDENTE`, 20, yOffset);
        doc.text(`SECRETARIO`, 160, yOffset);

        // Guardar PDF
        doc.save(`Registro_${registro.numeroRegistro}.pdf`);
    };

    const handleDelete = async (id) => {
        try {
            await deleteRegistroCapital(id);
            setRegistros((prev) => prev.filter(registro => registro.id !== id));
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="libro-capital-container">
            <h1>Libro de Capital</h1>
            <form onSubmit={handleSubmit} className="libro-capital-form">
                <input
                    type="text"
                    name="numeroRegistro"
                    value={nuevoRegistro.numeroRegistro}
                    onChange={handleInputChange}
                    placeholder="N° de registro"
                    required
                />
                <input
                    type="text"
                    name="dia"
                    value={nuevoRegistro.dia}
                    onChange={handleInputChange}
                    placeholder="Día"
                    required
                />
                <input
                    type="text"
                    name="mes"
                    value={nuevoRegistro.mes}
                    onChange={handleInputChange}
                    placeholder="Mes"
                    required
                />
                <input
                    type="text"
                    name="año"
                    value={nuevoRegistro.año}
                    onChange={handleInputChange}
                    placeholder="Año"
                    required
                />
                <input
                    type="text"
                    name="hora"
                    value={nuevoRegistro.hora}
                    onChange={handleInputChange}
                    placeholder="Hora"
                    required
                />
                <select
                    name="accion"
                    value={nuevoRegistro.accion}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Seleccione una acción</option>
                    <option value="Aumento de capital">Aumento de capital</option>
                    <option value="Disminución de capital">Disminución de capital</option>
                </select>
                <input
                    type="number"
                    name="cantidad"
                    value={nuevoRegistro.cantidad}
                    onChange={handleInputChange}
                    placeholder="Cantidad"
                    required
                />
                <button type="submit" className="libro-capital-button">
                    Agregar Registro
                </button>
            </form>
            <div className="libro-capital-registros">
                {registros.map((registro) => (
                    <div key={registro.id} className="libro-capital-card">
                        <table className="libro-capital-table">
                            <tbody>
                            <tr><td>N° de registro:</td><td>{registro.numeroRegistro}</td></tr>
                            <tr><td>Día:</td><td>{registro.dia}</td></tr>
                            <tr><td>Mes:</td><td>{registro.mes}</td></tr>
                            <tr><td>Año:</td><td>{registro.año}</td></tr>
                            <tr><td>Hora:</td><td>{registro.hora}</td></tr>
                            <tr><td>Acción:</td><td>{registro.accion}</td></tr>
                            <tr><td>Cantidad:</td><td>{registro.cantidad}</td></tr>
                            </tbody>
                        </table>
                        <button
                            onClick={() => generatePDF(registro)}
                            className="libro-capital-download-button"
                        >
                            Descargar PDF
                        </button>
                        <button
                            onClick={() => handleDelete(registro.id)}
                            className="libro-capital-delete-button"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibroCapital;
