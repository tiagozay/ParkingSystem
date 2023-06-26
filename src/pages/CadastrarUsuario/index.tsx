import React, {useState} from 'react';
import BoasVindas from '../../components/BoasVindas';
import { Link, useNavigate } from 'react-router-dom';
import './CadastrarUsuario.css';
import BtnVoltar from '../../components/BtnVoltar';
import { Usuario } from '../../models/Usuario';
import { useUsuariosContext } from '../../contexts/UsuariosContext';
import MensagemErro from '../../components/MensagemErro';
import InputSenha from '../../components/InputSenha';

export default function CadastrarUsuario() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [nivelDeAceso, setNivelDeAcesso] = useState<"Operador" | "Administrador">("Operador");
    const [ativo, setAtivo] = useState(true);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const {adicionarUsuario} = useUsuariosContext();

    const navigate = useNavigate();


    function aoCadastrarUsuario(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        try{
            if(senha !== confirmarSenha) throw new Error("As senhas não coincidem");

            const usuario = new Usuario(
                null,
                nome,
                email,
                nivelDeAceso,
                ativo,
                senha
            );

            adicionarUsuario(usuario)
                .then( () => {
                    navigate('/administracao/usuarios', {state: {sucessoCadastrar: true}});
                } )
                .catch( erro => {
                    setMensagemDeErroAberta(true);
                    setMensagemDeErro(erro.message);
                } );

        }catch(e: any){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNome(event.target.value);
    }
    function aoDigitarEmail(event: React.ChangeEvent<HTMLInputElement>)
    {
        setEmail(event.target.value);
    }
    function aoDigitarSenha(event: React.ChangeEvent<HTMLInputElement>)
    {
        setSenha(event.target.value);
    }
    function aoDigitarConfirmarSenha(event: React.ChangeEvent<HTMLInputElement>)
    {
        setConfirmarSenha(event.target.value);
    }
    function aoSelecionarNivelDeAcesso(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setNivelDeAcesso(event.target.value as "Operador" | "Administrador");
    }
    function aoSelecionarAtivo(event: React.ChangeEvent<HTMLSelectElement>)
    {
        //Lógica que converte string('true' ou 'false') em booleano
        setAtivo(event.target.value === "true");
    }


    return (
        <section id="formularioAdicionarNovoUsuario">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">group</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar ususários</h2>
                        <span>Cadastrando usuários</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/administracao/usuarios'>
                        Usuários
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/administracao/usuarios/cadastrarUsuario'>
                        Cadastrar Usuário
                    </Link>
                </div>

            </div>

            {
                mensagemDeErroAberta ?                 
                    <MensagemErro mensagem={mensagemDeErro} /> : 
                    <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnVoltar">
                    <BtnVoltar>
                        <i className="material-icons">arrow_back</i>
                        Voltar
                    </BtnVoltar>
                </div>

                <form className="formPadrao" onSubmit={aoCadastrarUsuario}>
                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Nome
                            <input type="text" value={nome} onChange={aoDigitarNome} required/>
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="email" value={email} onChange={aoDigitarEmail} required/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                    <label className="labelInputMeio">
                            Senha
                            <InputSenha value={senha} onChange={aoDigitarSenha} required/>
                        </label>
                        <label className="labelInputMeio">
                            Confirme a senha
                            <InputSenha value={confirmarSenha} onChange={aoDigitarConfirmarSenha} required/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Nivel de acesso
                            <select value={nivelDeAceso} onChange={aoSelecionarNivelDeAcesso} required>
                                <option value="Operador">Operador</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </label>
                        <label className="labelInputMeio">
                            Ativo
                            <select value={`${ativo}`} onChange={aoSelecionarAtivo} required>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </select>
                        </label>
                    </div>

                    <div className="formPadrao__divSalvarECancelar">
                        <button className="formPadrao__btnSalvar">
                            <i className="material-icons">save</i>
                            Salvar
                        </button>
                        <BtnVoltar className="formPadrao__btnVoltar">Voltar</BtnVoltar>
                    </div>
                </form>


            </section>

        </section>
    )
}
