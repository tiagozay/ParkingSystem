import { BrowserRouter, Route, Routes} from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import Estacionamento from './pages/Estacionamento';
import CadastrarTiket from './pages/CadastrarTiket';
import './styles/style.css';
import './styles/reset.css';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />}>
          <Route index element={<Home />} />
          <Route path='estacionamento' element={<Estacionamento />} />
          <Route path='estacionamento/cadastrarTiket' element={<CadastrarTiket />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
 
  );
}

export default AppRoutes;
