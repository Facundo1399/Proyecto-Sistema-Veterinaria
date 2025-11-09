import { useState } from 'react';
import propietarios from "./imagen/propietarios.jpg";

const Propietarios = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [errores, setErrores] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        fecha_registro: new Date().toISOString().split('T')[0]
    });

    // Filtrar clientes según la búsqueda
    const clientesFiltrados = clientes.filter(cliente => {
        const searchTerm = busqueda.toLowerCase();
        return (
            cliente.nombre.toLowerCase().includes(searchTerm) ||
            cliente.apellido.toLowerCase().includes(searchTerm) ||
            cliente.email.toLowerCase().includes(searchTerm) ||
            cliente.telefono.includes(searchTerm)
        );
    });

    // Función para validar el email
    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'El email es requerido';
        if (!regex.test(email)) return 'Email inválido';
        return '';
    };

    // Función para validar el teléfono
    const validarTelefono = (telefono) => {
        const regex = /^[0-9]{8,15}$/;
        if (!telefono) return 'El teléfono es requerido';
        if (!regex.test(telefono)) return 'Teléfono inválido (8-15 dígitos)';
        return '';
    };

    // Función para validar todos los campos
    const validarCampos = () => {
        const nuevosErrores = {};

        if (!nuevoCliente.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es requerido';
        }

        if (!nuevoCliente.apellido.trim()) {
            nuevosErrores.apellido = 'El apellido es requerido';
        }

        const errorEmail = validarEmail(nuevoCliente.email);
        if (errorEmail) nuevosErrores.email = errorEmail;

        const errorTelefono = validarTelefono(nuevoCliente.telefono);
        if (errorTelefono) nuevosErrores.telefono = errorTelefono;

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarCampos()) {
            const clienteCompleto = {
                ...nuevoCliente,
                id_cliente: Date.now()
            };

            setClientes([...clientes, clienteCompleto]);
            setMostrarFormulario(false);
            
            setNuevoCliente({
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                fecha_registro: new Date().toISOString().split('T')[0]
            });
            setErrores({});
        }
    };

    // Función para ver detalles del cliente
    const verDetalles = (cliente) => {
        setClienteSeleccionado(cliente);
        setMostrarDetalles(true);
    };

    // Obtener mascotas del cliente
    const getMascotas = (clienteId) => mascotasData[clienteId] || [];

    // Obtener historial del cliente
    const getHistorial = (clienteId) => historialData[clienteId] || [];

    return (
        <div className="p-6 min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${propietarios})` }}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Gestión de Clientes</h1>
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-[#f8dfc3] hover:bg-[#f79205] text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Nuevo Cliente
                </button>
            </div>

            {/* Barra de búsqueda */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar cliente por nombre, apellido, email o teléfono..."
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f79205] focus:border-[#f79205] bg-white"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                </div>
                {busqueda && (
                    <p className="mt-2 text-sm text-gray-600">
                        Mostrando {clientesFiltrados.length} de {clientes.length} cliente(s)
                    </p>
                )}
            </div>

            {/* Tabla de Clientes */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mascotas</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clientesFiltrados.length > 0 ? (
                            clientesFiltrados.map((cliente) => {
                                const numMascotas = getMascotas(cliente.id_cliente).length;
                                return (
                                    <tr key={cliente.id_cliente}>
                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.apellido}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{cliente.telefono}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                                                {numMascotas} {numMascotas === 1 ? 'mascota' : 'mascotas'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => verDetalles(cliente)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                Ver Detalles
                                            </button>
                                            <button className="text-[#f79205] hover:text-[#d47d04] mr-3">Editar</button>
                                            <button className="text-red-600 hover:text-red-900">Eliminar</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    {busqueda ? 'No se encontraron clientes con ese criterio de búsqueda' : 'No hay clientes registrados'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para nuevo cliente */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Nuevo Cliente</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre/s</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f79205] focus:border-[#f79205] ${
                                            errores.nombre ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoCliente.nombre}
                                        onChange={(e) => {
                                            setNuevoCliente({...nuevoCliente, nombre: e.target.value});
                                            if (errores.nombre) setErrores({...errores, nombre: ''});
                                        }}
                                        required
                                    />
                                    {errores.nombre && (
                                        <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Apellido/s</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f79205] focus:border-[#f79205] ${
                                            errores.apellido ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoCliente.apellido}
                                        onChange={(e) => {
                                            setNuevoCliente({...nuevoCliente, apellido: e.target.value});
                                            if (errores.apellido) setErrores({...errores, apellido: ''});
                                        }}
                                        required
                                    />
                                    {errores.apellido && (
                                        <p className="mt-1 text-sm text-red-600">{errores.apellido}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f79205] focus:border-[#f79205] ${
                                            errores.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoCliente.email}
                                        onChange={(e) => {
                                            setNuevoCliente({...nuevoCliente, email: e.target.value});
                                            const error = validarEmail(e.target.value);
                                            setErrores({...errores, email: error});
                                        }}
                                        required
                                    />
                                    {errores.email && (
                                        <p className="mt-1 text-sm text-red-600">{errores.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                                    <input
                                        type="tel"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f79205] focus:border-[#f79205] ${
                                            errores.telefono ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoCliente.telefono}
                                        onChange={(e) => {
                                            setNuevoCliente({...nuevoCliente, telefono: e.target.value});
                                            const error = validarTelefono(e.target.value);
                                            setErrores({...errores, telefono: error});
                                        }}
                                        placeholder="Ej: 3814123456"
                                        required
                                    />
                                    {errores.telefono && (
                                        <p className="mt-1 text-sm text-red-600">{errores.telefono}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha de Registro</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#f79205] focus:border-[#f79205]"
                                        value={nuevoCliente.fecha_registro}
                                        onChange={(e) => setNuevoCliente({...nuevoCliente, fecha_registro: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarFormulario(false);
                                        setErrores({});
                                        setNuevoCliente({
                                            nombre: '',
                                            apellido: '',
                                            email: '',
                                            telefono: '',
                                            fecha_registro: new Date().toISOString().split('T')[0]
                                        });
                                    }}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#f8dfc3] text-gray-700 py-2 px-4 rounded-lg hover:bg-[#f79205] transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Detalles del Cliente */}
            {mostrarDetalles && clienteSeleccionado && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">Detalles del Cliente</h2>
                            <button 
                                onClick={() => setMostrarDetalles(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        {/* Información del Cliente */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">Información Personal</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nombre Completo</p>
                                    <p className="font-medium">{clienteSeleccionado.nombre} {clienteSeleccionado.apellido}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{clienteSeleccionado.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Teléfono</p>
                                    <p className="font-medium">{clienteSeleccionado.telefono}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Fecha de Registro</p>
                                    <p className="font-medium">{new Date(clienteSeleccionado.fecha_registro).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>

                        {/* Mascotas */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    Mascotas ({getMascotas(clienteSeleccionado.id_cliente).length})
                                </h3>
                                <button className="text-[#f79205] hover:text-[#d47d04] text-sm font-medium">
                                    + Agregar Mascota
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {getMascotas(clienteSeleccionado.id_cliente).map((mascota) => (
                                    <div key={mascota.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-800 text-lg">{mascota.nombre}</h4>
                                            <i className={`fas ${mascota.especie === 'Perro' ? 'fa-dog' : 'fa-cat'} text-[#f79205] text-xl`}></i>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <p><span className="text-gray-500">Especie:</span> <span className="font-medium">{mascota.especie}</span></p>
                                            <p><span className="text-gray-500">Raza:</span> <span className="font-medium">{mascota.raza}</span></p>
                                            <p><span className="text-gray-500">Edad:</span> <span className="font-medium">{mascota.edad} años</span></p>
                                            <p><span className="text-gray-500">Peso:</span> <span className="font-medium">{mascota.peso} kg</span></p>
                                        </div>
                                        <div className="mt-3 flex gap-2">
                                            <button className="text-xs text-blue-600 hover:text-blue-800">Ver Historial</button>
                                            <button className="text-xs text-[#f79205] hover:text-[#d47d04]">Editar</button>
                                        </div>
                                    </div>
                                ))}
                                {getMascotas(clienteSeleccionado.id_cliente).length === 0 && (
                                    <div className="col-span-2 text-center py-8 text-gray-500">
                                        No hay mascotas registradas para este cliente
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Historial de Citas */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700">
                                Historial de Citas ({getHistorial(clienteSeleccionado.id_cliente).length})
                            </h3>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mascota</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veterinario</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {getHistorial(clienteSeleccionado.id_cliente).map((cita) => (
                                            <tr key={cita.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm">{new Date(cita.fecha).toLocaleDateString()}</td>
                                                <td className="px-4 py-3 text-sm font-medium">{cita.mascota}</td>
                                                <td className="px-4 py-3 text-sm">{cita.motivo}</td>
                                                <td className="px-4 py-3 text-sm">{cita.veterinario}</td>
                                            </tr>
                                        ))}
                                        {getHistorial(clienteSeleccionado.id_cliente).length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                                                    No hay historial de citas para este cliente
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setMostrarDetalles(false)}
                                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Propietarios;