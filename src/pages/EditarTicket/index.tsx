import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarTicket.css';
import BtnVoltar from '../../components/BtnVoltar';
import InputPlaca from '../../components/InputPlaca';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { DataService } from '../../services/DataService';
import { Ticket } from '../../models/Ticket';
import { useTicketContext } from '../../contexts/TicketContext';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import { Mensalista } from '../../models/Mensalista';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';
import { Precificacao } from '../../models/Precificacao';
import MensagemErro from '../../components/MensagemErro';
import { Mensalidade } from '../../models/Mensalidade';

export default function EditarTicket() {

    const navigate = useNavigate();

    const id = Number(useParams().id);

    const { buscarTicketPorId } = useTicketContext();

    const [ticket, setTicket] = useState<Ticket>()

    const [placa, setPlaca] = useState('');
    const [marcaVeiculo, setMarcaVeiculo] = useState('');
    const [modeloVeiculo, setModeloVeiculo] = useState('');
    const [categoria, setCategoria] = useState<Precificacao>();
    const [valorHora, setValorHora] = useState(0);
    const [status, setStatus] = useState<"Em aberto" | "Pago">('Em aberto');
    const [numeroVaga, setNumeroVaga] = useState<string | null>('');
    const [dataEntrada, setDataEntrada] = useState(new Date());
    const [dataSaida, setDataSaida] = useState<Date | null>(null);
    const [tempoDecorrido, setTempoDecorrido] = useState('');
    const [totalAPagar, setTotalAPagar] = useState(0);
    const [formaDePagamento, setFormaDePagamento] = useState('');
    const [tipoCliente, setTipoCliente] = useState<'Avulso' | 'Mensalista'>('Avulso');
    const [mensalista, setMensalista] = useState<Mensalista | null>();
    const [mensalidade, setMensalidade] = useState<Mensalidade | null>(null);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const {
        precificacoes,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId,
    } = usePrecificacaoContext();
    const { editarTicket } = useTicketContext();
    const { formasDePagamento, buscarFormaDePagamentoPorId } = useFormaDePagamentoContext();

    const { mensalistas, buscarMensalistaPorId } = useMensalistaContext();
    const { buscaMensalidadesDeMensalista, buscaMensalidadeDeMensalistaDeCategoria } = useMensalidadeContext();

    const [precificacoesDisponiveis, setPrecificacoesDisponiveis] = useState(precificacoes);

    useEffect(() => {
        if (!ticket) {
            return;
        }

        setTipoCliente(ticket.mensalista ? "Mensalista" : "Avulso");
        setMensalista(ticket.mensalista);
        setPlaca(ticket.placaVeiculo);
        setMarcaVeiculo(ticket.marcaVeiculo);
        setModeloVeiculo(ticket.modeloVeiculo);
        setCategoria(ticket.precificacao);
        setValorHora(ticket.precificacao.valorHora);
        setStatus(ticket.status);
        setNumeroVaga(ticket.numeroDaVaga);
        setDataEntrada(ticket.dataDeEntrada);
        setDataSaida(ticket.dataDeSaida);
        setTempoDecorrido(ticket.tempoDecorrido);
        setTotalAPagar(ticket.calculaTotalAPagar(valorHora));
        setTipoCliente(ticket.mensalista ? "Mensalista" : "Avulso");
    }, [ticket])

    useEffect(() => {
        const ticketBuscado = buscarTicketPorId(id);

        if (!ticketBuscado) {
            navigate('/estacionamento');
            return;
        }

        setTicket(ticketBuscado);
    }, [id]);



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

        if (!ticket) {
            return;
        }

        if(tipoCliente === "Mensalista" && mensalista && categoria){
            setMensalidade(buscaMensalidadeDeMensalistaDeCategoria(mensalista, categoria));
        }

        preencheValorHora();
    }, [categoria]);

    useEffect(() => {

        buscaCategoriasDisponiveisParaMensalista();

        if(tipoCliente === "Mensalista" && mensalista && categoria){
            setMensalidade(buscaMensalidadeDeMensalistaDeCategoria(mensalista, categoria));
        }

    }, [mensalista])

    function buscaCategoriasDisponiveisParaMensalista() {
        if (mensalista) {

            const mensalidadesDeMensalista = buscaMensalidadesDeMensalista(mensalista).filter(mensalidade => {
                const mensalidadeDescontinuadaPoremSelecionada = mensalidade.descontinuada && mensalidade.categoria.id === ticket?.precificacao.id;   

                return (mensalidade.status === 'Em dia' && !mensalidade.descontinuada) || 
                (mensalidadeDescontinuadaPoremSelecionada);

            }
                
            );

            const precificacoesDisponiveis = mensalidadesDeMensalista.map(mensalidade => {

                let categoria = mensalidade.categoria;

                if(mensalidade.descontinuada){
                    categoria = new Precificacao(
                        categoria.id,
                        categoria.categoria + " (Mensalidade descontinuada)",
                        categoria.valorHora,
                        categoria.valorMensalidade,
                        categoria.numeroDeVagas,
                        categoria.ativa,
                        categoria.descontinuada,
                    );
                }

                return categoria;
            });

            setPrecificacoesDisponiveis(precificacoesDisponiveis);

        } else {
            setPrecificacoesDisponiveis(precificacoes);
        }
    }

    function preencheValorHora() {

        if (!ticket) {
            return;
        }

        //Se for um cliente avulso, é preenchido o valor por hora, se for Mensalista, o valor por hora fica 0, já que nesse caso ele paga por mês e não por hora
        if (tipoCliente === 'Avulso') {

            const valor = buscaValorHoraDeCategoria(categoria?.categoria as string);

            setValorHora(valor);
            setTotalAPagar(
                ticket?.calculaTotalAPagar(valor)
            );
        } else {
            setValorHora(0);
            setTotalAPagar(
                ticket?.calculaTotalAPagar(0)
            );
        }
    }

    function aoSalvarTicket(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            if (ticket) {
                ticket.editar(
                    placa,
                    marcaVeiculo,
                    modeloVeiculo,
                    dataSaida,
                    categoria as Precificacao,
                    buscarFormaDePagamentoPorId(Number(formaDePagamento)),
                    tipoCliente === 'Mensalista' ? mensalista : null,
                    tipoCliente === 'Mensalista' ? mensalidade : null
                )

                editarTicket(ticket);

                navigate('/estacionamento', { state: { sucessoEditar: true } });
            }

        } catch (e: any) {
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }

    }

    function aoSelecionarTipoDeCliente(event: React.ChangeEvent<HTMLSelectElement>) {
        setTipoCliente(event.target.value as "Avulso" | "Mensalista");
    }

    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>) {
        setPlaca(event.target.value);
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
    function aoSelecionarFormaDePagamento(event: React.ChangeEvent<HTMLSelectElement>) {
        const valor = event.target.value;

        if (valor === '') {
            setFormaDePagamento('Em aberto');
            setDataSaida(null);
            setStatus('Em aberto');
        } else {
            setFormaDePagamento(valor);
            setDataSaida(new Date());
            setStatus("Pago");
        }
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
                        <i className="material-icons">edit</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar ticket</h2>
                        <span>Editando ticket</span>
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
                    <Link to={`/estacionamento/editarTicket/${id}`}>
                        Editar ticket
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
                    <form id="formularioCadatrarTicket" className="formPadrao" onSubmit={aoSalvarTicket}>
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
                                            {
                                                //Escreve os Mensalistas disponiveis para selecionar na hora de editar Tiket. Caso eu tenha um Tiket que tenha sido cadastrado com determindado Mensalista (Quando ela estava ativo e não estava descontinuada), e depois desse cadastro, eu tenha inativado ou descontinuado esse Mensalista, ela vai continuar aparecendo no select, porém com o sufixo "(descontinuado)" ou "(inativo)". Nesses casos, no model tiket, não é feita a verificação se o Mensalista é válido ou não, já que quando um tiket tiver seu Mensalista inválido, ele poderá continuar com ele para não causar inconsistência

                                                mensalistas.map(mensalista => {

                                                    let nomeMensalista = `${mensalista.nome}`;

                                                    if (mensalista.descontinuado) {
                                                        nomeMensalista += ' (descontinuado)';
                                                    } else if (!mensalista.ativo) {
                                                        nomeMensalista += ' (inativo)';
                                                    }

                                                    return (
                                                        (
                                                            (mensalista.ativo && !mensalista.descontinuado) ||
                                                            (mensalista.id === ticket?.mensalista?.id)
                                                        )
                                                        &&
                                                        <option key={mensalista.id} value={mensalista.id as number}>{mensalista.nome}</option>
                                                    );
                                                }

                                                )
                                            }
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
                                        //Escreve as Precificações disponiveis para selecionar na hora de editar Tiket. Caso eu tenha um Tiket que tenha sido cadastrado com determindada Precificação (Quando ela estava ativa a não estava descontinuada), e depois desse cadastro, eu tenha inativado ou descontinuado essa Precificacao, ela vai continuar aparecendo no select, porém com o sufixo "(descontinuada)" ou "(inativa)". Nesses casos, no model tiket, não é feita a verificação se a Precificacao é válida ou não, já que quando um tiket tiver sua Precificação invalidada, ele poderá continuar com ela para não causar inconsistência

                                        precificacoesDisponiveis?.map(precificacao => {

                                            let nomeCategoria = `${precificacao.categoria}`;

                                            if (precificacao.descontinuada) {
                                                nomeCategoria += ' (descontinuada)';
                                            } else if (!precificacao.ativa) {
                                                nomeCategoria += ' (inativa)';
                                            }

                                            return (
                                                (
                                                    (precificacao.ativa && !precificacao.descontinuada) ||
                                                    (precificacao.id === ticket?.precificacao.id)
                                                )
                                                &&
                                                <option
                                                    key={precificacao.id}
                                                    value={precificacao.id as number}>
                                                    {nomeCategoria}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" className="inputDesativado" value={valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly />
                            </label>
                            <label>
                                Número vaga
                                <input type="text" className='inputDesativado' readOnly value={!numeroVaga ? "" : numeroVaga} />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" readOnly value={DataService.formataDataComHorario(dataEntrada)} />
                            </label>
                            <label>
                                Data saída
                                <input
                                    type="text"
                                    className="inputDesativado"
                                    readOnly
                                    value={dataSaida ? DataService.formataDataComHorario(dataSaida) : ""}
                                />
                            </label>
                            <label>
                                Tempo decorrido (horas e minutos)
                                <input type="text" className="inputDesativado inputObrigatorio" value={tempoDecorrido} readOnly />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Total a pagar
                                <input type="text" className="inputDesativado" readOnly value={totalAPagar.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                            </label>
                            <label className='labelInputMeio'>
                                Forma de pagamento
                                <select onChange={aoSelecionarFormaDePagamento} value={formaDePagamento}>
                                    <option value=''>Em aberto</option>
                                    {
                                        formasDePagamento.map(formaDePagamento => (

                                            (formaDePagamento.ativa && !formaDePagamento.descontinuada) &&

                                            <option key={formaDePagamento.id} value={formaDePagamento.id as number}>
                                                {formaDePagamento.nomeFormaDePagamento}
                                            </option>
                                        ))
                                    }
                                </select>
                            </label>
                        </div>

                        <div className="formPadrao__divSalvarECancelar">
                            <button className="formPadrao__btnSalvar">
                                <i className="material-icons">save</i>
                                Salvar
                            </button>
                            <BtnVoltar className="formPadrao__btnVoltar">Cancelar</BtnVoltar>
                        </div>
                    </form>
                </div>

            </section>

        </section>
    )
}
