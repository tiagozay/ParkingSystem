import React from 'react';
import './CadastrarMensalidade.css';
import BoasVindas from '../../components/BoasVindas';
import BtnVoltar from '../../components/BtnVoltar';
import { Link } from 'react-router-dom';

export default function CadastrarMensalidade() {
    return (
        <section id = "formularioCadastroNovaMensalidade">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">payments</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar mensalidade</h2>
                        <span>Cadastrando mensalidades</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalidades'>
                        Mensalidades
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalidades/cadastrarMensalidade'>
                        Cadastrar Mensalidade
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
                    <div  className="linhaInputs">
                        <label>
                            Mensalista
                            <select name="" id="" className="inputObrigatorio">
                                <option value="">José</option>
                                <option value="">Pedro</option>
                            </select>
                        </label>
                        <label>
                            Categoria
                            <select name="" id="" className="inputObrigatorio">
                                <option value="">Moto</option>
                                <option value="">Carro</option>
                            </select>
                        </label>
                        <label>
                            Valor mensalidade
                            <input type="text" className="inputDesativado inputObrigatorio" />
                        </label>
                    </div>
    
                    <div  className="linhaInputs">
                        <label>
                            Data de contratação
                            <input type="date" className="inputDesativado inputObrigatorio" />
                        </label>
                        <label>
                            Data de vencimento
                            <input type="date" className="inputDesativado inputObrigatorio" />
                        </label>
                        <label>
                            Forma de pagamento
                            <select name="" id="" className="inputObrigatorio">
                                <option value="">Dinheiro</option>
                                <option value="">Crédito</option>
                                <option value="">Débito</option>
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

        </section >
    )
}
