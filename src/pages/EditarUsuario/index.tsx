import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';
import MensagemErro from '../../components/MensagemErro';
import BoasVindas from '../../components/BoasVindas';
import { useUsuariosContext } from '../../contexts/UsuariosContext';
import { Usuario } from '../../models/Usuario';
import InputSenha from '../../components/InputSenha';

export default function EditarUsuario() {
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const { buscarUsuarioPorId, editarUsuario } = useUsuariosContext();

    let usuario: Usuario | undefined;

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
    const [nivelDeAceso, setNivelDeAcesso] = useState<"Operador" | "Administrador">("Operador");;
    const [ativo, setAtivo] = useState(true);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    useEffect(() => {
        usuario = buscarUsuarioPorId(id);

        if (!usuario) {
            navigate('/administracao/usuarios');
            return;
        }

        setNome(usuario.nome);
        setEmail(usuario.email);
        setNivelDeAcesso(usuario.nivelDeAcesso);
        setAtivo(usuario.ativo);

    }, [id]);

    function aoEditarUsuario(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {

            if(novaSenha !== "" && novaSenha !== confirmarNovaSenha) throw new Error("As senhas não coincidem");

            const usuarioEditado = new Usuario(
                id,
                nome,
                email,
                nivelDeAceso,
                ativo,
                novaSenha
            );

            editarUsuario(usuarioEditado)
                .then( () => {
                    navigate('/administracao/usuarios', { state: { sucessoEditar: true } });
                } ) 
                .catch( e => {
                    setMensagemDeErroAberta(true);
                    setMensagemDeErro(e.message);
                } );

        } catch (e: any) {
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setNome(event.target.value);
    }
    function aoDigitarEmail(event: React.ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function aoDigitarNovaSenha(event: React.ChangeEvent<HTMLInputElement>) {
        setNovaSenha(event.target.value);
    }
    function aoDigitarConfirmarNovaSenha(event: React.ChangeEvent<HTMLInputElement>) {
        setConfirmarNovaSenha(event.target.value);
    }
    function aoSelecionarNivelDeAcesso(event: React.ChangeEvent<HTMLSelectElement>) {
        setNivelDeAcesso(event.target.value as "Operador" | "Administrador");
    }
    function aoSelecionarAtivo(event: React.ChangeEvent<HTMLSelectElement>) {
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
                        <h2>Editar ususários</h2>
                        <span>Editando usuários</span>
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
                    <span className="barraSeparadora">/</span>
                    <Link to={`/usuarios/editarUsuario/${id}`}>
                        Editar Usuário
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

                <form className="formPadrao" onSubmit={aoEditarUsuario}>
                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Nome
                            <input type="text" value={nome} onChange={aoDigitarNome} required />
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="email" value={email} onChange={aoDigitarEmail} required />
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Nova senha
                            <InputSenha value={novaSenha} onChange={aoDigitarNovaSenha} />
                        </label>
                        <label className="labelInputMeio">
                            Confirme a nova senha
                            <InputSenha value={confirmarNovaSenha} onChange={aoDigitarConfirmarNovaSenha} />
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
