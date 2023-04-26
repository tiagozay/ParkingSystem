import React from 'react';
import SelectFiltros from '../../../components/SelectFiltros';
import { Mensalidade } from '../../../models/Mensalidade';
import { DataService } from '../../../services/DataService';
import { useState } from 'react';
import PaginacaoService from '../../../services/PaginacaoService';
import LinksPaginacoes from '../../../components/LinksPaginacoes';
import { CpfService } from '../../../services/CpfService';

export default function ListaDeMensalidades({ mensalidades }: { mensalidades: Mensalidade[] }) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroNome, setFiltroNome] = useState('');

    if(statusFiltro !== "Todas"){
        mensalidades = mensalidades.filter( mensalidade => mensalidade.status === statusFiltro );
    }

    const regExp = new RegExp(filtroNome, 'i');
    mensalidades = mensalidades.filter( mensalidade => regExp.test(mensalidade.mensalista.nome) );

    const mensalidadesDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(mensalidades, 5);

    let mensalidadesParaExibir = mensalidadesDivididosEmPaginas[paginaAtiva - 1];

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setFiltroNome(event.target.value.trim());
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente mensalidades
                    <SelectFiltros onChange={aoSelecionarFiltro} value={statusFiltro}>
                        <option value="Todas">Todas</option>
                        <option value="Ativa">Ativas</option>
                        <option value="Vencida">Vencidas</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarNome}/>
                </label>
            </div>

            <div className="containerTabela">
                <table id="tabelaMensalidades" className="tabelaPadrao">
                    <thead>
                        <tr>
                            <td>Mensalista</td>
                            <td>CPF</td>
                            <td>Categoria</td>
                            <td>Valor</td>
                            <td>Forma de pagamento</td>
                            <td>Data de compra</td>
                            <td>Data de vencimento</td>
                            <td>Status</td>
                            <td className='campoDeAcoes'>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mensalidadesParaExibir?.map(mensalidade => (
                                <tr>
                                    <td>{mensalidade.mensalista.nome}</td>
                                    <td>{CpfService.formataCpf(mensalidade.mensalista.cpf)}</td>
                                    <td>{mensalidade.categoria}</td>
                                    <td>{DataService.formataValorMonetario(mensalidade.valor)}</td>
                                    <td>{mensalidade.formaDePagamento}</td>
                                    <td>{DataService.formataData(mensalidade.dataDeCompra)}</td>
                                    <td>{DataService.formataData(mensalidade.dataDeVencimento)}</td>
                                    <td>
                                        {
                                            mensalidade.status == 'Ativa' ?
                                                <p className='statusAtivo'>{mensalidade.status}</p> :
                                                <p className='statusVencido'>{mensalidade.status}</p>
                                        }
                                    </td>
                                    <td className='campoDeAcoes'>
                                        <button className='material-icons tabela__btnExcluir '>delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={mensalidadesDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>
    )
}
