import { useState } from 'react';

const Mascotas = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mascotas, setMascotas] = useState([]);
    const [errores, setErrores] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [filtroEspecie, setFiltroEspecie] = useState('todos');
    const [previsualizacionFoto, setPrevisualizacionFoto] = useState(null);
    const [nuevaMascota, setNuevaMascota] = useState({
        nombre: '',
        especie: '',
        raza: '',
        sexo: '',
        fecha_nacimiento: '',
        color: '',
        peso: '',
        foto: null,
        id_propietario: ''
    });

    // Lista de propietarios (vendrá del backend)
    const [propietarios, setPropietarios] = useState([]);

    // Función para calcular edad
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    // Función para validar campos
    const validarCampos = () => {
        const nuevosErrores = {};

        if (!nuevaMascota.nombre.trim()) {
            nuevosErrores.nombre = 'El nombre es requerido';
        }

        if (!nuevaMascota.especie) {
            nuevosErrores.especie = 'Debe seleccionar una especie';
        }

        if (!nuevaMascota.raza.trim()) {
            nuevosErrores.raza = 'La raza es requerida';
        }

        if (!nuevaMascota.sexo) {
            nuevosErrores.sexo = 'Debe seleccionar el sexo';
        }

        if (!nuevaMascota.fecha_nacimiento) {
            nuevosErrores.fecha_nacimiento = 'La fecha de nacimiento es requerida';
        } else {
            const fechaNac = new Date(nuevaMascota.fecha_nacimiento);
            const hoy = new Date();
            if (fechaNac > hoy) {
                nuevosErrores.fecha_nacimiento = 'La fecha no puede ser futura';
            }
        }

        if (!nuevaMascota.color.trim()) {
            nuevosErrores.color = 'El color es requerido';
        }

        if (!nuevaMascota.peso) {
            nuevosErrores.peso = 'El peso es requerido';
        } else if (nuevaMascota.peso <= 0) {
            nuevosErrores.peso = 'El peso debe ser mayor a 0';
        }

        if (!nuevaMascota.id_propietario) {
            nuevosErrores.id_propietario = 'Debe seleccionar un propietario';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    // Función para manejar la carga de foto
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de archivo
            if (!file.type.startsWith('image/')) {
                setErrores({...errores, foto: 'Solo se permiten imágenes'});
                return;
            }

            // Validar tamaño (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrores({...errores, foto: 'La imagen no debe superar 5MB'});
                return;
            }

            setNuevaMascota({...nuevaMascota, foto: file});
            
            // Crear previsualización
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevisualizacionFoto(reader.result);
            };
            reader.readAsDataURL(file);
            
            setErrores({...errores, foto: ''});
        }
    };

    // Función para enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarCampos()) {
            // Crear FormData para enviar al backend (incluye la foto)
            const formData = new FormData();
            Object.keys(nuevaMascota).forEach(key => {
                formData.append(key, nuevaMascota[key]);
            });

            // TODO: Cuando tengas backend, envía formData con fetch
            // fetch('http://tu-api.com/api/mascotas', {
            //     method: 'POST',
            //     body: formData
            // })

            // Por ahora, agregar temporalmente al estado
            const mascotaCompleta = {
                ...nuevaMascota,
                id_mascota: Date.now(),
                edad: calcularEdad(nuevaMascota.fecha_nacimiento),
                foto_url: previsualizacionFoto
            };

            setMascotas([...mascotas, mascotaCompleta]);
            setMostrarFormulario(false);
            limpiarFormulario();
        }
    };

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        setNuevaMascota({
            nombre: '',
            especie: '',
            raza: '',
            sexo: '',
            fecha_nacimiento: '',
            color: '',
            peso: '',
            foto: null,
            id_propietario: ''
        });
        setPrevisualizacionFoto(null);
        setErrores({});
    };

    // Filtrar mascotas
    const mascotasFiltradas = mascotas.filter(mascota => {
        const cumpleBusqueda = busqueda === '' || 
            mascota.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            mascota.raza.toLowerCase().includes(busqueda.toLowerCase());
        
        const cumpleEspecie = filtroEspecie === 'todos' || mascota.especie === filtroEspecie;
        
        return cumpleBusqueda && cumpleEspecie;
    });

    return (
        <div className="p-6 min-h-screen bg-cover bg-center bg-[#fdf6ec]">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Gestión de Mascotas</h1>
                <button
                    onClick={() => setMostrarFormulario(true)}
                    className="bg-[#00796b] hover:bg-[#a8e6cf] text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                    <i className="fas fa-plus"></i>
                    Nueva Mascota
                </button>
            </div>

            {/* Filtros y búsqueda */}
            <div className="mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o raza..."
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
                </div>
                <select
                    value={filtroEspecie}
                    onChange={(e) => setFiltroEspecie(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                    <option value="todos">Todas las especies</option>
                    <option value="Perro">Perros</option>
                    <option value="Gato">Gatos</option>
                    <option value="Ave">Aves</option>
                    <option value="Otro">Otros</option>
                </select>
            </div>

            {/* Grid de Mascotas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mascotasFiltradas.map((mascota) => (
                    <div key={mascota.id_mascota} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
                        <div className="h-48 bg-gray-200 overflow-hidden">
                            {mascota.foto_url ? (
                                <img 
                                    src={mascota.foto_url} 
                                    alt={mascota.nombre}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <i className={`fas ${mascota.especie === 'Perro' ? 'fa-dog' : mascota.especie === 'Gato' ? 'fa-cat' : 'fa-paw'} text-6xl`}></i>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-800">{mascota.nombre}</h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    mascota.sexo === 'Macho' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                                }`}>
                                    {mascota.sexo === 'Macho' ? '♂' : '♀'}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                                <i className="fas fa-paw text-green-500 mr-2"></i>
                                {mascota.especie} • {mascota.raza}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <i className="fas fa-birthday-cake text-green-500 mr-2"></i>
                                {mascota.edad} {mascota.edad === 1 ? 'año' : 'años'}
                            </p>
                            <p className="text-sm text-gray-600 mb-1">
                                <i className="fas fa-palette text-green-500 mr-2"></i>
                                {mascota.color}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <i className="fas fa-weight text-green-500 mr-2"></i>
                                {mascota.peso} kg
                            </p>
                            <div className="flex gap-2 pt-3 border-t border-gray-200">
                                <button className="flex-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                                    Ver Detalles
                                </button>
                                <button className="flex-1 text-sm text-green-600 hover:text-green-800 font-medium">
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {mascotasFiltradas.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-paw text-6xl mb-4"></i>
                    <p className="text-xl">No se encontraron mascotas</p>
                </div>
            )}

            {/* Modal para nueva mascota */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl my-8">
                        <h2 className="text-2xl font-semibold mb-6">Nueva Mascota</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Foto */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Foto de la Mascota</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                                            {previsualizacionFoto ? (
                                                <img 
                                                    src={previsualizacionFoto} 
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <i className="fas fa-camera text-gray-400 text-3xl"></i>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg inline-block transition-colors">
                                                <i className="fas fa-upload mr-2"></i>
                                                Seleccionar Foto
                                                <input 
                                                    type="file" 
                                                    accept="image/*"
                                                    onChange={handleFotoChange}
                                                    className="hidden"
                                                />
                                            </label>
                                            <p className="text-xs text-gray-500 mt-2">Máximo 5MB - JPG, PNG, GIF</p>
                                            {errores.foto && (
                                                <p className="text-sm text-red-600 mt-1">{errores.foto}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.nombre ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.nombre}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, nombre: e.target.value})}
                                        placeholder="Ej: Max"
                                    />
                                    {errores.nombre && (
                                        <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
                                    )}
                                </div>

                                {/* Especie */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Especie *</label>
                                    <select
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.especie ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.especie}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, especie: e.target.value})}
                                    >
                                        <option value="">Seleccione una especie</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Ave">Ave</option>
                                        <option value="Conejo">Conejo</option>
                                        <option value="Hamster">Hamster</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    {errores.especie && (
                                        <p className="mt-1 text-sm text-red-600">{errores.especie}</p>
                                    )}
                                </div>

                                {/* Raza */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Raza *</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.raza ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.raza}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, raza: e.target.value})}
                                        placeholder="Ej: Golden Retriever"
                                    />
                                    {errores.raza && (
                                        <p className="mt-1 text-sm text-red-600">{errores.raza}</p>
                                    )}
                                </div>

                                {/* Sexo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Sexo *</label>
                                    <select
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.sexo ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.sexo}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, sexo: e.target.value})}
                                    >
                                        <option value="">Seleccione el sexo</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>
                                    {errores.sexo && (
                                        <p className="mt-1 text-sm text-red-600">{errores.sexo}</p>
                                    )}
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento *</label>
                                    <input
                                        type="date"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.fecha_nacimiento ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.fecha_nacimiento}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, fecha_nacimiento: e.target.value})}
                                    />
                                    {errores.fecha_nacimiento && (
                                        <p className="mt-1 text-sm text-red-600">{errores.fecha_nacimiento}</p>
                                    )}
                                </div>

                                {/* Color */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Color *</label>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.color ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.color}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, color: e.target.value})}
                                        placeholder="Ej: Marrón dorado"
                                    />
                                    {errores.color && (
                                        <p className="mt-1 text-sm text-red-600">{errores.color}</p>
                                    )}
                                </div>

                                {/* Peso */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Peso (kg) *</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.peso ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.peso}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, peso: e.target.value})}
                                        placeholder="Ej: 25.5"
                                    />
                                    {errores.peso && (
                                        <p className="mt-1 text-sm text-red-600">{errores.peso}</p>
                                    )}
                                </div>

                                {/* Propietario */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Propietario *</label>
                                    <select
                                        className={`mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 ${
                                            errores.id_propietario ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        value={nuevaMascota.id_propietario}
                                        onChange={(e) => setNuevaMascota({...nuevaMascota, id_propietario: e.target.value})}
                                    >
                                        <option value="">Seleccione un propietario</option>
                                        {propietarios.map((prop) => (
                                            <option key={prop.id_cliente} value={prop.id_cliente}>
                                                {prop.nombre} {prop.apellido}
                                            </option>
                                        ))}
                                    </select>
                                    {errores.id_propietario && (
                                        <p className="mt-1 text-sm text-red-600">{errores.id_propietario}</p>
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
                                    className="bg-[#00796b] text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Guardar Mascota
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mascotas;