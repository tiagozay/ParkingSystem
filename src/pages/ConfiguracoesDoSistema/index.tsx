import React, { useContext, useState } from 'react';
import './ConfiguracoesDoSistema.css';
import BoasVindas from '../../components/BoasVindas';
import { Link } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';
import { useSistemaContext } from '../../contexts/SistemaContext';
import { Sistema } from '../../models/Sistema';
import { eventNames } from 'process';

export default function ConfiguracoesDoSistema() {

    const sistemaContext = useSistemaContext();

    const sistema = sistemaContext.sistema as Sistema;

    const {editarConfiguracoesDoSistema} = sistemaContext;

    const [razaoSocial, setRazaoSocial] = useState(sistema.razaoSocial);
    const [nomeFantasia, setNomeFantasia] = useState(sistema.nomeFantasia);
    const [cnpj, setCnpj] = useState(sistema.cnpj);
    const [inscricaoEstadual, setInscricaoEstadual] = useState(sistema.inscricaoEstadual);
    const [telefoneFixo, setTelefoneFixo] = useState(sistema.telefoneFixo);
    const [telefoneCelular, setTelefoneCelular] = useState(sistema.telefoneCelular);
    const [cep, setCep] = useState(sistema.cep);
    const [endereco, setEndereco] = useState(sistema.endereco);
    const [numero, setNumero] = useState(sistema.numero);
    const [cidade, setCidade] = useState(sistema.cidade);
    const [uf, setUf] = useState(sistema.uf);
    const [urlDoSite, setUrlDoSite] = useState(sistema.urlSite);
    const [email, setEmail] = useState(sistema.email);
    const [descricao, setDescricao] = useState(sistema.descricao);

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

            editarConfiguracoesDoSistema(sistema);

        }catch(e: any){

        }
    }

    function aoDigitarRazaoSocial(event: React.ChangeEvent<HTMLInputElement>){
        setRazaoSocial(event.target.value);
    }
    function aoDigitarNomeFantasia(event: React.ChangeEvent<HTMLInputElement>){
        setNomeFantasia(event.target.value);
    }
    function aoDigitarCnpj(event: React.ChangeEvent<HTMLInputElement>){
        setCnpj(event.target.value);
    }
    function aoDigitarInscricaoEstadual(event: React.ChangeEvent<HTMLInputElement>){
        setInscricaoEstadual(event.target.value);
    }
    function aoDigitarTelefoneFixo(event: React.ChangeEvent<HTMLInputElement>){
        setTelefoneFixo(event.target.value);
    }
    function aoDigitarTelefoneCelular(event: React.ChangeEvent<HTMLInputElement>){
        setTelefoneCelular(event.target.value);
    }
    function aoDigitarCep(event: React.ChangeEvent<HTMLInputElement>){
        setCep(event.target.value);
    }
    function aoDigitarEndereco(event: React.ChangeEvent<HTMLInputElement>){
        setEndereco(event.target.value);
    }
    function aoDigitarNumero(event: React.ChangeEvent<HTMLInputElement>){
        setNumero(event.target.value);
    }
    function aoDigitarCidade(event: React.ChangeEvent<HTMLInputElement>){
        setCidade(event.target.value);
    }
    function aoDigitarUf(event: React.ChangeEvent<HTMLInputElement>){
        setUf(event.target.value);
    }
    function aoDigitarUrlDoSite(event: React.ChangeEvent<HTMLInputElement>){
        setUrlDoSite(event.target.value);
    }
    function aoDigitarEmail(event: React.ChangeEvent<HTMLInputElement>){
        setEmail(event.target.value);
    }
    function aoDigitarDescricao(event: React.ChangeEvent<HTMLTextAreaElement>){
        setDescricao(event.target.value);
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

            <BoasVindas />

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
                            <input type="text" value={razaoSocial} onChange={aoDigitarRazaoSocial}/>
                        </label>
                        <label className="labelInputMeio">
                            Nome Fantasia
                            <input type="text" value={nomeFantasia} onChange={aoDigitarNomeFantasia}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput22">
                            CNPJ
                            <input type="text" value={cnpj} onChange={aoDigitarCnpj}/>
                        </label>
                        <label className="labelInput22">
                            Insc. estadual
                            <input type="text" value={inscricaoEstadual} onChange={aoDigitarInscricaoEstadual}/>
                        </label>
                        <label className="labelInput22">
                            Telefone fixo
                            <input type="text" value={telefoneFixo} onChange={aoDigitarTelefoneFixo}/>
                        </label>
                        <label className="labelInput22">
                            Telefone celular
                            <input type="text" value={telefoneCelular} onChange={aoDigitarTelefoneCelular}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMenor">
                            CEP
                            <input type="text" value={cep} onChange={aoDigitarCep}/>
                        </label>
                        <label>
                            Endereço
                            <input type="text" value={endereco} onChange={aoDigitarEndereco}/>
                        </label>
                        <label className="labelInputMenor">
                            Número
                            <input type="text" value={numero} onChange={aoDigitarNumero}/>
                        </label>
                        <label className="labelInput22">
                            Cidade
                            <input type="text" value={cidade} onChange={aoDigitarCidade}/>
                        </label>
                        <label className="labelInput10">
                            UF
                            <input type="text" value={uf} onChange={aoDigitarUf}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInputMeio">
                            URL do site
                            <input type="text" value={urlDoSite} onChange={aoDigitarUrlDoSite}/>
                        </label>
                        <label className="labelInputMeio">
                            E-mail
                            <input type="email" value={email} onChange={aoDigitarEmail}/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label className="labelInput100">
                            Descrição do ticket de estacionamento
                            <textarea id="textareaDescricaoEstacionamento" cols={30} rows={10} value={descricao}onChange={aoDigitarDescricao}></textarea>
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
