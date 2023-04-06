import { Outlet } from 'react-router-dom';
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
                    <div className="opcaoMenu btnTrocarDePaginaMenu opcaoMenuSelecionado" data-pagina="home">
                        <i className="material-icons">home</i>
                        Home
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="estacionamento">
                        <i className="material-icons">local_parking</i>
                        Estacionamento
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="mensalistas">
                        <i className="material-icons">groups</i>
                        Mensalistas
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="mensalidades">
                        <i className="material-icons">payments</i>
                        Mensalidades
                    </div>
                    <div className="opcoesMenu__titulo">Administracao</div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="precificacoes">
                        <i className="material-icons">attach_money</i>
                        Precificações
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="formas_de_pagamento">
                        <i className="material-icons">credit_card</i>
                        Formas de pagamento
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="usuarios">
                        <i className="material-icons">group</i>
                        Usuários
                    </div>
                    <div className="opcaoMenu btnTrocarDePaginaMenu" data-pagina="formularioConfigSistema">
                        <i className="material-icons">settings</i>
                        Sistema
                    </div>
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
