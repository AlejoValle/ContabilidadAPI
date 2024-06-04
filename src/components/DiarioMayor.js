//Diariomayor.js
import React, { useState, useEffect } from 'react';
import { addRegistro, getRegistros, deleteRegistro } from '../indexedDB';
import './DiarioMayor.css';
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from "react-router-dom";

const DiarioMayor = () => {
    const [registros, setRegistros] = useState([]);
    const [nextId, setNextId] = useState(1); // ID incremental
    const [debe, setDebe] = useState('');
    const [haber, setHaber] = useState('');
    const [desglose, setDesglose] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistros();
            const ordenados = Array.isArray(data) ? data.sort((a, b) => a.asiento - b.asiento) : [];
            setRegistros(ordenados);
            setNextId(ordenados.length + 1);
        };

        fetchData();
    }, []);


    const handleDebeChange = (event) => {
        setDebe(event.target.value);
        if (event.target.value !== '') {
            setHaber('');
        }
    };

    const handleHaberChange = (event) => {
        setHaber(event.target.value);
        if (event.target.value !== '') {
            setDebe('');
        }
    };

    const handleDesgloseChange = (event) => {
        setDesglose(event.target.value);
    };

    const getCodigo = (desglose) => {
        switch (desglose) {
            case 'caja':
                return '1';
            case 'ventas':
                return '2';
            case 'mercaderia':
                return '3';
            case 'proveedores':
                return '4';
            case 'rodados':
                return '5';
            case 'pagare a pagar':
                return '6';
            case 'alquileres perdidos':
                return '7';
            default:
                return '';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const debeValue = debe ? parseFloat(debe) : null;
        const haberValue = haber ? parseFloat(haber) : null;

        if (debeValue === null && haberValue === null) {
            alert('Debe ingresar un valor en "Debe" o "Haber".');
            return;
        }

        if (debeValue !== null && haberValue !== null) {
            alert('Solo puede ingresar un valor en "Debe" o "Haber", no en ambos.');
            return;
        }

        const newRegistro = {
            id: uuidv4(),
            asiento: String(nextId).padStart(4, '0'),
            fecha: new Date().toLocaleDateString(),
            definicion: event.target.definicion.value,
            codigo: getCodigo(desglose),
            desglose: desglose,
            debe: debeValue !== null ? debeValue.toFixed(2) : '',
            haber: haberValue !== null ? haberValue.toFixed(2) : '',
        };

        try {
            await addRegistro(newRegistro);
            setRegistros([...registros, newRegistro]);
            setNextId(nextId + 1);
            setDebe('');
            setHaber('');
            setDesglose('');
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
    const handleMayorizar = () => {
        navigate('/LibroMayor'); // Redirigir al componente LibroMayor
    };
    return (
        <div className="diario-container">
            <h1>Diario Mayor</h1>
            <form className="diario-form" onSubmit={handleSubmit}>
                <select name="desglose" value={desglose} onChange={handleDesgloseChange} required>
                    <option value="">Desglose</option>
                    <option value="caja">caja</option>
                    <option value="ventas">ventas</option>
                    <option value="mercaderia">mercaderia</option>
                    <option value="proveedores">proveedores</option>
                    <option value="rodados">rodados</option>
                    <option value="pagare a pagar">pagare a pagar</option>
                    <option value="alquileres perdidos">alquileres perdidos</option>
                </select>
                <select name="definicion" required>
                    <option value="">Definición</option>
                    <option value="activo+">activo+</option>
                    <option value="activo-">activo-</option>
                    <option value="pasivo+">pasivo+</option>
                    <option value="pasivo-">pasivo-</option>
                    <option value="r+">r+</option>
                    <option value="r-">r-</option>
                </select>
                <input type="text" name="debe" value={debe} onChange={handleDebeChange} placeholder="Debe"
                       pattern="^\d+(\.\d{1,2})?$"/>
                <input type="text" name="haber" value={haber} onChange={handleHaberChange} placeholder="Haber"
                       pattern="^\d+(\.\d{1,2})?$"/>
                <button type="submit" className="diario-button">Agregar Registro</button>
                <button onClick={handleMayorizar} className="diario-button">
                    Mayorizar
                </button>
            </form>
            <table className="diario-table">
                <thead>
                <tr>
                    <th>Asiento</th>
                    <th>Fecha</th>
                    <th>Definición</th>
                    <th>Código</th>
                    <th>Desglose</th>
                    <th>Debe</th>
                    <th>Haber</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {registros.map((registro, index) => (
                    <tr key={registro.id}>
                        <td>{registro.asiento}</td>
                        <td>{registro.fecha}</td>
                        <td>{registro.definicion}</td>
                        <td>{registro.codigo}</td>
                        <td>{registro.desglose}</td>
                        <td>{registro.debe && `$${parseFloat(registro.debe).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                        <td>{registro.haber && `$${parseFloat(registro.haber).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td>
                        <td>
                            <button onClick={() => handleDelete(index)} className="diario-delete-button">
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

export default DiarioMayor;
