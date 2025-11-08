import './index.css';

import Login  from "./components/login/Login" 
import Sidebar from './components/sidebar/Sidebar';
import Turnos from './components/menu turnos/Turnos';
import Dashboard from './components/dashboard/Dashboard';

function App() {

  return (
    <>
      <Sidebar />
      <Dashboard />
      <Turnos />


      <Login />
      
    </>
  )
}

export default App
