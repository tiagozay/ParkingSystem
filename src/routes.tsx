import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import PrecificacoesProvider from './contexts/PrecificacaoContext';
import TicketsProvider from './contexts/TicketContext';
import EditarTicket from './pages/EditarTicket';
import FormasDePagamentoProvider from './contexts/FormaDePagamentoContext';
import VisualizarTicket from './pages/VisualizarTicket';
import MensalistasProvider from './contexts/MensalistasContext';
import EditarMensalista from './pages/EditarMensalista';
import MensalidadesProvider from './contexts/MensalidadesContext';
import EditarPrecificacao from './pages/EditarPrecificacao';
import EditarFormaDePagamento from './pages/EditarFormaDePagamento';
import UsuariosProvider from './contexts/UsuariosContext';
import EditarUsuario from './pages/EditarUsuario';
import SistemaProvider from './contexts/SistemaContext';
import TelaLogin from './pages/TelaLogin';


function AppRoutes() {
  return (
    <UsuariosProvider>
      <SistemaProvider>
        <PrecificacoesProvider>
          <FormasDePagamentoProvider>
            <MensalistasProvider>
              <MensalidadesProvider>
                <TicketsProvider>
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
                      <Route path='login' element={<TelaLogin />} />
                    </Routes>
                  </BrowserRouter>
                </TicketsProvider>
              </MensalidadesProvider>
            </MensalistasProvider>
          </FormasDePagamentoProvider>
        </PrecificacoesProvider>
      </SistemaProvider>
    </UsuariosProvider>


  );
}

export default AppRoutes;
