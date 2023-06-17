import React, {useContext, useEffect} from 'react'
import { useState } from 'react';
import { createContext, ReactNode } from 'react';
import { Ticket } from '../models/Ticket';
import TicketService from '../services/TicketService';
import RelatorioService from '../services/RelatorioServcie';
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

    function adicionarTicket(novoTicket: Ticket): Promise<void>
    {
        return new Promise((resolve, reject) => {
            if(RelatorioService.calculaTotalDeVagasLivresDeDeterminadaCategoria(novoTicket.precificacao, tickets) <= 0){
                reject({message: "Não há vagas disponíveis para esta categoria no estacionamento!"});
                return;
            }

            TicketService.cadastraTiket(novoTicket)
                .then( ticketCadastrado => {
                    setTickets([...tickets, ticketCadastrado]);
                    resolve();
                } )
                .catch( (e) => {
                    reject({message: e.message});
                } )

        })

    }


    function editarTicket(novoTicket: Ticket)
    {
        return TicketService.editaTicket(novoTicket)
            .then( ticketEditado => {
                setTickets(
                    tickets.map( ticket => {
                        if(ticket.id === ticketEditado.id){
                            return ticketEditado;
                        }
                        return ticket;
                    } )
                );
            } );
    }


    function excluirTicket(id: number)
    {
        return TicketService.excluiTicket(id)
            .then( () => {
                setTickets(tickets.filter(ticket => ticket.id !== id) );
            } );
    }

    return {
        tickets,
        buscarTicketPorId,
        adicionarTicket,
        editarTicket,
        excluirTicket,
    }
}
