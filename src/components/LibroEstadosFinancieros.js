import React, { useState, useEffect } from 'react';
import './LibroEstadosFinancieros.css';

// Define la función getInitialState antes de utilizarla en los estados iniciales
const getInitialState = (key) => {
    const savedState = localStorage.getItem(key);
    return savedState ? JSON.parse(savedState) : {
        efectivo: 0,
        otrosActivosNoFinancieros: 0,
        cuentasPorCobrar: 0,
        inventarios: 0,
        activosPorImpuestosCorrientes: 0,
        propiedadesPlantaYEquipo: 0,
        propiedadDeInversion: 0,
        otrosActivos: 0,
        beneficiosAEmpleados: 0,
        provisiones: 0,
        cuentasPorPagar: 0,
        pasivosPorImpuestosCorrientes: 0,
        otrosPasivosFinancieros: 0,
        beneficiosAEmpleadosNoCorrientes: 0,
        retenciones: 0,
        cuentasPorPagarALargoPlazo: 0,
        pasivoPorImpuestosDiferidos: 0,
        otrosPasivosFinancierosNoCorrientes: 0,
        capitalSocial: 0,
        resultadosAcumulados: 0,
        reservas: 0,
        ajustePorAdopcionDeNIIF: 0,
        total: 0
    };
};

