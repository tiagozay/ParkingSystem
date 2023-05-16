import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarTiket.css';
import BtnVoltar from '../../components/BtnVoltar';
import InputPlaca from '../../components/InputPlaca';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import { Veiculo } from '../../models/Veiculo';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import { DataService } from '../../services/DataService';
import { Tiket } from '../../models/Tiket';
import { useTiketContext } from '../../contexts/TiketContext';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import { Mensalista } from '../../models/Mensalista';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';
import { Precificacao } from '../../models/Precificacao';

export default function EditarTiket() {

    const navigate = useNavigate();

    const id = Number(useParams().id);

    const { buscarTiketPorId } = useTiketContext();

    const [tiket, setTiket] = useState<Tiket>()

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

    const {
        precificacoes,
        buscaValorHoraDeCategoria,
        buscaPrecificacaoPorId,
        buscaPrecificacaoPorNome
    } = usePrecificacaoContext();
    const { editarTiket } = useTiketContext();
    const { formasDePagamento, buscarFormaDePagamentoPorId } = useFormaDePagamentoContext();

    const { mensalistas, buscarMensalistaPorId } = useMensalistaContext();
    const { buscaMensalidadesDeMensalista } = useMensalidadeContext();

    const [precificacoesDisponiveis, setPrecificacoesDisponiveis] = useState(precificacoes);

    useEffect(() => {
        if(!tiket){
            return;
        }

        setTipoCliente(tiket.mensalista ? "Mensalista" : "Avulso");
        setMensalista(tiket.mensalista);
        setPlaca(tiket.veiculo.placa);
        setMarcaVeiculo(tiket.veiculo.marca);
        setModeloVeiculo(tiket.veiculo.modelo);
        setCategoria( buscaPrecificacaoPorNome(tiket.veiculo.segmento));
        setValorHora(tiket.valorPorHora);
        setStatus(tiket.status);
        setNumeroVaga(tiket.numeroDaVaga);
        setDataEntrada(tiket.dataDeEntrada);
        setDataSaida(tiket.dataDeSaida);
        setTempoDecorrido(tiket.tempoDecorrido.toFixed(2));
        setTotalAPagar(tiket.calculaTotalAPagar(valorHora));
        setTipoCliente(tiket.mensalista ? "Mensalista" : "Avulso");
    }, [tiket])

    useEffect(() => {
        const tiketBuscado = buscarTiketPorId(id);

        if (!tiketBuscado) {
            navigate('/estacionamento');
            return;
        }

        setTiket(tiketBuscado);
    }, [id]);



    useEffect(() => {
        preencheValorHora();

        //Se for um cliente avulso, todas as categirias se tornam disponíveis novamente, já que quando é mensalista, só ficam as categorias disponíveis para ele
        if(tipoCliente === 'Avulso'){
            setPrecificacoesDisponiveis(precificacoes);
        }else {
            buscaCategoriasDisponiveisParaMensalista();
        }

    }, [tipoCliente]);

    useEffect(() => {

        if (!tiket) {
            return;
        }

        preencheValorHora();
    }, [categoria]);

    useEffect(() => {

        buscaCategoriasDisponiveisParaMensalista();

    }, [mensalista])

    function buscaCategoriasDisponiveisParaMensalista()
    {
        if (mensalista) {
            const mensalidadesDeMensalista = buscaMensalidadesDeMensalista(mensalista).filter( mensalidade => 
                mensalidade.status === 'Em dia'
            );

            const precificacoesDisponiveis = mensalidadesDeMensalista.map( mensalidade => 
                mensalidade.categoria
            );
                
            setPrecificacoesDisponiveis(precificacoesDisponiveis);

        }else {
            setPrecificacoesDisponiveis(precificacoes);
        }
    }

    function preencheValorHora() {

        if(!tiket){
            return;
        }

        //Se for um cliente avulso, é preenchido o valor por hora, se for Mensalista, o valor por hora fica 0, já que nesse caso ele paga por mês e não por hora
        if (tipoCliente === 'Avulso') {

            const valor = buscaValorHoraDeCategoria(categoria?.categoria as string);

            setValorHora(valor);
            setTotalAPagar(
                tiket?.calculaTotalAPagar(valor)
            );
        } else {
            setValorHora(0);
            setTotalAPagar(
                tiket?.calculaTotalAPagar(0)
            );
        }
    }

    function aoSalvarTiket(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const novoTiket = new Tiket(
            id,
            new Veiculo(placa, marcaVeiculo, modeloVeiculo, categoria?.categoria as string, valorHora),
            dataEntrada,
            dataSaida,
            valorHora,
            status,
            numeroVaga,
            buscarFormaDePagamentoPorId(Number(formaDePagamento)),
            tipoCliente === 'Mensalista' ? mensalista : null
        );

        editarTiket(novoTiket);

        navigate('/estacionamento', { state: { sucessoEditar: true } });
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

    const categoriasCadastradas = precificacoes?.map(precificacao => precificacao.categoria);

    return (
        <section id="formularioAdcNovoTiket">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">edit</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar tiket</h2>
                        <span>Editando tiket</span>
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
                    <Link to={`/estacionamento/editarTiket/${id}`}>
                        Editar tiket
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

                <div id="formAdcTiketView">
                    <form id="formularioCadatrarTiket" className="formPadrao" onSubmit={aoSalvarTiket}>
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

                                                mensalista.ativo &&
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

                                            precificacao.ativa &&

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

                                            formaDePagamento.ativa &&

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
