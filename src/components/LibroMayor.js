import React, { useState, useEffect } from 'react';
import { getRegistros } from '../indexedDB';
import './LibroMayor.css';
import { useNavigate } from "react-router-dom";

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

            if (!acc[codigo]) {
                acc[codigo] = [];
            }

            acc[codigo].push({ desglose, fecha, debe: parseFloat(debe) || 0, haber: parseFloat(haber) || 0 });

            return acc;
        }, {});

        for (const codigo in agrupadoPorDesglose) {
            const registrosDesglose = agrupadoPorDesglose[codigo];
            const debeTotal = registrosDesglose.reduce((total, registro) => total + registro.debe, 0);
            const haberTotal = registrosDesglose.reduce((total, registro) => total + registro.haber, 0);
            const saldo = debeTotal + haberTotal;  // Cambiado a suma

            libroMayor.push({
                codigo,
                desglose: registrosDesglose[0].desglose, // Toma el primer registro para obtener el desglose
                registros: registrosDesglose,
                debe: debeTotal,
                haber: haberTotal,
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
                    <div className="libro-mayor-table-container">
                        <table className="libro-mayor-table">
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
                                    <td>{reg.desglose}</td>
                                    <td>${reg.debe > 0 ? reg.debe.toFixed(2) : ''}</td>
                                    <td>${reg.haber > 0 ? reg.haber.toFixed(2) : ''}</td>
                                    <td>${Math.abs(reg.debe - reg.haber).toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan="3">Totales</td>
                                <td>${registro.debe.toFixed(2)}</td>
                                <td>${registro.haber.toFixed(2)}</td>
                                <td>${Math.abs(registro.saldo).toFixed(2)}</td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            ))}
            <button onClick={handlediario} className="return-button">
                Return
            </button>
        </div>
    );
};

export default LibroMayor;
