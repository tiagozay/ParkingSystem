import React, { useState } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { Precificacao } from '../../../models/Precificacao'
import { DataService } from '../../../services/DataService'
import LinksPaginacoes from '../../../components/LinksPaginacoes'
import PaginacaoService from '../../../services/PaginacaoService'

export default function ListaDePrecificacoes({ precificacoes }: { precificacoes: Precificacao[] }) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [statusFiltro, setStatusFiltro] = useState('Todas');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    if(statusFiltro !== "Todas"){
        precificacoes = precificacoes.filter( precificacao => {
            const status = precificacao.ativa ? "Ativas" : "Vencidas";

            return status === statusFiltro;        
        });
    }

    const regExp = new RegExp(filtroCategoria, 'i');
    precificacoes = precificacoes.filter( precificacao => regExp.test(precificacao.categoria) );

    const precificacoesDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(precificacoes, 5);

    let precificacoesParaExibir = precificacoesDivididosEmPaginas[paginaAtiva - 1];

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarCategoria(event: React.ChangeEvent<HTMLInputElement>)
    {
        setFiltroCategoria(event.target.value.trim());
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente mensalidades
                    <SelectFiltros value={statusFiltro} onChange={aoSelecionarFiltro}>
                        <option value="Todas">Todas</option>
                        <option value="Ativas">Ativas</option>
                        <option value="Vencidas">Vencidas</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarCategoria} />
                </label>
            </div>

            <div className="containerTabela">
                <table id="tabelaPrecificacoes" className="tabelaPadrao">
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
                    <tbody>
                        {
                            precificacoesParaExibir?.map(precificacao => (
                                <tr>
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
                                        <button className='material-icons tabela__btnEditar'>edit</button>
                                        <button className='material-icons tabela__btnExcluir'>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={precificacoesDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>

    )
}
