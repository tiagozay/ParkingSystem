import React from 'react'
import { Tiket } from '../../../models/Tiket';
import LinksPaginacoes from '../../../components/LinksPaginacoes';
import {useState} from 'react';
import PaginacaoService from '../../../services/PaginacaoService';

export default function ListaDeTikets({tikets}: {tikets: Tiket[]}) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);

    const tiketsDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(tikets, 5);

    let tiketsParaExibir = tiketsDivididosEmPaginas[paginaAtiva - 1];

    return (
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
                {tiketsParaExibir.map(tiket => (
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
    )
}
