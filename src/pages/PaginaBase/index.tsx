import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './PaginaBase.css';
import Logo from './car.svg';
import LoginService from '../../services/LoginService';
import { useState } from 'react';
import { ThreeDots } from "react-loader-spinner";
import UsuariosProvider from '../../contexts/UsuariosContext';
import SistemaProvider from '../../contexts/SistemaContext';
import PrecificacoesProvider from '../../contexts/PrecificacaoContext';
import FormasDePagamentoProvider from '../../contexts/FormaDePagamentoContext';
import MensalistasProvider from '../../contexts/MensalistasContext';
import MensalidadesProvider from '../../contexts/MensalidadesContext';
import TicketsProvider from '../../contexts/TicketContext';

export default function PaginaBase() {

    const [permisaoParaRenderizar, setPermisaoParaRenderizar] = useState(false);
    const [permisaoParaRenderizarParteDoAdmin, setPermisaoParaRenderizarParteDoAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        LoginService.indicadorUsuarioLogado()
            .then(indicador => {

                if (!indicador) {
                    navigate("/login");
                    return;
                }

                setPermisaoParaRenderizar(true);
                setPermisaoParaRenderizarParteDoAdmin(LoginService.usuarioLogado?.nivelDeAcesso === "Administrador");
            })
    }, []);


    return (

        permisaoParaRenderizar ?

            <UsuariosProvider>
                <SistemaProvider>
                    <PrecificacoesProvider>
                        <FormasDePagamentoProvider>
                            <MensalistasProvider>
                                <MensalidadesProvider>
                                    <TicketsProvider>
                                        <section id="menu">
                                            <div id="headerMenu">
                                                <a href="#" id="linkRecarregar">
                                                    <img id="logoSistema" src={Logo} />
                                                    <span id="nomeSistema">Estacionamento</span>
                                                </a>
                                            </div>

                                            <div id="opcoesMenu">
                                                <div className="opcoesMenu__titulo">Menu</div>
                                                <NavLink to='/' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="home">
                                                    <i className="material-icons">home</i>
                                                    Home
                                                </NavLink>
                                                <NavLink to='/estacionamento' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="estacionamento">
                                                    <i className="material-icons">local_parking</i>
                                                    Estacionamento
                                                </NavLink>
                                                <NavLink to='/mensalistas' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="mensalistas">
                                                    <i className="material-icons">groups</i>
                                                    Mensalistas
                                                </NavLink>
                                                <NavLink to='/mensalidades' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="mensalidades">
                                                    <i className="material-icons">payments</i>
                                                    Mensalidades
                                                </NavLink>

                                                {permisaoParaRenderizarParteDoAdmin ?
                                                    <>
                                                        <div className="opcoesMenu__titulo">Administracao</div>
                                                        <NavLink to='/precificacoes' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="precificacoes">
                                                            <i className="material-icons">attach_money</i>
                                                            Precificações
                                                        </NavLink>
                                                        <NavLink to='/formasDePagamento' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="formas_de_pagamento">
                                                            <i className="material-icons">credit_card</i>
                                                            Formas de pagamento
                                                        </NavLink>
                                                        <NavLink to='/usuarios' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="usuarios">
                                                            <i className="material-icons">group</i>
                                                            Usuários
                                                        </NavLink>
                                                        <NavLink to='/configuracoes' className={({ isActive }) => `
                                                opcaoMenu btnTrocarDePaginaMenu
                                                ${isActive ? 'opcaoMenuSelecionado' : ''}
                                            ` } data-pagina="formularioConfigSistema">
                                                            <i className="material-icons">settings</i>
                                                            Sistema
                                                        </NavLink>
                                                    </> : 
                                                    ""
                                                }


                                            </div>

                                        </section>

                                        <section id="main">
                                            <header id="header">
                                                <p id="textoBoasVindas">Olá {LoginService.usuarioLogado?.nome}</p>
                                                <button id="btnAbrirMenuUsuario" className="material-icons">person</button>
                                            </header>

                                            <Outlet />
                                        </section>
                                    </TicketsProvider>
                                </MensalidadesProvider>
                            </MensalistasProvider>
                        </FormasDePagamentoProvider>
                    </PrecificacoesProvider>
                </SistemaProvider>
            </UsuariosProvider>

            :

            <div id="divLoader">
                <ThreeDots
                    color="#272D36" // Cor do spinner
                    height={100} // Altura do spinner
                    width={100} // Largura do spinner
                />
            </div>


    )
}
