import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTiketContext } from '../../contexts/TiketContext';
import { Tiket } from '../../models/Tiket';
import InputPlaca from '../../components/InputPlaca';
import BtnVoltar from '../../components/BtnVoltar';
import BoasVindas from '../../components/BoasVindas';
import { DataService } from '../../services/DataService';

export default function VisualizarTiket() {
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const {buscarTiketPorId} = useTiketContext();
        
    const tiket = buscarTiketPorId(id) as Tiket;

    return (
        <section id="formularioAdcNovoTiket">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">visibility</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Visualizar tiket</h2>
                        <span>Visualizando tiket</span>
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
                    <Link to={`/estacionamento/visualizarTiket/${id}`}>
                        Visualizar tiket
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
                    <form id="formularioCadatrarTiket" className="formPadrao">
                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Tipo do cliente
                                <input 
                                    className="inputDesativado" 
                                    value={tiket.mensalista ? "Mensalista" : "Avulso"} 
                                    readOnly
                                />
                            </label>
                            <label className='labelInputMeio'>
                                Cliente
                                <input 
                                    type="text" 
                                    className="inputDesativado" 
                                    value={tiket.mensalista ? tiket.mensalista.nome : "Avulso"} 
                                    readOnly
                                />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Placa veículo
                                <input className="inputDesativado" value={tiket.veiculo.placa} readOnly/>
                            </label>
                            <label>
                                Marca veículo
                                <input type="text" className="inputDesativado" value={tiket.veiculo.marca} readOnly/>
                            </label>
                            <label>
                                Modelo veículo
                                <input type="text" className="inputDesativado" value={tiket.veiculo.modelo} readOnly/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Categoria
                                <input type="text" className="inputDesativado" value={tiket.veiculo.segmento} readOnly/>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" className="inputDesativado" value={tiket.precificacao.valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly/>
                            </label>
                            <label>
                                Número vaga
                                <input type="text" className='inputDesativado' readOnly value={!tiket.numeroDaVaga ? "" : tiket.numeroDaVaga}/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" readOnly value={DataService.formataDataComHorario(tiket.dataDeEntrada)}/>
                            </label>
                            <label>
                                Data saída
                                <input 
                                    type="text" 
                                    className="inputDesativado" 
                                    readOnly 
                                    value={tiket.dataDeSaida ? DataService.formataDataComHorario(tiket.dataDeSaida) : ""}
                                />
                            </label>
                            <label>
                                Tempo decorrido (horas e minutos)
                                <input type="text" className="inputDesativado inputObrigatorio" value={tiket.tempoDecorrido} readOnly/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Valor pago
                                <input type="text" className="inputDesativado" readOnly value={tiket.calculaTotalAPagar(tiket.precificacao.valorHora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/>
                            </label>
                            <label className='labelInputMeio'>
                                Forma de pagamento
                                <input type="text" className="inputDesativado" value={tiket.formaDePagamento?.nomeFormaDePagamento} readOnly/>
                            </label>
                        </div>

                        <div className="formPadrao__divSalvarECancelar">
                            <BtnVoltar className="formPadrao__btnVoltar">Voltar</BtnVoltar>
                        </div>

                    </form>
                </div>

            </section>

        </section>
    )
}
