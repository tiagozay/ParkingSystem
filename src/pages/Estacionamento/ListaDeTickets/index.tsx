import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Ticket } from '../../../models/Ticket';
import { useState } from 'react';
import SelectFiltros from '../../../components/SelectFiltros';
import InputPlaca from '../../../components/InputPlaca';
import { useTicketContext } from '../../../contexts/TicketContext';
import { Link } from 'react-router-dom';
import ListaDeDados from '../../../components/ListaDeDados';
import { FormaDePagamento } from '../../../models/FormaDePagamento';

interface ListaDeTicketsProps {
    tickets: Ticket[],
    setSucessoExcluir: Dispatch<SetStateAction<boolean>>
}

export default function ListaDeTickets({ tickets, setSucessoExcluir }: ListaDeTicketsProps) {
    const [statusFiltro, setStatusFiltro] = useState('Todos');
    const [filtroPlaca, setFiltroPlaca] = useState('');

    const { excluirTicket } = useTicketContext();

    let ticketsFiltados = tickets;

    if (statusFiltro != 'Todos') {
        ticketsFiltados = tickets.filter(ticket => ticket.status === statusFiltro);
    }

    const regExp = new RegExp(filtroPlaca.replace(/-/, ''), 'i');
    ticketsFiltados = ticketsFiltados.filter(ticket => regExp.test(ticket.placaVeiculo.replace(/-/, '')));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroPlaca(event.target.value)
    }

    function aoClicarEmExcluir(id: number) {
        const confirmacao = window.confirm("Excluir este Ticket?");
        if (!confirmacao) return;

        excluirTicket(id)
            .then( () => {
                setSucessoExcluir(true);
            });
    }

    const jsxThead = (
        <thead>
            <tr>
                <td>Segmento</td>
                <td>Valor hora</td>
                <td>Placa</td>
                <td>Veículo</td>
                <td>Forma de pagamento</td>
                <td>Cliente</td>
                <td>Status</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaRegistro(ticket: Ticket) {

        const formaDePagamento = ticket.formaDePagamento instanceof FormaDePagamento ? 
            ticket.formaDePagamento.nomeFormaDePagamento : 
            ticket.formaDePagamento;

        return (
            <tr key={ticket.id}>
                <td>{ticket.precificacao.categoria}</td>
                <td>
                    {
                        ticket.precificacao.valorHora
                            .toLocaleString("pt-BR", { style: "currency", currency: "BRL", })
                    }
                </td>
                <td>{ticket.placaVeiculo}</td>
                <td>{`${ticket.marcaVeiculo} ${ticket.modeloVeiculo}`}</td>
                <td>{`${formaDePagamento || "Em aberto"}`}</td>
                <td>{ticket.mensalista ? ticket.mensalista.nome : "Avulso"}</td>
                <td>
                    <p className={ticket.status == 'Em aberto' ? 'statusEmAberto' : 'statusPago'}>
                        {`${ticket.status}`
                        }</p>
                </td>
                <td className='campoDeAcoes'>
                    <button id='btnImprimirTicket' className='material-icons'>print</button>

                    {
                        ticket.status === 'Em aberto' ? (
                            <Link to={`editarTicket/${ticket.id}`} id='btnVisualizarOuEditarTicket' className='material-icons'>
                                edit
                            </Link>
                        ) :
                            (
                                <Link to={`visualizarTicket/${ticket.id}`} id='btnVisualizarOuEditarTicket' className='material-icons'>
                                    visibility
                                </Link>
                            )
                    }

                    <button id='btnExcluirTicket' className='material-icons' onClick={() => aoClicarEmExcluir(ticket.id as number)}>delete</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente tickets
                    <SelectFiltros onChange={aoSelecionarFiltro} value={statusFiltro}>
                        <option value="Em aberto">Abertos</option>
                        <option value="Pago">Fechados</option>
                        <option value="Todos">Todos</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <InputPlaca className="inputPesquisar" onChange={aoDigitarPlaca} value={filtroPlaca} />
                </label>
            </div>


            <ListaDeDados
                dados={ticketsFiltados}
                registrosPorPagina={5}
                jsxThead={jsxThead}
                paraCadaRegistro={paraCadaRegistro}
            />
        </>

    )
}