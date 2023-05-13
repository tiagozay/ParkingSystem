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

export default function EditarTiket() {
    
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const {buscarTiketPorId} = useTiketContext();
    
    let tiket: Tiket | undefined;

    const [placa, setPlaca] = useState('');
    const [marcaVeiculo, setMarcaVeiculo] = useState('');
    const [modeloVeiculo, setModeloVeiculo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [valorHora, setValorHora] = useState(0);
    const [status, setStatus] = useState<"Em aberto" | "Pago">('Em aberto');
    const [numeroVaga, setNumeroVaga] = useState<string | null>('');
    const [dataEntrada, setDataEntrada] = useState(new Date());
    const [dataSaida, setDataSaida] = useState<Date | null>(null);
    const [tempoDecorrido, setTempoDecorrido] = useState('');
    const [totalAPagar, setTotalAPagar] = useState('');
    const [formaDePagamento, setFormaDePagamento] = useState('');

    const {precificacoes, buscaValorHoraDeCategoria} = usePrecificacaoContext();
    const {editarTiket} = useTiketContext();
    const {formasDePagamento, buscarFormaDePagamentoPorId} = useFormaDePagamentoContext();

    useEffect( () => {
        tiket = buscarTiketPorId(id) as Tiket;
        
        if(!tiket){
            navigate('/estacionamento');
            return;
        }
    
        setPlaca(tiket.veiculo.placa);
        setMarcaVeiculo(tiket.veiculo.marca);
        setModeloVeiculo(tiket.veiculo.modelo);
        setCategoria(tiket.veiculo.segmento);
        setValorHora(tiket.valorPorHora);
        setStatus(tiket.status);
        setNumeroVaga(tiket.numeroDaVaga);
        setDataEntrada(tiket.dataDeEntrada);
        setDataSaida(tiket.dataDeSaida);
        setTempoDecorrido(tiket.tempoDecorrido.toFixed(2));
        setTotalAPagar(tiket.calculaTotalAPagar(valorHora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
    }, [id]);

    useEffect( () => {
        
        if(!tiket){
            return;
        }

        const valorHora = buscaValorHoraDeCategoria(categoria);

        setValorHora(valorHora);
        setTotalAPagar(
            tiket.calculaTotalAPagar(valorHora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        );
    
    }, [categoria] );


    function aoSalvarTiket(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        const novoTiket = new Tiket(
            id,
            new Veiculo(placa, marcaVeiculo, modeloVeiculo, categoria, valorHora),
            dataEntrada,
            dataSaida,
            valorHora,
            status,
            numeroVaga,
            buscarFormaDePagamentoPorId(Number(formaDePagamento)),
        );

        editarTiket(novoTiket);

        navigate('/estacionamento', { state: {sucessoEditar: true} });
    }


    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>)
    {
        setPlaca( event.target.value);
    }
    function aoDigitarMarcaVeiculo(event: React.ChangeEvent<HTMLInputElement>)
    {
        setMarcaVeiculo(event.target.value);
    }
    function aoDigitarModeloVeiculo(event: React.ChangeEvent<HTMLInputElement>)
    {
        setModeloVeiculo(event.target.value);
    }
    function aoSelecionarCategoria(event:  React.ChangeEvent<HTMLSelectElement>)
    {
        setCategoria(event.target.value);
    }
    function aoSelecionarFormaDePagamento(event: React.ChangeEvent<HTMLSelectElement>)
    {
        const valor = event.target.value;

        if(valor === ''){
            setFormaDePagamento('Em aberto');
            setDataSaida(null);
            setStatus('Em aberto'); 
        }else{
            setFormaDePagamento(valor);
            setDataSaida(new Date());
            setStatus("Pago"); 
        }        
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
                            <label>
                                Placa veículo
                                <InputPlaca onChange={aoDigitarPlaca} value={placa} required/>
                            </label>
                            <label>
                                Marca veículo
                                <input type="text" onChange={aoDigitarMarcaVeiculo} value={marcaVeiculo} required/>
                            </label>
                            <label>
                                Modelo veículo
                                <input type="text" onChange={aoDigitarModeloVeiculo} value={modeloVeiculo} required/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Categoria
                                <select onChange={aoSelecionarCategoria} value={categoria} required>
                                    <option disabled value="">Selecione</option>
                                    {
                                        categoriasCadastradas?.map( categoria => (
                                            <option key={categoria} value={categoria}>{categoria}</option>
                                        ) )
                                    }

                                </select>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" className="inputDesativado" value={valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly/>
                            </label>
                            <label>
                                Número vaga
                                <input type="text" className='inputDesativado' readOnly value={!numeroVaga ? "" : numeroVaga}/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" readOnly value={DataService.formataDataComHorario(dataEntrada)}/>
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
                                <input type="text" className="inputDesativado inputObrigatorio" value={tempoDecorrido} readOnly/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Total a pagar
                                <input type="text" className="inputDesativado" readOnly value={totalAPagar}/>
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
