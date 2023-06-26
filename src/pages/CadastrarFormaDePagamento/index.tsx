import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BoasVindas from '../../components/BoasVindas';
import './CadastrarFormaDePagamento.css';
import BtnVoltar from '../../components/BtnVoltar';
import { FormaDePagamento } from '../../models/FormaDePagamento';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import MensagemErro from '../../components/MensagemErro';

export default function CadastrarFormaDePagamento() {

    const [nome, setNome] = useState("");
    const [ativa, setAtiva] = useState(true);

    const navigate = useNavigate();

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const {adicionaFormaDePagamento} = useFormaDePagamentoContext();

    function aoCadastrarFormaDePagamento(event: React.FormEvent<HTMLFormElement>) 
    {
        event.preventDefault();

        try {

            const formaDePagamento = new FormaDePagamento(
                null,
                nome,
                ativa,
                false
            );

            adicionaFormaDePagamento(formaDePagamento)
            .then( () => {
                navigate('/administracao/formasDePagamento', { state: { sucessoCadastrar: true } });
            } )
            .catch( erro => {
                setMensagemDeErroAberta(true);
                setMensagemDeErro(erro.message);
            } )

        }catch( e: any ){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }

    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNome(event.target.value);
    }
    function aoSelecionarAtiva(event: React.ChangeEvent<HTMLSelectElement>)
    {
        //Lógica que converte string ('true' ou 'false') em booleano
        setAtiva(event.target.value === "true");
    }


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

            {
                mensagemDeErroAberta ?                 
                    <MensagemErro mensagem={mensagemDeErro} /> : 
                    <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnVoltar">
                    <BtnVoltar>
                        <i className="material-icons">arrow_back</i>
                        Voltar
                    </BtnVoltar>
                </div>

                <form className="formPadrao" onSubmit={aoCadastrarFormaDePagamento}>
                    <div className="linhaInputs">
                        <label className="labelInputMaior">
                            Nome da forma de pagamento
                            <input type="text" value={nome} onChange={aoDigitarNome}/>
                        </label>
                        <label>
                            Ativa
                            <select value={`${ativa}`} onChange={aoSelecionarAtiva}>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
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
