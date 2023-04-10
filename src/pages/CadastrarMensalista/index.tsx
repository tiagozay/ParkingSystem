import React from 'react';
import './CadastrarMensalista.css';
import BoasVindas from '../../components/BoasVindas';
import BtnVoltar from '../../components/BtnVoltar';
import { Link } from 'react-router-dom';

export default function CadastrarMensalista() {
    return (
        <section id="formAdicionarMensalista">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">groups</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar mensalistas</h2>
                        <span>Cadastrando mensalistas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalistas'>
                        Mensalistas
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalistas/cadastrarMensalista'>
                        Cadastrar Mensalista
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
                        <label>
                            Nome
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Sobrenome
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Data nascimento
                            <input type="date" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            CPF
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            E-mail
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Telefone
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            Endereço
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Cidade
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            CEP
                            <input type="text" className="inputObrigatorio" />
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
