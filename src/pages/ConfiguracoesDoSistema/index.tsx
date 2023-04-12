import React from 'react';
import './ConfiguracoesDoSistema.css';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';

export default function ConfiguracoesDoSistema() {
    return (
        <section id="formularioConfigSistema">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">group</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar Informações do sistema</h2>
                        <span>Chegou a hora de editar as informações do sistema</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/configuracoes'>
                        Configurações
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
                            Razão social
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMeio">
                            Nome Fantasia
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput22">
                            CNPJ
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInput22">
                            Insc. estadual
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInput22">
                            Telefone fixo
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInput22">
                            Telefone celular
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMenor">
                            CEP
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label>
                            Endereço
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInputMenor">
                            Número
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInput22">
                            Cidade
                            <input type="text" className="inputObrigatorio" />
                        </label>
                        <label className="labelInput10">
                            UF
                            <input type="text" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            URL do site
                            <input type="text" />
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="email" className="inputObrigatorio" />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput100">
                            Descrição do ticket de estacionamento
                            <textarea name="" id="textareaDescricaoEstacionamento" cols={30} rows={10}></textarea>
                        </label>
                    </div>

                    <div className="formPadrao__divSalvarECancelar">
                        <button className="formPadrao__btnSalvar">
                            <i className="material-icons">save</i>
                            Salvar
                        </button>
                        <button type='button' className="formPadrao__btnVoltar">Cancelar</button>
                    </div>
                </form>


            </section>

        </section>
    )
}
