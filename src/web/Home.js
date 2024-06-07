import React from 'react';
import { Container, Typography, Box, Button, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
import { AccessTime, Description, VerifiedUser } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Lista de formatos con nombres y rutas de archivo
const formats = [
    { name: 'Informe Anual de Retenciones de Renta (F-910)', file: 'F910.xlsx' },
    { name: 'Informe sobre Distribución y/o Capitalización de Utilidades (F-915)', file: 'Plantilla F915v6.xlsm' },
    { name: 'Declaración Anual de Impuesto sobre la Renta (F-11)', file: 'PlantillaRentaAnual.xlsx' },
    { name: 'Nombramiento de Auditor Fiscal', file: 'DC6032_Manual_de_Usuario-COMO_REALIZAR_EL_INFORME_DE_NOMBRAMIENTO_DE_AUDITOR.pdf' },
    { name: 'Formulario de Nombramiento de Auditor Fiscal (F-456)', file: 'Plantillas F987v7.5.xlsm' },
    { name: 'Presentación del Dictamen e Informe Fiscal (F-455)', file: 'Manual 987 --700-DGII-MN-2019-21957.pdf' },
    { name: 'Informe de Proveedores, Clientes, Acreedores y Deudores, ICV. (F-987) 1er semestre', file: 'Plantilla F983v3.xlsm' },
    { name: 'Informe de Proveedores, Clientes, Acreedores y Deudores, ICV. (F-987) 2do semestre', file: 'retenciones-a-no-domiciliados-el-salvador.xlsx' },
    { name: 'Solicitudes formularias de autorización de correlativos (F-940)', file: 'Retener el Impuesto Sobre la Renta por Transferencias de Intangibles.docx' },
    { name: 'Resumen Inventario Físico de Bienes del Activo Realizable o Corriente (F-983)', file: 'PlanillaRecalculoSeisMeses Recalculo.xlsx' },
    { name: 'Retener el Impuesto sobre la Renta a Personas Domiciliadas', file: 'Constancia de Retención del Impuesto Sobre la Renta Efectuada..docx' },
    { name: 'Retener el Impuesto Sobre la Renta por Transferencias de Intangibles', file: 'F1210-V4Cambios Básicos del Registro de Contribuyentes.pdf' },
    { name: 'Retener el Impuesto Sobre la Renta a Personas no Domiciliadas', file: 'Actualización de Dirección para Recibir Notificaciones..docx' },
    { name: 'Expedir Constancia de Retención del Impuesto Sobre la Renta Efectuada', file: 'PLANTILLA-IVA-F-07.xlsm' },
    { name: 'Informar sobre Cambios Básicos del Registro de Contribuyentes', file: 'Manual de Usuario referente al Anexo de retenciones del F14..pdf' },
    { name: 'Actualización de Dirección para Recibir Notificaciones', file: 'Manual de Usuario Anexos F07V13.pdf' },
    { name: 'Declaraciones de IVA', file: 'PLANTILLA-PAGO-A-CUENTA-F-14.xlsm' },
    { name: 'Declaraciones de Pago a Cuenta e ISR', file: 'Formulario de autorización de correlativos (F-940)..docx' },
];

// Crear un tema personalizado
const theme = createTheme({
    palette: {
        primary: {
            main: '#8B4513', // Marrón
        },
        secondary: {
            main: '#F5F5DC', // Beige
        },
        background: {
            default: '#F5F5DC', // Fondo Beige
            paper: '#FFFFFF', // Fondo de los elementos
        },
        text: {
            primary: '#000000', // Texto Marrón
            secondary: '#D3D3D3', // Texto Gris claro
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Fuentes personalizadas
        h1: {
            fontFamily: 'Montserrat, sans-serif',
        },
        h2: {
            fontFamily: 'Montserrat, sans-serif',
        },
        h3: {
            fontFamily: 'Montserrat, sans-serif',
        },
        h4: {
            fontFamily: 'Montserrat, sans-serif',
        },
        h5: {
            fontFamily: 'Montserrat, sans-serif',
        },
        h6: {
            fontFamily: 'Montserrat, sans-serif',
        },
        body1: {
            fontFamily: 'Roboto, sans-serif',
        },
    },
});

const Home = () => {
    return (
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <img src="/4.png" alt="Logo" style={{ width: 50, marginRight: 10 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        KAXAFA J AUDITORES
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Simplifica tu gestión financiera con KAXAFA J AUDITORES
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Accede y descarga fácilmente todos los formatos financieros que necesitas
                    </Typography>
                    <Button variant="contained" color="secondary" size="large" sx={{ mt: 2 }}>
                        Descargar Formatos Ahora
                    </Button>
                </Box>

                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        ¿Por qué elegir KAXAFA J AUDITORES?
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <AccessTime fontSize="large" color="primary" />
                                    <Typography variant="h6" component="h4">
                                        Acceso rápido a formatos financieros
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <VerifiedUser fontSize="large" color="primary" />
                                    <Typography variant="h6" component="h4">
                                        Descargas gratuitas y fáciles
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardContent>
                                    <Description fontSize="large" color="primary" />
                                    <Typography variant="h6" component="h4">
                                        Información clara y precisa sobre cada documento
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Nuestros Servicios
                    </Typography>
                    <Typography variant="body1">
                        Ofrecemos una gama de servicios para facilitar la gestión financiera, incluyendo auditorías fiscales, consultoría contable y más.
                    </Typography>
                </Box>

                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Formatos Financieros Disponibles
                    </Typography>
                    <Grid container spacing={3}>
                        {formats.map((format, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" component="h4">
                                            {format.name}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ mt: 1 }}
                                            href={`/Formatos/${format.file}`}
                                            download
                                        >
                                            Descargar
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Contáctanos
                    </Typography>
                    <Typography variant="body1">
                        Dirección de la oficina, número de teléfono, correo electrónico.
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Home;
