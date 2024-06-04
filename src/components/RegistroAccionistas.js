import React, { useState, useEffect } from 'react';
import { getRegistrosAccionistas, addRegistroAccionista, deleteRegistroAccionista } from '../indexedDB';
import './RegistroAccionistas.css';
import { v4 as uuidv4 } from 'uuid';

const inputs = [
    { name: 'nombre', placeholder: 'Nombre del Accionista', type: 'text' },
    { name: 'concepto', placeholder: 'Concepto', type: 'text' },
    { name: 'domicilio', placeholder: 'Domicilio', type: 'text' },
    { name: 'fecha', placeholder: 'Fecha', type: 'date' },
    { name: 'numeroCertificado', placeholder: 'Número de Certificado', type: 'text' },
    { name: 'serie', placeholder: 'Serie', type: 'text' },
    { name: 'numeroAcciones', placeholder: 'Número de Acciones', type: 'number' },
    { name: 'valorNominal', placeholder: 'Valor Nominal', type: 'number' },
    { name: 'saldoAnterior', placeholder: 'Saldo Anterior', type: 'number' },
    { name: 'aumento', placeholder: 'Aumento', type: 'number' },
    { name: 'disminucion', placeholder: 'Disminución', type: 'number' },
    { name: 'nuevoSaldo', placeholder: 'Nuevo Saldo', type: 'number' },
];

const RegistroAccionistas = () => {
    const [registros, setRegistros] = useState([]);
    const [nuevoRegistro, setNuevoRegistro] = useState(() => ({
        id: uuidv4(),
        nombre: '',
        concepto: '',
        domicilio: '',
        fecha: '',
        numeroCertificado: '',
        serie: '',
        numeroAcciones: '',
        valorNominal: '',
        saldoAnterior: '',
        aumento: '',
        disminucion: '',
        nuevoSaldo: '',
    }));

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRegistrosAccionistas();
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
            await addRegistroAccionista(nuevoRegistro);
            setRegistros((prev) => [...prev, nuevoRegistro]);
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
                saldoAnterior: '',
                aumento: '',
                disminucion: '',
                nuevoSaldo: '',
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

    const agruparRegistros = (registros) => {
        const agrupados = registros.reduce((acc, registro) => {
            if (!acc[registro.nombre]) {
                acc[registro.nombre] = {
                    nombre: registro.nombre,
                    concepto: registro.concepto,
                    domicilio: registro.domicilio,
                    fecha: registro.fecha,
                    numeroCertificado: registro.numeroCertificado,
                    serie: registro.serie,
                    registros: [],
                };
            }

            acc[registro.nombre].registros.push(registro);

            return acc;
        }, {});

        return Object.values(agrupados);
    };

    const registrosAgrupados = agruparRegistros(registros);

    return (
        <div className="registro-accionistas-container">
            <h1>Registro de Accionistas</h1>
            <form onSubmit={handleSubmit} className="registro-accionistas-form">
                {inputs.map((input) => (
                    <input
                        key={input.name}
                        type={input.type}
                        name={input.name}
                        value={nuevoRegistro[input.name]}
                        onChange={handleInputChange}
                        placeholder={input.placeholder}
                        required
                    />
                ))}
                <button type="submit" className="registro-accionistas-button">
                    Agregar Registro
                </button>
            </form>
            <div className="registro-accionistas-cards">
                {registrosAgrupados.map((registroGrupo, index) => (
                    <div key={index} className="registro-accionistas-card">
                        <h2>{registroGrupo.nombre}</h2>
                        <table className="registro-accionistas-table">
                            <thead>
                            <tr>
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
                            </tr>
                            </thead>
                            <tbody>
                            {registroGrupo.registros.map((registro, idx) => (
                                <tr key={idx}>
                                    <td data-label="Concepto">{registro.concepto}</td>
                                    <td data-label="Domicilio">{registro.domicilio}</td>
                                    <td data-label="Fecha">{registro.fecha}</td>
                                    <td data-label="Número de Certificado">{registro.numeroCertificado}</td>
                                    <td data-label="Serie">{registro.serie}</td>
                                    <td data-label="Número de Acciones">{registro.numeroAcciones}</td>
                                    <td data-label="Valor Nominal">${parseFloat(registro.valorNominal).toFixed(2)}</td>
                                    <td data-label="Saldo Anterior">${parseFloat(registro.saldoAnterior).toFixed(2)}</td>
                                    <td data-label="Aumento">${parseFloat(registro.aumento).toFixed(2)}</td>
                                    <td data-label="Disminución">${parseFloat(registro.disminucion).toFixed(2)}</td>
                                    <td data-label="Nuevo Saldo">${parseFloat(registro.nuevoSaldo).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="5">Totales</td>
                                <td>{registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.numeroAcciones || 0), 0)}</td>
                                <td>${registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.valorNominal || 0), 0).toFixed(2)}</td>
                                <td>${registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.saldoAnterior || 0), 0).toFixed(2)}</td>
                                <td>${registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.aumento || 0), 0).toFixed(2)}</td>
                                <td>${registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.disminucion || 0), 0).toFixed(2)}</td>
                                <td>${registroGrupo.registros.reduce((acc, reg) => acc + parseFloat(reg.nuevoSaldo || 0), 0).toFixed(2)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={() => handleDelete(index)}
                            className="registro-accionistas-delete-button"
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegistroAccionistas;

