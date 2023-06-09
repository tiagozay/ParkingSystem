import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BtnVoltar from '../../components/BtnVoltar';
import MensagemErro from '../../components/MensagemErro';
import BoasVindas from '../../components/BoasVindas';
import { useFormaDePagamentoContext } from '../../contexts/FormaDePagamentoContext';
import { FormaDePagamento } from '../../models/FormaDePagamento';

export default function EditarFormaDePagamento() {
    const navigate = useNavigate();

    const id = Number(useParams().id);

    const { buscarFormaDePagamentoPorId , editarFormaDePagamento } = useFormaDePagamentoContext();

    let formaDePagamento: FormaDePagamento | null;

    const [nome, setNome] = useState("");
    const [ativa, setAtiva] = useState(true);

    const [mensagemDeErroAberta, setMensagemDeErroAberta] = useState(false);
    const [mensagemDeErro, setMensagemDeErro] = useState("");

    useEffect(() => {
        formaDePagamento = buscarFormaDePagamentoPorId(id);

        if (!formaDePagamento || formaDePagamento.descontinuada) {
            navigate('/formasDePagamento');
            return;
        }

        setNome(formaDePagamento.nomeFormaDePagamento);
        setAtiva(formaDePagamento.ativa);

    }, [id]);

    function aoEditarFormaDePagamento(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const formaDePagamentoEditada = new FormaDePagamento(
                id,
                nome,
                ativa,
                false
            );

            editarFormaDePagamento(formaDePagamentoEditada)
                .then( () => {
                    navigate('/formasDePagamento', { state: { sucessoEditar: true } });
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
    function aoSelecionarAtiva(event: React.ChangeEvent<HTMLSelectElement>) {
        //Lógica que converte string('true' ou 'false') em booleano
        setAtiva(event.target.value === 'true');
    }


    return (
        <section id="formCadastrarFormaDePagamento">
            <div id="tituloDaPagina">
                <div id="tituloDaPagina__nome">
                    <div id="tituloDaPagina__icone">
                        <i className="material-icons">attach_money</i>
                    </div>
                    <div id="tituloDaPagina__textos">
                        <h2>Editar forma de pagamento</h2>
                        <span>Editando formaa de pagamento</span>
                    </div>
                </div>
                <div id="caminhoDasEtapas">
                    <Link to='/' className="btnTrocarDePagina">
                        <i className="material-icons">home</i>
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to='/formasDePagamento'>
                        Formas de pagamento
                    </Link>
                    <span className="barraSeparadora">/</span>
                    <Link to={`/formasDePagamento/editarFormaDePagamento/${id}`}>
                        Editar forma de pagamento
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

                <form className="formPadrao" onSubmit={aoEditarFormaDePagamento}>
                    <div className="linhaInputs">
                        <label className="labelInputMaior">
                            Nome da forma de pagamento
                            <input type="text" value={nome} onChange={aoDigitarNome} />
                        </label>
                        <label>
                            Ativa
                            <select value={`${ativa}`} onChange={aoSelecionarAtiva}>
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
