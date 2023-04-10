import React from 'react'
import { Tiket } from '../../../models/Tiket';
import LinksPaginacoes from '../../../components/LinksPaginacoes';
import { useState } from 'react';
import PaginacaoService from '../../../services/PaginacaoService';
import SelectFiltros from '../../../components/SelectFiltros';
import InputPlaca from '../../../components/InputPlaca';

export default function ListaDeTikets({ tikets }: { tikets: Tiket[] }) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [statusFiltro, setStatusFiltro] = useState('Em aberto');
    const [filtroPlaca, setFiltroPlaca] = useState('');

    if(statusFiltro != 'Todos'){
        tikets = tikets.filter( tiket => tiket.status === statusFiltro );
    }

    const regExp = new RegExp(filtroPlaca, 'i');
    tikets = tikets.filter( tiket => regExp.test(tiket.veiculo.placa.replace('-', '')) );

    const tiketsDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(tikets, 5);

    let tiketsParaExibir = tiketsDivididosEmPaginas[paginaAtiva - 1];

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>)
    {
        setFiltroPlaca(event.target.value.replace('-', ''))
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente tikets
                    <SelectFiltros onChange={aoSelecionarFiltro} value={statusFiltro}>
                        <option value="Em aberto">Abertos</option>
                        <option value="Pago">Fechados</option>
                        <option value="Todos">Todos</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <InputPlaca className="inputPesquisar" onChange={aoDigitarPlaca} />
                </label>
            </div>


            <div className="containerTabela">
                <table id="tabelaTikets" className="tabelaPadrao">
                    <thead>
                        <tr>
                            <td>Segmento</td>
                            <td>Valor hora</td>
                            <td>Placa</td>
                            <td>Veículo</td>
                            <td>Forma de pagamento</td>
                            <td>Status</td>
                            <td className='campoDeAcoes'>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {tiketsParaExibir?.map(tiket => (
                            <tr key={tiket.id}>
                                <td>{tiket.veiculo.segmento}</td>
                                <td>
                                    {
                                        tiket.valorPorHora
                                            .toLocaleString("pt-BR", { style: "currency", currency: "BRL", })
                                    }
                                </td>
                                <td>{tiket.veiculo.placa}</td>
                                <td>{`${tiket.veiculo.marca} ${tiket.veiculo.modelo}`}</td>
                                <td>{`${tiket.formaDePagamento || "Em aberto"}`}</td>
                                <td>
                                    <p className={tiket.status == 'Em aberto' ? 'statusEmAberto' : 'statusPago'}>
                                        {`${tiket.status}`
                                        }</p>
                                </td>
                                <td className='campoDeAcoes'>
                                    <button id='btnImprimirTiket' className='material-icons'>print</button>
                                    <button id='btnVisualizarOuEditarTiket' className='material-icons'>
                                        {tiket.status == "Pago" ? 'visibility' : "edit"}
                                    </button>
                                    <button id='btnExcluirTiket' className='material-icons'>delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={tiketsDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>

    )
}
