import React from 'react';
import './CadastrarTiket.css';
import BtnVoltar from '../../components/BtnVoltar';
import InputPlaca from '../../components/InputPlaca';
import BoasVindas from '../../components/BoasVindas';

export default function CadastrarTiket() {


    return (
        <section id="formularioAdcNovoTiket">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">local_parking</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar tikets</h2>
                        <span>Cadastrando tickets</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <a className="btnTrocarDePagina" data-pagina="home"><i className="material-icons">home</i></a>
                    <span className="barraSeparadora">/</span>
                    <a className="btnTrocarDePagina infoPagina" data-pagina="estacionamento">Estacionamento</a>
                    <span className="barraSeparadora">/</span>
                    <a className="infoPagina">Cadastrar tiket</a>
                </div>

            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnVoltar">
                    <BtnVoltar>
                        <i className="material-icons">arrow_back</i>
                        Voltar
                    </BtnVoltar>
                </div>

                <div id="formAdcTiketView">
                    <form id="formularioCadatrarTiket" className="formPadrao">
                        <div className="linhaInputs">
                            <label>
                                Placa veículo
                                <InputPlaca />
                            </label>
                            <label>
                                Marca veículo
                                <input type="text" className="inputObrigatorio" name="marca" />
                            </label>
                            <label>
                                Modelo veículo
                                <input type="text" className="inputObrigatorio" name="modelo" />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Categoria
                                <select className="inputObrigatorio" name="categoria" id="selectCategoria">
                                    <option value="null">Selecione</option>

                                </select>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" name="valorHora" className="inputDesativado inputObrigatorio" />
                            </label>
                            <label>
                                Número vaga
                                <input type="text" name="numeroDaVaga" />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" />
                            </label>
                            <label>
                                Data saída
                                <input type="text" name="dataSaida" className="inputDesativado" />
                            </label>
                            <label>
                                Tempo decorrido (horas e minutos)
                                <input type="text" className="inputDesativado inputObrigatorio" value="0.0" />
                            </label>
                        </div>

                        <div className="formPadrao__divSalvarECancelar">
                            <button className="formPadrao__btnSalvar">
                                <i className="material-icons">save</i>
                                Salvar
                            </button>
                            <BtnVoltar className="formPadrao__btnVoltar">Voltar</BtnVoltar>
                        </div>
                    </form>
                </div>

            </section>

        </section>
    )
}
