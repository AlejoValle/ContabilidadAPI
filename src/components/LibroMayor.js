import React, { useState, useEffect } from 'react';
import { getRegistros } from '../indexedDB';
import './LibroMayor.css';
import {useNavigate} from "react-router-dom";

const LibroMayor = () => {
    const [libroMayor, setLibroMayor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const registros = await getRegistros();
            const libroMayor = procesarRegistros(registros);
            setLibroMayor(libroMayor);
        };

        fetchData();
    }, []);

    const handlediario = () => {
        navigate('/DiarioMayor'); // Redirigir al componente LibroMayor
    };

    const procesarRegistros = (registros) => {
        const libroMayor = [];
        const agrupadoPorDesglose = registros.reduce((acc, registro) => {
            const { desglose, codigo, fecha, debe, haber } = registro;
            const saldo = debe ? parseFloat(debe) : -parseFloat(haber);

            if (!acc[codigo]) {
                acc[codigo] = [];
            }

            acc[codigo].push({ desglose, fecha, saldo });

            return acc;
        }, {});

        for (const codigo in agrupadoPorDesglose) {
            const registrosDesglose = agrupadoPorDesglose[codigo];
            const debe = registrosDesglose.reduce((total, registro) => total + (registro.saldo > 0 ? registro.saldo : 0), 0);
            const haber = registrosDesglose.reduce((total, registro) => total + (registro.saldo < 0 ? -registro.saldo : 0), 0);
            const saldo = debe - haber;

            libroMayor.push({
                codigo,
                desglose: registrosDesglose[0].desglose, // Toma el primer registro para obtener el desglose
                registros: registrosDesglose,
                debe,
                haber,
                saldo,
            });
        }

        return libroMayor;
    };

    return (
        <div className="libro-mayor-container">
            <h1>Libro Mayor</h1>
            {libroMayor.map((registro) => (
                <div key={registro.codigo} className="libro-mayor-card">
                    <h2>{registro.desglose}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Código</th>
                            <th>Fecha</th>
                            <th>Desglose</th>
                            <th>Debe</th>
                            <th>Haber</th>
                            <th>Saldo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {registro.registros.map((reg, index) => (
                            <tr key={index}>
                                <td>{registro.codigo}</td>
                                <td>{reg.fecha}</td>
                                <td>{registro.desglose}</td>
                                <td>{reg.saldo > 0 ? reg.saldo.toFixed(2) : ''}</td>
                                <td>{reg.saldo < 0 ? (-reg.saldo).toFixed(2) : ''}</td>
                                <td>{reg.saldo.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td colSpan="3">Totales</td>
                            <td>{registro.debe.toFixed(2)}</td>
                            <td>{registro.haber.toFixed(2)}</td>
                            <td>{registro.saldo.toFixed(2)}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

            ))}
            <button onClick={handlediario} className="return-button">
                return
            </button>
        </div>
    );
};

export default LibroMayor;