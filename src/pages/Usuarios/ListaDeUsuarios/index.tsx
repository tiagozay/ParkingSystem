import React, {useState, Dispatch, SetStateAction } from 'react'
import SelectFiltros from '../../../components/SelectFiltros'
import { Usuario } from '../../../models/Usuario'
import ListaDeDados from '../../../components/ListaDeDados';
import { useUsuariosContext } from '../../../contexts/UsuariosContext';

interface ListaDeUsuariosProps {
    usuarios: Usuario[],
    setSucessoExcluir: Dispatch<SetStateAction<boolean>>
}

export default function ListaDeUsuarios({ usuarios, setSucessoExcluir }: ListaDeUsuariosProps) {
    const [nivelFiltro, setNivelFiltro] = useState('Todos');
    const [filtroNome, setFiltroNome] = useState('');

    const { excluirUsuario } = useUsuariosContext();

    if (nivelFiltro !== "Todos") {
        usuarios = usuarios.filter(usuario => usuario.nivelDeAcesso === nivelFiltro);
    }

    const regExp = new RegExp(filtroNome, 'i');
    usuarios = usuarios.filter(usuario => regExp.test(usuario.nome));

    function aoSelecionarFiltro(event: React.ChangeEvent<HTMLSelectElement>) {
        setNivelFiltro(event.target.value);
    }

    function aoDigitarNome(event: React.ChangeEvent<HTMLInputElement>) {
        setFiltroNome(event.target.value.trim());
    }

    function aoClicarEmExcluir(id: number)
    {
        const confirmacao = window.confirm("Excluir este Usuário?");
        if (!confirmacao) return;

        excluirUsuario(id);
        setSucessoExcluir(true);
    }

    const theadTabela = (
        <thead>
            <tr>
                <td>Nome</td>
                <td>E-mail</td>
                <td>Perfil de acesso</td>
                <td>Ativo</td>
                <td className='campoDeAcoes'>Ações</td>
            </tr>
        </thead>
    );

    function paraCadaUsuario(usuario: Usuario) {
        return (
            <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.nivelDeAcesso}</td>
                <td>
                    {
                        usuario.ativo ?
                            <p className='p_textoAtivo'><i className='material-icons'>lock_open</i>Sim</p> :
                            <p className='p_textoInativo'><i className='material-icons'>lock</i>Não</p>
                    }
                </td>
                <td className='campoDeAcoes'>
                    <button className='material-icons tabela__btnEditar'>edit</button>
                    <button className='material-icons tabela__btnExcluir ' onClick={() => aoClicarEmExcluir(usuario.id as number)}>delete</button>
                </td>
            </tr>
        )
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

            <ListaDeDados 
                dados={usuarios}
                jsxThead={theadTabela}
                paraCadaRegistro={paraCadaUsuario}
                registrosPorPagina={5}
            />
        </>
    )
}
