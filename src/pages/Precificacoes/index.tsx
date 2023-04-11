import React from 'react';
import './Precificacoes.css';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';
import ListaDePrecificacoes from './ListaDePrecificacoes';
import { Link } from 'react-router-dom';
import { Precificacao } from '../../models/Precificacao';

export default function Precificacoes() {
    const precificacoes = [
        new Precificacao(1, 'Carro', 20, 250, true, 20),
        new Precificacao(2, 'Moto', 10, 150, true, 25),
        new Precificacao(3, 'Jegue', 10, 150, false, 10),
        new Precificacao(4, 'Carro', 20, 250, true, 20),
        new Precificacao(5, 'Moto', 10, 150, true, 25),
        new Precificacao(6, 'Jegue', 10, 150, false, 10),
    ]

    return (
        <section id="precificacoes">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">attach_money</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Precificacoes cadastradas</h2>
                        <span>Listando todos as Precificacoes cadastradas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/precificacoes'>
                        Precificações
                    </Link>
                </div>
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <button className="btnTrocarDePagina" data-pagina="formularioCadastroNovaPrecificacao" id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </button>
                </div>

                <ListaDePrecificacoes precificacoes={precificacoes} />

            </section>

        </section>
    )
}
