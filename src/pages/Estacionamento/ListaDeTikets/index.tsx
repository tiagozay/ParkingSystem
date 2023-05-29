import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Tiket } from '../../../models/Tiket';
import { useState } from 'react';
import SelectFiltros from '../../../components/SelectFiltros';
import InputPlaca from '../../../components/InputPlaca';
import { useTiketContext } from '../../../contexts/TiketContext';
import { Link } from 'react-router-dom';
import ListaDeDados from '../../../components/ListaDeDados';

interface ListaDeTiketsProps {
    tikets: Tiket[],
    setSucessoExcluir: Dispatch<SetStateAction<boolean>>
}

export default function ListaDeTikets({ tikets, setSucessoExcluir }: ListaDeTiketsProps) {
    const [statusFiltro, setStatusFiltro] = useState('Todos');
    const [filtroPlaca, setFiltroPlaca] = useState('');

    const { excluirTiket } = useTiketContext();

    let tiketsFiltados = tikets;

    if (statusFiltro != 'Todos') {
        tiketsFiltados = tikets.filter(tiket => tiket.status === statusFiltro);
    }

    const regExp = new RegExp(filtroPlaca.replace(/-/, ''), 'i');
    tiketsFiltados = tiketsFiltados.filter(tiket => regExp.test(tiket.veiculo.placa.replace(/-/, '')));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarPlaca(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroPlaca(event.target.value)
    }

    function aoClicarEmExcluir(id: number) {
        const confirmacao = window.confirm("Excluir este Tiket?");
        if (!confirmacao) return;

        excluirTiket(id);
        setSucessoExcluir(true);
    }

    const jsxThead = (
        <thead>
            <tr>
                <td>Segmento</td>
                <td>Valor hora</td>
                <td>Placa</td>
                <td>Veículo</td>
                <td>Forma de pagamento</td>
                <td>Cliente</td>
                <td>Status</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaRegistro(tiket: Tiket) {
        return (
            <tr key={tiket.id}>
                <td>{tiket.veiculo.segmento}</td>
                <td>
                    {
                        tiket.precificacao.valorHora
                            .toLocaleString("pt-BR", { style: "currency", currency: "BRL", })
                    }
                </td>
                <td>{tiket.veiculo.placa}</td>
                <td>{`${tiket.veiculo.marca} ${tiket.veiculo.modelo}`}</td>
                <td>{`${tiket.formaDePagamento?.nomeFormaDePagamento || "Em aberto"}`}</td>
                <td>{tiket.mensalista ? tiket.mensalista.nome : "Avulso"}</td>
                <td>
                    <p className={tiket.status == 'Em aberto' ? 'statusEmAberto' : 'statusPago'}>
                        {`${tiket.status}`
                        }</p>
                </td>
                <td className='campoDeAcoes'>
                    <button id='btnImprimirTiket' className='material-icons'>print</button>

                    {
                        tiket.status === 'Em aberto' ? (
                            <Link to={`editarTiket/${tiket.id}`} id='btnVisualizarOuEditarTiket' className='material-icons'>
                                edit
                            </Link>
                        ) :
                            (
                                <Link to={`visualizarTiket/${tiket.id}`} id='btnVisualizarOuEditarTiket' className='material-icons'>
                                    visibility
                                </Link>
                            )
                    }

                    <button id='btnExcluirTiket' className='material-icons' onClick={() => aoClicarEmExcluir(tiket.id as number)}>delete</button>
                </td>
            </tr>
        )
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
                    <InputPlaca className="inputPesquisar" onChange={aoDigitarPlaca} value={filtroPlaca} />
                </label>
            </div>


            <ListaDeDados
                dados={tiketsFiltados}
                registrosPorPagina={5}
                jsxThead={jsxThead}
                paraCadaRegistro={paraCadaRegistro}
            />
        </>

    )
}