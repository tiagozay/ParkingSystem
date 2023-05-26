import React, { useEffect, useState } from 'react';
import './CadastrarMensalidade.css';
import BoasVindas from '../../components/BoasVindas';
import BtnVoltar from '../../components/BtnVoltar';
import { Link, useNavigate } from 'react-router-dom';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { Mensalista } from '../../models/Mensalista';
import { Precificacao } from '../../models/Precificacao';
import { DataService } from '../../services/DataService';
import { FormaDePagamento } from '../../models/FormaDePagamento';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import { eventNames } from 'process';
import { Mensalidade } from '../../models/Mensalidade';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';
import MensagemErro from '../../components/MensagemErro';

export default function CadastrarMensalidade() {

    const [mensalista, setMensalista] = useState<Mensalista>();
    const [precificacao, setPrecificacao] = useState<Precificacao>();
    const [valorMensalidade, setValorMensalidade] = useState(0);
    const [dataDeContratacao, setDataDeContratacao] = useState(new Date());
    const [dataDeVencimento, setDataDeVencimento] = useState<Date>(DataService.acrescenta1MesE1DiaAData(dataDeContratacao));
    const [formaDePagamento, setFormaDePagamento] = useState<FormaDePagamento>();

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const { mensalistas, buscarMensalistaPorId } = useMensalistaContext();
    const { precificacoes, buscaPrecificacaoPorId } = usePrecificacaoContext();
    const {formasDePagamento, buscarFormaDePagamentoPorId} = useFormaDePagamentoContext();

    const {adicionarMensalidade} = useMensalidadeContext();

    const navigate = useNavigate();

    function aoCadastrarMensalidade(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();
        
        try{
            const mensalidade = new Mensalidade(
                null, 
                mensalista as Mensalista,
                precificacao as Precificacao,
                formaDePagamento as FormaDePagamento,
                dataDeContratacao,
            );
    
            adicionarMensalidade(mensalidade);

            navigate('/mensalidades', { state: {sucessoCadastrar: true} });
        }catch( e: any ){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }

    }

    useEffect(() => {
        precificacao && setValorMensalidade(precificacao.valorMensalidade);
    }, [precificacao]);

    useEffect(() => {
        setDataDeVencimento(DataService.acrescenta1MesE1DiaAData(dataDeContratacao));
    }, [dataDeContratacao]);

    function aoSelecionarMensalista(event: React.ChangeEvent<HTMLSelectElement>) {
        const mensalista = buscarMensalistaPorId(Number(event.target.value));
        setMensalista(mensalista);
    }

    function aoSelecionarPrecificacao(event: React.ChangeEvent<HTMLSelectElement>) {
        const precificacao = buscaPrecificacaoPorId(Number(event.target.value));
        setPrecificacao(precificacao);
    }

    function aoSelecionarDataDeContratacao(event: React.ChangeEvent<HTMLInputElement>) {
        setDataDeContratacao(DataService.corrigeFusoHorario(new Date(event.target.value)))
    }

    function aoSelecionarFormaDePagamento(event: React.ChangeEvent<HTMLSelectElement>)
    {   
        const formaDePagamento = buscarFormaDePagamentoPorId(Number(event.target.value));
        setFormaDePagamento(formaDePagamento);
    }

    return (
        <section id="formularioCadastroNovaMensalidade">
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

            {
                mensagemDeErroAberta ?                 
                    <MensagemErro mensagem={mensagemDeErro}/> : 
                    <BoasVindas />
            }
       
            <section className="secaoDeInformacoes">
                <div id="divBtnVoltar">
                    <BtnVoltar>
                        <i className="material-icons">arrow_back</i>
                        Voltar
                    </BtnVoltar>
                </div>

                <form className="formPadrao" onSubmit={aoCadastrarMensalidade}>
                    <div className="linhaInputs">
                        <label>
                            Mensalista
                            <select className="" defaultValue={""} value={mensalista?.id as number} onChange={aoSelecionarMensalista} required>
                                <option value="" disabled>SELECIONE</option>
                                {
                                    mensalistas.map(mensalista => (

                                        mensalista.ativo &&

                                        <option key={mensalista.id as number} value={mensalista.id as number}>{mensalista.nome}
                                        </option>
                                    ))
                                }
                            </select>
                        </label>
                        <label>
                            Categoria
                            <select className="" defaultValue={""} onChange={aoSelecionarPrecificacao} value={precificacao?.id as number} required>

                                <option value="" disabled>SELECIONE</option>

                                {precificacoes.map(precificacao => (

                                    precificacao.ativa &&

                                    <option key={precificacao.id as number} value={precificacao.id as number}>
                                        {precificacao.categoria}
                                    </option>
                                ))}

                            </select>
                        </label>
                        <label>
                            Valor mensalidade
                            <input type="text" className="inputDesativado " value={valorMensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            Data de contratação
                            <input type="date" value={DataService.formataDataPadraoInput(dataDeContratacao)} onChange={aoSelecionarDataDeContratacao} required/>
                        </label>
                        <label>
                            Data de vencimento
                            <input type="date" className="inputDesativado" value={DataService.formataDataPadraoInput(dataDeVencimento)} readOnly />
                        </label>
                        <label>
                            Forma de pagamento

                            <select defaultValue={""} onChange={aoSelecionarFormaDePagamento} value={formaDePagamento?.id as number} required>

                                <option value="" disabled>SELECIONE</option>

                                {formasDePagamento.map(formaDePagamento => (

                                    (formaDePagamento.ativa && !formaDePagamento.descontinuada) &&

                                    <option key={formaDePagamento.id as number} value={formaDePagamento.id as number}>
                                        {formaDePagamento.nomeFormaDePagamento}
                                    </option>
                                ))}

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
