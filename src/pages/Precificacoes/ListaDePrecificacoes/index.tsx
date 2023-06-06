import React, { useState, Dispatch, SetStateAction } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { Precificacao } from '../../../models/Precificacao'
import { DataService } from '../../../services/DataService'
import ListaDeDados from '../../../components/ListaDeDados'
import { usePrecificacaoContext } from '../../../contexts/PrecificacaoContext'
import { Link } from 'react-router-dom'
import { useMensalidadeContext } from '../../../contexts/MensalidadesContext'
import { useTicketContext } from '../../../contexts/TicketContext'

interface ListaDePrecificacoesProps {
    precificacoes: Precificacao[],
    setSucessoExcluir: Dispatch<SetStateAction<boolean>>
}

export default function ListaDePrecificacoes({ precificacoes, setSucessoExcluir }: ListaDePrecificacoesProps) {
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    const { removerPrecificacao } = usePrecificacaoContext();
    const { verificaSeTemMensalidadesEmDiaDePrecificacao } = useMensalidadeContext();
    const { verificaSeTemTicketsAbertosDePrecificacao } = useTicketContext();

    if (statusFiltro !== "Todas") {
        precificacoes = precificacoes.filter(precificacao => {
            const status = precificacao.ativa ? "Ativas" : "Inativas";

            return status === statusFiltro;
        });
    }

    const regExp = new RegExp(filtroCategoria, 'i');
    precificacoes = precificacoes.filter(precificacao => regExp.test(precificacao.categoria));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarCategoria(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroCategoria(event.target.value.trim());
    }

    function aoClicarEmExcluir(id: number) {


        if(verificaSeTemTicketsAbertosDePrecificacao(id)){
            alert("Existem tickets em aberto para esta categoria!");
            return;
        };
        if(verificaSeTemMensalidadesEmDiaDePrecificacao(id)){
            alert("Existem mensalidades ativas para esta categoria!");
            return;
        };

        const confirmacao = window.confirm("Excluír esta precificação?");
        if (!confirmacao) return;

        removerPrecificacao(id);
        setSucessoExcluir(true);
    }

    const theadTabela = (
        <thead>
            <tr>
                <td>Categoria</td>
                <td>Valor da hora</td>
                <td>Valor da mensalidade</td>
                <td>Numero de vagas</td>
                <td>Ativa</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaPrecificacao(precificacao: Precificacao) {
        return (
            <tr key={precificacao.id}>
                <td>{precificacao.categoria}</td>
                <td>{DataService.formataValorMonetario(precificacao.valorHora)}</td>
                <td>{DataService.formataValorMonetario(precificacao.valorMensalidade)}</td>
                <td>{precificacao.numeroDeVagas}</td>
                <td>{
                    precificacao.ativa ?
                        <p className='p_textoAtivo'><i className='material-icons'>lock_open</i> Sim</p> :
                        <p className='p_textoInativo'><i className='material-icons'>lock</i>Não</p>
                }</td>
                <td className='campoDeAcoes'>
                    <Link to={`editarPrecificacao/${precificacao.id}`} className='material-icons tabela__btnEditar'>edit</Link>
                    <button className='material-icons tabela__btnExcluir' onClick={() => aoClicarEmExcluir(precificacao.id as number)}>delete</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente mensalidades
                    <SelectFiltros value={statusFiltro} onChange={aoSelecionarFiltro}>
                        <option value="Todas">Todas</option>
                        <option value="Ativas">Ativas</option>
                        <option value="Inativas">Inativas</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarCategoria} />
                </label>
            </div>

            <ListaDeDados
                dados={precificacoes}
                jsxThead={theadTabela}
                paraCadaRegistro={paraCadaPrecificacao}
                registrosPorPagina={5}
            />
        </>

    )
}
