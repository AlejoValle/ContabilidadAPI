// src/components/LibroCompras.js

import React, { useState, useEffect } from 'react';
import { addRegistroCompras, getRegistrosCompras, deleteRegistroCompras } from '../indexedDB';
import './LibroCompras.css';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

const LibroCompras = () => {
    const [registros, setRegistros] = useState([]);
    const [nextId, setNextId] = useState(1); // ID incremental
    const [fechaEmision, setFechaEmision] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [nrc, setNrc] = useState('');
    const [nitDui, setNitDui] = useState('');
    const [nombreProveedor, setNombreProveedor] = useState('');
    const [comprasExentasInternas, setComprasExentasInternas] = useState('');
    const [comprasExentasInternacionales, setComprasExentasInternacionales] = useState('');
    const [comprasExentasImportaciones, setComprasExentasImportaciones] = useState('');
    const [comprasGravadasInternas, setComprasGravadasInternas] = useState('');
    const [comprasGravadasInternacionales, setComprasGravadasInternacionales] = useState('');
    const [comprasGravadasImportaciones, setComprasGravadasImportaciones] = useState('');
    const [fovial, setFovial] = useState('');
    const [cotrans, setCotrans] = useState('');
    const [cesc, setCesc] = useState('');
    const [anticipoIva, setAnticipoIva] = useState('');
    const [retencionTerceros, setRetencionTerceros] = useState('');
    const [comprasSujetosExcluidos, setComprasSujetosExcluidos] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosCompras();
            const ordenados = Array.isArray(data) ? data.sort((a, b) => a.asiento - b.asiento) : [];
            setRegistros(ordenados);
            setNextId(ordenados.length + 1);
        };

        fetchData();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newRegistro = {
            id: uuidv4(),
            asiento: String(nextId).padStart(4, '0'),
            fechaEmision,
            numeroDocumento,
            nrc,
            nitDui,
            nombreProveedor,
            comprasExentasInternas: parseFloat(comprasExentasInternas) || 0,
            comprasExentasInternacionales: parseFloat(comprasExentasInternacionales) || 0,
            comprasExentasImportaciones: parseFloat(comprasExentasImportaciones) || 0,
            comprasGravadasInternas: parseFloat(comprasGravadasInternas) || 0,
            comprasGravadasInternacionales: parseFloat(comprasGravadasInternacionales) || 0,
            comprasGravadasImportaciones: parseFloat(comprasGravadasImportaciones) || 0,
            creditoFiscal: ((parseFloat(comprasGravadasInternas) || 0) + (parseFloat(comprasGravadasInternacionales) || 0) + (parseFloat(comprasGravadasImportaciones) || 0)) * 0.13,
            fovial: parseFloat(fovial) || 0,
            cotrans: parseFloat(cotrans) || 0,
            cesc: parseFloat(cesc) || 0,
            anticipoIva: parseFloat(anticipoIva) || 0,
            totalCompras: (
                (parseFloat(comprasExentasInternas) || 0) +
                (parseFloat(comprasExentasInternacionales) || 0) +
                (parseFloat(comprasExentasImportaciones) || 0) +
                (parseFloat(comprasGravadasInternas) || 0) +
                (parseFloat(comprasGravadasInternacionales) || 0) +
                (parseFloat(comprasGravadasImportaciones) || 0) +
                ((parseFloat(comprasGravadasInternas) || 0) + (parseFloat(comprasGravadasInternacionales) || 0) + (parseFloat(comprasGravadasImportaciones) || 0)) * 0.13
            ),
            retencionTerceros: parseFloat(retencionTerceros) || 0,
            comprasSujetosExcluidos: parseFloat(comprasSujetosExcluidos) || 0
        };

        try {
            await addRegistroCompras(newRegistro);
            setRegistros([...registros, newRegistro]);
            setNextId(nextId + 1);
            setFechaEmision('');
            setNumeroDocumento('');
            setNrc('');
            setNitDui('');
            setNombreProveedor('');
            setComprasExentasInternas('');
            setComprasExentasInternacionales('');
            setComprasExentasImportaciones('');
            setComprasGravadasInternas('');
            setComprasGravadasInternacionales('');
            setComprasGravadasImportaciones('');
            setFovial('');
            setCotrans('');
            setCesc('');
            setAnticipoIva('');
            setRetencionTerceros('');
            setComprasSujetosExcluidos('');
            event.target.reset();
        } catch (error) {
            console.error('Error al agregar el registro:', error);
        }
    };
    const handleDelete = async (index) => {
        const newRegistros = [...registros];
        const registroEliminado = newRegistros.splice(index, 1)[0];

        try {
            await deleteRegistroCompras(registroEliminado.id);
            setRegistros(newRegistros);
        } catch (error) {
            console.error('Error al eliminar el registro:', error);
        }
    };

    return (
        <div className="libro-compras-container">
            <h1>Libro de Compras</h1>
            <form className="libro-compras-form" onSubmit={handleSubmit}>
                <input type="date" name="fechaEmision" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required placeholder="Fecha de Emisión"/>
                <input type="text" name="numeroDocumento" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} required placeholder="Número de Documento"/>
                <input type="text" name="nrc" value={nrc} onChange={(e) => setNrc(e.target.value)} required placeholder="NRC"/>
                <input type="text" name="nitDui" value={nitDui} onChange={(e) => setNitDui(e.target.value)} required placeholder="NIT o DUI de Sujeto Excluido"/>
                <input type="text" name="nombreProveedor" value={nombreProveedor} onChange={(e) => setNombreProveedor(e.target.value)} required placeholder="Nombre del Proveedor"/>
                <input type="number" name="comprasExentasInternas" value={comprasExentasInternas} onChange={(e) => setComprasExentasInternas(e.target.value)} placeholder="Compras Exentas Internas"/>
                <input type="number" name="comprasExentasInternacionales" value={comprasExentasInternacionales} onChange={(e) => setComprasExentasInternacionales(e.target.value)} placeholder="Compras Exentas Internacionales"/>
                <input type="number" name="comprasExentasImportaciones" value={comprasExentasImportaciones} onChange={(e) => setComprasExentasImportaciones(e.target.value)} placeholder="Compras Exentas Importaciones"/>
                <input type="number" name="comprasGravadasInternas" value={comprasGravadasInternas} onChange={(e) => setComprasGravadasInternas(e.target.value)} placeholder="Compras Gravadas Internas"/>
                <input type="number" name="comprasGravadasInternacionales" value={comprasGravadasInternacionales} onChange={(e) => setComprasGravadasInternacionales(e.target.value)} placeholder="Compras Gravadas Internacionales"/>
                <input type="number" name="comprasGravadasImportaciones" value={comprasGravadasImportaciones} onChange={(e) => setComprasGravadasImportaciones(e.target.value)} placeholder="Compras Gravadas Importaciones"/>
                <input type="number" name="fovial" value={fovial} onChange={(e) => setFovial(e.target.value)} placeholder="FOVIAL"/>
                <input type="number" name="cotrans" value={cotrans} onChange={(e) => setCotrans(e.target.value)} placeholder="COTRANS"/>
                <input type="number" name="cesc" value={cesc} onChange={(e) => setCesc(e.target.value)} placeholder="CESC"/>
                <input type="number" name="anticipoIva" value={anticipoIva} onChange={(e) => setAnticipoIva(e.target.value)} placeholder="Anticipo IVA"/>
                <input type="number" name="retencionTerceros" value={retencionTerceros} onChange={(e) => setRetencionTerceros(e.target.value)} placeholder="Retención a Terceros"/>
                <input type="number" name="comprasSujetosExcluidos" value={comprasSujetosExcluidos} onChange={(e) => setComprasSujetosExcluidos(e.target.value)} placeholder="Compras a Sujetos Excluidos"/>
                <button type="submit" className="libro-compras-button">Agregar Registro</button>
            </form>
            <div className="libro-compras-cards">
                {registros.map((registro, index) => (
                    <div key={registro.id} className="libro-compras-card">
                        <table className="libro-compras-table">
                            <tbody>
                                <tr><td>Fecha de Emisión:</td><td>{registro.fechaEmision}</td></tr>
                                <tr><td>Número de Documento:</td><td>{registro.numeroDocumento}</td></tr>
                                <tr><td>NRC:</td><td>{registro.nrc}</td></tr>
                                <tr><td>NIT o DUI:</td><td>{registro.nitDui}</td></tr>
                                <tr><td>Nombre del Proveedor:</td><td>{registro.nombreProveedor}</td></tr>
                                <tr><td>Compras Exentas Internas:</td><td>{registro.comprasExentasInternas}</td></tr>
                                <tr><td>Compras Exentas Internacionales:</td><td>{registro.comprasExentasInternacionales}</td></tr>
                                <tr><td>Compras Exentas Importaciones:</td><td>{registro.comprasExentasImportaciones}</td></tr>
                                <tr><td>Compras Gravadas Internas:</td><td>{registro.comprasGravadasInternas}</td></tr>
                                <tr><td>Compras Gravadas Internacionales:</td><td>{registro.comprasGravadasInternacionales}</td></tr>
                                <tr><td>Compras Gravadas Importaciones:</td><td>{registro.comprasGravadasImportaciones}</td></tr>
                                <tr><td>Crédito Fiscal:</td><td>{registro.creditoFiscal.toFixed(2)}</td></tr>
                                <tr><td>FOVIAL:</td><td>{registro.fovial}</td></tr>
                                <tr><td>COTRANS:</td><td>{registro.cotrans}</td></tr>
                                <tr><td>CESC:</td><td>{registro.cesc}</td></tr>
                                <tr><td>Anticipo IVA:</td><td>{registro.anticipoIva}</td></tr>
                                <tr><td>Retención a Terceros:</td><td>{registro.retencionTerceros}</td></tr>
                                <tr><td>Total Compras:</td><td>{registro.totalCompras.toFixed(2)}</td></tr>
                                <tr><td>Compras a Sujetos Excluidos:</td><td>{registro.comprasSujetosExcluidos}</td></tr>
                            </tbody>
                        </table>
                        <button onClick={() => handleDelete(index)} className="libro-compras-delete-button">
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LibroCompras;
