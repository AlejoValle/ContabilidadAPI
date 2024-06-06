import React, { useState, useEffect } from 'react';
import { addRegistroCompras, getRegistrosCompras, deleteRegistroCompras } from '../indexedDB';
import './LibroCompras.css';

const inputs = [
    { name: 'fechaEmision', placeholder: 'Fecha de Emisión', type: 'date' },
    { name: 'numeroDocumento', placeholder: 'Número de Documento', type: 'text' },
    { name: 'nrc', placeholder: 'NRC', type: 'text' },
    { name: 'nitDui', placeholder: 'NIT o DUI', type: 'text' },
    { name: 'nombreProveedor', placeholder: 'Nombre del Proveedor', type: 'text' },
    { name: 'comprasExentasInternas', placeholder: 'Compras Exentas Internas', type: 'number' },
    { name: 'comprasExentasInternacionales', placeholder: 'Compras Exentas Internacionales', type: 'number' },
    { name: 'comprasExentasImportaciones', placeholder: 'Compras Exentas Importaciones', type: 'number' },
    { name: 'comprasGravadasInternas', placeholder: 'Compras Gravadas Internas', type: 'number' },
    { name: 'comprasGravadasInternacionales', placeholder: 'Compras Gravadas Internacionales', type: 'number' },
    { name: 'comprasGravadasImportaciones', placeholder: 'Compras Gravadas Importaciones', type: 'number' },
    { name: 'creditoFiscal', placeholder: 'Crédito Fiscal', type: 'number' },
    { name: 'fovial', placeholder: 'FOVIAL', type: 'number' },
    { name: 'cotrans', placeholder: 'COTRANS', type: 'number' },
    { name: 'cesc', placeholder: 'CESC', type: 'number' },
    { name: 'anticipoIva', placeholder: 'Anticipo IVA', type: 'number' },
    { name: 'totalCompras', placeholder: 'Total Compras', type: 'number' },
    { name: 'retencionTerceros', placeholder: 'Retención a Terceros', type: 'number' },
    { name: 'comprasSujetosExcluidos', placeholder: 'Compras a Sujetos Excluidos', type: 'number' },
];

const LibroCompras = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState({
        fechaEmision: '',
        numeroDocumento: '',
        nrc: '',
        nitDui: '',
        nombreProveedor: '',
        comprasExentasInternas: '',
        comprasExentasInternacionales: '',
        comprasExentasImportaciones: '',
        comprasGravadasInternas: '',
        comprasGravadasInternacionales: '',
        comprasGravadasImportaciones: '',
        creditoFiscal: '',
        fovial: '',
        cotrans: '',
        cesc: '',
        anticipoIva: '',
        totalCompras: '',
        retencionTerceros: '',
        comprasSujetosExcluidos: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosCompras();
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
        try {
            await addRegistroCompras(nuevoRegistro);
            setRegistros((prev) => [...prev, nuevoRegistro]);
            setNuevoRegistro({
                fechaEmision: '',
                numeroDocumento: '',
                nrc: '',
                nitDui: '',
                nombreProveedor: '',
                comprasExentasInternas: '',
                comprasExentasInternacionales: '',
                comprasExentasImportaciones: '',
                comprasGravadasInternas: '',
                comprasGravadasInternacionales: '',
                comprasGravadasImportaciones: '',
                creditoFiscal: '',
                fovial: '',
                cotrans: '',
                cesc: '',
                anticipoIva: '',
                totalCompras: '',
                retencionTerceros: '',
                comprasSujetosExcluidos: '',
            });
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRegistroCompras(id);
            setRegistros((prev) => prev.filter((registro) => registro.id !== id));
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="libro-compras-container">
            <h1>Libro de Compras</h1>
            <form className="libro-compras-form" onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <div className="input-container" key={input.name}>
                        <input
                            type={input.type}
                            name={input.name}
                            value={nuevoRegistro[input.name]}
                            onChange={handleInputChange}
                            placeholder={input.placeholder}
                            required
                        />
                    </div>
                ))}
                <button type="submit" className="libro-compras-button">Agregar Registro</button>
            </form>
            <div className="libro-compras-card">
                <table className="libro-compras-table">
                    <thead>
                    <tr>
                        <th>Fecha de Emisión</th>
                        <th>Número de Documento</th>
                        <th>NRC</th>
                        <th>NIT o DUI</th>
                        <th>Nombre del Proveedor</th>
                        <th>Compras Exentas Internas</th>
                        <th>Compras Exentas Internacionales</th>
                        <th>Compras Exentas Importaciones</th>
                        <th>Compras Gravadas Internas</th>
                        <th>Compras Gravadas Internacionales</th>
                        <th>Compras Gravadas Importaciones</th>
                        <th>Crédito Fiscal</th>
                        <th>FOVIAL</th>
                        <th>COTRANS</th>
                        <th>CESC</th>
                        <th>Anticipo IVA</th>
                        <th>Total Compras</th>
                        <th>Retención a Terceros</th>
                        <th>Compras a Sujetos Excluidos</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {registros.map((registro, index) => (
                        <tr key={registro.id}>
                            <td data-label="Fecha de Emisión">{registro.fechaEmision}</td>
                            <td data-label="Número de Documento">{registro.numeroDocumento}</td>
                            <td data-label="NRC">{registro.nrc}</td>
                            <td data-label="NIT o DUI">{registro.nitDui}</td>
                            <td data-label="Nombre del Proveedor">{registro.nombreProveedor}</td>
                            <td data-label="Compras Exentas Internas">{`$${registro.comprasExentasInternas}`}</td>
                            <td data-label="Compras Exentas Internacionales">{`$${registro.comprasExentasInternacionales}`}</td>
                            <td data-label="Compras Exentas Importaciones">{`$${registro.comprasExentasImportaciones}`}</td>
                            <td data-label="Compras Gravadas Internas">{`$${registro.comprasGravadasInternas}`}</td>
                            <td data-label="Compras Gravadas Internacionales">{`$${registro.comprasGravadasInternacionales}`}</td>
                            <td data-label="Compras Gravadas Importaciones">{`$${registro.comprasGravadasImportaciones}`}</td>
                            <td data-label="Crédito Fiscal">{`$${registro.creditoFiscal}`}</td>
                            <td data-label="FOVIAL">{`$${registro.fovial}`}</td>
                            <td data-label="COTRANS">{`$${registro.cotrans}`}</td>
                            <td data-label="CESC">{`$${registro.cesc}`}</td>
                            <td data-label="Anticipo IVA">{`$${registro.anticipoIva}`}</td>
                            <td data-label="Total Compras">{`$${registro.totalCompras}`}</td>
                            <td data-label="Retención a Terceros">{`$${registro.retencionTerceros}`}</td>
                            <td data-label="Compras a Sujetos Excluidos">{`$${registro.comprasSujetosExcluidos}`}</td>
                            <td>
                                <button onClick={() => handleDelete(registro.id)} className="libro-compras-delete-button">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibroCompras;
