import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { AccessTime, Book, Group, TrendingUp, ShoppingCart, People, Description } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DiarioMayor from './DiarioMayor';
import EstadosFinancieros from './LibroEstadosFinancieros';
import RegistroAccionistas from './RegistroAccionistas';
import AumentoDisminucionCapital from './CapitalLibro';
import ActasJuntasAccionistas from './ActaJuntaAccionistas';
import LibroCompras from './LibroCompras';
import LibroVentasContribuyente from './LibroVentasContribuyente';
import LibroVentasConsumidor from './LibroVentasConsumidor';

// Lista de elementos del menú
const menuItems = [
    { text: 'Diario Mayor', icon: <AccessTime />, path: '/DiarioMayor' },
    { text: 'Estados Financieros', icon: <Book />, path: '/LibroEstadosFinancieros' },
    { text: 'Registro de Accionistas', icon: <Group />, path: '/RegistroAccionistas' },
    { text: 'Aumento o Disminución de Capital', icon: <TrendingUp />, path: '/CapitalLibro' },
    { text: 'Actas Juntas Accionistas', icon: <People />, path: '/ActaJuntaAccionistas' },
    { text: 'Libro Compras', icon: <ShoppingCart />, path: '/LibroCompras' },
    { text: 'Libro Ventas Contribuyente', icon: <People />, path: '/LibroVentasContribuyente' },
    { text: 'Libro Ventas Consumidores', icon: <Description />, path: '/LibroVentasConsumidor' },
];

// Crear el tema personalizado (mismo tema que en la landing page)
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
            primary: '#8B4513', // Texto Marrón
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

const MobileMenu = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', my: 4 }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Simplifica tu gestión financiera con KAXAFA J AUDITORES
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Accede fácilmente todos los formatos financieros que necesitas
                    </Typography>
                </Box>
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Formatos Financieros Disponibles
                    </Typography>
                    <Grid container spacing={3}>
                        {menuItems.map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        {item.icon}
                                        <Typography variant="h6" component="h4">
                                            {item.text}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ mt: 1 }}
                                            component={Link}
                                            to={item.path}
                                        >
                                            Ir
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ my: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Nuestros Servicios
                    </Typography>
                    <Typography variant="body1">
                        Ofrecemos una gama de servicios para facilitar la gestión financiera, incluyendo auditorías fiscales, consultoría contable y más.
                    </Typography>
                </Box>
                <Routes>
                    <Route path="diario-mayor" element={<DiarioMayor />} />
                    <Route path="estados-financieros" element={<EstadosFinancieros />} />
                    <Route path="registro-accionistas" element={<RegistroAccionistas />} />
                    <Route path="aumento-disminucion-capital" element={<AumentoDisminucionCapital />} />
                    <Route path="actas-juntas-accionistas" element={<ActasJuntasAccionistas />} />
                    <Route path="libro-compras" element={<LibroCompras />} />
                    <Route path="libro-ventas-contribuyente" element={<LibroVentasContribuyente />} />
                    <Route path="libro-ventas-consumidor" element={<LibroVentasConsumidor />} />
                    {/* Agregar más rutas según sea necesario */}
                </Routes>
            </Container>
        </ThemeProvider>
    );
};

export default MobileMenu;

