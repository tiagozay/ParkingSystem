import React, { useState } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { Usuario } from '../../../models/Usuario'
import PaginacaoService from '../../../services/PaginacaoService';
import LinksPaginacoes from '../../../components/LinksPaginacoes';

export default function ListaDeUsuarios({ usuarios }: { usuarios: Usuario[] }) {

    const [paginaAtiva, setPaginaAtiva] = useState(1);
    const [nivelFiltro, setNivelFiltro] = useState('Todos');
    const [filtroNome, setFiltroNome] = useState('');

    if (nivelFiltro !== "Todos") {
        usuarios = usuarios.filter(usuario => usuario.perfilDeAcesso === nivelFiltro);
    }

    const regExp = new RegExp(filtroNome, 'i');
    usuarios = usuarios.filter(usuario => regExp.test(usuario.nome));

    const usuariosDivididosEmPaginas = PaginacaoService.divideArrayEmPaginas(usuarios, 5);

    let usuariosParaExibir = usuariosDivididosEmPaginas[paginaAtiva - 1];

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setNivelFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroNome(event.target.value.trim());
    }

    return (
        <>
            <div className="divCamposSelectEBuscaDaTabela">
                <label>
                    Somente usuários
                    <SelectFiltros onChange={aoSelecionarFiltro} value={nivelFiltro}>
                        <option value="Todos">Todos</option>
                        <option value="Administrador">Administradores</option>
                        <option value="Operador">Operadores</option>
                    </SelectFiltros>

                </label>

                <label>
                    Pesquisar
                    <input type="text" className="inputPesquisar" onChange={aoDigitarNome} />
                </label>
            </div>

            <div className="containerTabela">
                <table id="tabelaUsuarios" className="tabelaPadrao">
                    <thead>
                        <tr>
                            <td>Usuário</td>
                            <td>E-mail</td>
                            <td>Nome</td>
                            <td>Perfil de acesso</td>
                            <td>Ativo</td>
                            <td className='campoDeAcoes'>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuariosParaExibir?.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.usuario}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.perfilDeAcesso}</td>
                                    <td>
                                        {
                                            usuario.ativo ?
                                                <p className='p_textoAtivo'><i className='material-icons'>lock_open</i>Sim</p> :
                                                <p className='p_textoInativo'><i className='material-icons'>lock</i>Não</p>
                                        }
                                    </td>
                                    <td className='campoDeAcoes'>
                                        <button className='material-icons tabela__btnEditar'>edit</button>
                                        <button className='material-icons tabela__btnExcluir '>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <LinksPaginacoes
                            quantidadeDePaginas={usuariosDivididosEmPaginas.length}
                            paginaAtiva={paginaAtiva}
                            setPaginaAtiva={setPaginaAtiva}
                        />
                    </tfoot>
                </table>
            </div>
        </>
    )
}