const LibroEstadosFinancieros = () => {
    const [activosCorrientes, setActivosCorrientes] = useState(() => getInitialState('activosCorrientes'));
    const [activosNoCorrientes, setActivosNoCorrientes] = useState(() => getInitialState('activosNoCorrientes'));
    const [pasivosCorrientes, setPasivosCorrientes] = useState(() => getInitialState('pasivosCorrientes'));
    const [pasivosNoCorrientes, setPasivosNoCorrientes] = useState(() => getInitialState('pasivosNoCorrientes'));
    const [patrimonio, setPatrimonio] = useState(() => getInitialState('patrimonio'));

    useEffect(() => {
        saveState('activosCorrientes', activosCorrientes);
        saveState('activosNoCorrientes', activosNoCorrientes);
        saveState('pasivosCorrientes', pasivosCorrientes);
        saveState('pasivosNoCorrientes', pasivosNoCorrientes);
        saveState('patrimonio', patrimonio);
    }, [activosCorrientes, activosNoCorrientes, pasivosCorrientes, pasivosNoCorrientes, patrimonio]);

    const handleInputChange = (e, state, key, setState) => {
        const value = parseFloat(e.target.value) || 0;
        setState({
            ...state,
            [key]: value,
            total: calculateTotal({ ...state, [key]: value })
        });
    };

    const calculateTotal = (state) => {
        return Object.keys(state)
            .filter(key => key !== 'total')
            .reduce((sum, key) => sum + state[key], 0);
    };

    const saveState = (key, state) => {
        localStorage.setItem(key, JSON.stringify(state));
    };

    const totalActivos = activosCorrientes.total + activosNoCorrientes.total;
    const totalPasivos = pasivosCorrientes.total + pasivosNoCorrientes.total;
    const totalPatrimonioPasivos = totalPasivos + patrimonio.total;
    return (
        <div className="libro-estados-financieros-container">
            <div className="estado-financiero">
                <h1>Estado de Situación Financiera</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Conceptos</th>
                        <th>Montos</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr><td colSpan="2"><h2>Activos</h2></td></tr>
                    <tr><td colSpan="2"><h3>Activos Corrientes</h3></td></tr>
                    <tr>
                        <td>Efectivo y Equivalentes de Efectivo</td>
                        <td>
                            <input
                                type="number"
                                value={activosCorrientes.efectivo || ''}
                                onChange={(e) => handleInputChange(e, activosCorrientes, 'efectivo', setActivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Otros Activos No Financieros</td>
                        <td>
                            <input
                                type="number"
                                value={activosCorrientes.otrosActivosNoFinancieros || ''}
                                onChange={(e) => handleInputChange(e, activosCorrientes, 'otrosActivosNoFinancieros', setActivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Cuentas por Cobrar</td>
                        <td>
                            <input
                                type="number"
                                value={activosCorrientes.cuentasPorCobrar || ''}
                                onChange={(e) => handleInputChange(e, activosCorrientes, 'cuentasPorCobrar', setActivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Inventarios</td>
                        <td>
                            <input
                                type="number"
                                value={activosCorrientes.inventarios || ''}
                                onChange={(e) => handleInputChange(e, activosCorrientes, 'inventarios', setActivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Activos por Impuestos Corrientes</td>
                        <td>
                            <input
                                type="number"
                                value={activosCorrientes.activosPorImpuestosCorrientes || ''}
                                onChange={(e) => handleInputChange(e, activosCorrientes, 'activosPorImpuestosCorrientes', setActivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Total Activos Corrientes</strong></td>
                        <td><strong>${activosCorrientes.total.toFixed(2)}</strong></td>
                    </tr>
                    <tr><td colSpan="2"><h3>Activos No Corrientes</h3></td></tr>
                    <tr>
                        <td>Propiedades, Planta y Equipo</td>
                        <td>
                            <input
                                type="number"
                                value={activosNoCorrientes.propiedadesPlantaYEquipo || ''}
                                onChange={(e) => handleInputChange(e, activosNoCorrientes, 'propiedadesPlantaYEquipo', setActivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Propiedad de Inversión</td>
                        <td>
                            <input
                                type="number"
                                value={activosNoCorrientes.propiedadDeInversion || ''}
                                onChange={(e) => handleInputChange(e, activosNoCorrientes, 'propiedadDeInversion', setActivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Otros Activos</td>
                        <td>
                            <input
                                type="number"
                                value={activosNoCorrientes.otrosActivos || ''}
                                onChange={(e) => handleInputChange(e, activosNoCorrientes, 'otrosActivos', setActivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Total Activos No Corrientes</strong></td>
                        <td><strong>${activosNoCorrientes.total.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Total de Activos</strong></td>
                        <td><strong>${totalActivos.toFixed(2)}</strong></td>
                    </tr>
                    <tr><td colSpan="2"><h2>Patrimonio y Pasivos</h2></td></tr>
                    <tr><td colSpan="2"><h3>Pasivos Corrientes</h3></td></tr>
                    <tr>
                        <td>Beneficios a Empleados</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosCorrientes.beneficiosAEmpleados || ''}
                                onChange={(e) => handleInputChange(e, pasivosCorrientes, 'beneficiosAEmpleados', setPasivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Provisiones</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosCorrientes.provisiones || ''}
                                onChange={(e) => handleInputChange(e, pasivosCorrientes, 'provisiones', setPasivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Cuentas por Pagar</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosCorrientes.cuentasPorPagar || ''}
                                onChange={(e) => handleInputChange(e, pasivosCorrientes, 'cuentasPorPagar', setPasivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Pasivos por Impuestos Corrientes</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosCorrientes.pasivosPorImpuestosCorrientes || ''}
                                onChange={(e) => handleInputChange(e, pasivosCorrientes, 'pasivosPorImpuestosCorrientes', setPasivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Otros Pasivos Financieros</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosCorrientes.otrosPasivosFinancieros || ''}
                                onChange={(e) => handleInputChange(e, pasivosCorrientes, 'otrosPasivosFinancieros', setPasivosCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Total Pasivos Corrientes</strong></td>
                        <td><strong>${pasivosCorrientes.total.toFixed(2)}</strong></td>
                    </tr>
                    <tr><td colSpan="2"><h3>Pasivos No Corrientes</h3></td></tr>
                    <tr>
                        <td>Beneficios a Empleados</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosNoCorrientes.beneficiosAEmpleadosNoCorrientes || ''}
                                onChange={(e) => handleInputChange(e, pasivosNoCorrientes, 'beneficiosAEmpleadosNoCorrientes', setPasivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Retenciones</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosNoCorrientes.retenciones || ''}
                                onChange={(e) => handleInputChange(e, pasivosNoCorrientes, 'retenciones', setPasivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Cuentas por Pagar a Largo Plazo</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosNoCorrientes.cuentasPorPagarALargoPlazo || ''}
                                onChange={(e) => handleInputChange(e, pasivosNoCorrientes, 'cuentasPorPagarALargoPlazo', setPasivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Pasivo por Impuestos Diferidos</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosNoCorrientes.pasivoPorImpuestosDiferidos || ''}
                                onChange={(e) => handleInputChange(e, pasivosNoCorrientes, 'pasivoPorImpuestosDiferidos', setPasivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Otros Pasivos Financieros</td>
                        <td>
                            <input
                                type="number"
                                value={pasivosNoCorrientes.otrosPasivosFinancierosNoCorrientes || ''}
                                onChange={(e) => handleInputChange(e, pasivosNoCorrientes, 'otrosPasivosFinancierosNoCorrientes', setPasivosNoCorrientes)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Total Pasivos No Corrientes</strong></td>
                        <td><strong>${pasivosNoCorrientes.total.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Total de Pasivos</strong></td>
                        <td><strong>${totalPasivos.toFixed(2)}</strong></td>
                    </tr>
                    <tr><td colSpan="2"><h3>Patrimonio</h3></td></tr>
                    <tr>
                        <td>Capital Social</td>
                        <td>
                            <input
                                type="number"
                                value={patrimonio.capitalSocial || ''}
                                onChange={(e) => handleInputChange(e, patrimonio, 'capitalSocial', setPatrimonio)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Resultados Acumulados</td>
                        <td>
                            <input
                                type="number"
                                value={patrimonio.resultadosAcumulados || ''}
                                onChange={(e) => handleInputChange(e, patrimonio, 'resultadosAcumulados', setPatrimonio)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Reservas</td>
                        <td>
                            <input
                                type="number"
                                value={patrimonio.reservas || ''}
                                onChange={(e) => handleInputChange(e, patrimonio, 'reservas', setPatrimonio)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Ajuste por Adopción de NIIF</td>
                        <td>
                            <input
                                type="number"
                                value={patrimonio.ajustePorAdopcionDeNIIF || ''}
                                onChange={(e) => handleInputChange(e, patrimonio, 'ajustePorAdopcionDeNIIF', setPatrimonio)}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Total del Patrimonio</strong></td>
                        <td><strong>${patrimonio.total.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td><strong>Total de Patrimonio y Pasivos</strong></td>
                        <td><strong>${totalPatrimonioPasivos.toFixed(2)}</strong></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LibroEstadosFinancieros;
