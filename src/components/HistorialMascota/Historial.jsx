import { useState } from 'react';

const Historial = () => {
    const [busquedaMascota, setBusquedaMascota] = useState('');
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [historialRegistros, setHistorialRegistros] = useState([]);
    const [errores, setErrores] = useState({});
    
    const [nuevoRegistro, setNuevoRegistro] = useState({
        fecha_registro: new Date().toISOString().split('T')[0],
        peso: '',
        observaciones: '',
        diagnostico: '',
        tratamiento: '',
        id_veterinario: ''
    });

    // Lista de mascotas (vendrá del backend)
    const [mascotas, setMascotas] = useState([
        // Datos de ejemplo
        { id_mascota: 1, nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', propietario: 'Juan Pérez' },
        { id_mascota: 2, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', propietario: 'María García' },
        { id_mascota: 3, nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog', propietario: 'Carlos López' }
    ]);

    // Lista de veterinarios (vendrá del backend)
    const [veterinarios, setVeterinarios] = useState([
        { id_veterinario: 1, nombre: 'Dr. García' },
        { id_veterinario: 2, nombre: 'Dra. Martínez' },
        { id_veterinario: 3, nombre: 'Dr. López' }
    ]);

    // Historial médico de ejemplo (vendrá del backend)
    const historialData = {
        1: [
            {
                id: 1,
                fecha_registro: '2024-10-15',
                peso: 30.5,
                observaciones: 'Mascota activa y saludable',
                diagnostico: 'Chequeo de rutina',
                tratamiento: 'Vacunación antirrábica',
                veterinario: 'Dr. García'
            },
            {
                id: 2,
                fecha_registro: '2024-08-20',
                peso: 29.8,
                observaciones: 'Presenta ligero sobrepeso',
                diagnostico: 'Control de peso',
                tratamiento: 'Dieta balanceada y ejercicio',
                veterinario: 'Dra. Martínez'
            }
        ],
        2: [
            {
                id: 3,
                fecha_registro: '2024-09-10',
                peso: 4.2,
                observaciones: 'Muy activo, buen apetito',
                diagnostico: 'Saludable',
                tratamiento: 'Desparasitación',
                veterinario: 'Dr. García'
            }
        ]
    };

    // Filtrar mascotas según búsqueda
    const mascotasFiltradas = mascotas.filter(mascota =>
        mascota.nombre.toLowerCase().includes(busquedaMascota.toLowerCase()) ||
        mascota.propietario.toLowerCase().includes(busquedaMascota.toLowerCase())
    );

    // Función para seleccionar mascota y cargar su historial
    const seleccionarMascota = (mascota) => {
        setMascotaSeleccionada(mascota);
        // TODO: Cargar historial desde backend
        // fetch(`/api/historial/${mascota.id_mascota}`)
        setHistorialRegistros(historialData[mascota.id_mascota] || []);
        setBusquedaMascota('');
    };

    // Validar campos del formulario
    const validarCampos = () => {
        const nuevosErrores = {};

        if (!nuevoRegistro.peso || nuevoRegistro.peso <= 0) {
            nuevosErrores.peso = 'El peso debe ser mayor a 0';
        }

        if (!nuevoRegistro.observaciones.trim()) {
            nuevosErrores.observaciones = 'Las observaciones son requeridas';
        }

        if (!nuevoRegistro.diagnostico.trim()) {
            nuevosErrores.diagnostico = 'El diagnóstico es requerido';
        }

        if (!nuevoRegistro.tratamiento.trim()) {
            nuevosErrores.tratamiento = 'El tratamiento es requerido';
        }

        if (!nuevoRegistro.id_veterinario) {
            nuevosErrores.id_veterinario = 'Debe seleccionar un veterinario';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Guardar nuevo registro
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarCampos()) {
            const veterinario = veterinarios.find(v => v.id_veterinario === parseInt(nuevoRegistro.id_veterinario));
            
            const registroCompleto = {
                ...nuevoRegistro,
                id: Date.now(),
                veterinario: veterinario.nombre
            };

            // TODO: Enviar al backend
            // fetch(`/api/historial/${mascotaSeleccionada.id_mascota}`, { method: 'POST', ... })

            setHistorialRegistros([registroCompleto, ...historialRegistros]);
            setMostrarFormulario(false);
            limpiarFormulario();
        }
    };

    // Limpiar formulario
    const limpiarFormulario = () => {
        setNuevoRegistro({
            fecha_registro: new Date().toISOString().split('T')[0],
            peso: '',
            observaciones: '',
            diagnostico: '',
            tratamiento: '',
            id_veterinario: ''
        });
        setErrores({});
    };

    return (
        <div className="p-6 min-h-screen bg-[#fdf6ec] from-teal-50 to-cyan-50">
            <div className="mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Historial Médico</h1>
                <p className="text-gray-600">Busca una mascota para ver su historial médico completo</p>
            </div>

            {/* Buscador de Mascotas */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buscar Mascota
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre de mascota o propietario..."
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={busquedaMascota}
                        onChange={(e) => setBusquedaMascota(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                </div>

                {/* Lista de resultados de búsqueda */}
                {busquedaMascota && mascotasFiltradas.length > 0 && (
                    <div className="mt-3 border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                        {mascotasFiltradas.map((mascota) => (
                            <button
                                key={mascota.id_mascota}
                                onClick={() => seleccionarMascota(mascota)}
                                className="w-full text-left px-4 py-3 hover:bg-teal-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                <div className="flex items-center gap-3">
                                    <i className={`fas ${mascota.especie === 'Perro' ? 'fa-dog' : 'fa-cat'} text-teal-500 text-xl`}></i>
                                    <div>
                                        <p className="font-medium text-gray-800">{mascota.nombre}</p>
                                        <p className="text-sm text-gray-600">{mascota.raza} • Propietario: {mascota.propietario}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {busquedaMascota && mascotasFiltradas.length === 0 && (
                    <div className="mt-3 text-center text-gray-500 py-4">
                        No se encontraron mascotas
                    </div>
                )}
            </div>

            {/* Información de Mascota Seleccionada */}
            {mascotaSeleccionada && (
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                                    <i className={`fas ${mascotaSeleccionada.especie === 'Perro' ? 'fa-dog' : 'fa-cat'} text-teal-600 text-2xl`}></i>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{mascotaSeleccionada.nombre}</h2>
                                    <p className="text-gray-600">{mascotaSeleccionada.especie} • {mascotaSeleccionada.raza}</p>
                                    <p className="text-sm text-gray-500">Propietario: {mascotaSeleccionada.propietario}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setMostrarFormulario(true)}
                                className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <i className="fas fa-plus"></i>
                                Nuevo Registro
                            </button>
                        </div>
                    </div>

                    {/* Historial Médico */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Historial Médico ({historialRegistros.length} registros)
                        </h3>

                        {historialRegistros.length > 0 ? (
                            <div className="space-y-4">
                                {historialRegistros.map((registro) => (
                                    <div key={registro.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <i className="fas fa-calendar text-teal-500"></i>
                                                <span className="font-semibold text-gray-800">
                                                    {new Date(registro.fecha_registro).toLocaleDateString('es-ES', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <i className="fas fa-weight text-teal-500"></i>
                                                <span className="font-medium">{registro.peso} kg</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-1">Diagnóstico</p>
                                                <p className="text-gray-800">{registro.diagnostico}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 mb-1">Veterinario</p>
                                                <p className="text-gray-800 flex items-center gap-2">
                                                    <i className="fas fa-user-md text-teal-500"></i>
                                                    {registro.veterinario}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-sm font-medium text-gray-500 mb-1">Observaciones</p>
                                            <p className="text-gray-700 bg-gray-50 p-3 rounded">{registro.observaciones}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium text-gray-500 mb-1">Tratamiento</p>
                                            <p className="text-gray-700 bg-teal-50 p-3 rounded">{registro.tratamiento}</p>
                                        </div>

                                        <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                                <i className="fas fa-edit mr-1"></i>
                                                Editar
                                            </button>
                                            <button className="text-sm text-red-600 hover:text-red-800">
                                                <i className="fas fa-trash mr-1"></i>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <i className="fas fa-clipboard-list text-6xl mb-4"></i>
                                <p className="text-xl">No hay registros médicos para esta mascota</p>
                                <p className="text-sm mt-2">Agrega el primer registro médico</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Estado vacío cuando no hay mascota seleccionada */}
            {!mascotaSeleccionada && (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <i className="fas fa-search text-gray-300 text-6xl mb-4"></i>
                    <p className="text-xl text-gray-500">Busca una mascota para ver su historial médico</p>
                </div>
            )}

            {/* Modal para Nuevo Registro */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-3xl my-8">
                        <h2 className="text-2xl font-semibold mb-6">Nuevo Registro Médico</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Fecha de Registro */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha de Registro *</label>
                                    <input
                                        type="date"
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                                        value={nuevoRegistro.fecha_registro}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, fecha_registro: e.target.value})}
                                        required
                                    />
                                </div>

                                {/* Peso */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Peso (kg) *</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                                            errores.peso ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoRegistro.peso}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, peso: e.target.value})}
                                        placeholder="Ej: 30.5"
                                    />
                                    {errores.peso && (
                                        <p className="mt-1 text-sm text-red-600">{errores.peso}</p>
                                    )}
                                </div>

                                {/* Veterinario */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Veterinario Responsable *</label>
                                    <select
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                                            errores.id_veterinario ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoRegistro.id_veterinario}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, id_veterinario: e.target.value})}
                                    >
                                        <option value="">Seleccione un veterinario</option>
                                        {veterinarios.map((vet) => (
                                            <option key={vet.id_veterinario} value={vet.id_veterinario}>
                                                {vet.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errores.id_veterinario && (
                                        <p className="mt-1 text-sm text-red-600">{errores.id_veterinario}</p>
                                    )}
                                </div>

                                {/* Observaciones */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Observaciones *</label>
                                    <textarea
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                                            errores.observaciones ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        rows="3"
                                        value={nuevoRegistro.observaciones}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, observaciones: e.target.value})}
                                        placeholder="Describe el estado general de la mascota..."
                                    />
                                    {errores.observaciones && (
                                        <p className="mt-1 text-sm text-red-600">{errores.observaciones}</p>
                                    )}
                                </div>

                                {/* Diagnóstico */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Diagnóstico *</label>
                                    <textarea
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                                            errores.diagnostico ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        rows="3"
                                        value={nuevoRegistro.diagnostico}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, diagnostico: e.target.value})}
                                        placeholder="Diagnóstico médico..."
                                    />
                                    {errores.diagnostico && (
                                        <p className="mt-1 text-sm text-red-600">{errores.diagnostico}</p>
                                    )}
                                </div>

                                {/* Tratamiento */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Tratamiento *</label>
                                    <textarea
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                                            errores.tratamiento ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        rows="3"
                                        value={nuevoRegistro.tratamiento}
                                        onChange={(e) => setNuevoRegistro({...nuevoRegistro, tratamiento: e.target.value})}
                                        placeholder="Tratamiento prescrito..."
                                    />
                                    {errores.tratamiento && (
                                        <p className="mt-1 text-sm text-red-600">{errores.tratamiento}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMostrarFormulario(false);
                                        limpiarFormulario();
                                    }}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
                                >
                                    Guardar Registro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Historial;