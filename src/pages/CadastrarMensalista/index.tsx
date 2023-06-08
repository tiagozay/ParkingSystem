import React, { useState } from 'react';
import './CadastrarMensalista.css';
import BoasVindas from '../../components/BoasVindas';
import BtnVoltar from '../../components/BtnVoltar';
import { Link, useNavigate } from 'react-router-dom';
import { Mensalista } from '../../models/Mensalista';
import ReactInputMask from 'react-input-mask'
import InputCpf from '../../components/InputCpf';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import MensagemErro from '../../components/MensagemErro';
import { DataService } from '../../services/DataService';

export default function CadastrarMensalista() {

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    const {adicionarMensalista} = useMensalistaContext();

    const navigate = useNavigate();

    function aoCadastrarMensalista(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        try{
            const mensalista = new Mensalista(
                null,
                `${nome} ${sobrenome}`,
                DataService.corrigeFusoHorario(new Date(dataNascimento)),
                cpf,
                email,
                telefone,
                cep,
                uf,
                cidade,
                true
            );
            
            adicionarMensalista(mensalista)
                .then( () => {
                    navigate('/mensalistas', {state: {sucessoCadastrar: true}});
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
    function aoDigitarSobrenome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setSobrenome(event.target.value);
    }
    function aoDigitarDataDeNascimento(event: React.ChangeEvent<HTMLInputElement>)
    {
        setDataNascimento(event.target.value);
    }
    function aoDigitarCpf(event: React.ChangeEvent<HTMLInputElement>)
    {
        setCpf(event.target.value);
    }
    function aoDigitarEmail(event: React.ChangeEvent<HTMLInputElement>)
    {
        setEmail(event.target.value);
    }
    function aoDigitarTelefone(event: React.ChangeEvent<HTMLInputElement>)
    {
        setTelefone(event.target.value);
    }
    function aoDigitarCep(event: React.ChangeEvent<HTMLInputElement>)
    {
        const cepDigitado = event.target.value.replace(/_/g, '');

        setCep(cepDigitado);

        if(cepDigitado.length === 9){
            buscarCidadePorCep(cepDigitado)
                .then( local => {
                    setCidade(local.localidade ? local.localidade : "");
                    setUf(local.uf ? local.uf : "");
            } );
        }

    }
    function aoDigitarUf(event: React.ChangeEvent<HTMLInputElement>)
    {
        setUf(event.target.value);
    }
    function aoDigitarCidade(event: React.ChangeEvent<HTMLInputElement>)
    {
        setCidade(event.target.value);
    }

    function buscarCidadePorCep(cep: string) 
    {
        return fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then( res => res.json() )
    }

    return (
        <section id="formAdicionarMensalista">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">groups</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Cadastrar mensalistas</h2>
                        <span>Cadastrando mensalistas</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalistas'>
                        Mensalistas
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/mensalistas/cadastrarMensalista'>
                        Cadastrar Mensalista
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

                <form action="" className="formPadrao" onSubmit={aoCadastrarMensalista}>
                    <div className="linhaInputs">
                        <label>
                            Nome
                            <input type="text" onChange={aoDigitarNome} value={nome} required/>
                        </label>
                        <label>
                            Sobrenome
                            <input type="text" onChange={aoDigitarSobrenome} value={sobrenome} required/>
                        </label>
                        <label>
                            Data nascimento
                            <input type="date" onChange={aoDigitarDataDeNascimento} value={dataNascimento} required/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            CPF
                            <InputCpf onChange={aoDigitarCpf} value={cpf} required />
                        </label>
                        <label>
                            E-mail
                            <input type="text" onChange={aoDigitarEmail} value={email}/>
                        </label>
                        <label>
                            Telefone
                            <ReactInputMask mask='(99) 99999-9999' type='text' onChange={aoDigitarTelefone} value={telefone} required/>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            CEP
                            <ReactInputMask mask='99999-999' type="text" onChange={aoDigitarCep} value={cep} required/>
                        </label>
                        <label>
                            UF
                            <input type="text" onChange={aoDigitarUf} value={uf} required/>
                        </label>
                        <label>
                            Cidade
                            <input type="text" onChange={aoDigitarCidade} value={cidade} required/>
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
