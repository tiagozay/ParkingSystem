import React from 'react';
import './Estacionamento.css'
import SelectFiltros from '../SelectFiltros';

export default function Estacionamento() {
  return (
    <section id="estacionamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">local_parking</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Tickets de estacionamento</h2>
                        <span>Listando tickets cadastrados</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <a className="btnTrocarDePagina" data-pagina="home"><i className="material-icons">home</i></a> 
                    <span className="barraSeparadora">/</span>
                    <a className="infoPagina">Estacionamento</a>
                </div>
             
            </div>

            <div id="mensagemDeBoasVindas" className="mensagem">
                <div id="conteudoMensagem">
                    <i className="material-icons">mood</i>
                    <span>Seja bem vindo (a) Tiago!</span>
                </div>
                <button id="btnFecharMensagem" className="material-icons">close</button>
            </div>

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <button className="btnTrocarDePagina" id="btnAdicionarNovo" data-pagina="formularioAdcNovoTiket">
                        <i className="material-icons">add</i>
                        Novo
                    </button>
                </div>

                <div className="divCamposSelectEBuscaDaTabela">
                    <label>
                        Somente tikets
                        <SelectFiltros>
                            <option value="abertos">Abertos</option>
                            <option value="fechados">Fechados</option>
                            <option value="todos">Todos</option>
                        </SelectFiltros>
                        
                    </label>
             
                    <label>
                        Pesquisar
                        <input type="text" className="inputPesquisar" />
                    </label>
                </div>

                <div className="containerTabela">
                    <table id="tabelaTikets" className="tabelaPadrao">
                        <thead>
                            <tr></tr>
                        </thead>
                    </table>
                </div>
            

            </section>

        </section>
  )
}
