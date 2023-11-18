import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Pacientes from './components/Pacientes/Pacientes.jsx'
import Medicos from './components/Medicos/Medicos.jsx'
import './App.css';
import NavClinica from './components/Navbar/NavClinica.jsx'
import Menu from './components/Menu/Menu.jsx';
import Footer from './components/Footer/Footer.jsx';


function App() {
  return (
    <BrowserRouter>
      <NavClinica />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/medicos" element={<Medicos />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
