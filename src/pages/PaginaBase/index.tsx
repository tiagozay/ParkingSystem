import { NavLink, Outlet } from 'react-router-dom';
import './PaginaBase.css';
import Logo from './car.svg';


export default function PaginaBase() {
    return (
        <>
            <section id="menu">
                <div id="headerMenu">
                    <a href="#" id="linkRecarregar">
                        <img id="logoSistema" src={Logo} />
                        <span id="nomeSistema">Estacionamento</span>
                    </a>
                </div>

                <div id="opcoesMenu">
                    <div className="opcoesMenu__titulo">Menu</div>
                    <NavLink to='/' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="home">
                        <i className="material-icons">home</i>
                        Home
                    </NavLink>
                    <NavLink to='/estacionamento' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="estacionamento">
                        <i className="material-icons">local_parking</i>
                        Estacionamento
                    </NavLink>
                    <NavLink to='/mensalistas' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="mensalistas">
                        <i className="material-icons">groups</i>
                        Mensalistas
                    </NavLink>
                    <NavLink to='/mensalidades' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="mensalidades">
                        <i className="material-icons">payments</i>
                        Mensalidades
                    </NavLink>
                    <div className="opcoesMenu__titulo">Administracao</div>
                    <NavLink to='/precificacoes' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="precificacoes">
                        <i className="material-icons">attach_money</i>
                        Precificações
                    </NavLink>
                    <NavLink to='/formasDePagamento' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="formas_de_pagamento">
                        <i className="material-icons">credit_card</i>
                        Formas de pagamento
                    </NavLink>
                    <NavLink to='/usuarios' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="usuarios">
                        <i className="material-icons">group</i>
                        Usuários
                    </NavLink>
                    <NavLink to='/configuracoes' className={ ({isActive}) => `
                        opcaoMenu btnTrocarDePaginaMenu
                        ${ isActive ? 'opcaoMenuSelecionado' : ''}
                    ` } data-pagina="formularioConfigSistema">
                        <i className="material-icons">settings</i>
                        Sistema
                    </NavLink>
                </div>

            </section>

            <section id="main">
                <header id="header">
                    <p id="textoBoasVindas">Olá Tiago</p>
                    <button id="btnAbrirMenuUsuario" className="material-icons">person</button>
                </header>
    
                <Outlet />
            </section>
        </>

    )
}
