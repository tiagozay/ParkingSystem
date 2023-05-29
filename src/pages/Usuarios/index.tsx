import React from 'react';
import './Usuarios.css';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import ListaDeUsuarios from './ListaDeUsuarios';
import { useUsuariosContext } from '../../contexts/UsuariosContext';

export default function Usuarios() {

    const {usuarios} = useUsuariosContext();
    
    return (
        <section id="usuarios">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">group</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Usuários cadastrados</h2>
                        <span>Listando todos os usuários cadastrados</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/usuarios'>
                        Usuários
                    </Link>
                </div>
            </div>

            <BoasVindas />

            <section className="secaoDeInformacoes">
                <div id="divBtnNovo">
                    <Link to='cadastrarUsuario' id="btnAdicionarNovo">
                        <i className="material-icons">add</i>
                        Novo
                    </Link>
                </div>

                <ListaDeUsuarios usuarios={usuarios}/>
        
            </section>
        </section>
    )
}
