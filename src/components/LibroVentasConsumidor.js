import React, { useState, useEffect } from 'react';
import { addRegistroVentasConsumidor, getRegistrosVentasConsumidor, deleteRegistroVentasConsumidor } from '../indexedDB';
import './LibroVentasConsumidor.css';
import { v4 as uuidv4 } from 'uuid';

const LibroVentasConsumidor = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        fecha: '',
        delNumero: '',
        alNumero: '',
        numeroMaquina: '',
        ventasExentas: '',
        ventasNoSujetas: '',
        ventasLocales: '',
        exportacion: '',
        ventasTerceros: '',
        totalVentas: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosVentasConsumidor();
            setRegistros(data);
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoRegistro((prev) => ({ ...prev, [name]: value }));
    };

    const calculateTotalVentas = (registro) => {
        const exentas = parseFloat(registro.ventasExentas) || 0;
        const noSujetas = parseFloat(registro.ventasNoSujetas) || 0;
        const locales = parseFloat(registro.ventasLocales) || 0;
        const exportacion = parseFloat(registro.exportacion) || 0;
        return (exentas + noSujetas + locales + exportacion).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registroConId = { ...nuevoRegistro, id: uuidv4(), totalVentas: calculateTotalVentas(nuevoRegistro) };
        try {
            await addRegistroVentasConsumidor(registroConId);
            setRegistros((prev) => [...prev, registroConId]);
            setNuevoRegistro({
                fecha: '',
                delNumero: '',
                alNumero: '',
                numeroMaquina: '',
                ventasExentas: '',
                ventasNoSujetas: '',
                ventasLocales: '',
                exportacion: '',
                ventasTerceros: '',
                totalVentas: ''
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRegistroVentasConsumidor(id);
            setRegistros((prev) => prev.filter(registro => registro.id !== id));
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    const totalSum = (key) => {
        return registros.reduce((acc, registro) => acc + (parseFloat(registro[key]) || 0), 0).toFixed(2);
    };

    return (
        <div className="ventas-consumidor-container">
            <h1>Libro de Ventas a Consumidor Final</h1>
            <form className="ventas-consumidor-form" onSubmit={handleSubmit}>
                <input type="date" name="fecha" value={nuevoRegistro.fecha} onChange={handleInputChange} required placeholder="Fecha" />
                <input type="text" name="delNumero" value={nuevoRegistro.delNumero} onChange={handleInputChange} placeholder="Del N°" />
                <input type="text" name="alNumero" value={nuevoRegistro.alNumero} onChange={handleInputChange} placeholder="Al N°" />
                <input type="text" name="numeroMaquina" value={nuevoRegistro.numeroMaquina} onChange={handleInputChange} placeholder="N° de Máquina Registradora" />
                <input type="number" name="ventasExentas" value={nuevoRegistro.ventasExentas} onChange={handleInputChange} placeholder="Ventas Exentas" step="0.01" />
                <input type="number" name="ventasNoSujetas" value={nuevoRegistro.ventasNoSujetas} onChange={handleInputChange} placeholder="Ventas No Sujetas" step="0.01" />
                <input type="number" name="ventasLocales" value={nuevoRegistro.ventasLocales} onChange={handleInputChange} placeholder="Ventas Locales" step="0.01" />
                <input type="number" name="exportacion" value={nuevoRegistro.exportacion} onChange={handleInputChange} placeholder="Exportación" step="0.01" />
                <input type="number" name="ventasTerceros" value={nuevoRegistro.ventasTerceros} onChange={handleInputChange} placeholder="Ventas a Cuenta de Terceros" step="0.01" />
                <button type="submit" className="ventas-consumidor-button">Agregar Registro</button>
            </form>
            <table className="ventas-consumidor-table">
                <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha</th>
                    <th>Del N°</th>
                    <th>Al N°</th>
                    <th>N° de Máquina Registradora</th>
                    <th>Ventas Exentas</th>
                    <th>Ventas No Sujetas</th>
                    <th>Ventas Locales</th>
                    <th>Exportación</th>
                    <th>Total Ventas</th>
                    <th>Ventas a Cuenta de Terceros</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {registros.map((registro, index) => (
                    <tr key={registro.id}>
                        <td>{index + 1}</td>
                        <td>{registro.fecha}</td>
                        <td>{registro.delNumero}</td>
                        <td>{registro.alNumero}</td>
                        <td>{registro.numeroMaquina}</td>
                        <td>${parseFloat(registro.ventasExentas).toFixed(2)}</td>
                        <td>${parseFloat(registro.ventasNoSujetas).toFixed(2)}</td>
                        <td>${parseFloat(registro.ventasLocales).toFixed(2)}</td>
                        <td>${parseFloat(registro.exportacion).toFixed(2)}</td>
                        <td>${parseFloat(registro.totalVentas).toFixed(2)}</td>
                        <td>${parseFloat(registro.ventasTerceros).toFixed(2)}</td>
                        <td>
                            <button onClick={() => handleDelete(registro.id)} className="ventas-consumidor-delete-button">Eliminar</button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan="5">Total</td>
                    <td>${totalSum('ventasExentas')}</td>
                    <td>${totalSum('ventasNoSujetas')}</td>
                    <td>${totalSum('ventasLocales')}</td>
                    <td>${totalSum('exportacion')}</td>
                    <td>${totalSum('totalVentas')}</td>
                    <td>${totalSum('ventasTerceros')}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default LibroVentasConsumidor;
