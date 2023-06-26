import React, { useState } from 'react'
import BoasVindas from '../../components/BoasVindas';
import './CadastrarPrecificacao.css';
import { Link, useNavigate } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { Precificacao } from '../../models/Precificacao';
import MensagemErro from '../../components/MensagemErro';

export default function CadastrarPrecificacao() {

    const [nome, setNome] = useState('');
    const [valorHora, setValorHora] = useState("");
    const [valorMensalidade, setValorMensalidade] = useState("");
    const [ativa, setAtiva] = useState(true);
    const [numeroDeVagas, setNumeroDeVagas] = useState("");

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const {adicionarPrecificacao} = usePrecificacaoContext();

    const navigate = useNavigate();

    function aoCadastrarPrecificacao(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        try{
            
            const precificacao = new Precificacao(
                null,
                nome,
                parseFloat(valorHora),
                parseFloat(valorMensalidade),
                parseFloat(numeroDeVagas),
                ativa,
                false
            );
            
            adicionarPrecificacao(precificacao)
                .then( () => {
                    navigate('/administracao/precificacoes', {state: {sucessoCadastrar: true}});
                } )
                .catch( erro => {
                    setMensagemDeErroAberta(true);
                    setMensagemDeErro(erro.message);
                } );            


        }catch(e: any){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }

    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNome(event.target.value);
    }
    function aoDigitarValorHora(event: React.ChangeEvent<HTMLInputElement>)
    {
        const valorDigitado = event.target.value;

        //Verificação para numero ter apenas 2 casas decimais
        if (/^\d*\.?\d{0,2}$/.test(valorDigitado)) {
            setValorHora(valorDigitado);
        }
    }
    function aoDigitarValorMensalidade(event: React.ChangeEvent<HTMLInputElement>)
    {
        const valorDigitado = event.target.value;

        //Verificação para numero ter apenas 2 casas decimais
        if (/^\d*\.?\d{0,2}$/.test(valorDigitado)) {
            setValorMensalidade(valorDigitado);
        }
    }
    function aoDigitarNumeroDeVagas(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNumeroDeVagas(event.target.value);
    }
    function aoSelecionarAtiva(event: React.ChangeEvent<HTMLSelectElement>)
    {
        //Lógica que converte string ('true' ou 'false') em booleano
        setAtiva(event.target.value === 'true');
    }

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

                <form className="formPadrao" onSubmit={aoCadastrarPrecificacao}>
                    <div className="linhaInputs">
                        <label>
                            Categoria
                            <input type="text" value={nome} onChange={aoDigitarNome} required/>
                        </label>
                        <label className="labelInputMenor">
                            Valor hora
                            <input type="number" value={valorHora} onChange={aoDigitarValorHora} required/>
                        </label>
                        <label className="labelInputMenor">
                            Valor mensalidade
                            <input type="number" value={valorMensalidade} onChange={aoDigitarValorMensalidade} required/>
                        </label>
                        <label className="labelInputMenor">
                            Número de vagas
                            <input type="number" value={numeroDeVagas} onChange={aoDigitarNumeroDeVagas} required/>
                        </label>
                        <label className="labelInputMenor">
                            Ativa
                            <select value={`${ativa}`} onChange={aoSelecionarAtiva} required>
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
