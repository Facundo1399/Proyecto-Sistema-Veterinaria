import { useState } from 'react';

const Turnos = () => {
    // Estados para gestionar los turnos y el formulario
    const [turnos, setTurnos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errores, setErrores] = useState({});
    const [nuevoTurno, setNuevoTurno] = useState({
        fecha_cita: '',
        hora_cita: '',
        motivo: '',
        estado: 'programada',
        id_mascota: '',
        id_veterinario: ''
    });

    // Función para validar la fecha
    const validarFecha = (fecha) => {
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Resetear la hora para comparar solo fechas

        if (fechaSeleccionada < hoy) {
            return 'La fecha no puede ser anterior a hoy';
        }
        return '';
    };

    // Función para validar la hora (entre 8:00 y 20:00)
    const validarHora = (hora) => {
        if (!hora) return 'La hora es requerida';
        
        const [horaNum] = hora.split(':').map(Number);
        if (horaNum < 8 || horaNum >= 20) {
            return 'El horario debe estar entre las 8:00 y las 20:00';
        }
        return '';
    };

    // Función para validar todos los campos
    const validarCampos = () => {
        const nuevosErrores = {};
        
        // Validar fecha
        const errorFecha = validarFecha(nuevoTurno.fecha_cita);
        if (errorFecha) nuevosErrores.fecha_cita = errorFecha;

        // Validar hora
        const errorHora = validarHora(nuevoTurno.hora_cita);
        if (errorHora) nuevosErrores.hora_cita = errorHora;

        // Validar mascota
        if (!nuevoTurno.id_mascota) {
            nuevosErrores.id_mascota = 'Debe seleccionar una mascota';
        }

        // Validar veterinario
        if (!nuevoTurno.id_veterinario) {
            nuevosErrores.id_veterinario = 'Debe seleccionar un veterinario';
        }

        // Validar motivo
        if (!nuevoTurno.motivo.trim()) {
            nuevosErrores.motivo = 'El motivo es requerido';
        } else if (nuevoTurno.motivo.length < 10) {
            nuevosErrores.motivo = 'El motivo debe tener al menos 10 caracteres';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0; // Retorna true si no hay errores
    };

    // Estados para las listas desplegables
    const [mascotas, setMascotas] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    // Función para manejar la creación de un nuevo turno
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validarCampos()) {
            // Si pasa todas las validaciones, agregamos el turno (temporalmente al estado)
            const fechaHora = new Date(`${nuevoTurno.fecha_cita}T${nuevoTurno.hora_cita}`);
            const turnoCompleto = {
                ...nuevoTurno,
                fecha_cita: fechaHora.toISOString(),
                id_cita: Date.now() // ID temporal
            };
            
            setTurnos([...turnos, turnoCompleto]);
            setMostrarFormulario(false);
            // Limpiar el formulario
            setNuevoTurno({
                fecha_cita: '',
                hora_cita: '',
                motivo: '',
                estado: 'programada',
                id_mascota: '',
                id_veterinario: ''
            });
            setErrores({});
        }
    };

    // Función para cambiar el estado de un turno
    const cambiarEstadoTurno = (id, nuevoEstado) => {
        // Aquí irá la lógica para actualizar el estado en la base de datos
    };

    

    return (
        <div className="p-6 bg-[#fdf6ec] ">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Gestión de Turnos</h1>
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-[#a8e6cf] hover:bg-[#8dcfb8] text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Nuevo Turno
                </button>
            </div>

            {/* Filtros */}
            <div className="mb-6">
                <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a8e6cf]"
                >
                    <option value="todos">Todos los estados</option>
                    <option value="programada">Programados</option>
                    <option value="realizada">Realizados</option>
                    <option value="cancelada">Cancelados</option>
                </select>
            </div>

            {/* Tabla de Turnos */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mascota</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veterinario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {turnos.map((turno) => (
                            <tr key={turno.id_cita}>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(turno.fecha_cita).toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{turno.mascota}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{turno.veterinario}</td>
                                <td className="px-6 py-4">{turno.motivo}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${turno.estado === 'programada' ? 'bg-yellow-100 text-yellow-800' : 
                                        turno.estado === 'realizada' ? 'bg-green-100 text-green-800' : 
                                        'bg-red-100 text-red-800'}`}>
                                        {turno.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-[#a8e6cf] hover:text-[#8dcfb8] mr-3">Editar</button>
                                    <button className="text-red-600 hover:text-red-900">Cancelar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para nuevo turno */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Nuevo Turno</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha</label>
                                    <input
                                        type="date"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf] ${
                                            errores.fecha_cita ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoTurno.fecha_cita}
                                        onChange={(e) => {
                                            setNuevoTurno({...nuevoTurno, fecha_cita: e.target.value});
                                            const error = validarFecha(e.target.value);
                                            setErrores(prev => ({...prev, fecha_cita: error}));
                                        }}
                                        required
                                    />
                                    {errores.fecha_cita && (
                                        <p className="mt-1 text-sm text-red-600">{errores.fecha_cita}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                                    <input
                                        type="time"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf] ${
                                            errores.hora_cita ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevoTurno.hora_cita}
                                        onChange={(e) => {
                                            setNuevoTurno({...nuevoTurno, hora_cita: e.target.value});
                                            const error = validarHora(e.target.value);
                                            setErrores(prev => ({...prev, hora_cita: error}));
                                        }}
                                        required
                                    />
                                    {errores.hora_cita && (
                                        <p className="mt-1 text-sm text-red-600">{errores.hora_cita}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mascota</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]"
                                        value={nuevoTurno.id_mascota}
                                        onChange={(e) => setNuevoTurno({...nuevoTurno, id_mascota: e.target.value})}
                                        required
                                    >
                                        <option value="">Seleccione una mascota</option>
                                        {mascotas.map((mascota) => (
                                            <option key={mascota.id_mascota} value={mascota.id_mascota}>
                                                {mascota.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Veterinario</label>
                                    <select
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]"
                                        value={nuevoTurno.id_veterinario}
                                        onChange={(e) => setNuevoTurno({...nuevoTurno, id_veterinario: e.target.value})}
                                        required
                                    >
                                        <option value="">Seleccione un veterinario</option>
                                        {veterinarios.map((veterinario) => (
                                            <option key={veterinario.id_veterinario} value={veterinario.id_veterinario}>
                                                {veterinario.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Motivo</label>
                                    <textarea
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#a8e6cf] focus:border-[#a8e6cf]"
                                        rows="3"
                                        value={nuevoTurno.motivo}
                                        onChange={(e) => setNuevoTurno({...nuevoTurno, motivo: e.target.value})}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setMostrarFormulario(false)}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#a8e6cf] text-gray-700 py-2 px-4 rounded-lg hover:bg-[#8dcfb8] transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Turnos;
