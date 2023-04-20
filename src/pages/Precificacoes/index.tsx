import React from 'react';
import './Precificacoes.css';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';
import ListaDePrecificacoes from './ListaDePrecificacoes';
import { Link } from 'react-router-dom';
import { Precificacao } from '../../models/Precificacao';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';

export default function Precificacoes() {
    
    const {precificacoes} = usePrecificacaoContext();

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
                    <Link to='cadastrarPrecificacao' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDePrecificacoes precificacoes={precificacoes} />

            </section>

        </section>
    )
}
