import React, {useContext} from 'react'
import { Precificacao } from '../models/Precificacao';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Ticket } from '../models/Ticket';
import { Veiculo } from '../models/Veiculo';
import { usePrecificacaoContext } from './PrecificacaoContext';

function geraDataA15min()
{
    const agora = new Date();
    agora.setMinutes(agora.getMinutes() - 15);
    return agora;
}

interface TypeTicketContext 
{
    tickets: Ticket[],
    setTickets: Function,
}

export const TicketContext = createContext<TypeTicketContext>(
    {
        tickets: [], 
        setTickets: () => {},
    }
);

export default function TicketsProvider({children}: {children: ReactNode}) {
    const {buscaValorHoraDeCategoria} = usePrecificacaoContext();

    const [tickets, setTickets] = useState([
        new Ticket(
            1,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            2,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            3,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            4,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            new Precificacao(1, "Carro", 20, 200, true, 20),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            5,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            6,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            new Precificacao(1, "Carro", 20, 200, true, 20),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            7,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            8,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            9,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            10,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            new Precificacao(1, "Carro", 20, 200, true, 20),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            11,
            new Veiculo('APN-2018', 'Honda', 'CG FAN 125', 'Moto', buscaValorHoraDeCategoria('Moto')),
            geraDataA15min(),
            null,
            new Precificacao(2, 'Moto', 10, 150, true, 25),
            "Em aberto",
            null,
            null
        ),
        new Ticket(
            12,
            new Veiculo('ABA-2054', 'Wolksvagen', 'Gol', 'Carro', buscaValorHoraDeCategoria('Carro')),
            geraDataA15min(),
            null,
            new Precificacao(1, "Carro", 20, 200, true, 20),
            "Em aberto",
            null,
            null
        ),
    ]);

    return (
        <TicketContext.Provider value={{tickets, setTickets}}>
            {children}
        </TicketContext.Provider>
    );
}

export const useTicketContext = () => {
    const {tickets, setTickets} = useContext(TicketContext);

    function buscarTicketPorId(id: number)
    {
        return tickets.find( ticket => ticket.id === id );
    }

    function verificaSeTemTicketsAbertosDePrecificacao(idPrecificacao : number)
    {
        return tickets.some( ticket => {
            return ticket.precificacao.id === idPrecificacao && ticket.status === "Em aberto";
        } )
    }

    function adicionarTicket(novoTicket: Ticket)
    {
        //Gera provisióriamente um id em sequência do ultimo registro, para simular o que um banco de dados faria
        const ultimoTicketCadastrado = tickets[tickets.length - 1];
        if(ultimoTicketCadastrado){
            novoTicket.id = (ultimoTicketCadastrado.id as number) + 1;
        }else{
            novoTicket.id = 1;
        }

        setTickets([...tickets, novoTicket]);
    }

    function editarTicket(ticketEditado: Ticket)
    {
        setTickets(
            tickets.map( ticket => {
                if(ticket.id === ticketEditado.id){
                    return ticketEditado;
                }
                return ticket;
            } )
        )
    }

    function excluirTicket(id: number)
    {
        setTickets(tickets.filter(ticket => ticket.id !== id) );
    }

    return {
        tickets,
        buscarTicketPorId,
        verificaSeTemTicketsAbertosDePrecificacao,
        adicionarTicket,
        editarTicket,
        excluirTicket,
    }
}
