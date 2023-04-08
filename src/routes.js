import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import Estacionamento from './pages/Estacionamento';
import './styles/style.css';


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
