import { BrowserRouter, Route, Routes} from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import Estacionamento from './pages/Estacionamento';
import CadastrarTiket from './pages/CadastrarTiket';
import './styles/style.css';
import './styles/reset.css';
import Mensalistas from './pages/Mensalistas';
import CadastrarMensalista from './pages/CadastrarMensalista';


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />}>
          <Route index element={<Home />} />
          <Route path='estacionamento' element={<Estacionamento />} />
          <Route path='estacionamento/cadastrarTiket' element={<CadastrarTiket />} />
          <Route path='mensalistas' element={<Mensalistas />} />
          <Route path='mensalistas/cadastrarMensalista' element={<CadastrarMensalista />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
 
  );
}

export default AppRoutes;
