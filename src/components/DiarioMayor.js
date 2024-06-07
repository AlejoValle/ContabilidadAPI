import React, { useState, useEffect } from 'react';
import { addRegistro, getRegistros, deleteRegistro } from '../indexedDB';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './DiarioMayor.css';

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
            <Card className="diario-card">
                <CardContent>
                    <form className="diario-form" onSubmit={handleSubmit}>
                        <TextField
                            select
                            label="Desglose"
                            name="desglose"
                            value={desglose}
                            onChange={handleDesgloseChange}
                            fullWidth
                            required
                            SelectProps={{native: true}}
                        >
                            <option value="">Desglose</option>
                            <option value="caja">Caja</option>
                            <option value="ventas">Ventas</option>
                            <option value="mercaderia">Mercadería</option>
                            <option value="proveedores">Proveedores</option>
                            <option value="rodados">Rodados</option>
                            <option value="pagare a pagar">Pagaré a pagar</option>
                            <option value="alquileres perdidos">Alquileres perdidos</option>
                        </TextField>
                        <TextField
                            select
                            label="Definición"
                            name="definicion"
                            fullWidth
                            required
                            SelectProps={{native: true}}
                        >
                            <option value="">Definición</option>
                            <option value="activo+">Activo+</option>
                            <option value="activo-">Activo-</option>
                            <option value="pasivo+">Pasivo+</option>
                            <option value="pasivo-">Pasivo-</option>
                            <option value="r+">R+</option>
                            <option value="r-">R-</option>
                        </TextField>
                        <TextField
                            type="text"
                            label="Debe"
                            name="debe"
                            value={debe}
                            onChange={handleDebeChange}
                            placeholder="Debe"
                            pattern="^\d+(\.\d{1,2})?$"
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Haber"
                            name="haber"
                            value={haber}
                            onChange={handleHaberChange}
                            placeholder="Haber"
                            pattern="^\d+(\.\d{1,2})?$"
                            fullWidth
                        />
                        <button type="submit" className="diario-button">Agregar Registro</button>
                        <button type="button" onClick={handleMayorizar} className="diario-button">Mayorizar</button>
                    </form>
                </CardContent>
            </Card>
            <Card className="diario-card">
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table className="diario-table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Asiento</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Definición</TableCell>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Desglose</TableCell>
                                    <TableCell>Debe</TableCell>
                                    <TableCell>Haber</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {registros.map((registro, index) => (
                                    <TableRow key={registro.id}>
                                        <TableCell>{registro.asiento}</TableCell>
                                        <TableCell>{registro.fecha}</TableCell>
                                        <TableCell>{registro.definicion}</TableCell>
                                        <TableCell>{registro.codigo}</TableCell>
                                        <TableCell>{registro.desglose}</TableCell>
                                        <TableCell>{registro.debe && `$${parseFloat(registro.debe).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</TableCell>
                                        <TableCell>{registro.haber && `$${parseFloat(registro.haber).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</TableCell>
                                        <TableCell>
                                            <button onClick={() => handleDelete(index)}
                                                    className="diario-delete-button">
                                                Eliminar
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default DiarioMayor;
