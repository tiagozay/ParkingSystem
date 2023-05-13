import React, { useState } from 'react';
import "./Mensalidades.css";
import BoasVindas from '../../components/BoasVindas';
import { Link, useLocation } from 'react-router-dom';
import ListaDeMensalidades from './ListaDeMensalidades';
import { Mensalidade } from '../../models/Mensalidade';
import { Mensalista } from '../../models/Mensalista';
import { useMensalidadeContext } from '../../contexts/MensalidadesContext';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function Mensalidades() {

    const {mensalidades} = useMensalidadeContext(); 

    const location = useLocation();

    const [sucessoExcluir, setSucessoExcluir] = useState(false);

    let mensagemSucessoAberta = false;
    let mensagemSucesso = "";

    if(sucessoExcluir){
        mensagemSucessoAberta = true;
        mensagemSucesso = "Mensalidade excluída com sucesso!";
    }else if(location.state && location.state.sucessoCadastrar){
        mensagemSucessoAberta = true;
        mensagemSucesso = "Mensalidade cadastrada com sucesso!";
    }
    
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

            {
                mensagemSucessoAberta ?
                <MensagemSucesso mensagem={mensagemSucesso}/> :
                <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarMensalidade' className="btnTrocarDePagina" data-pagina="formularioCadastroNovaMensalidade" id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeMensalidades mensalidades={mensalidades} setSucessoExcluir={setSucessoExcluir}/>
            </section>


        </section>
    )
}
