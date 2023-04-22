import React from 'react';
import './Estacionamento.css'
import { Tiket } from '../../models/Tiket';
import { Veiculo } from '../../models/Veiculo';
import ListaDeTikets from './ListaDeTikets';
import { Link } from 'react-router-dom';
import BoasVindas from '../../components/BoasVindas';
import { useTiketContext } from '../../contexts/TiketContext';

export default function Estacionamento() {

    const {tikets} = useTiketContext();

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

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to="cadastrarTiket" id="btnAdicionarNovo" data-pagina="formularioAdcNovoTiket">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeTikets tikets={tikets} />

            </section>

        </section>
    )
}
