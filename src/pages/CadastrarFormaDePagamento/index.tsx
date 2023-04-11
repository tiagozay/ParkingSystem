import React from 'react';
import { Link } from 'react-router-dom';
import BoasVindas from '../../components/BoasVindas';
import './CadastrarFormaDePagamento.css';
import BtnVoltar from '../../components/BtnVoltar';

export default function CadastrarFormaDePagamento() {
    return (
        <section id="formCadastrarFormaDePagamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">attach_money</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar formas de pagamento</h2>
                        <span>Cadastrando formas de pagamento</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/formasDePagamento'>
                        Formas de pagamento
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/formasDePagamento/cadastrarFormaDePagamento'>
                        Cadastrar forma de pagamento
                    </Link>
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

                <form action="" className="formPadrao">
                    <div className="linhaInputs">
                        <label className="labelInputMaior">
                            Nome da forma de pagamento
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Ativa
                            <select name="" id="" className="inputObrigatorio">
                                <option value="">Sim</option>
                                <option value="">Não</option>
                            </select>
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


            </section>

        </section>
    )
}
