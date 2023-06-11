import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTicketContext } from '../../contexts/TicketContext';
import { Ticket } from '../../models/Ticket';
import BtnVoltar from '../../components/BtnVoltar';
import BoasVindas from '../../components/BoasVindas';
import { DataService } from '../../services/DataService';
import { FormaDePagamento } from '../../models/FormaDePagamento';

export default function VisualizarTicket() {
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const {buscarTicketPorId} = useTicketContext();
        
    const ticket = buscarTicketPorId(id) as Ticket;

    const formaDePagamento = ticket.formaDePagamento instanceof FormaDePagamento ? 
        ticket.formaDePagamento.nomeFormaDePagamento : 
        ticket.formaDePagamento;

    return (
        <section id="formularioAdcNovoTicket">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">visibility</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Visualizar ticket</h2>
                        <span>Visualizando ticket</span>
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
                    <Link to={`/estacionamento/visualizarTicket/${id}`}>
                        Visualizar ticket
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

                <div id="formAdcTicketView">
                    <form id="formularioCadatrarTicket" className="formPadrao">
                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Tipo do cliente
                                <input 
                                    className="inputDesativado" 
                                    value={ticket.mensalista ? "Mensalista" : "Avulso"} 
                                    readOnly
                                />
                            </label>
                            <label className='labelInputMeio'>
                                Cliente
                                <input 
                                    type="text" 
                                    className="inputDesativado" 
                                    value={ticket.mensalista ? ticket.mensalista.nome : "Avulso"} 
                                    readOnly
                                />
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Placa veículo
                                <input className="inputDesativado" value={ticket.placaVeiculo} readOnly/>
                            </label>
                            <label>
                                Marca veículo
                                <input type="text" className="inputDesativado" value={ticket.marcaVeiculo} readOnly/>
                            </label>
                            <label>
                                Modelo veículo
                                <input type="text" className="inputDesativado" value={ticket.modeloVeiculo} readOnly/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Categoria
                                <input type="text" className="inputDesativado" value={ticket.precificacao.categoria} readOnly/>
                            </label>
                            <label>
                                Valor hora
                                <input type="text" className="inputDesativado" value={ticket.precificacao.valorHora.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} readOnly/>
                            </label>
                            <label>
                                Número vaga
                                <input type="text" className='inputDesativado' readOnly value={!ticket.numeroDaVaga ? "" : ticket.numeroDaVaga}/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label>
                                Data entrada
                                <input type="text" name="dataEntrada" className="inputDesativado inputObrigatorio" readOnly value={DataService.formataDataComHorario(ticket.dataDeEntrada)}/>
                            </label>
                            <label>
                                Data saída
                                <input 
                                    type="text" 
                                    className="inputDesativado" 
                                    readOnly 
                                    value={ticket.dataDeSaida ? DataService.formataDataComHorario(ticket.dataDeSaida) : ""}
                                />
                            </label>
                            <label>
                                Tempo decorrido (horas e minutos)
                                <input type="text" className="inputDesativado inputObrigatorio" value={ticket.tempoDecorrido} readOnly/>
                            </label>
                        </div>

                        <div className="linhaInputs">
                            <label className='labelInputMeio'>
                                Valor pago
                                <input type="text" className="inputDesativado" readOnly value={ticket.calculaTotalAPagar(ticket.precificacao.valorHora).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}/>
                            </label>
                            <label className='labelInputMeio'>
                                Forma de pagamento
                                <input type="text" className="inputDesativado" value={formaDePagamento as string} readOnly/>
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
