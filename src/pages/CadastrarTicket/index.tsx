import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarTicket.css';
import BtnVoltar from '../../components/BtnVoltar';
import InputPlaca from '../../components/InputPlaca';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import { PlacaAPIService } from '../../services/PlacaAPIService';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { DataService } from '../../services/DataService';
import { Ticket } from '../../models/Ticket';
import { useTicketContext } from '../../contexts/TicketContext';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import { Mensalista } from '../../models/Mensalista';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';
import { Precificacao } from '../../models/Precificacao';
import MensagemErro from '../../components/MensagemErro';
import { Mensalidade } from '../../models/Mensalidade';

export default function CadastrarTicket() {
    const [placa, setPlaca] = useState('');
    const [marcaVeiculo, setMarcaVeiculo] = useState('');
    const [modeloVeiculo, setModeloVeiculo] = useState('');
    const [categoria, setCategoria] = useState<Precificacao>();
    const [valorHora, setValorHora] = useState(0);
    const [dataEntrada] = useState(new Date());
    const [tipoCliente, setTipoCliente] = useState<'Avulso' | 'Mensalista'>('Avulso');
    const [mensalista, setMensalista] = useState<Mensalista>();
    const [mensalidade, setMensalidade] = useState<Mensalidade | null>(null);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const { mensalistas, buscarMensalistaPorId } = useMensalistaContext();
    const { buscaMensalidadesDeMensalista, buscaMensalidadeDeMensalistaDeCategoria } = useMensalidadeContext();

    const navigate = useNavigate();

    const {
        precificacoes,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId,
        buscaPrecificacaoPorNome
    } = usePrecificacaoContext();
    const { adicionarTicket } = useTicketContext();

    const [precificacoesDisponiveis, setPrecificacoesDisponiveis] = useState(precificacoes);

    useEffect(() => {

        preencheValorHora();

        //Se for um cliente avulso, todas as categirias se tornam disponíveis novamente, já que quando é mensalista, só ficam as categorias disponíveis para ele
        if (tipoCliente === 'Avulso') {
            setPrecificacoesDisponiveis(precificacoes);
        } else {
            buscaCategoriasDisponiveisParaMensalista();
        }

    }, [tipoCliente]);

    useEffect(() => {

        preencheValorHora();

        if(tipoCliente === "Mensalista" && mensalista && categoria){
            setMensalidade(buscaMensalidadeDeMensalistaDeCategoria(mensalista, categoria));
        }

    }, [categoria]);

    useEffect(() => {

        buscaCategoriasDisponiveisParaMensalista();

        if(tipoCliente === "Mensalista" && mensalista && categoria){
            setMensalidade(buscaMensalidadeDeMensalistaDeCategoria(mensalista, categoria));
        }

    }, [mensalista]);


    function buscaCategoriasDisponiveisParaMensalista() {
        if (mensalista) {
            const mensalidadesDeMensalista = buscaMensalidadesDeMensalista(mensalista).filter(mensalidade =>
                mensalidade.status === 'Em dia' && !mensalidade.descontinuada
            );

            const precificacoesDisponiveis = mensalidadesDeMensalista.map(mensalidade =>
                mensalidade.categoria
            );

            setPrecificacoesDisponiveis(precificacoesDisponiveis);

        } else {
            setPrecificacoesDisponiveis(precificacoes);
        }
    }

    function preencheValorHora() {
        //Se for um cliente avulso, é preenchido o valor por hora, se for Mensalista, o valor por hora fica 0, já que nesse caso ele paga por mês e não por hora
        if (tipoCliente === 'Avulso') {
            setValorHora(buscaValorHoraDeCategoria(categoria?.categoria as string));
        } else {
            setValorHora(0);
        }
    }

    function aoCadastrarTicket(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try{
            const novoTicket = new Ticket(
                null,
                placa,
                marcaVeiculo,
                modeloVeiculo,
                dataEntrada,
                null,
                categoria as Precificacao,
                "Em aberto",
                null,
                null,
                tipoCliente === "Mensalista" ? mensalista : null,
                tipoCliente === "Mensalista" ? mensalidade : null
            );
    
            adicionarTicket(novoTicket)
                .then( () => {
                    navigate('/estacionamento', { state: { sucessoCadastrar: true } });
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


    function aoSelecionarTipoDeCliente(event: React.ChangeEvent<HTMLSelectElement>) {
        setTipoCliente(event.target.value as "Avulso" | "Mensalista");
    }

    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>) {
        const placaDigitada = event.target.value;
        setPlaca(placaDigitada);

        const veiculo = PlacaAPIService.buscarVeiculoPorPlaca(placaDigitada.replace('-', ''));

        if (veiculo) {
            setMarcaVeiculo(veiculo.marca);
            setModeloVeiculo(veiculo.modelo);
            setCategoria(buscaPrecificacaoPorNome(veiculo.segmento));
        }

    }
    function aoDigitarMarcaVeiculo(event: React.ChangeEvent<HTMLInputElement>) {
        setMarcaVeiculo(event.target.value);
    }
    function aoDigitarModeloVeiculo(event: React.ChangeEvent<HTMLInputElement>) {
        setModeloVeiculo(event.target.value);
    }
    function aoSelecionarCategoria(event: React.ChangeEvent<HTMLSelectElement>) {
        setCategoria(buscaPrecificacaoPorId(Number(event.target.value)));
    }
    function aoSelecionarMensalista(event: React.ChangeEvent<HTMLSelectElement>) {
        const mensalista = buscarMensalistaPorId(Number(event.target.value));
        setMensalista(mensalista);
    }

    return (
        <section id="formularioAdcNovoTicket">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">local_parking</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar tickets</h2>
                        <span>Cadastrando tickets</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/estacionamento'>
                        Estacionamento
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/estacionamento/cadastrarTicket'>
                        Cadastrar Ticket
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

                <div id="formAdcTicketView">
                    <form id="formularioCadatrarTicket" className="formPadrao" onSubmit={aoCadastrarTicket}>

                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Tipo de cliente:
                                <select onChange={aoSelecionarTipoDeCliente} value={tipoCliente}>
                                    <option value="Avulso">Avulso</option>
                                    <option value="Mensalista">Mensalista</option>
                                </select>
                            </label>
                            <label className='labelInputMeio'>
                                Mensalista:

                                {
                                    tipoCliente === "Mensalista" ?
                                        <select onChange={aoSelecionarMensalista} required value={mensalista?.id as number}>
                                            <option value="" disabled selected>SELECIONE</option>

                                            {mensalistas.map(mensalista => (

                                                (mensalista.ativo && !mensalista.descontinuado) &&
                                                <option key={mensalista.id} value={mensalista.id as number}>{mensalista.nome}</option>

                                            ))}
                                        </select> :
                                        <select className='inputDesativado' disabled>

                                        </select>
                                }

                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Placa veículo
                                <InputPlaca onChange={aoDigitarPlaca} value={placa} required />
                            </label>
                            <label>
                                Marca veículo
                                <input type="text" onChange={aoDigitarMarcaVeiculo} value={marcaVeiculo} required />
                            </label>
                            <label>
                                Modelo veículo
                                <input type="text" onChange={aoDigitarModeloVeiculo} value={modeloVeiculo} required />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Categoria
                                <select onChange={aoSelecionarCategoria} value={categoria?.id as number} required>
                                    <option value="">Selecione</option>
                                    {
                                        precificacoesDisponiveis?.map(precificacao => (

                                            (precificacao.ativa && !precificacao.descontinuada) &&

                                            <option
                                                key={precificacao.id}
                                                value={precificacao.id as number}>
                                                {precificacao.categoria}
                                            </option>
                                        ))
                                    }

                                </select>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" className="inputDesativado" value={valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly />
                            </label>
                            <label>
                                Número vaga
                                <input type="text" className='inputDesativado' name="numeroDaVaga" readOnly />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" readOnly value={DataService.formataDataComHorario(dataEntrada)} />
                            </label>
                            <label>
                                Data saída
                                <input type="text" name="dataSaida" className="inputDesativado" readOnly />
                            </label>
                            <label>
                                Tempo decorrido (horas e minutos)
                                <input type="text" className="inputDesativado inputObrigatorio" value="0.0" readOnly />
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
                </div>

            </section>

        </section>
    )
}
