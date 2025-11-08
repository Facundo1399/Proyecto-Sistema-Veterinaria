
import { useState } from 'react';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <>
            {/* Botón de menú móvil */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#a8e6cf] p-2 rounded-md text-gray-700 hover:bg-[#98d6bf]"
            >
                <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>

            {/* Overlay para cerrar el menú en móviles */}
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static 
                w-[280px] lg:w-56 
                h-screen 
                bg-[#a8e6cf] 
                text-gray-700 
                flex flex-col 
                items-center 
                py-6 
                z-50
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col items-center mb-8 mt-8 lg:mt-0">
                    <img 
                        src="./src/components/sidebar/SISTEM VET.png"
                        alt="Sistema Veterinaria Logo" 
                        className="w-32 h-auto mb-4"
                    />
                </div>

                <div className="w-full text-sm flex flex-col">
                    <button className="flex items-center gap-2 px-5 py-3 bg-white/10 text-left hover:bg-white/20">
                        <i className="fas fa-home w-5"></i> <span>Inicio</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left">
                        <i className="fas fa-calendar-alt w-5"></i> <span>Turnos</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left">
                        <i className="fas fa-users w-5"></i> <span>Propietarios</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left">
                        <i className="fas fa-paw w-5"></i> <span>Mascotas</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left">
                        <i className="fas fa-user-md w-5"></i> <span>Veterinarios</span>
                    </button>
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left">
                        <i className="fas fa-clipboard-list w-5"></i> <span>Historial Médico</span>
                    </button>
                    
                    <div className="mt-4 mb-4 mx-4">
                        <div className="border-t border-gray-600/20"></div>
                    </div>
                    
                    <button className="flex items-center gap-2 px-5 py-3 hover:bg-white/10 text-left text-red-400">
                        <i className="fas fa-sign-out-alt w-5"></i> <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
