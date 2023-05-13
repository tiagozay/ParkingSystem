import React from 'react';
import "./Mensalidades.css";
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import ListaDeMensalidades from './ListaDeMensalidades';
import { Mensalidade } from '../../models/Mensalidade';
import { Mensalista } from '../../models/Mensalista';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';

export default function Mensalidades() {

    const {mensalidades} = useMensalidadeContext(); 
    
    return (
        <section id="mensalidades">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">payments</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Mensalidades cadastradas</h2>
                        <span>Listando todas as mensalidades cadastradas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalidades'>
                        Mensalidades
                    </Link>
                </div>
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarMensalidade' className="btnTrocarDePagina" data-pagina="formularioCadastroNovaMensalidade" id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeMensalidades mensalidades={mensalidades}/>
            </section>


        </section>
    )
}
