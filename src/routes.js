import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from './components/PaginaBase';
import './styles/style.css';
import Home from './components/Home';
import Estacionamento from './components/Estacionamento';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />}>

        </Route>
      </Routes>
    </BrowserRouter>
      
 
  );
}

export default AppRoutes;
