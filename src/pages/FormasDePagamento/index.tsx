import React from 'react';
import './FormasDePagamento.css';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import ListaDeFormasDePagamento from './ListaDeFormasDePagamento';
import { FormaDePagamento } from '../../models/FormaDePagamento';

export default function FormasDePagamento() {
    const formasDePagamento = [
        new FormaDePagamento(1, 'Dinheiro', true),
        new FormaDePagamento(2, 'Cartão de crédito', true),
        new FormaDePagamento(3, 'Cheque', false),
        new FormaDePagamento(4, 'Dinheiro', true),
        new FormaDePagamento(5, 'Cartão de crédito', true),
        new FormaDePagamento(6, 'Cheque', false),
    ]

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

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarFormaDePagamento' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeFormasDePagamento formasDePagamento={formasDePagamento}/>

            </section>
        </section>
    )
}
