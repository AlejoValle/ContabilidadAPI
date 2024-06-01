// src/components/DiarioMayor.js
import React, { useState, useEffect } from 'react';
import { addRegistro, getRegistros, deleteRegistro } from '../indexedDB';
import './DiarioMayor.css';
import { v4 as uuidv4 } from 'uuid';

const DiarioMayor = () => {
    const [registros, setRegistros] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistros();
            setRegistros(Array.isArray(data) ? data : []);
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newRegistro = {
            id: uuidv4(),
            codigo: event.target.codigo.value,
            detalle: event.target.detalle.value,
            debe: event.target.debe.value,
            haber: event.target.haber.value,
        };

        try {
            await addRegistro(newRegistro);
            setRegistros([...registros, newRegistro]);
            event.target.reset();
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const handleDelete = async (index) => {
        const newRegistros = [...registros];
        const registroEliminado = newRegistros.splice(index, 1)[0];

        try {
            await deleteRegistro(registroEliminado.id);
            setRegistros(newRegistros);
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="diario-container">
            <h1>Diario Mayor</h1>
            <form className="diario-form" onSubmit={handleSubmit}>
                <input type="text" name="codigo" placeholder="Código" required/>
                <input type="text" name="detalle" placeholder="Detalle" required/>
                <input type="text" name="debe" placeholder="Debe" required/>
                <input type="text" name="haber" placeholder="Haber" required/>
                <button type="submit" className="diario-button">Agregar Registro</button>
            </form>
            <table className="diario-table">
                <tbody>
                {registros.map((registro, index) => (
                    <tr key={registro.id}>
                        <td>{registro.codigo}</td>
                        <td>{registro.detalle}</td>
                        <td>{registro.debe}</td>
                        <td>{registro.haber}</td>
                        <td>
                            <button onClick={() => handleDelete(index)} className="diario-delete-button">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

                <thead>
                <tr>
                    <th>Código</th>
                    <th>Detalle</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Acciones</th>
                </tr>
                </thead>

            </table>
        </div>
    );
};

export default DiarioMayor;
