import React from 'react';
import "./TelaLogin.css";
import Logo from './car.svg';

export default function TelaLogin() {
    return (
        <section id='telaDeLogin'>

            <div id='container'>
                <a href="#" id="linkRecarregar">
                    <img id="logoSistemaLogin" src={Logo} />
                    <span id="nomeSistemaLogin">ParkSystem</span>
                </a>

                <h1 id='tituloLogin'>Login</h1>

                <form>
                    <div id='divInput'>
                        <label htmlFor="e-mail" className='label'>E-mail</label>
                        <input type="text" className='input' id='e-mail' />
                    </div>
                    <div id='divInput'>
                        <label htmlFor="senha" className='label'>Senha</label>
                        <input type="password" className='input' id='senha' />
                    </div>

                    <button className='btnAcessar'>Acessar</button>
                </form>
            </div>


        </section>

    )
}
