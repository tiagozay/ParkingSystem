import React from 'react';
import './Mensalistas.css';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';
import ListaDeMensalistas from './ListaDeMensalistas';
import { Link } from 'react-router-dom';

export default function Mensalistas() {
    const mensalistas = [
        new Mensalista(1, "Tiago zay", '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true),
        new Mensalista(2, "Zeno zay", '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
        new Mensalista(3, "Tiago zay", '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', false),
        new Mensalista(4, "Zeno zay", '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
        new Mensalista(5, "Tiago zay", '132.025.979-06', 'tiagozay@gmail.com', '(42) 99931-8075', true),
        new Mensalista(6, "Zeno zay", '754.802.049-04', 'zenozay@gmail.com', '(42) 99956-7084', true),
    ]

    return (
        <section id="mensalistas">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">groups</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Mensalistas cadastrados</h2>
                        <span>Listando todos os mensalistas cadastrados</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalistas'>
                        Mensalistas
                    </Link>
                </div>
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <button className="btnTrocarDePagina" id="btnAdicionarNovo" data-pagina="formAdicionarMensalista">
                        <i className="material-icons">add</i>
                        Novo
                    </button>
                </div>

                <ListaDeMensalistas mensalistas={mensalistas}/>

            </section>

        </section>
    )
}
