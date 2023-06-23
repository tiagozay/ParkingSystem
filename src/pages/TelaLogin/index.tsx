import React, {useState} from 'react';
import "./TelaLogin.css";
import Logo from './car.svg';
import LoginService from '../../services/LoginService';
import { useNavigate } from 'react-router-dom';

export default function TelaLogin() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mensagemDeErro, setMensagemDeErro] = useState("");
    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);

    const navigate = useNavigate();

    function aoEnviarForumlario(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        LoginService.enviaLogin(email, senha)
            .then(() => {
                navigate('/');
            })
            .catch( e => {
                setMensagemDeErro(e.message);
                setMensagemDeErroAberta(true);
            } )
    }

    function aoDigitarEmail(event: React.ChangeEvent<HTMLInputElement>)
    {
        setEmail(event.target.value);
    }
    function aoDigitarSenha(event: React.ChangeEvent<HTMLInputElement>)
    {
        setSenha(event.target.value);
    }

    return (
        <section id='telaDeLogin'>

            <div id='container'>
                <a href="#" id="linkRecarregar">
                    <img id="logoSistemaLogin" src={Logo} />
                    <span id="nomeSistemaLogin">ParkSystem</span>
                </a>

                <h1 id='tituloLogin'>Login</h1>

                {
                    mensagemDeErroAberta &&
                    <p id="mensagemDeErro">{mensagemDeErro}</p>
                }
                
                <form onSubmit={aoEnviarForumlario}>
                    <div id='divInput'>
                        <label htmlFor="e-mail" className='label'>E-mail</label>
                        <input type="text" className='input' id='e-mail' value={email} onChange={aoDigitarEmail}/>
                    </div>
                    <div id='divInput'>
                        <label htmlFor="senha" className='label'>Senha</label>
                        <input type="password" className='input' id='senha' value={senha} onChange={aoDigitarSenha}/>
                    </div>

                    <button className='btnAcessar'>Acessar</button>
                </form>
            </div>


        </section>

    )
}
