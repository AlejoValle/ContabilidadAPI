import React from 'react';
import './Home.css';

const ServiceCard = ({iconPath, title, description}) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8 text-gray-600 mr-4"
            >
                <path d={iconPath}></path>
            </svg>
            <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </div>
);

const Home = () => {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="bg-gray-900 text-white py-6 px-4 md:px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Consultores Financieros Acme</h1>
                        <p className="text-gray-400">Asesoramiento financiero de confianza para individuos y
                            empresas.</p>
                    </div>
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#" className="hover:underline">
                            Inicio
                        </a>
                        <a href="#" className="hover:underline">
                            Acerca de
                        </a>
                        <a href="#" className="hover:underline">
                            Servicios
                        </a>
                        <a href="#" className="hover:underline">
                            Contacto
                        </a>
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <section id="about" className="bg-gray-100 py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Acerca de Nuestro Equipo</h2>
                                <p className="text-gray-600 mb-6">
                                    En Consultores Financieros Acme, contamos con un equipo de profesionales
                                    experimentados dedicados a
                                    proporcionar soluciones financieras personalizadas. Nuestros consultores tienen años
                                    de experiencia en
                                    la industria y están comprometidos a ayudar a nuestros clientes a alcanzar sus
                                    objetivos financieros.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Credenciales</h3>
                                        <ul className="list-disc pl-4 text-gray-600">
                                            <li>Planificador Financiero Certificado (CFP)</li>
                                            <li>Analista Financiero Certificado (CFA)</li>
                                            <li>Contador Público Certificado (CPA)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">Experiencia</h3>
                                        <ul className="list-disc pl-4 text-gray-600">
                                            <li>Más de 10 años en la industria</li>
                                            <li>Trabajo con clientes de todos los tamaños</li>
                                            <li>Historial comprobado de éxito</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <img
                                    src="/placeholder.svg"
                                    width="400"
                                    height="400"
                                    alt="Equipo"
                                    className="rounded-lg shadow-lg"
                                    style={{aspectRatio: '400 / 400', objectFit: 'cover'}}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="services" className="py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Servicios</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ServiceCard
                                iconPath="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
                                title="Planificación Financiera"
                                description="Ofrecemos servicios integrales de planificación financiera para ayudarle a alcanzar sus objetivos financieros a largo plazo."
                            />
                            <ServiceCard
                                iconPath="M12 20v-6a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4"
                                title="Gestión de Inversiones"
                                description="Nuestros servicios de gestión de inversiones están diseñados para ayudarle a crecer su patrimonio y alcanzar sus objetivos financieros."
                            />
                            <ServiceCard
                                iconPath="M12 20v-6a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4"
                                title="Planificación Fiscal"
                                description="Ofrecemos servicios integrales de planificación fiscal para ayudarle a minimizar su carga fiscal y maximizar sus ahorros."
                            />
                            <ServiceCard
                                iconPath="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                                title="Consultoría Empresarial"
                                description="Nuestros servicios de consultoría empresarial ayudan a los emprendedores y propietarios de pequeñas empresas a alcanzar sus objetivos financieros."
                            />
                            <ServiceCard
                                iconPath="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                                title="Planificación de la Jubilación"
                                description="Ofrecemos servicios integrales de planificación de la jubilación para ayudarle a asegurar una jubilación cómoda y segura."
                            />
                            <ServiceCard
                                iconPath="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                                title="Planificación de Seguros"
                                description="Nuestros servicios de planificación de seguros le ayudan a proteger sus activos y a sus seres queridos en caso de eventos inesperados."
                            />
                        </div>
                    </div>
                </section>
                <section id="contact" className="bg-gray-100 py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-3xl font-bold mb-8 text-center">Contáctanos</h2>
                        <div className="max-w-md mx-auto">
                            <form>
                                <div className="mb-4">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="name"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="name"
                                        placeholder="Ingrese su nombre"
                                        required
                                        type="text"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="email"
                                    >
                                        Correo electrónico
                                    </label>
                                    <input
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="email"
                                        placeholder="Ingrese su correo electrónico"
                                        required
                                        type="email"
                                    />
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        htmlFor="message"
                                    >
                                        Mensaje
                                    </label>
                                    <textarea
                                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="message"
                                        rows="5"
                                        placeholder="Ingrese su mensaje"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-gray-900 text-white py-6 px-4 md:px-6">
                <div className="container mx-auto flex items-center justify-between">
                    <p>© 2024 Consultores Financieros Acme. Todos los derechos reservados.</p>
                    <nav className="hidden md:flex items-center space-x-6"></nav>
                </div>
            </footer>
        </div>
    );
};

export default Home;

