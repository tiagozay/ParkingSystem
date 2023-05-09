import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMensalistaContext } from '../../contexts/MensalistasContext';
import { Tiket } from '../../models/Tiket';
import { DataService } from '../../services/DataService';
import BtnVoltar from '../../components/BtnVoltar';
import InputCpf from '../../components/InputCpf';
import ReactInputMask from 'react-input-mask';
import MensagemErro from '../../components/MensagemErro';
import BoasVindas from '../../components/BoasVindas';
import { Mensalista } from '../../models/Mensalista';

export default function EditarMensalista() {
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const {buscarMensalistaPorId, editarMensalista} = useMensalistaContext();

    let mensalista: Mensalista | undefined;

    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [ativo, setAtivo] = useState(false);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState<string | null>("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    useEffect(() => {
        mensalista = buscarMensalistaPorId(id);

        if(!mensalista){
            navigate('/mensalistas');
            return;
        }

        setNome(mensalista.nome);
        setDataNascimento( 
            mensalista.dataNascimento ? 
            DataService.formataDataPadraoInput(mensalista.dataNascimento) : 
            ""
        );
        setAtivo(mensalista.ativo);
        setCpf(mensalista.cpf);
        setEmail(mensalista.email);
        setTelefone(mensalista.celular);
        setCep(mensalista.cep);
        setUf(mensalista.uf);
        setCidade(mensalista.cidade);
        
    }, [id]);

    function aoEditarMensalista(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault();

        try{
            const mensalistaEditado = new Mensalista(
                id,
                nome, 
                DataService.corrigeFusoHorario(new Date(dataNascimento)),
                cpf,
                email,
                telefone,
                ativo,
                cep,
                uf,
                cidade
            );
    
            editarMensalista(mensalistaEditado);
    
            navigate('/mensalistas', {state: {sucessoEditar: true}});
        }catch(e: any){
            setMensagemDeErroAberta(true);
            setMensagemDeErro(e.message);
        }
        
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setNome(event.target.value);
    }
    function aoDigitarDataDeNascimento(event: React.ChangeEvent<HTMLInputElement>)
    {
        setDataNascimento(event.target.value);
    }
    function aoSelecionarAtivo(event: React.ChangeEvent<HTMLSelectElement>)
    {
        //Lógica que converte string('true' ou 'false') em booleano
        setAtivo(event.target.value === 'true');
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
    }
    function aoDigitarUf(event: React.ChangeEvent<HTMLInputElement>)
    {
        setUf(event.target.value);
    }
    function aoDigitarCidade(event: React.ChangeEvent<HTMLInputElement>)
    {
        setCidade(event.target.value);
    }

    return (
        <section id="formAdicionarMensalista">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">edit</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar mensalistas</h2>
                        <span>Editando mensalistas</span>
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
                    <Link to={`/mensalistas/editarMensalista/${id}`}>
                        Editar Mensalista
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

                <form action="" className="formPadrao" onSubmit={aoEditarMensalista}>
                    <div className="linhaInputs">
                        <label>
                            Nome
                            <input type="text" onChange={aoDigitarNome} value={nome} required/>
                        </label>
                        <label>
                            Data nascimento
                            <input type="date" onChange={aoDigitarDataDeNascimento} value={dataNascimento} required/>
                        </label>
                        <label>
                            Ativo
                            <select value={`${ativo}`} onChange={aoSelecionarAtivo}>
                                <option value='true'>Sim</option>
                                <option value='false'>Não</option>
                            </select>
                        </label>
                    </div>

                    <div className="linhaInputs">
                        <label>
                            CPF
                            <InputCpf onChange={aoDigitarCpf} value={cpf} required />
                        </label>
                        <label>
                            E-mail
                            <input type="text" onChange={aoDigitarEmail} value={email as string}/>
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
