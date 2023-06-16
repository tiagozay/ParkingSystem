import React, { useContext, useState, useEffect } from 'react';
import './ConfiguracoesDoSistema.css';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';
import { useSistemaContext } from '../../contexts/SistemaContext';
import { Sistema } from '../../models/Sistema';
import { eventNames } from 'process';
import MensagemErro from '../../components/MensagemErro';
import MensagemSucesso from '../../components/MensagemSucesso';

export default function ConfiguracoesDoSistema() {

    const sistemaContext = useSistemaContext();

    const sistema = sistemaContext.sistema as Sistema;

    const {editarConfiguracoesDoSistema} = sistemaContext;

    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [inscricaoEstadual, setInscricaoEstadual] = useState("");
    const [telefoneFixo, setTelefoneFixo] = useState("");
    const [telefoneCelular, setTelefoneCelular] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [urlDoSite, setUrlDoSite] = useState("");
    const [email, setEmail] = useState("");
    const [descricao, setDescricao] = useState("");

    useEffect( () => {
        setRazaoSocial(sistema.razaoSocial);
        setNomeFantasia(sistema.nomeFantasia);
        setCnpj(sistema.cnpj);
        setInscricaoEstadual(sistema.inscricaoEstadual);
        setTelefoneFixo(sistema.telefoneFixo);
        setTelefoneCelular(sistema.telefoneCelular);
        setCep(sistema.cep);
        setEndereco(sistema.endereco);
        setNumero(sistema.numero);
        setCidade(sistema.cidade);
        setUf(sistema.uf);
        setUrlDoSite(sistema.urlSite);
        setEmail(sistema.email);
        setDescricao(sistema.descricao);
    }, [sistema])


    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeSucessoAberta, setMensagemDeSucessoAberta] = useState(false);

    const [mensagem, setMensagem] = useState("");

    function aoEditarSistema(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        try{

            const sistema = new Sistema(
                razaoSocial,
                nomeFantasia,
                cnpj,
                inscricaoEstadual,
                telefoneFixo,
                telefoneCelular,
                cep,
                endereco,
                numero,
                cidade,
                uf,
                urlDoSite,
                email,
                descricao
            );

            editarConfiguracoesDoSistema(sistema)
                .then( () => {
                    setMensagemDeSucessoAberta(true);
                    setMensagemDeErroAberta(false);
                    setMensagem("Configurações editadas com sucesso.");
                } )
                .catch( e => {
                    setMensagemDeErroAberta(true);
                    setMensagemDeSucessoAberta(false);
                    setMensagem(e.message);
                } );
            

        }catch(e: any){
            setMensagemDeErroAberta(true);
            setMensagemDeSucessoAberta(false);
            setMensagem(e.message);
        }
    }

    function handleChange(setState: Function) {
        return (event: React.ChangeEvent<HTMLDataElement>) => {
            setState(event.target.value);
        }
    }

    return (
        <section id="formularioConfigSistema">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">group</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar Informações do sistema</h2>
                        <span>Chegou a hora de editar as informações do sistema</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/configuracoes'>
                        Configurações
                    </Link>
                </div>

            </div>

            {
                mensagemDeErroAberta || mensagemDeSucessoAberta ? 
                
                    (
                        mensagemDeErroAberta ? 
                        <MensagemErro mensagem={mensagem} /> :
                        <MensagemSucesso mensagem={mensagem} /> 
                    ) :
                     
                    <BoasVindas />
            }

            <section className="secaoDeInformacoes">
                <div id="divBtnVoltar">
                    <BtnVoltar>
                        <i className="material-icons">arrow_back</i>
                        Voltar
                    </BtnVoltar>
                </div>

                <form className="formPadrao" onSubmit={aoEditarSistema}>
                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            Razão social
                            <input type="text" value={razaoSocial} onChange={handleChange(setRazaoSocial)}/>
                        </label>
                        <label className="labelInputMeio">
                            Nome Fantasia
                            <input type="text" value={nomeFantasia} onChange={handleChange(setNomeFantasia)}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput22">
                            CNPJ
                            <input type="text" value={cnpj} onChange={handleChange(setCnpj)}/>
                        </label>
                        <label className="labelInput22">
                            Insc. estadual
                            <input type="text" value={inscricaoEstadual} onChange={handleChange(setInscricaoEstadual)}/>
                        </label>
                        <label className="labelInput22">
                            Telefone fixo
                            <input type="text" value={telefoneFixo} onChange={handleChange(setTelefoneFixo)}/>
                        </label>
                        <label className="labelInput22">
                            Telefone celular
                            <input type="text" value={telefoneCelular} onChange={handleChange(setTelefoneCelular)}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMenor">
                            CEP
                            <input type="text" value={cep} onChange={handleChange(setCep)}/>
                        </label>
                        <label>
                            Endereço
                            <input type="text" value={endereco} onChange={handleChange(setEndereco)}/>
                        </label>
                        <label className="labelInputMenor">
                            Número
                            <input type="text" value={numero} onChange={handleChange(setNumero)}/>
                        </label>
                        <label className="labelInput22">
                            Cidade
                            <input type="text" value={cidade} onChange={handleChange(setCidade)}/>
                        </label>
                        <label className="labelInput10">
                            UF
                            <input type="text" value={uf} onChange={handleChange(setUf)}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            URL do site
                            <input type="text" value={urlDoSite} onChange={handleChange(setUrlDoSite)}/>
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="email" value={email} onChange={handleChange(setEmail)}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput100">
                            Descrição do ticket de estacionamento
                            <textarea id="textareaDescricaoEstacionamento" cols={30} rows={10} value={descricao}onChange={handleChange(setDescricao)}></textarea>
                        </label>
                    </div>

                    <div className="formPadrao__divSalvarECancelar">
                        <button className="formPadrao__btnSalvar">
                            <i className="material-icons">save</i>
                            Salvar
                        </button>
                        <Link to="/" className="formPadrao__btnVoltar">Cancelar</Link>
                    </div>
                </form>


            </section>

        </section>
    )
}
