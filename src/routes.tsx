import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaBase from './pages/PaginaBase';
import Home from './pages/Home';
import Estacionamento from './pages/Estacionamento';
import CadastrarTiket from './pages/CadastrarTiket';
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
import TiketsProvider from './contexts/TiketContext';
import EditarTiket from './pages/EditarTiket';
import FormasDePagamentoProvider from './contexts/FormaDePagamentoContext';
import VisualizarTiket from './pages/VisualizarTiket';
import MensalistasProvider from './contexts/MensalistasContext';
import EditarMensalista from './pages/EditarMensalista';
import MensalidadesProvider from './contexts/MensalidadesContext';
import EditarPrecificacao from './pages/EditarPrecificacao';


function AppRoutes() {
  return (
    <PrecificacoesProvider>
      <FormasDePagamentoProvider>
        <MensalistasProvider>
          <MensalidadesProvider>
            <TiketsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<PaginaBase />}>
                    <Route index element={<Home />} />
                    <Route path='estacionamento' element={<Estacionamento />} />
                    <Route path='estacionamento/cadastrarTiket' element={<CadastrarTiket />} />
                    <Route path='estacionamento/editarTiket/:id' element={<EditarTiket />} />
                    <Route path='estacionamento/visualizarTiket/:id' element={<VisualizarTiket />} />
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
                    <Route path='usuarios' element={<Usuarios />} />
                    <Route path='usuarios/cadastrarUsuario' element={<CadastrarUsuario />} />
                    <Route path='configuracoes' element={<ConfiguracoesDoSistema />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TiketsProvider>
          </MensalidadesProvider>
        </MensalistasProvider>
      </FormasDePagamentoProvider>
    </PrecificacoesProvider>

  );
}

export default AppRoutes;
