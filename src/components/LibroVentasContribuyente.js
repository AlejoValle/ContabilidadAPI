import React, { useState, useEffect } from 'react';
import { addRegistroVentas, getRegistrosVentas, deleteRegistroVentas } from '../indexedDB';
import './LibroVentasContribuyente.css';
import { v4 as uuidv4 } from 'uuid';

const inputs = [
    { name: 'fecha', placeholder: 'Fecha Emisión', type: 'date' },
    { name: 'numeroDocumento', placeholder: 'Número Correlativo de Documento', type: 'text' },
    { name: 'nrc', placeholder: 'NRC', type: 'text' },
    { name: 'nombreContribuyente', placeholder: 'Nombre del Contribuyente', type: 'text' },
    { name: 'exentas', placeholder: 'Exentas', type: 'number' },
    { name: 'noSujetas', placeholder: 'No Sujetas', type: 'number' },
    { name: 'gravadasLocales', placeholder: 'Gravadas Locales', type: 'number' },
    { name: 'ventasTerceros', placeholder: 'Ventas a Cuenta de Terceros', type: 'number' },
    { name: 'debitoFiscal', placeholder: 'Débito Fiscal', type: 'number', disabled: true },
    { name: 'debitoTerceros', placeholder: 'Débito F. a Cta. de Terceros', type: 'number', disabled: true },
    { name: 'ivaPercibido', placeholder: 'IVA Percibido', type: 'number' },
    { name: 'ivaRetenido', placeholder: 'IVA Retenido', type: 'number' },
    { name: 'totalVentas', placeholder: 'Total Ventas', type: 'number', disabled: true },
];

const LibroVentasContribuyente = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        id: '',
        fecha: '',
        numeroDocumento: '',
        nrc: '',
        nombreContribuyente: '',
        exentas: '',
        noSujetas: '',
        gravadasLocales: '',
        ventasTerceros: '',
        debitoFiscal: '',
        debitoTerceros: '',
        ivaPercibido: '',
        ivaRetenido: '',
        totalVentas: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosVentas();
            setRegistros(data);
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoRegistro((prev) => {
            const updatedRegistro = { ...prev, [name]: value };
            if (name === 'gravadasLocales') {
                updatedRegistro.debitoFiscal = (value * 0.13).toFixed(2);
            }
            if (name === 'ventasTerceros') {
                updatedRegistro.debitoTerceros = (value * 0.13).toFixed(2);
            }
            updatedRegistro.totalVentas = (
                parseFloat(updatedRegistro.exentas || 0) +
                parseFloat(updatedRegistro.noSujetas || 0) +
                parseFloat(updatedRegistro.gravadasLocales || 0) +
                parseFloat(updatedRegistro.ventasTerceros || 0)
            ).toFixed(2);
            return updatedRegistro;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registroConId = { ...nuevoRegistro, id: uuidv4() };
        try {
            await addRegistroVentas(registroConId);
            setRegistros((prev) => [...prev, registroConId]);
            setNuevoRegistro({
                id: '',
                fecha: '',
                numeroDocumento: '',
                nrc: '',
                nombreContribuyente: '',
                exentas: '',
                noSujetas: '',
                gravadasLocales: '',
                ventasTerceros: '',
                debitoFiscal: '',
                debitoTerceros: '',
                ivaPercibido: '',
                ivaRetenido: '',
                totalVentas: ''
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRegistroVentas(id);
            setRegistros((prev) => prev.filter(registro => registro.id !== id));
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="libro-ventas-container">
            <h1>Libro de Ventas a Contribuyentes</h1>
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
                        <th>Número Documento</th>
                        <th>NRC</th>
                        <th>Nombre del Contribuyente</th>
                        <th>Exentas</th>
                        <th>No Sujetas</th>
                        <th>Gravadas Locales</th>
                        <th>Débito Fiscal</th>
                        <th>Ventas a Cuenta de Terceros</th>
                        <th>Débito F. a Cta. de Terceros</th>
                        <th>IVA Percibido</th>
                        <th>IVA Retenido</th>
                        <th>Total Ventas</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registros.map((registro, index) => (
                        <tr key={registro.id}>
                            <td>{index + 1}</td>
                            <td>{registro.fecha}</td>
                            <td>{registro.numeroDocumento}</td>
                            <td>{registro.nrc}</td>
                            <td>{registro.nombreContribuyente}</td>
                            <td>${registro.exentas}</td>
                            <td>${registro.noSujetas}</td>
                            <td>${registro.gravadasLocales}</td>
                            <td>${registro.debitoFiscal}</td>
                            <td>${registro.ventasTerceros}</td>
                            <td>${registro.debitoTerceros}</td>
                            <td>${registro.ivaPercibido}</td>
                            <td>${registro.ivaRetenido}</td>
                            <td>${registro.totalVentas}</td>
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
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.exentas || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.noSujetas || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.gravadasLocales || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.debitoFiscal || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.ventasTerceros || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.debitoTerceros || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.ivaPercibido || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.ivaRetenido || 0), 0).toFixed(2)}</td>
                        <td>${registros.reduce((sum, reg) => sum + parseFloat(reg.totalVentas || 0), 0).toFixed(2)}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibroVentasContribuyente;
