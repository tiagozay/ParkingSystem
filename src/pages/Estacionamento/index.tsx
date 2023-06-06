import React, { useState } from 'react';
import './Estacionamento.css'
import { Ticket } from '../../models/Ticket';
import { Veiculo } from '../../models/Veiculo';
import ListaDeTickets from './ListaDeTickets';
import { Link, useLocation } from 'react-router-dom';
import BoasVindas from '../../components/BoasVindas';
import { useTicketContext } from '../../contexts/TicketContext';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function Estacionamento() {

    const {tickets} = useTicketContext();

    const [sucessoExcluir, setSucessoExcluir] = useState(false);

    const location = useLocation();

    let mensagemSucessoAberta = false;
    let mensagemSucesso = "";

    if(sucessoExcluir){
        mensagemSucessoAberta = true;
        mensagemSucesso = "Ticket excluído com sucesso!";
    }else if( location.state && location.state.sucessoCadastrar){
        mensagemSucessoAberta = true;
        mensagemSucesso = "Ticket cadastrado com sucesso!";
    }else if(location.state && location.state.sucessoEditar){
        mensagemSucessoAberta = true;
        mensagemSucesso = "Ticket editado com sucesso!";
    }

    return (
        <section id="estacionamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">local_parking</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Tickets de estacionamento</h2>
                        <span>Listando tickets cadastrados</span>
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
                </div>

            </div>


            {
                mensagemSucessoAberta ?
                <MensagemSucesso mensagem={mensagemSucesso}/> :
                <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to="cadastrarTicket" id="btnAdicionarNovo" data-pagina="formularioAdcNovoTicket">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeTickets tickets={tickets} setSucessoExcluir={setSucessoExcluir}/>

            </section>

        </section>
    )
}
