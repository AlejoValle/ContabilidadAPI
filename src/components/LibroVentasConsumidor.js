import React, { useState, useEffect } from 'react';
import { addRegistroVentasConsumidor, getRegistrosVentasConsumidor, deleteRegistroVentasConsumidor } from '../indexedDB';
import './LibroVentasConsumidor.css';
import { v4 as uuidv4 } from 'uuid';

const inputs = [
    { name: 'fecha', placeholder: 'Fecha Emisión', type: 'date' },
    { name: 'delNumero', placeholder: 'Del N°', type: 'text' },
    { name: 'alNumero', placeholder: 'Al N°', type: 'text' },
    { name: 'numeroMaquina', placeholder: 'N° de Maquina Registradora', type: 'text' },
    { name: 'ventasExentas', placeholder: 'Ventas Exentas', type: 'number' },
    { name: 'ventasNoSujetas', placeholder: 'Ventas No Sujetas', type: 'number' },
    { name: 'ventasLocales', placeholder: 'Ventas Locales', type: 'number' },
    { name: 'exportacion', placeholder: 'Exportación', type: 'number' },
    { name: 'totalVentas', placeholder: 'Total Ventas', type: 'number', disabled: true },
    { name: 'ventasTerceros', placeholder: 'Ventas a Cuenta de Terceros', type: 'number' },
];

const LibroVentasConsumidor = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        id: '',
        fecha: '',
        delNumero: '',
        alNumero: '',
        numeroMaquina: '',
        ventasExentas: '',
        ventasNoSujetas: '',
        ventasLocales: '',
        exportacion: '',
        totalVentas: '',
        ventasTerceros: ''
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
        setNuevoRegistro((prev) => {
            const updatedRegistro = { ...prev, [name]: value };
            updatedRegistro.totalVentas = (
                parseFloat(updatedRegistro.ventasExentas || 0) +
                parseFloat(updatedRegistro.ventasNoSujetas || 0) +
                parseFloat(updatedRegistro.ventasLocales || 0) +
                parseFloat(updatedRegistro.exportacion || 0)
            ).toFixed(2);
            return updatedRegistro;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registroConId = { ...nuevoRegistro, id: uuidv4() };
        try {
            await addRegistroVentasConsumidor(registroConId);
            setRegistros((prev) => [...prev, registroConId]);
            setNuevoRegistro({
                id: '',
                fecha: '',
                delNumero: '',
                alNumero: '',
                numeroMaquina: '',
                ventasExentas: '',
                ventasNoSujetas: '',
                ventasLocales: '',
                exportacion: '',
                totalVentas: '',
                ventasTerceros: ''
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

    return (
        <div className="libro-ventas-container">
            <h1>Libro de Ventas a Consumidor Final</h1>
            <form onSubmit={handleSubmit} className="libro-ventas-form">
                {inputs.map((input) => (
                    <div className="input-container" key={input.name}>
                        <input
                            type={input.type}
                            name={input.name}
                            value={nuevoRegistro[input.name]}
                            onChange={handleInputChange}
                            placeholder={input.placeholder}
                            required={!input.disabled}
                            disabled={input.disabled}
                        />
                    </div>
                ))}
                <button type="submit" className="libro-ventas-button">
                    Agregar Registro
                </button>
            </form>
            <div className="libro-ventas-registros">
                <table className="libro-ventas-table">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Fecha Emisión</th>
                        <th>Del N°</th>
                        <th>Al N°</th>
                        <th>N° de Maquina Registradora</th>
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
                            <td data-label="No.">{index + 1}</td>
                            <td data-label="Fecha Emisión">{registro.fecha}</td>
                            <td data-label="Del N°">{registro.delNumero}</td>
                            <td data-label="Al N°">{registro.alNumero}</td>
                            <td data-label="N° de Maquina Registradora">{registro.numeroMaquina}</td>
                            <td data-label="Ventas Exentas">${registro.ventasExentas}</td>
                            <td data-label="Ventas No Sujetas">${registro.ventasNoSujetas}</td>
                            <td data-label="Ventas Locales">${registro.ventasLocales}</td>
                            <td data-label="Exportación">${registro.exportacion}</td>
                            <td data-label="Total Ventas">${registro.totalVentas}</td>
                            <td data-label="Ventas a Cuenta de Terceros">${registro.ventasTerceros}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(registro.id)}
                                    className="libro-ventas-delete-button"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5">Total</td>
                        <td data-label="Ventas Exentas">${registros.reduce((sum, reg) => sum + parseFloat(reg.ventasExentas || 0), 0).toFixed(2)}</td>
                        <td data-label="Ventas No Sujetas">${registros.reduce((sum, reg) => sum + parseFloat(reg.ventasNoSujetas || 0), 0).toFixed(2)}</td>
                        <td data-label="Ventas Locales">${registros.reduce((sum, reg) => sum + parseFloat(reg.ventasLocales || 0), 0).toFixed(2)}</td>
                        <td data-label="Exportación">${registros.reduce((sum, reg) => sum + parseFloat(reg.exportacion || 0), 0).toFixed(2)}</td>
                        <td data-label="Total Ventas">${registros.reduce((sum, reg) => sum + parseFloat(reg.totalVentas || 0), 0).toFixed(2)}</td>
                        <td data-label="Ventas a Cuenta de Terceros">${registros.reduce((sum, reg) => sum + parseFloat(reg.ventasTerceros || 0), 0).toFixed(2)}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibroVentasConsumidor;

