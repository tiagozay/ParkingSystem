import React, { ReactNode } from 'react';
import './Home.css';
import BoasVindas from '../../components/BoasVindas';
import IconeEstacionamento from './proibido-estacionar.svg';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';

export default function Home() {

  const { precificacoes } = usePrecificacaoContext();

  const precificacoesValidas = precificacoes.filter(precificacao => precificacao.ativa && !precificacao.descontinuada);

  return (
    <section id="home">

      <div id="tituloDaPagina">
        <div id="tituloDaPagina__nome">
          <div id="tituloDaPagina__icone">
            <i className="material-icons">directions_car</i>
          </div>
          <div id="tituloDaPagina__textos">
            <h2>Controle de estacionamento</h2>
            <span>Seja muito bem vindo(a) ao Sistema !</span>
          </div>
        </div>
        <div id="caminhoDasEtapas">
        </div>
      </div>

      <BoasVindas />
      <section id="home__relatorios">
        <div className="cardRelatorio" id="relatorioTotalDeVagas">
          <div className="cardIconeETitulo">
            <i className="material-icons">warehouse</i>
            <div className="tituloEValor">
              <p>Total de vagas</p>
              <p className="valorCard">120</p>
            </div>
          </div>

          <div className="cardInformacoes">
            <div className="cardInformacoes__primeiraInformacao">
              <span className="tituloInfo">Livre</span>
              <span className="valueInfo">117</span>
            </div>
            <i className="material-icons">sync_alt</i>
            <div className="cardInformacoes__segundaInformacao">
              <span className="tituloInfo">Ocupadas</span>
              <span className="valueInfo">3</span>
            </div>
          </div>

          <h6>Sistema</h6>
        </div>
        <div className="cardRelatorio" id="relatorioPagamentosMensais">
          <div className="cardIconeETitulo">
            <i className="material-icons">payments</i>
            <div className="tituloEValor">
              <p>Mensais</p>
              <p className="valorCard">R$ 12.900</p>
            </div>
          </div>

          <div className="cardInformacoes">
            <div className="cardInformacoes__primeiraInformacao">
              <span className="tituloInfo">Em dia</span>
              <span className="valueInfo">1</span>
            </div>
            <i className="material-icons">sync_alt</i>
            <div className="cardInformacoes__segundaInformacao">
              <span className="tituloInfo">Vencidas</span>
              <span className="valueInfo">2</span>
            </div>
          </div>

          <h6>Sistema</h6>
        </div>
        <div className="cardRelatorio" id="relatorioPagamentosAvulsos">
          <div className="cardIconeETitulo">
            <i className="material-icons">attach_money</i>
            <div className="tituloEValor">
              <p>Avulsos</p>
              <p className="valorCard">R$ 67,233.65</p>
            </div>
          </div>

          <div className="cardInformacoes">
            <div className="cardInformacoes__primeiraInformacao">
              <span className="tituloInfo">Pagas</span>
              <span className="valueInfo">5</span>
            </div>
            <i className="material-icons">sync_alt</i>
            <div className="cardInformacoes__segundaInformacao">
              <span className="tituloInfo">Abertas</span>
              <span className="valueInfo">3</span>
            </div>
          </div>

          <h6>Sistema</h6>
        </div>
        <div className="cardRelatorio" id="relatorioMensalistas">
          <div className="cardIconeETitulo">
            <i className="material-icons">groups</i>
            <div className="tituloEValor">
              <p>Mensalistas</p>
              <p className="valorCard">120</p>
            </div>
          </div>

          <div className="cardInformacoes">
            <div className="cardInformacoes__primeiraInformacao">
              <span className="tituloInfo">Ativos</span>
              <span className="valueInfo">3</span>
            </div>
            <i className="material-icons">sync_alt</i>
            <div className="cardInformacoes__segundaInformacao">
              <span className="tituloInfo">Inativos</span>
              <span className="valueInfo">0</span>
            </div>
          </div>

          <h6>Sistema</h6>
        </div>
      </section>

      <section id='sistuacaoDasVagas'>
        <div id='tituloDaSecao'>
          <h3>Situação das vagas</h3>
        </div>

        <ul id='listaDasCategoriasCadastradas'>
          {
            precificacoesValidas.map(categoria => (
              <li key={categoria.id} id='cardCategoriaCadastrada'>
                <div id='topoDoCard'>
                  <h4 id="titulo">{categoria.categoria}</h4>
                </div>
                <div id="vagas">
                  {Array.from({ length: categoria.numeroDeVagas }, (_, index) => (
                    <div id='vaga' key={index + 1}>{index + 1}</div>
                  ))}
                </div>
              </li>
            ))
          }
        </ul>

      </section>

    </section>
  )
}
