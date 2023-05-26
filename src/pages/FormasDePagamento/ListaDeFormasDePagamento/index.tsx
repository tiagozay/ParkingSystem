import React, { useState } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { FormaDePagamento } from '../../../models/FormaDePagamento'
import PaginacaoService from '../../../services/PaginacaoService';
import LinksPaginacoes from '../../../components/LinksPaginacoes';
import { useFormaDePagamentoContext } from '../../../contexts/FormaDePagamentoContext';
import ListaDeDados from '../../../components/ListaDeDados';

interface ListaDeFormasDePagamentoProps {
    formasDePagamento: FormaDePagamento[],
    setSucessoExcluir: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListaDeFormasDePagamento({ formasDePagamento, setSucessoExcluir }: ListaDeFormasDePagamentoProps) {
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroNome, setFiltroNome] = useState('');

    const { excluirFormaDePagamento } = useFormaDePagamentoContext();

    //Traz somente as formas de pagamento que não são descontinuadas 
    formasDePagamento = formasDePagamento.filter(formaDePagamento => !formaDePagamento.descontinuada);

    if (statusFiltro !== "Todas") {
        formasDePagamento = formasDePagamento?.filter(mensalidade => {
            const status = mensalidade.ativa ? "Ativas" : "Inativas";

            return status === statusFiltro
        });
    }

    const regExp = new RegExp(filtroNome, 'i');
    formasDePagamento = formasDePagamento.filter(formaDePagamento => regExp.test(formaDePagamento.nomeFormaDePagamento));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroNome(event.target.value.trim());
    }

    function aoExcluirFormaDePagamento(id: number) {
        const confirm = window.confirm("Excluír esta forma de pagamento?");
        if (!confirm) return;

        excluirFormaDePagamento(id);
        setSucessoExcluir(true);

    }

    const theadTabela = (
        <thead>
            <tr>
                <td>Nome forma de pagamento</td>
                <td>Ativa</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaRegistro(formaDePagamento: FormaDePagamento) {
        return (
            <tr key={formaDePagamento.id}>
                <td>{formaDePagamento.nomeFormaDePagamento}</td>
                <td>
                    {
                        formaDePagamento.ativa ?
                            <p className='p_textoAtivo'><i className='material-icons'>lock_open</i> Sim</p> :
                            <p className='p_textoInativo'><i className='material-icons'>lock</i>Não</p>
                    }
                </td>
                <td className='campoDeAcoes'>
                    <button className='material-icons tabela__btnEditar'>edit</button>
                    <button className='material-icons tabela__btnExcluir' onClick={() => aoExcluirFormaDePagamento(formaDePagamento.id as number)} >delete</button>
                </td>
            </tr>
        )
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente formas de pagamento
                    <SelectFiltros value={statusFiltro} onChange={aoSelecionarFiltro}>
                        <option value="Todas">Todas</option>
                        <option value="Ativas">Ativas</option>
                        <option value="Inativas">Inativas</option>
                    </SelectFiltros>

                </label>


                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarNome} />
                </label>
            </div>

            <ListaDeDados
                dados={formasDePagamento}
                jsxThead={theadTabela}
                paraCadaRegistro={paraCadaRegistro}
                registrosPorPagina={5}
            />

        </>
    )
}
