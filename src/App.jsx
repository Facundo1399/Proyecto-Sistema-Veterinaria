import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./components/login/Login";
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Turnos from './components/menu_turnos/Turnos';
import Propietarios from './components/menuPropietarios/Propietarios';
import Mascotas from './components/menuMascotas/Mascotas';

function AppContent() {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Dashboard />} />
          <Route path="/turnos" element={<Turnos />} />
          <Route path="/propietarios" element={<Propietarios />} />
          <Route path="/mascotas" element={<Mascotas />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;