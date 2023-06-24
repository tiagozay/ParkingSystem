import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import Estacionamento from './pages/Estacionamento';
import CadastrarTicket from './pages/CadastrarTicket';
import './styles/style.css';
import './styles/reset.css';
import Mensalistas from './pages/Mensalistas';
import CadastrarMensalista from './pages/CadastrarMensalista';
import Mensalidades from './pages/Mensalidades';
import CadastrarMensalidade from './pages/CadastrarMensalidade';
import Precificacoes from './pages/Precificacoes';
import CadastrarPrecificacao from './pages/CadastrarPrecificacao';
import FormasDePagamento from './pages/FormasDePagamento';
import CadastrarFormaDePagamento from './pages/CadastrarFormaDePagamento';
import Usuarios from './pages/Usuarios';
import CadastrarUsuario from './pages/CadastrarUsuario';
import ConfiguracoesDoSistema from './pages/ConfiguracoesDoSistema';
import EditarTicket from './pages/EditarTicket';
import VisualizarTicket from './pages/VisualizarTicket';
import EditarMensalista from './pages/EditarMensalista';
import EditarPrecificacao from './pages/EditarPrecificacao';
import EditarFormaDePagamento from './pages/EditarFormaDePagamento';
import EditarUsuario from './pages/EditarUsuario';
import TelaLogin from './pages/TelaLogin';
import Administracao from './pages/Administracao';


function AppRoutes() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PaginaBase />}>

          <Route index element={<Home />} />
          <Route path='estacionamento' element={<Estacionamento />} />
          <Route path='estacionamento/cadastrarTicket' element={<CadastrarTicket />} />
          <Route path='estacionamento/editarTicket/:id' element={<EditarTicket />} />
          <Route path='estacionamento/visualizarTicket/:id' element={<VisualizarTicket />} />
          <Route path='mensalistas' element={<Mensalistas />} />
          <Route path='mensalistas/cadastrarMensalista' element={<CadastrarMensalista />} />
          <Route path='mensalistas/editarMensalista/:id' element={<EditarMensalista />} />
          <Route path='mensalidades' element={<Mensalidades />} />
          <Route path='mensalidades/cadastrarMensalidade' element={<CadastrarMensalidade />} />

          <Route path='administracao' element={<Administracao />} >
            <Route path='precificacoes' element={<Precificacoes />} />
            <Route path='precificacoes/cadastrarPrecificacao' element={<CadastrarPrecificacao />} />
            <Route path='precificacoes/editarPrecificacao/:id' element={<EditarPrecificacao />} />
            <Route path='formasDePagamento' element={<FormasDePagamento />} />
            <Route path='formasDePagamento/cadastrarFormaDePagamento' element={<CadastrarFormaDePagamento />} />
            <Route path='formasDePagamento/editarFormaDePagamento/:id' element={<EditarFormaDePagamento />} />
            <Route path='usuarios' element={<Usuarios />} />
            <Route path='usuarios/cadastrarUsuario' element={<CadastrarUsuario />} />
            <Route path='usuarios/editarUsuario/:id' element={<EditarUsuario />} />
            <Route path='configuracoes' element={<ConfiguracoesDoSistema />} />
          </Route>

        </Route>
        <Route path='login' element={<TelaLogin />} />
      </Routes>
    </BrowserRouter>

  );
}

export default AppRoutes;
