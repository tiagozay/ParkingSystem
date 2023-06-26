import React, {useState} from 'react';
import './Precificacoes.css';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';
import ListaDePrecificacoes from './ListaDePrecificacoes';
import { Link, useLocation } from 'react-router-dom';
import { Precificacao } from '../../models/Precificacao';
import { usePrecificacaoContext } from '../../contexts/PrecificacaoContext';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function Precificacoes() {
    
    const {precificacoes} = usePrecificacaoContext();

    const [sucessoExcluir, setSucessoExcluir] = useState(false);

    const location = useLocation();

    let mensagemSucessoAberta = false;
    let mensagemSuceso = "";

    if(sucessoExcluir){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Precificação excluída com sucesso!";
    }else if(location.state && location.state.sucessoCadastrar) {
        mensagemSucessoAberta = true;
        mensagemSuceso = "Precificação cadastrada com sucesso!";
    }else if(location.state && location.state.sucessoEditar){
        mensagemSucessoAberta = true;
        mensagemSuceso = "Precificação editada com sucesso!";
    }

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
                    <Link to='/administracao/precificacoes'>
                        Precificações
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
                    <Link to='cadastrarPrecificacao' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDePrecificacoes precificacoes={precificacoes} setSucessoExcluir={setSucessoExcluir} />

            </section>

        </section>
    )
}
