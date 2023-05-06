import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Mensalista } from '../../../models/Mensalista'
import SelectFiltros from '../../../components/SelectFiltros'
import LinksPaginacoes from '../../../components/LinksPaginacoes'
import PaginacaoService from '../../../services/PaginacaoService';
import { useMensalistaContext } from '../../../contexts/MensalistasContext';
import { Link } from 'react-router-dom';

interface ListaDeMensalistasProps {
    mensalistas: Mensalista[],
    setSucessoExcluir: Dispatch<SetStateAction<boolean>>
}

export default function ListaDeMensalistas({ mensalistas, setSucessoExcluir }: ListaDeMensalistasProps) {
    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [statusFiltro, setStatusFiltro] = useState('todos');
    const [filtroNome, setFiltroNome] = useState('');

    const {removerMensalista} = useMensalistaContext();

    if(statusFiltro != 'todos'){
        
        let status = true;

        if(statusFiltro === 'false'){
            status = false;
        }else if (statusFiltro === 'true'){
            status = true;
        }

        mensalistas = mensalistas.filter( mensalista => mensalista.ativo === status );
    }

    const regExp = new RegExp(filtroNome, 'i');
    mensalistas = mensalistas.filter( mensalista => regExp.test(mensalista.nome) );

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>)
    {
        setStatusFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>)
    {
        setFiltroNome(event.target.value.trim());
    }

    const mensalistasDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(mensalistas, 5);

    let mensalistasParaExibir = mensalistasDivididosEmPaginas[paginaAtiva - 1];

    function aoClicarEmExcluir(id: number)
    {
        const confirmacao = window.confirm("Excluír este mensalista?");
        if (!confirmacao) return;

        removerMensalista(id);
        setSucessoExcluir(true);
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente mensalistas
                    <SelectFiltros onChange={aoSelecionarFiltro} value={statusFiltro}>
                        <option value="todos">Todos</option>
                        <option value="true">Ativos</option>
                        <option value="false">Inativos</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarNome}/>
                </label>
            </div>

            <div className="containerTabela">
                <table id="tabelaMensalistas" className="tabelaPadrao">
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td>CPF</td>
                            <td>E-mail</td>
                            <td>Celular</td>
                            <td>Ativo</td>
                            <td className='campoDeAcoes'>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            mensalistasParaExibir?.map(mensalista => (
                                <tr key={mensalista.id}>
                                    <td>{mensalista.nome}</td>
                                    <td>{mensalista.cpf}</td>
                                    <td>{mensalista.email}</td>
                                    <td>{mensalista.celular}</td>
                                    <td>{
                                        mensalista.ativo ?
                                            <p className='p_textoAtivo'><i className='material-icons'>lock_open</i>Sim</p> :
                                            <p className='p_textoInativo'><i className='material-icons'>lock</i>Não</p>
                                    }</td>
                                    <td className='campoDeAcoes'>
                                        <Link to={`editarMensalista/${mensalista.id}`} className='material-icons tabela__btnEditar'>edit</Link>
                                        <button className='material-icons tabela__btnExcluir' onClick={() => {aoClicarEmExcluir( mensalista.id )}}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={mensalistasDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>
    )
}
