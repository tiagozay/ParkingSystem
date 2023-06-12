import React, {useContext, useEffect} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Ticket } from '../models/Ticket';
import TicketService from '../services/TicketService';

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
    const [tickets, setTickets] = useState<Ticket[] | []>([]);

    useEffect(() => {
        TicketService.buscaTickets()
            .then( setTickets );
    }, [] );

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

    function adicionarTicket(novoTicket: Ticket)
    {
        return TicketService.cadastraTiket(novoTicket)
            .then( ticketCadastrado => {
                setTickets([...tickets, ticketCadastrado]);
            } );
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
        adicionarTicket,
        editarTicket,
        excluirTicket,
    }
}
