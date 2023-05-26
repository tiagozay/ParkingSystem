import React, {useState} from 'react';
import './FormasDePagamento.css';
import BoasVindas from '../../components/BoasVindas';
import { Link, useLocation } from 'react-router-dom';
import ListaDeFormasDePagamento from './ListaDeFormasDePagamento';
import { FormaDePagamento } from '../../models/FormaDePagamento';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function FormasDePagamento() {
    const {formasDePagamento} = useFormaDePagamentoContext();

    const [sucessoExcluir, setSucessoExcluir] = useState(false);
    
    const location = useLocation();

    let mensagemSucessoAberta = false;
    let mensagemSuceso = "";

    if(sucessoExcluir){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Forma de pagamento excluída com sucesso!";
    }else if(location.state && location.state.sucessoCadastrar) {
        mensagemSucessoAberta = true;
        mensagemSuceso = "Forma de pagamento cadastrada com sucesso!";
    }else if(location.state && location.state.sucessoEditar){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Forma de pagamento editada com sucesso!";
    }

    return (
        <section id="formas_de_pagamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">credit_card</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Formas de pagamento</h2>
                        <span>Listando todos as Formas de pagamento cadastradas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/formasDePagamento'>
                        Formas de pagamento
                    </Link>
                </div>
            </div>

            {
                mensagemSucessoAberta ? 
                    <MensagemSucesso  mensagem={mensagemSuceso}/> :
                    <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarFormaDePagamento' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeFormasDePagamento formasDePagamento={formasDePagamento} />

            </section>
        </section>
    )
}
