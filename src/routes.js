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
          <Route index element={<Home />}></Route>

          <Route path='estacionamento' element={<Estacionamento></Estacionamento>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
      
 
  );
}

export default AppRoutes;
