import React, { useState } from 'react';
import './Mensalistas.css';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';
import ListaDeMensalistas from './ListaDeMensalistas';
import { Link, useLocation } from 'react-router-dom';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function Mensalistas() {
    
    const {mensalistas} = useMensalistaContext();

    const [sucessoExcluir, setSucessoExcluir] = useState(false);

    const location = useLocation();

    let mensagemSucessoAberta = false;
    let mensagemSuceso = "";

    if(sucessoExcluir){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Mensalista excluído com sucesso!";
    }else if(location.state && location.state.sucessoCadastrar) {
        mensagemSucessoAberta = true;
        mensagemSuceso = "Mensalista cadastrado com sucesso!";
    }else if(location.state && location.state.sucessoEditar){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Mensalista editado com sucesso!";
    }

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

            {
                mensagemSucessoAberta ? 
                    <MensagemSucesso mensagem={mensagemSuceso}/> :
                    <BoasVindas />
            }
    
            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarMensalista' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeMensalistas mensalistas={mensalistas} setSucessoExcluir={setSucessoExcluir}/>

            </section>

        </section>
    )
}
