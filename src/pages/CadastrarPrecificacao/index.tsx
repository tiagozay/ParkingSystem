import React from 'react'
import BoasVindas from '../../components/BoasVindas';
import './CadastrarPrecificacao.css';
import { Link } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';

export default function CadastrarPrecificacao() {
    return (
        <section id="formularioCadastroNovaPrecificacao">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">payments</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar precificação</h2>
                        <span>Cadastrando precificações</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/precificacoes'>
                        Precificacoes
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/precificacoes/cadastrarPrecificacao'>
                        Cadastrar Precificacao
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
                            Categoria
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMenor">
                            Valor hora
                            <input type="number" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMenor">
                            Valor mensalidade
                            <input type="number" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMenor">
                            Número de vagas
                            <input type="number" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMenor">
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
