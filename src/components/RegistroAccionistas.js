import React, { useState, useEffect } from 'react';
import { getRegistrosAccionistas, addRegistroAccionista, deleteRegistroAccionista } from '../indexedDB';
import './RegistroAccionistas.css';
import { v4 as uuidv4 } from 'uuid';

const RegistroAccionistas = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        id: uuidv4(),
        nombre: '',
        concepto: '',
        domicilio: '',
        fecha: '',
        numeroCertificado: '',
        serie: '',
        numeroAcciones: '',
        valorNominal: '',
        saldoAnterior: 0,
        aumento: 0,
        disminucion: 0,
        nuevoSaldo: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosAccionistas();
            setRegistros(data);
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoRegistro({ ...nuevoRegistro, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addRegistroAccionista(nuevoRegistro);
            setRegistros([...registros, nuevoRegistro]);
            setNuevoRegistro({
                id: uuidv4(),
                nombre: '',
                concepto: '',
                domicilio: '',
                fecha: '',
                numeroCertificado: '',
                serie: '',
                numeroAcciones: '',
                valorNominal: '',
                saldoAnterior: 0,
                aumento: 0,
                disminucion: 0,
                nuevoSaldo: 0,
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const handleDelete = async (index) => {
        const registroEliminado = registros[index];
        try {
            await deleteRegistroAccionista(registroEliminado.id);
            const nuevosRegistros = registros.filter((_, i) => i !== index);
            setRegistros(nuevosRegistros);
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="registro-accionistas-container">
            <h1>Registro de Accionistas</h1>
            <form onSubmit={handleSubmit} className="registro-accionistas-form">
                <input
                    type="text"
                    name="nombre"
                    value={nuevoRegistro.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre del Accionista"
                    required
                />
                <input
                    type="text"
                    name="concepto"
                    value={nuevoRegistro.concepto}
                    onChange={handleInputChange}
                    placeholder="Concepto"
                    required
                />
                <input
                    type="text"
                    name="domicilio"
                    value={nuevoRegistro.domicilio}
                    onChange={handleInputChange}
                    placeholder="Domicilio"
                    required
                />
                <input
                    type="date"
                    name="fecha"
                    value={nuevoRegistro.fecha}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="numeroCertificado"
                    value={nuevoRegistro.numeroCertificado}
                    onChange={handleInputChange}
                    placeholder="Número de Certificado"
                    required
                />
                <input
                    type="text"
                    name="serie"
                    value={nuevoRegistro.serie}
                    onChange={handleInputChange}
                    placeholder="Serie"
                    required
                />
                <input
                    type="number"
                    name="numeroAcciones"
                    value={nuevoRegistro.numeroAcciones}
                    onChange={handleInputChange}
                    placeholder="Número de Acciones"
                    required
                />
                <input
                    type="number"
                    name="valorNominal"
                    value={nuevoRegistro.valorNominal}
                    onChange={handleInputChange}
                    placeholder="Valor Nominal"
                    required
                />
                <input
                    type="number"
                    name="saldoAnterior"
                    value={nuevoRegistro.saldoAnterior}
                    onChange={handleInputChange}
                    placeholder="Saldo Anterior"
                    required
                />
                <input
                    type="number"
                    name="aumento"
                    value={nuevoRegistro.aumento}
                    onChange={handleInputChange}
                    placeholder="Aumento"
                    required
                />
                <input
                    type="number"
                    name="disminucion"
                    value={nuevoRegistro.disminucion}
                    onChange={handleInputChange}
                    placeholder="Disminución"
                    required
                />
                <input
                    type="number"
                    name="nuevoSaldo"
                    value={nuevoRegistro.nuevoSaldo}
                    onChange={handleInputChange}
                    placeholder="Nuevo Saldo"
                    required
                />
                <button type="submit" className="registro-accionistas-button">
                    Agregar Registro
                </button>
            </form>
            <table className="registro-accionistas-table">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Concepto</th>
                    <th>Domicilio</th>
                    <th>Fecha</th>
                    <th>Número de Certificado</th>
                    <th>Serie</th>
                    <th>Número de Acciones</th>
                    <th>Valor Nominal</th>
                    <th>Saldo Anterior</th>
                    <th>Aumento</th>
                    <th>Disminución</th>
                    <th>Nuevo Saldo</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {registros.map((registro, index) => (
                    <tr key={index}>
                        <td>{registro.nombre}</td>
                        <td>{registro.concepto}</td>
                        <td>{registro.domicilio}</td>
                        <td>{registro.fecha}</td>
                        <td>{registro.numeroCertificado}</td>
                        <td>{registro.serie}</td>
                        <td>{registro.numeroAcciones}</td>
                        <td>{registro.valorNominal}</td>
                        <td>{registro.saldoAnterior}</td>
                        <td>{registro.aumento}</td>
                        <td>{registro.disminucion}</td>
                        <td>{registro.nuevoSaldo}</td>
                        <td>
                            <button
                                onClick={() => handleDelete(index)}
                                className="registro-accionistas-delete-button"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RegistroAccionistas;
