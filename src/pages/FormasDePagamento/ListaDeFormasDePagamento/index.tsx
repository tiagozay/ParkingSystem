import React, { useState } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { FormaDePagamento } from '../../../models/FormaDePagamento'
import PaginacaoService from '../../../services/PaginacaoService';
import LinksPaginacoes from '../../../components/LinksPaginacoes';

export default function ListaDeFormasDePagamento({ formasDePagamento }: { formasDePagamento: FormaDePagamento[] }) {

    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroNome, setFiltroNome] = useState('');

    if (statusFiltro !== "Todas") {
        formasDePagamento = formasDePagamento.filter(mensalidade => {
            const status = mensalidade.ativa ? "Ativas" : "Inativas";

            return status === statusFiltro
        });
    }

    const regExp = new RegExp(filtroNome, 'i');
    formasDePagamento = formasDePagamento.filter(formaDePagamento => regExp.test(formaDePagamento.nomeFormaDePagamento));

    const formasDePagamentoDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(formasDePagamento, 5);

    let formasDePagamentoParaExibir = formasDePagamentoDivididosEmPaginas[paginaAtiva - 1];

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroNome(event.target.value.trim());
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

            <div className="containerTabela">
                <table id="tabelaFormasDePagamento" className="tabelaPadrao">
                    <thead>
                        <tr>
                            <td>Nome forma de pagamento</td>
                            <td>Ativa</td>
                            <td className='campoDeAcoes'>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            formasDePagamentoParaExibir?.map(formaDePagamento => (
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
                                        <button className='material-icons tabela__btnExcluir'>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={formasDePagamentoDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>
    )
}
