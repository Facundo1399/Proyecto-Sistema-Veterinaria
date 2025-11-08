import { useState } from 'react';

const Dashboard = () => {
    // Estados para las estadísticas (temporalmente con datos de ejemplo)
    const [stats, setStats] = useState({
        clientesTotal: 0,
        mascotasTotal: 0,
        turnosHoy: 0,
        proximosTurnos: 0
    });



    return (
        <div className="p-6 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Panel de Control</h1>
            
            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Tarjeta de Clientes */}
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Total Clientes</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.clientesTotal}</p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <i className="fas fa-users text-xl text-blue-500"></i>
                        </div>
                    </div>

                </div>

                {/* Tarjeta de Mascotas */}
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Total Mascotas</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.mascotasTotal}</p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <i className="fas fa-paw text-xl text-purple-500"></i>
                        </div>
                    </div>

                </div>

                {/* Tarjeta de Turnos de Hoy */}
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#a8e6cf]">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Turnos Hoy</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.turnosHoy}</p>
                        </div>
                        <div className="p-3 bg-[#e8f9f3] rounded-full">
                            <i className="fas fa-calendar-day text-xl text-[#a8e6cf]"></i>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-600">
                        <div className="flex items-center text-yellow-500">
                            <i className="fas fa-clock mr-1"></i>
                            <span>Próximo: 14:30</span>
                        </div>
                    </div>
                </div>

                {/* Tarjeta de Próximos Turnos */}
                <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-amber-500">
                    <div className="flex items-center">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">Próximos Turnos</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.proximosTurnos}</p>
                        </div>
                        <div className="p-3 bg-amber-100 rounded-full">
                            <i className="fas fa-calendar-alt text-xl text-amber-500"></i>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">
                        Próximos 7 días
                    </p>
                </div>
            </div>

            {/* Sección de Próximos Turnos e Imagen */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lista de Próximos Turnos */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximos Turnos</h2>
                    <div className="space-y-4">
                        {/* Ejemplo de estructura para próximos turnos - Se reemplazará con datos reales */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#e8f9f3] rounded-full mr-4">
                                <i className="fas fa-paw text-[#a8e6cf] text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">Espacio para Mascota</p>
                                <p className="text-sm text-gray-600">Espacio para Veterinario</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-800">--:--</p>
                                <p className="text-sm text-gray-600">Fecha</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#e8f9f3] rounded-full mr-4">
                                <i className="fas fa-paw text-[#a8e6cf] text-xl"></i>
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">Espacio para Mascota</p>
                                <p className="text-sm text-gray-600">Espacio para Veterinario</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-gray-800">--:--</p>
                                <p className="text-sm text-gray-600">Fecha</p>
                            </div>
                        </div>
                        {/* Mensaje cuando no hay turnos */}
                        {/* <div className="text-center text-gray-500 py-8">
                            No hay turnos programados
                        </div> */}
                    </div>
                </div>

                {/* Imagen */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-center">
                    <img 
                        src="./src/components/dashboard/mascotas.jpg"
                        alt="Imagen de Mascotas"
                        className="max-w-full h-auto rounded-lg object-contain max-h-[400px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
