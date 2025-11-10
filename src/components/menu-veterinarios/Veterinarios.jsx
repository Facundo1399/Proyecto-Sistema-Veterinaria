import { useState } from 'react';

const Veterinarios = () => {
    // Estados para gestionar los veterinarios y el formulario
    const [veterinarios, setVeterinarios] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errores, setErrores] = useState({});
    const [veterinarioEditar, setVeterinarioEditar] = useState(null);
    const [nuevoVeterinario, setNuevoVeterinario] = useState({
        nombre: '',
        especialidad: '',
        telefono: '',
        email: ''
    });

    // Función para validar el formulario
    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validar nombre
        if (!nuevoVeterinario.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es requerido';
        } else if (nuevoVeterinario.nombre.length < 3) {
            nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
        }

        // Validar email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!nuevoVeterinario.email.trim()) {
            nuevosErrores.email = 'El email es requerido';
        } else if (!regexEmail.test(nuevoVeterinario.email)) {
            nuevosErrores.email = 'El email no es válido';
        }

        // Validar teléfono (opcional pero con formato si se proporciona)
        if (nuevoVeterinario.telefono) {
            const regexTelefono = /^\+?[0-9]{10,15}$/;
            if (!regexTelefono.test(nuevoVeterinario.telefono)) {
                nuevosErrores.telefono = 'El teléfono debe tener entre 10 y 15 dígitos';
            }
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validarFormulario()) {
            // Aquí irá la lógica para guardar en la base de datos
            setMostrarFormulario(false);
            setNuevoVeterinario({
                nombre: '',
                especialidad: '',
                telefono: '',
                email: ''
            });
            setVeterinarioEditar(null);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Gestión de Veterinarios</h1>
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-[#a8e6cf] hover:bg-[#8dcfb8] text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Agregar Veterinario
                </button>
            </div>

            {/* Tabla de Veterinarios */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especialidad</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {veterinarios.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                    No hay veterinarios registrados
                                </td>
                            </tr>
                        ) : (
                            veterinarios.map((veterinario) => (
                                <tr key={veterinario.id_veterinario}>
                                    <td className="px-6 py-4 whitespace-nowrap">{veterinario.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{veterinario.especialidad || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{veterinario.telefono || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{veterinario.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button 
                                            onClick={() => {
                                                setVeterinarioEditar(veterinario);
                                                setNuevoVeterinario(veterinario);
                                                setMostrarFormulario(true);
                                            }}
                                            className="text-[#a8e6cf] hover:text-[#8dcfb8] mr-3"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                // Aquí irá la lógica para eliminar
                                            }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para agregar/editar veterinario */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {veterinarioEditar ? 'Editar Veterinario' : 'Nuevo Veterinario'}
                            </h2>
                            <button 
                                onClick={() => {
                                    setMostrarFormulario(false);
                                    setVeterinarioEditar(null);
                                    setNuevoVeterinario({
                                        nombre: '',
                                        especialidad: '',
                                        telefono: '',
                                        email: ''
                                    });
                                    setErrores({});
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                <input
                                    type="text"
                                    value={nuevoVeterinario.nombre}
                                    onChange={(e) => setNuevoVeterinario({...nuevoVeterinario, nombre: e.target.value})}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                                        ${errores.nombre ? 'border-red-500' : 'border-gray-300'}
                                        focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]`}
                                />
                                {errores.nombre && (
                                    <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Especialidad</label>
                                <input
                                    type="text"
                                    value={nuevoVeterinario.especialidad}
                                    onChange={(e) => setNuevoVeterinario({...nuevoVeterinario, especialidad: e.target.value})}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3
                                        focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                                <input
                                    type="tel"
                                    value={nuevoVeterinario.telefono}
                                    onChange={(e) => setNuevoVeterinario({...nuevoVeterinario, telefono: e.target.value})}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                                        ${errores.telefono ? 'border-red-500' : 'border-gray-300'}
                                        focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]`}
                                />
                                {errores.telefono && (
                                    <p className="mt-1 text-sm text-red-600">{errores.telefono}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={nuevoVeterinario.email}
                                    onChange={(e) => setNuevoVeterinario({...nuevoVeterinario, email: e.target.value})}
                                    className={`mt-1 block w-full rounded-md shadow-sm py-2 px-3 
                                        ${errores.email ? 'border-red-500' : 'border-gray-300'}
                                        focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]`}
                                />
                                {errores.email && (
                                    <p className="mt-1 text-sm text-red-600">{errores.email}</p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarFormulario(false);
                                        setVeterinarioEditar(null);
                                        setNuevoVeterinario({
                                            nombre: '',
                                            especialidad: '',
                                            telefono: '',
                                            email: ''
                                        });
                                        setErrores({});
                                    }}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#a8e6cf] text-gray-700 rounded-lg hover:bg-[#8dcfb8]"
                                >
                                    {veterinarioEditar ? 'Guardar Cambios' : 'Agregar Veterinario'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Veterinarios;
