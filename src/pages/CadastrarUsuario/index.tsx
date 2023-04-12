import React from 'react';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import './CadastrarUsuario.css';
import BtnVoltar from '../../components/BtnVoltar';

export default function CadastrarUsuario() {
    return (
        <section id="formularioAdicionarNovoUsuario">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">group</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar ususários</h2>
                        <span>Cadastrando usuários</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/usuarios'>
                        Usuários
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/usuarios/cadastrarUsuario'>
                        Cadastrar Usuario
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
                        <label className="labelInputMeio">
                            Nome
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMeio">
                            Sobrenome
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Usuário
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Senha
                            <input type="password" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMeio">
                            Confirme a senha
                            <input type="password" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Perfil de acesso
                            <select name="" id="" className="inputObrigatorio">
                                <option value="">Operador</option>
                                <option value="">Administrador</option>
                            </select>
                        </label>
                        <label className="labelInputMeio">
                            Ativo
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
