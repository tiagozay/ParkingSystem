import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarPrecificacao.css';
import BtnVoltar from '../../components/BtnVoltar';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { Precificacao } from '../../models/Precificacao';
import MensagemErro from '../../components/MensagemErro';

export default function EditarPrecificacao() {

    const navigate = useNavigate();

    const id = Number(useParams().id);

    const { buscaPrecificacaoPorId, editarPrecificacao } = usePrecificacaoContext();

    const [precificacao, setPrecificacao] = useState<Precificacao>()

    const [nome, setNome] = useState("");
    const [valorHora, setValorHora] = useState("");
    const [valorMensalidade, setValorMensalidade] = useState("");
    const [numeroDeVagas, setNumeroDeVagas] = useState("");
    const [ativa, setAtiva] = useState(true);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    useEffect(() => {
        if(!precificacao){
            return;
        }

        setNome(precificacao.categoria);
        setValorHora(String(precificacao.valorHora));
        setValorMensalidade(String(precificacao.valorMensalidade));
        setNumeroDeVagas(String(precificacao.numeroDeVagas));
        setAtiva(precificacao.ativa);

    }, [precificacao])

    useEffect(() => {
        const precificacaoBuscada = buscaPrecificacaoPorId(id);

        if (!precificacaoBuscada) {
            navigate('/precificacoes');
            return;
        }

        setPrecificacao(precificacaoBuscada);
    }, [id]);

    function aoSalvarPrecificacao(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const novaPrecificacao = new Precificacao(
                id,
                nome,
                parseFloat(valorHora),
                parseFloat(valorMensalidade),
                ativa,
                parseFloat(numeroDeVagas),  
            );
    
            editarPrecificacao(novaPrecificacao);
    
            navigate('/precificacoes', { state: { sucessoEditar: true } });
        }catch( e: any ){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }

    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }
    function aoDigitarValorHora(event: React.ChangeEvent<HTMLInputElement>) {
        const valorDigitado = event.target.value;

        //Verificação para numero ter apenas 2 casas decimais
        if (/^\d*\.?\d{0,2}$/.test(valorDigitado)) {
            setValorHora(valorDigitado);
        }
    }
    function aoDigitarValorMensalidade(event: React.ChangeEvent<HTMLInputElement>) {
        const valorDigitado = event.target.value;

        //Verificação para numero ter apenas 2 casas decimais
        if (/^\d*\.?\d{0,2}$/.test(valorDigitado)) {
            setValorMensalidade(valorDigitado);
        }
    }
    function aoDigitarNumeroDeVagas(event: React.ChangeEvent<HTMLInputElement>) {
        setNumeroDeVagas(event.target.value);
    }
    function aoSelecionarAtiva(event: React.ChangeEvent<HTMLSelectElement>) {
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
                        <h2>Editar precificação</h2>
                        <span>Editando precificação</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/precificacoes'>
                        Precificações
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to={`/precificacoes/editarPrecificacao/${id}`}>
                        Editar Precificação
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

                <form className="formPadrao" onSubmit={aoSalvarPrecificacao}>
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
